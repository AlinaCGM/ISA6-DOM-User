const url = "https://randomuser.me/api/";
const displayContainer = document.querySelector(".display");
const add = document.querySelector(".add");
const double = document.querySelector(".double");
const showMillion = document.querySelector(".showMillion");
const sortByName = document.querySelector(".sortName");
const sortRich = document.querySelector(".sortRich");
const total = document.querySelector(".total");
// const userName = document.querySelector(".userName");
// let balance;
// let userBalance = [];
let userData = [];
async function getData() {
  const response = await axios.get(url);
  // const dataFirst = result.data.results[0].name.first;
  // const dataLast = result.data.results[0].name.last;
  // user = [dataFirst, dataLast];
  //  balance = Math.trunc(Math.random() * 1000);
  //  user.push(balance);
  const data = await response.data;
  const user = data.results[0];
  console.log(user);

  const newUser = {
    name: user.name.first,
    gender: user.gender,
    email: user.email,
    balance: Math.floor(Math.random() * 1000000),
  };

  //push user
  userData.push(newUser);

  displayData(userData);
}

//display data

function displayData(userData) {
  displayContainer.innerHTML = "<h2><strong> Person:</strong> Balance($) </h2>";
  userData.map((item) => {
    // element: each user
    const element = document.createElement("div");
    element.classList.add("list");
    // add content inside the element
    element.innerHTML = `Name:${item.name} Balance:${item.balance}`;
    //append
    displayContainer.appendChild(element);
  });
}

function doubleMoney() {
  // get user {} => balance *2
  const result = userData.map((item) => {
    // logic here, spread
    return { ...item, balance: item.balance * 2 };
  });

  // display
  displayData(result);
}
function showMillionaire() {
  // logic
  const result = userData.filter((item) => item.balance > 700000);
  displayData(result);
}
function sortByBalanceFunction() {
  // logic: method:sort((a,b) => b-a)
  userData.sort((a, b) => b.balance - a.balance);
  displayData(userData);
}
function sortByNameFunction() {
  // way 1
  userData.sort((a, b) => a.name.localeCompare(b.name));
  displayData(userData);
}

// get total
function getTotalBalance() {
  // logic - reduce
  const result = userData.reduce(
    // previousValue = object => balance
    (acc, currentValue) => acc + currentValue.balance,
    0
  );

  // create new html element
  const totalElement = document.createElement("div");

  //put result inside the new element
  totalElement.innerHTML = `<h3>Total: ${result}</h3>`;

  //append
  displayContainer.appendChild(totalElement);
}

add.addEventListener("click", getData);
double.addEventListener("click", doubleMoney);
showMillion.addEventListener("click", showMillionaire);
sortRich.addEventListener("click", sortByBalanceFunction);
sortByName.addEventListener("click", sortByNameFunction);
total.addEventListener("click", getTotalBalance);
