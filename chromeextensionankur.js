
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");


let myLeads = [];
const localStorageKey = "myLeads";


function getLeadsFromLocalStorage() {
  const leadsFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
  return leadsFromLocalStorage || [];
}

function render(leads) {
  const listItems = leads.map((lead) => {
    return `
      <li>
        <a target='_blank' href='${lead}'>
          ${lead}
        </a>
      </li>
    `;
  }).join("");
  ulEl.innerHTML = listItems;
}

function saveLeadsToLocalStorage(leads) {
  localStorage.setItem(localStorageKey, JSON.stringify(leads));
}


tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    saveLeadsToLocalStorage(myLeads);
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  const inputVal = inputEl.value.trim();
  if (inputVal) {
    myLeads.push(inputVal);
    inputEl.value = "";
    saveLeadsToLocalStorage(myLeads);
    render(myLeads);
  }
});


myLeads = getLeadsFromLocalStorage();
render(myLeads);