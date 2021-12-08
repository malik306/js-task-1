let tbody = document.querySelector(".tbody"),
  body = document.querySelector(".body"),
  load = document.querySelector(".load"),
  back = document.querySelector("#back"),
  next = document.querySelector("#next"),
  btn = document.querySelector(".btn"),
  currentPage = document.querySelector(".page-number"),
  url_api = `https://jsonplaceholder.typicode.com/todos`,
  limitRecord = 10,
  txt = "",
  i = 0,
  k = 0;
currentPage = parseInt(currentPage.innerHTML);
var data;
btn.addEventListener("click", () => {
  load.innerHTML = `Loading...`;
  load.style = `font-size: 30px;text-align: center;`;
  btn.style = `display: none`;
  OnceLoad();
  load.style = `display: none`;
});
async function OnceLoad() {
  var response = await fetch(`${url_api}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  data = await response.json();
  ChangeData(data, 1, 0);
}
function ActionComplete(id) {
  let tr = tbody.querySelectorAll("tr");
  tr.forEach((data) => {
    if (data.querySelector(".id").innerText == id) {
      data.querySelector(".status").innerText = true;
    }
  });
}

function Ellipsis() {
  let tr = tbody.querySelectorAll("tr");
  tr.forEach((data) => {
    let title = data.querySelector(".title");
    if (title.innerHTML.length > 15) {
      title.style = `white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width:200px;`;
    }
  });
}

function ChangeData(data, pageNo, i) {
  const NumOfPages = Math.ceil(data.length / limitRecord);
  txt = "";
  if (pageNo <= NumOfPages) {
    while (i < data.length) {
      if (k < limitRecord) {
        txt += `<tr>
        <td>${data[i].userId}</td>
        <td class="id">${data[i].id}</td>
        <td class="title">${data[i].title}</td>
        <td class="status">${data[i].completed}</td>
        <td class="action"><button onclick="ActionComplete(${data[i].id})">Completed</button></td>
        </tr>`;
        k++;
      }
      i++;
    }
    currentPage = pageNo;
  }
  k = 0;
  tbody.innerHTML = txt;
  Ellipsis();
}

back.addEventListener("click", (e) => {
  e.preventDefault();
  //let cp=parseInt(back.nextSibling.innerHTML);
  PrevPage();
});
next.addEventListener("click", (e) => {
  e.preventDefault();
  //  let cp=parseInt(next.previousSibling.innerHTML);
  NextPage();
});
function PrevPage() {
  if (currentPage > 1) {
    currentPage--;
    i -= limitRecord;
    ChangeData(data, currentPage, i);
  }
}
function NextPage() {
  if (currentPage < data.length) {
    currentPage++;
    i += limitRecord;
    ChangeData(data, currentPage, i);
  }
}
