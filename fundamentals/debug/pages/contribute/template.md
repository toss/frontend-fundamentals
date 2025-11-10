# 기여하기

## 기여방법

1. 아래 템플릿을 복사하여 `/debug/contribute/{버그분류}` 폴더에 새로운 파일로 생성해주세요.
   - 간단한 사례도 환영해요.
   - 부제는 선택입니다.
   - 각 항목에 부합하는 내용이 없다면 스킵하셔도 됩니다.
   - 해당하는 버그분류(ex. javascript/react/ios)가 없다면 추가해주세요.

```
# {버그 종류} 디버깅
### 부제
<br/>
<ContributorHeader name="이름" avatar="../../images/contribute/profile-default.png" date="YYYY-MM-DD"/>

간략한 소개

## 1. 진단하기

## 2. 재현하기

## 3. 수정하기

## 4. 재발방지하기
```

<br/>

2. config.mts에 목록 추가
   - config.mts 파일에서 `디버깅 실무 사례.items`에 아이템 추가하기

```
items: [
   {
     text:{버그분류},
     items:[
       {
         text: {버그이름},
         link: "/pages/contribute/{버그분류}/{버그이름}.md"
       }
      ]
   }
]
```

<br/>
3. PR로 올리기
