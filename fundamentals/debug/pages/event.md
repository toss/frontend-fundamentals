# 참여 이벤트

자신의 디버깅 사례를 정리하는 시간을 가져보세요! 디버깅 실무 사례를 올려주신 분들 중 3분을 추첨하여 디버깅 티셔츠를 드려요! (티셔츠 디자인은 조금 변경될 수 있어요)

![](../images/event/event-t-shirt.png){width=200}

## 참여 방법

아래의 순서대로 참여해주세요.

1. [디버깅 실무 사례 > 기여하기 탬플릿](../pages/contribute/template.md)을 복사하여 `/debug/contribute`폴더에 새로운 파일로 생성하기 (간단한 사례도 환영해요)

```
# {버그 종류} 디버깅
### 부제
<br/>
<ContributorHeader name="이름" avatar="../../images/contribute/profile-default.png" />

간략한 소개

## 1. 진단하기

## 2. 재현하기

## 3. 수정하기

## 4. 재발방지하기

```

2. 탬플릿에 맞게 디버깅 사례를 작성하기
3. config.mts 파일에서 목록 중 디버깅 실무 사례 > items에 item 추가하기
   - item.text: {버그 종류} 디버깅 by.작성자이름
   - item.link: /pages/contribute/{파일명}.md
4. PR로 올리기
