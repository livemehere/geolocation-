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

## 위도,경도 <--> 위도,경도 간의 직선 거리 구하기

### 함수

- 이함수 하나만 사용하면 km 단위로 거리를 반환해줌(열심히 구글링해서 좋음함수를 찾았다 :)

```js
function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; //km
}
```

### 예시

```js
console.log(
  getDistanceFromLatLonInKm(
    35.85562870158914,
    128.49205477285213,
    35.85548623970482,
    128.4998574857686
  )
);
```

## 마무리

> success의 반환값으로 위도,경도를 google map 에다가 쉼표화 함께 입력해주면 해당하는 위치를 검색해준다. 이걸로 정확성을 확인해보았는데 브라우저는 아주정확하게 좌표를반환했으나 node에서는 오차가 있었다. 맥북 위치권한설정을 안했다가 켰었는데 그거때문인지는 몰라도 우선은 브라우저가 더 정확하게 동작하였다
