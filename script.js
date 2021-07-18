const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');
const input2 = document.getElementById('item2');
const btnDiv = document.getElementById('btnDiv');
const meBtn = document.getElementById('meBtn');
const editForm = document.getElementById('editForm');
const newForm = document.getElementById('newForm');
const item2 = document.getElementById('item2');
const addBtn = document.getElementById('addBtn');
var ind;

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
var data = JSON.parse(localStorage.getItem('items'));



button.addEventListener('click', function () {
  localStorage.clear();
  while (btnDiv.firstChild) {
    btnDiv.removeChild(btnDiv.firstChild)
  }
});


newForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if(input.value !== '') {
  itemsArray.push(input.value)
  localStorage.setItem('items', JSON.stringify(itemsArray));
  
  divMaker(input.value, itemsArray.indexOf(input.value));
  input.value = '';
 
  }
});

editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if(input2.value !== '') {
  itemsArray.splice(ind,1,input2.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));

  while (btnDiv.firstChild) {
    btnDiv.removeChild(btnDiv.firstChild)
  }
  data = JSON.parse(localStorage.getItem('items'));
  data.forEach((item) => {
    divMaker(item);
  });
  }

  editForm.style.display = 'none';
});


const divMaker = (text, index) => {
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
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.textContent = 'Delete';
  btnDivPart.appendChild(deleteBtn);

  content.textContent = text;

  deleteBtn.addEventListener("click", ()=> { 
   btnDivPart.remove();
   itemsArray.splice(index, 1);
   localStorage.setItem('items', JSON.stringify(itemsArray));
  });

  editBtn.addEventListener("click", ()=> { 
    editForm.style.display = 'block';
    ind = itemsArray.indexOf(text);
    console.log(ind);
    item2.value = text;
   });
  

  btn.style.backgroundColor = 'rgb(100, 100, 255)' //blue

  btn.addEventListener("click", ()=> { 
    
    if(btn.style.backgroundColor === 'rgb(255, 255, 255)') { //white
       btn.style.backgroundColor = 'rgb(100, 100, 255)';//blue
    }else{
      btn.style.backgroundColor = 'rgb(255, 255, 255)';
    }
  });
 
}

meBtn.addEventListener("click", ()=> { 
  var els = document.getElementsByClassName("btn");
  var elsArr = Array.from(els);
  let remain = elsArr.filter(element => element.style.backgroundColor !== 'rgb(255, 255, 255)');
     remain.forEach((el) => {
       el.style.backgroundColor = 'rgb(100, 100, 255)';
     });
     
     if(remain.length > 0) {
    remain[rand(remain)].style.backgroundColor = 'red'
     }
});


addBtn.addEventListener("click", ()=> { 
  newForm.style.display = 'block';
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
//      let remain = elsArr.filter(element => element.style.backgroundColor !== 'rgb(255, 255, 255)');
//      remain.forEach((el) => {
//        el.style.backgroundColor = 'rgb(100, 100, 255)';
//      });
     
//      if(remain.length > 0) {
//     remain[rand(remain)].style.backgroundColor = 'red'
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