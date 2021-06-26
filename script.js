const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  itemsArray.push(input.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  liMaker(input.value);
  input.value = '';
});

data.forEach((item) => {
  liMaker(item);
});

button.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
});
/////////////////////////////////////////////////
var els = document.getElementsByClassName("btn");
var elsArr = Array.from(els);

elsArr.forEach((el) => {
  el.style.backgroundColor = 'rgb(100, 100, 255)'
   el.addEventListener("click", ()=> { 
     if(el.style.backgroundColor === 'rgb(255, 255, 255)') {
        el.style.backgroundColor = 'rgb(100, 100, 255)';
     }else{
       el.style.backgroundColor = 'rgb(255, 255, 255)';
     }


  // ME
  if(elsArr.indexOf(el) === 0) {
     let remainings = elsArr.filter(element => element.style.backgroundColor !== 'rgb(255, 255, 255)');
     remainings.forEach((el) => {
       el.style.backgroundColor = 'rgb(100, 100, 255)';
     });
     
     if(remainings.length > 0) {
    remainings[rand(remainings)].style.backgroundColor = 'red'
     }
  }
     });
   
});


function rand(arr) {
  return Math.floor(Math.random() * arr.length);
}


