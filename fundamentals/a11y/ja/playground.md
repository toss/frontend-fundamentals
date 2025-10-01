---
head:
  - [
      meta,
      {
        property: "og:image",
        content: "https://static.toss.im/illusts/a11y-use-meta.jpg"
      }
    ]
  - [
      meta,
      {
        name: "twitter:image",
        content: "https://static.toss.im/illusts/a11y-use-meta.jpg"
      }
    ]
  - [meta, { name: "twitter:card", content: "summary_large_image" }]
---

<script setup>
import ScreenReaderExperience from '../components/ScreenReaderExperience.vue';
</script>

# 体験してみる

視覚障害のある方がモバイルをどのように利用しているか、実際に体験してみましょう。下の「はじめる」ボタンを押すと、スクリーンリーダー利用者のように画面を見ず、音声だけでTossの送金サービスを体験できます。

PCではマウスのクリックとドラッグでタッチ操作を代替できます。真っ暗な画面は最初は戸惑うかもしれませんが、音声に耳を傾けながらゆっくり進めてみてください。

<ScreenReaderExperience
  url="https://service.toss.im/accessibility/screen-reader-experience"
  title="スクリーンリーダー体験ページへ"
/>
