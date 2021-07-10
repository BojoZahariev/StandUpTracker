const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');
const btnDiv = document.getElementById('btnDiv');
const meBtn = document.getElementById('meBtn');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

// const liMaker = (text) => {
//   const li = document.createElement('li');
//   li.textContent = text;
//   ul.appendChild(li);
// }

// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   itemsArray.push(input.value)
//   localStorage.setItem('items', JSON.stringify(itemsArray))
//   liMaker(input.value);
//   input.value = '';
// });



button.addEventListener('click', function () {
  localStorage.clear();
  while (btnDiv.firstChild) {
    btnDiv.removeChild(btnDiv.firstChild)
  }
});
/////////////////////////////////////////////////

// class Colleague {
//   constructor(name) {
//     this.name = name;
    
//   }
// }

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if(input.value !== '') {
  itemsArray.push(input.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  divMaker(input.value);
  input.value = '';
 
  }
});


const divMaker = (text) => {
  const btnDivPart = document.createElement('div');
  btnDivPart.classList.add('btnDivPart');
  btnDiv.appendChild(btnDivPart);
  const btn = document.createElement('button');
  btn.classList.add('btn');
  btnDivPart.appendChild(btn);
  const content = document.createElement('p');
  btn.appendChild(content)
  const editBtn = document.createElement('button');
  editBtn.classList.add('editBtn');
  editBtn.textContent = 'Edit';
  btnDivPart.appendChild(editBtn);

  content.textContent = text;

  btn.style.backgroundColor = 'rgb(100, 100, 255)' //blue

  btn.addEventListener("click", ()=> { 
    
    if(btn.style.backgroundColor === 'rgb(255, 255, 255)') { //white
       btn.style.backgroundColor = 'rgb(100, 100, 255)';//blue
    }else{
      btn.style.backgroundColor = 'rgb(255, 255, 255)';
    }
  });
 // myFunc();
}

meBtn.addEventListener("click", ()=> { 
  var els = document.getElementsByClassName("btn");
  var elsArr = Array.from(els);
  let remainings = elsArr.filter(element => element.style.backgroundColor !== 'rgb(255, 255, 255)');
     remainings.forEach((el) => {
       el.style.backgroundColor = 'rgb(100, 100, 255)';
     });
     
     if(remainings.length > 0) {
    remainings[rand(remainings)].style.backgroundColor = 'red'
     }
});



// function myFunc() {
//   var els = document.getElementsByClassName("btn");
//   var elsArr = Array.from(els);
//   elsArr.forEach((el) => {
//   el.style.backgroundColor = 'rgb(100, 100, 255)' //blue
//    el.addEventListener("click", ()=> { 
//      console.log('cli');
//      if(el.style.backgroundColor === 'rgb(255, 255, 255)') { //white
//         el.style.backgroundColor = 'rgb(100, 100, 255)';//blue
//      }else{
//        el.style.backgroundColor = 'rgb(255, 255, 255)';
//      }


//   // ME
//   if(elsArr.indexOf(el) === 0) {
//      let remainings = elsArr.filter(element => element.style.backgroundColor !== 'rgb(255, 255, 255)');
//      remainings.forEach((el) => {
//        el.style.backgroundColor = 'rgb(100, 100, 255)';
//      });
     
//      if(remainings.length > 0) {
//     remainings[rand(remainings)].style.backgroundColor = 'red'
//      }
//   }
//      });
   
// });
// }


function rand(arr) {
  return Math.floor(Math.random() * arr.length);
}


data.forEach((item) => {
  divMaker(item);
});