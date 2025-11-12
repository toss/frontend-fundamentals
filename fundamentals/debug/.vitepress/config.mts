import { defineConfig } from "vitepress";
import footnote from "markdown-it-footnote";
import path from "node:path";
import { createRequire } from "node:module";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { sharedConfig } from "./shared.mjs";

const require = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...sharedConfig,
  title: "Debug Fundamentals",
  description: "프론트엔드 접근성의 모든 것",
  ignoreDeadLinks: false,
  base: "/debug/",
  lastUpdated: true,
  locales: {
    // temporary
    en: {
      label: "English",
      lang: "en",
      themeConfig: { nav: [{ text: "Home", link: "/en/" }] }
    },
    ja: {
      label: "日本語",
      lang: "ja",
      themeConfig: { nav: [{ text: "ホーム", link: "/ja/" }] }
    },
    "zh-hans": {
      label: "简体中文",
      lang: "zh-hans",
      themeConfig: { nav: [{ text: "首页", link: "/zh-hans" }] }
    },
    root: {
      label: "한국어",
      lang: "ko",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        ...sharedConfig.themeConfig,
        nav: [{ text: "홈", link: "/" }],
        sidebar: [
          {
            text: "소개",
            items: [
              {
                text: "시작하기",
                link: "/pages/introduce.md"
              },
              {
                text: "효과적인 디버깅을 위한 4가지 단계",
                link: "/pages/start.md"
              },
              {
                text: "참여하기",
                link: "/pages/event.md"
              }
            ]
          },
          {
            text: "실전 가이드",
            items: [
              {
                text: "진단하기",
                link: "/pages/diagnose/index.md",
                collapsed: false,
                items: [
                  {
                    text: "에러 메세지로 원인 추측하기",
                    link: "/pages/diagnose/error-message.md"
                  },
                  { text: "작업 지도 그리기", link: "/pages/diagnose/map.md" }
                ]
              },
              {
                text: "재현하기",
                link: "/pages/reproduce/index.md",
                collapsed: false,
                items: [
                  {
                    text: "최대한 간단하게 재현하기",
                    link: "/pages/reproduce/simply.md"
                  },
                  { text: "디버거와 콘솔로그 활용하기", link: "/pages/reproduce/debugger.md" },
                  {
                    text: "일반적인 범위에서 벗어난 값 재현하기",
                    link: "/pages/reproduce/out-range.md"
                  },
                  {
                    text: "반복적인 재현 과정을 자동화하기",
                    link: "/pages/reproduce/repeat.md"
                  },
                  {
                    text: "버그 발생 경로를 추적하기",
                    link: "/pages/reproduce/trace.md"
                  }
                ]
              },
              {
                text: "수정하기",
                link: "/pages/fix/index.md",
                collapsed: false,
                items: [
                  { text: "근본 원인 수정하기", link: "/pages/fix/correct.md" },
                  { text: "순수함수 만들기", link: "/pages/fix/pure.md" },
                  { text: "데드코드 제거하기", link: "/pages/fix/dead-code.md" }
                ]
              },
              {
                text: "재발 방지하기",
                link: "/pages/prevent/index.md",
                collapsed: false,
                items: [
                  {
                    text: "에러 로그 상세히 남기기",
                    link: "/pages/prevent/error-log.md"
                  },
                  {
                    text: "버그 리포트 남기기",
                    link: "/pages/prevent/bug-report.md"
                  },
                  {
                    text: "팀과 공유하고 공통 유틸에 반영하기",
                    link: "/pages/prevent/util.md"
                  }
                ]
              }
            ]
          },
          {
            text: "디버깅 실무 사례",
            items: [
              {
                text:"javascript",
                items:[
                  {
                  text: "MAX_SAFE_INTEGER 정밀도 손실",
                  link: "/pages/contribute/javascript/javascript_max_number_error_debug.md"
                }]
              },
              {
                text:"react",
                items:[
                  {
                    text: "BroadcastQueryClient SuspenseError",
                    link: "/pages/contribute/react/broadcast_suspense_error_debug.md"
                  },
                  {
                    text: "React Suspense와 framer-motion UI 충돌",
                    link: "/pages/contribute/react/react_suspense_and_framer_motion_ui_debug.md"
                  }
                ]
              },
              {
                text:'ios',
                items:[
                  {
                    text: "iOS 웹뷰 이미지 업로드 시 페이지가 새로고침 되는 현상",
                    link: "/pages/contribute/ios/ios_webview_image_upload_refresh_debug.md"
                  },
                  {
                    text: "iOS 웹뷰에서 스와이프 뒤로가기 시 회색 화면이 표시되는 현상",
                    link: "/pages/contribute/ios/ios_webview_swipe_back_gray_screen_debug.md"
                  },
                  {
                    text: "Safari에서 TradingView iframe 메모리 누수",
                    link: "/pages/contribute/ios/tradingview_iframe_memory_leak_debug.md"
                  }
                ]
              },
              {text:'android',
                items:[
                  {
                    text: "Android에서 React Native 번들 로딩 시 SIGBUS 크래시",
                    link: "/pages/contribute/android/android_react_native_bundle_loading_sigbus_crash_debug.md"
                  },
                ]
              },
              {
                text:'public',
                items:[
                  {
                    text: "토스아이디 OG 이미지에 타인의 프로필이 표시되는 현상",
                    link: "/pages/contribute/public/tossid_og_image_other_profile_debug.md"
                  },
                ]
              },
              {
                text:'compile',
                items:[
                  {
                    text: "ESLint/TSC 파싱 콜스택 오버플로우",
                    link: "/pages/contribute/compile/codegen_callstack_overflow_debug.md"
                  }
                ]
              },
              {
                text:'yarn',
                items:[
                  {
                    text: "Yarn Workspace에서 HMR이 동작하지 않는 현상",
                    link: "/pages/contribute/yarn/yarn_workspace_hmr_debug.md"
                  },
                ]
              },
              {
                text:'cursor',
                items:[
                  {
                    text: "Cursor에서 Biome 포맷팅이 동작하지 않는 현상",
                    link: "/pages/contribute/cursor/cursor_biome_formatting_debug.md"
                  }
                ]
              },
              { text: "기여하기 탬플릿", link: "/pages/contribute/template.md" }
            ]
          }
        ]
      },
    }
  },
  markdown: {
    config: (md) => {
      md.use(footnote);
      md.use(tabsMarkdownPlugin);
    }
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/debug/images/favicon.ico"
      }
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://static.toss.im/illusts-common/df-meta.png"
      }
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://static.toss.im/illusts-common/df-meta.png"
      }
    ],
    [
      "meta",
      {
        name: "twitter:card",
        content: "summary"
      }
    ]
  ],
  vite: {
    resolve: {
      alias: [
        {
          find: /^vue$/,
          replacement: path.dirname(
            require.resolve("vue/package.json", {
              paths: [require.resolve("vitepress")]
            })
          )
        },
        {
          find: /^vue\/server-renderer$/g,
          replacement: path.dirname(
            require.resolve("vue/server-renderer", {
              paths: [require.resolve("vitepress")]
            })
          )
        },
        {
          find: /^@shared/,
          replacement: path.resolve(__dirname, "../../shared")
        }
      ]
    },
    ssr: {
      noExternal: ["vitepress-plugin-tabs"]
    }
  }
});
