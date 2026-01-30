# THREE.Cache.enabled로 인한 메모리 누수

<ContributorHeader
  name="sanghyeon"
  githubUrl="https://github.com/4anghyeon"
  avatar="https://avatars.githubusercontent.com/u/64076628?v=4"
  date="2025.11.10"
/>

## 증상

- 모바일에서 GLTFLoader로 3D 모델을 3-4개 정도 연속으로 로드하다 보면 브라우저가 갑자기 페이지를 강제로 새로고침하는 현상이 발생했어요. (특히 Safari에서)
- 10MB 모델을 5번 로드하면 50MB가 그대로 메모리에 남아있는 상황이었습니다.

## 첫 시도

모바일에서 강제 새로고침은 보통 메모리 부족 때문인 경우가 많았어서 메모리 누수를 의심했어요.

useEffect의 cleanup 함수에 `geometry.dispose()`, `material.dispose()`, `texture.dispose()`를 모두 호출하고 명시적으로 null 할당까지 했는데도 Chrome DevTools Memory 탭에서 Heap snapshot을 찍어보니 JSArrayBufferData가 계속 누적되고 있었어요.

dispose 로직은 분명 제대로 작동하고 있었는데 메모리가 안 줄어드니까, Three.js 관련 옵션들을 하나씩 살펴보기 시작했어요.

GLTFLoader 설정부터 시작해서 렌더러 옵션, 그리고 프로젝트 전역에 설정된 Three.js 관련 코드들을 전부 뒤지면서 의심되는 부분들을 체크했죠.

Three.js 공식 docs도 정독하고, Discourse 커뮤니티에서 "memory leak", "dispose", "cache" 같은 키워드로 비슷한 사례들을 찾아보면서 단서를 찾아갔어요.

## 찾아낸 원인

그렇게 찾다 보니 프로젝트 초기에 성능 최적화를 위해 전역으로 설정해둔 `THREE.Cache.enabled = true`가 눈에 들어왔어요.

보안상 3D 모델 파일들이 pre-signed URL을 사용하고 있었는데, 한 번 다운로드되면 URL이 즉시 만료되고 새 URL로 교체되는 구조였어요.

같은 모델이라도 접근할 때마다 완전히 다른 URL을 갖게 되어 Three.js 캐시에는 '서로 다른 파일'로 인식되어 계속 쌓이기만 하고 재사용되지 않았던 거죠.

캐시 기능이 오히려 독이 되었던거였습니다.

## 해결책

useEffect의 cleanup 함수에서 기존 dispose 로직과 함께 캐시도 명시적으로 제거해줬어요.

```tsx
useEffect(() => {
  return () => {
    // ...
    THREE.Cache.remove(fbxUrl);
    THREE.Cache.remove(glbUrl);
  };
}, []);
```

수정 후 메모리 프로파일링을 해보니 페이지를 이동할 때마다 JSArrayBufferData가 깔끔하게 정리되었고, 모바일에서도 10개 이상의 모델을 연속으로 로드해도 안정적으로 동작했어요.

## 재발방지를 위한 대책

- `THREE.Cache.enabled` 같은 전역 최적화 설정을 켤 때 왜 켰는지, 어떤 전제 조건이 필요한지 기술하기로 했어요.
- 버그 리포트를 작성하여 노션에 상세히 공유했어요.
