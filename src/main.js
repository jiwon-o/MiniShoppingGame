// JSON 파일에서 item 연결(fetch)
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json()) // json 파일의 object를 promise로 가져옴
    .then((json) => json.items); // json의 items를 배열로 가져옴, json.items를 main의 인수로 보낸다.(items)
}

// 주어진 items로 list 업데이트
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join(""); // item == items
  // map: 배열의 요소를 다른 배열로 만듦(item => createHTMLString(item)), join: 배열을 문자열로 변환
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// logo, buttons 클릭 이벤트
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items)); // 로고 클릭시 모든 items 업데이트
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// button 클릭시 해당하는 items만 업데이트하는 함수
function onButtonClick(event, items) {
  const dataset = event.target.dataset; // DOMStringMap {key: 'type', value: 'pants'}
  const key = dataset.key;
  const value = dataset.value;

  // console.log(key); // type
  // console.log(value); // tshirt, pants, skirt, blue, yellow, pink...

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value); // item[key]: Computed properties
  // filter: 콜백함수가 배열의 요소들을 하나씩 출력하고 true인 모든 값을 리턴
  console.log(filtered); // filter된 배열
  displayItems(filtered);
}

// main
loadItems()
  .then((items) => {
    console.log(items);
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
