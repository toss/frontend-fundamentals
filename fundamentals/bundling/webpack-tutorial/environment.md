# 환경 변수와 보안 관리하기

이번 단계에서는 '오늘의 이모지' 프로젝트에 환경 변수를 도입하고 보안을 강화해볼게요. 환경 변수를 사용하면 개발, 테스트, 운영 환경에서 각각 다른 설정을 적용할 수 있어요.

## 환경 변수란?

환경 변수는 애플리케이션의 실행 환경에 따라 달라지는 설정값이에요. 예를 들어:

- API 서버 주소
- 데이터베이스 접속 정보
- 외부 서비스 API 키
- 디버그 모드 여부

## dotenv-webpack 설치하기

환경 변수를 웹팩에서 사용하기 위해 dotenv-webpack을 설치해요:

```bash
npm install --save-dev dotenv-webpack
```

## 환경 변수 파일 만들기

프로젝트 루트에 환경별로 다른 `.env` 파일을 만들어요:

```bash
.env                # 기본 환경 변수
.env.development    # 개발 환경 변수
.env.production     # 운영 환경 변수
```

`.env` 파일 예시:

```dotenv
# API 설정
API_URL=https://api.example.com
API_KEY=your-api-key

# 기능 플래그
ENABLE_FEATURE_X=true
ENABLE_FEATURE_Y=false

# 디버그 설정
DEBUG_MODE=true
```

## 웹팩에 환경 변수 설정 추가하기

`webpack.config.js` 파일에 dotenv-webpack을 추가해요:

```js
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  // ... 기존 설정 유지
  plugins: [
    new Dotenv({
      path: path.resolve(
        __dirname,
        `.env.${process.env.NODE_ENV || "development"}`
      ),
      systemvars: true, // 시스템 환경 변수도 로드
      safe: true // .env.example 파일과 비교해서 필수 변수 확인
    })
  ]
};
```

## 환경 변수 사용하기

이제 자바스크립트 코드에서 환경 변수를 사용할 수 있어요:

```tsx
// App.tsx
const API_URL = process.env.API_URL;
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

const App: React.FC = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (DEBUG_MODE) {
      console.log('API URL:', API_URL);
    }
    // API 호출 등
  }, []);

  return (
    // ... 기존 코드 유지
  );
};
```

## 👣 한 걸음 더: 보안 강화하기

1. **민감한 정보 보호**
   - `.env` 파일은 절대 Git에 커밋하지 마세요
   - `.gitignore`에 추가해요:

   ```
   .env
   .env.*
   !.env.example
   ```

2. **환경 변수 검증**
   - `dotenv-webpack`의 `safe` 옵션을 사용해요
   - `.env.example` 파일에 필수 변수를 정의해요:

   ```dotenv
   API_URL=
   API_KEY=
   DEBUG_MODE=
   ```

3. **환경별 설정 분리**

   ```js
   // webpack.config.js
   const config = {
     development: {
       // 개발 환경 설정
     },
     production: {
       // 운영 환경 설정
     }
   };

   module.exports = (env) => {
     return {
       ...config[env.mode]
     };
   };
   ```

## 환경 변수 사용 팁

1. **이름 규칙**
   - 대문자와 언더스코어 사용: `API_URL`, `DEBUG_MODE`
   - 접두사로 용도 표시: `REACT_APP_`, `VUE_APP_`

2. **타입 변환**
   - 환경 변수는 항상 문자열이에요
   - 필요할 때 적절히 변환해요:

   ```js
   const isDebug = process.env.DEBUG_MODE === "true";
   const port = parseInt(process.env.PORT, 10);
   ```

3. **기본값 설정**
   - 환경 변수가 없을 때를 대비해 기본값을 설정해요:
   ```js
   const API_URL = process.env.API_URL || "http://localhost:3000";
   ```

## 다음 단계

이제 우리 프로젝트에 환경 변수를 도입하고 보안을 강화했어요. 환경별로 다른 설정을 적용하고, 민감한 정보를 안전하게 관리할 수 있게 되었죠.

이것으로 웹팩 튜토리얼의 마지막 단계를 마쳤어요! 이제 웹팩의 기본적인 사용법과 다양한 기능을 모두 배웠답니다. 실제 프로젝트에서 이 지식을 활용해보세요.

추가로 더 배우고 싶다면 다음과 같은 주제를 추천해요:

- 웹팩 설정 분리하기
- 성능 최적화 기법
- 커스텀 로더/플러그인 만들기
- 마이크로프론트엔드 아키텍처
