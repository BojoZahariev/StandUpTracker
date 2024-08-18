const form = document.querySelector('form');
const ul = document.querySelector('ul');
const clearBtn = document.querySelector('#clearBtn');
const input = document.getElementById('item');
const input2 = document.getElementById('item2');
const btnDiv = document.getElementById('newOnes');
const meBtn = document.getElementById('meBtn');
const editForm = document.getElementById('editForm');
const newForm = document.getElementById('newForm');
const cancelNewForm = document.getElementById('cancelNewForm');
const cancelEdit = document.getElementById('cancelEdit');
const item2 = document.getElementById('item2');
const addBtn = document.getElementById('addBtn');
const helpBtn = document.getElementById('help');
const instructions = document.getElementById('instructions');
const joke = document.getElementById('joke');
const joke2 = document.getElementById('joke2');
const moreJokes = document.getElementById('moreJokes');
var jokesCount = 0;

var ind;

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
var data = JSON.parse(localStorage.getItem('items'));


getTodayJoke = async () => {
  try {
    const response = await fetch("https://dad-jokes.p.rapidapi.com/random/joke/png", {
      "method": "GET",
     headers: {
		'X-RapidAPI-Key': '3e8f7f12d1msh89e2f6e4b63ed11p190647jsn11252f6994a3',
		'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
	}
    });
    const fetchedData = await response.json();
joke.textContent = fetchedData.body.setup;
joke2.textContent = fetchedData.body.punchline;
jokesCount++
 
if(jokesCount >= 5) {
  joke.textContent = 'Enough jokes!'
  joke2.textContent = 'Go back to work!';
}

  } catch (err) {
    joke.textContent = 'No jokes today!'
    joke2.textContent = 'Go back to work!';

  }
};

getTodayJoke();


// the constructor
class Colleague {
  constructor(name, uniqueN, onholiday) {
    this.name = name;
    this.uniqueN = uniqueN;
    this.onholiday = onholiday;
  }
}


moreJokes.addEventListener('click', function () {
  getTodayJoke();
});

helpBtn.addEventListener('click', function () {
  if(instructions.style.display !== 'block'){
    instructions.style.display = 'block';
    helpBtn.innerHTML = 'close help';
  }else{
    instructions.style.display = 'none';
    helpBtn.innerHTML = 'click for help';
  }
 
});

clearBtn.addEventListener('click', function () {
  localStorage.clear();
  while (btnDiv.firstChild) {
    btnDiv.removeChild(btnDiv.firstChild)
  }
});


newForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if(input.value !== '') {
  let now = Date.now();
  let colleagueNew = new Colleague(input.value, now, 'No');
  itemsArray.push(colleagueNew);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  
  divMaker(colleagueNew.name, colleagueNew.uniqueN, colleagueNew.onholiday);
  input.value = '';
  newForm.style.display = 'none';
  }
});

cancelNewForm.addEventListener('click', function () {
  newForm.reset();
  newForm.style.display = 'none';
});

cancelEdit.addEventListener('click', function () {
 
  editForm.style.display = 'none';
});

editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if(input2.value !== '') {
  // itemsArray.splice(ind,1,input2.value);
  
 itemsArray[ind].name = input2.value;
  
  localStorage.setItem('items', JSON.stringify(itemsArray));

  while (btnDiv.firstChild) {
    btnDiv.removeChild(btnDiv.firstChild)
  }
  data = JSON.parse(localStorage.getItem('items'));
  data.forEach((item) => {
    divMaker(item.name,item.uniqueN, item.onholiday);
  });
  }

  editForm.style.display = 'none';
});


const divMaker = (text, number, onholidayStatus) => {
  let currentIndex = itemsArray.findIndex(i => i.uniqueN === number);

  const btnParent = document.createElement('div');
  btnParent.classList.add('btnParent');
  const btnDivPart = document.createElement('div');
  btnDivPart.classList.add('btnDivPart');
  btnParent.appendChild(btnDivPart);
  btnDiv.appendChild(btnParent);
  // const btn = document.createElement('button');
  // btn.classList.add('btn');
  // btnDivPart.appendChild(btn);
  const content = document.createElement('p');
  btnDivPart.appendChild(content);

  const editBtn = document.createElement('button');
  editBtn.classList.add('editBtn');
  editBtn.classList.add('funcButtons');
  editBtn.textContent = 'Edit';
  btnParent.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.classList.add('funcButtons');
  deleteBtn.textContent = 'Delete';
  btnParent.appendChild(deleteBtn);

  const holBtn = document.createElement('button');
  holBtn.classList.add('holBtn');
  holBtn.textContent = 'Holiday';
  btnParent.appendChild(holBtn);

  content.textContent = text;

  deleteBtn.addEventListener("click", ()=> { 
   btnParent.remove();
   
   itemsArray.splice(currentIndex, 1);
   localStorage.setItem('items', JSON.stringify(itemsArray));
  });

  editBtn.addEventListener("click", ()=> { 
    editForm.style.display = 'block';
    btnParent.appendChild(editForm);
    ind = currentIndex;
    item2.value = text;
   });

   holBtn.addEventListener("click", ()=> { 
    ind = currentIndex;
    console.log(itemsArray[ind]);
    if(itemsArray[ind].onholiday == 'Yes') {
      itemsArray[ind].onholiday = 'No';
    }else{
      itemsArray[ind].onholiday = 'Yes';
    }
   
   
    localStorage.setItem('items', JSON.stringify(itemsArray));

    while (btnDiv.firstChild) {
      btnDiv.removeChild(btnDiv.firstChild)
    }
    data = JSON.parse(localStorage.getItem('items'));
    data.forEach((item) => {
      divMaker(item.name,item.uniqueN,item.onholiday);
    });

   });
  

   btnDivPart.style.backgroundColor = 'rgb(8, 146, 165)' //blue

   if(onholidayStatus == 'Yes'){
    btnDivPart.style.backgroundColor = 'rgb(250, 159, 66)';
    const umbrImg = document.createElement('img');
    umbrImg.src = 'images/sun-umbrella.png'
    umbrImg.classList.add('umbrImg');
    btnParent.appendChild(umbrImg);
  }else{
    btnDivPart.style.backgroundColor = 'rgb(8, 146, 165)';
  }

   btnDivPart.addEventListener("click", ()=> { 
    
    if(btnDivPart.style.backgroundColor === 'rgb(250, 159, 66)') { //orange
      btnDivPart.style.backgroundColor = 'rgb(8, 146, 165)';//blue
    }else{
      btnDivPart.style.backgroundColor = 'rgb(250, 159, 66)';//orange
    }
  });
 
}

meBtn.addEventListener("click", ()=> { 
  var els = document.getElementsByClassName("btnDivPart");
  var elsArr = Array.from(els);
  let remain = elsArr.filter(element => element.style.backgroundColor !== 'rgb(250, 159, 66)');
     remain.forEach((el) => {
       el.style.backgroundColor = 'rgb(8, 146, 165)';
     });
     
     if(remain.length > 0) {
    remain[rand(remain)].style.backgroundColor = 'rgb(186, 45, 11)';
     }
});


addBtn.addEventListener("click", ()=> { 
  newForm.style.display = 'block';
});





function rand(arr) {
  return Math.floor(Math.random() * arr.length);
}



data.forEach((item) => {
  divMaker(item.name, item.uniqueN, item.onholiday);
});
