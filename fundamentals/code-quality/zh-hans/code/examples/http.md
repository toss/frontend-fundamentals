# 避免命名重复

<div style="margin-top: 16px">
<Badge type="info" text="可预测性" />
</div>

具有相同名称的函数或变量应该具有相同的行为。微小的行为差异会降低代码的可预测性，并可能使代码阅读者感到困惑。

## 📝 代码示例

在某个前端服务中，通过封装原本使用的 HTTP 库，创建了一个以新形式发送 HTTP 请求的模块。
巧合的是，原本的 HTTP 库和新创建的 HTTP 模块名称相同，都叫 `http` 。

::: code-group

```typescript [http.ts]
// 该服务使用 `http` 库。
import { http as httpLibrary } from "@some-library/http";

export const http = {
  async get(url: string) {
    const token = await fetchToken();

    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
```

```typescript [fetchUser.ts]
// 从 http.ts 文件中导入 http 的代码
import { http } from "./http";

export async function fetchUser() {
  return http.get("...");
}
```

:::

## 👃 闻代码

### 可预测性

这段代码在功能上没有问题，但可能会让代码阅读者感到困惑。调用 `http.get` 的开发者可能会预期这个函数像原始的 HTTP 库一样只是发送一个简单的 GET 请求，但实际上会执行额外的操作，如获取令牌。

由于误解，预期行为与实际行为之间会出现差异，从而引发错误，或者使调试过程变得复杂和混乱。

## ✏️ 尝试改善

为了提高函数行为的可预测性，在服务中自定义函数时，应该使用与库函数明显区分开来的、具有描述性的名称。

::: code-group

```typescript [httpService.ts]
// 该服务正在使用 `http` 库。
import { http as httpLibrary } from "@some-library/http";

// 将库函数的名称与自定义函数区分开来。
export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken();

    // 添加认证逻辑，例如在请求头中添加令牌。
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
```

```typescript [fetchUser.ts]
// 从 httpService.ts 文件中引入定义的 httpService 模块
import { httpService } from "./httpService";

export async function fetchUser() {
  // 通过函数名，可知该函数发送的是已通过认证的请求。
  return await httpService.getWithAuth("...");
}
```

:::

这种方式可以减少在看到函数名时对其功能产生误解的可能性。
当其他开发者使用该函数时，他们能够意识到这是服务中定义的函数，并能够正确的使用它。

另外，通过 `getWithAuth` 这个名称，可以明确传达该函数是用来发送通过认证的请求。
