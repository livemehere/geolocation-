# Geolocation 으로 위도, 경도 구하기

### navigator 모듈 사용

- 브라우저에서는 기본으로 내장되어있다
- nodeJS에서 작업시에는 node-navigator을 npm으로 설치해주면된다

### 브라우저 예시

```html
<body>
  <div id="root"></div>
  <script>
    const root = document.querySelector("#root");
    navigator.geolocation.getCurrentPosition((success, err) => {
      // 엘리먼트 생성
      const lat = document.createElement("div");
      lat.innerHTML = `위도 : ${success.coords.latitude}`;
      const long = document.createElement("div");
      long.innerHTML = `경도 : ${success.coords.longitude}`;
      // 화면에 출력
      root.appendChild(lat);
      root.appendChild(long);
    });
  </script>
</body>
```

### node 예시

```js
const { Navigator } = require("node-navigator");
const navigator = new Navigator();

navigator.geolocation.getCurrentPosition((success, error) => {
  if (error) console.log(error);
  else console.log(success);
});
```

## 마무리

> success의 반환값으로 위도,경도를 google map 에다가 쉼표화 함께 입력해주면 해당하는 위치를 검색해준다. 이걸로 정확성을 확인해보았는데 브라우저는 아주정확하게 좌표를반환했으나 node에서는 오차가 있었다. 맥북 위치권한설정을 안했다가 켰었는데 그거때문인지는 몰라도 우선은 브라우저가 더 정확하게 동작하였다
