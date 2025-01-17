# 名前が被らないように管理する

<div style="margin-top: 16px">
<Badge type="info" text="予測可能性" />
</div>

同じ名前を持つ関数や変数は、同じ挙動をするべきです。小さな挙動の違いはコードの予測可能性を低下させ、コードを読む人に誤解を招く可能性があります。

## 📝 　コード例

とあるフロントエンドサービスで、元々使用していたHTTPライブラリをラップして新しい形でHTTPリクエストを送るモジュールを作成しました。
偶然にも、元のHTTPライブラリと新しく作成したHTTPモジュールの名前は`http`という同じ名前です。

::: code-group

```typescript [http.ts]
// このサービスは`http`というライブラリを使っています
import { http as httpLibrary } from "@some-library/http";

export const http = {
  async get(url: string) {
    const token = await fetchToken();

    return httpLibrary.get(url);
  }
};
```

```typescript [fetchUser.ts]
// http.tsで定義したhttpを持ってくるコード
import { http } from "./http";

export async function fetchUser() {
  return http.get("...");
}
```

:::

## 👃 コードの不吉な臭いを嗅いでみる

### 予測可能性

このコードは機能的には問題ありませんが、読む人に誤解を与える可能性があります。`http.get`を呼び出す開発者は、この関数が元のHTTPライブラリが行うような単純なGETリクエストを送信することを期待すると思いますが、実際にはトークンを取得する追加の処理が行われます。

誤解によって期待される挙動と実際の挙動の間にギャップが生じ、バグが発生したり、デバッグプロセスが複雑で混乱を招く可能性があります。

## ✏️ リファクタリングしてみる

サービスで作成した関数には、ライブラリの関数名と区別できる明確な名前を使用することで、関数の挙動を予測可能にすることができます。

::: code-group

```typescript [httpService.ts]
// このサービスは`http`というライブラリを使っています
import { http as httpLibrary } from "@some-library/http";

// ライブラリの関数名と区別されるようにネーミングを変えました
export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken();

    // トークンをヘッダーに追加するなど認証のロジックを追加します
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
```

```typescript [fetchUser.ts]
// http.tsで定義したhttpを持ってくるコード
import { httpService } from "./httpService";

export async function fetchUser() {
  // 関数名から、この関数が認証済みのリクエストを送ることが分かります。
  return await httpService.getWithAuth("...");
}
```

:::

こうすることで、関数の名前を見たときに挙動を誤解する可能性を減らすことができます。
他の開発者がこの関数を使用する際に、サービスで定義された関数であることを認識し、正しく使用できるようになります。

また、`getWithAuth`という名前にすることで、この関数が認証済みのリクエストを送信することを明確に伝えることができます。
