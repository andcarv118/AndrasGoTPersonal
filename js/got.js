function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function change() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function getJustAlive(data) {
  // console.log(Array.isArray(data));
  var justAlive = [];
  for (var k = 0; k < data.length; k += 1) {
    if (data[k].dead !== true) {
      justAlive.push(data[k]);
    }
  }
  // console.log(justAlive);
  return justAlive;
}

function sortCharacters(data) {
  data.sort(function sortABC(a, b) {
    // return a.name.localeCompare(b.name);
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
}
// Ez egy példa arra, hogyan tudok egy loop segítségével eventListenert
// hozzáadni több elemhez
// Ebben a példávan a nodokhoz kapcsolódó függvényeket használtam

// Csak egy function a container element lekérésére
function getCharPortraitsElement() {
  var charPortraits = document.querySelector('.portraits');
  return charPortraits;
}

// Ez a függvény megjeleníti annak a p tagnek a tartalmát alerten, amire kattintottunk.
function showElementContent(index, characters) {
  var charPortraits = getCharPortraitsElement();
  var paragraph = charPortraits.children;
  // alert(paragraph[index].textContent);
  clickfilterCharacter(characters, index);
}

function addCustomListenerForParagraph(element, index, characters) {
  element.addEventListener('click', function clickCharacter() {
    showElementContent(index, characters);
  });
}

function generateElements(data, characters) {
  var charPortraits = getCharPortraitsElement();
  for (var k = 0; k < data.length; k += 1) {
    var paragraph = document.createElement('p');
    paragraph.innerHTML +=
      `
    <article class="charDetailsPerson">
      <img class="charPicture" src="${data[k].portrait}" alt="${data[k].name}">
      <p class="charName"> ${data[k].name} </p>
    </article>  
    `;
    // paragraph.textContent = displayNamesStatic(data);
    addCustomListenerForParagraph(paragraph, k, characters);
    charPortraits.appendChild(paragraph);
  }
}

// add search

function gotSearch(characters) {
  document.querySelector('.charDetailsInputButton').addEventListener('click', function clickGoTChars() {
    filterCharacter(characters);
  });
}

function filterCharacter(characters) {
  var charDetailsInfo = document.querySelector('.charDetailsInfo');
  var charDetailsInfoHTML = '';
  var charSearch = document.querySelector('.charDetailsInputText').value;
  var charName = document.querySelector('.charName').value;
  console.log(name);
  console.log(charSearch);
  // console.log(characters.length);
  for (var i = 0; i < characters.length; i++) {
    var charHouse = '';
    console.log(characters[i].name);
    if (characters[i].house) {
      charHouse = `<img src="./assets/houses/${characters[i].house}.png" alt="${characters[i].house}"></img>`;
    } else {
      charHouse = '';
    }
    charDetailsInfoHTML =
      `
    <img class="charDetailsImg" src="${characters[i].picture}"></img>
    <p class="charDetailsName">${characters[i].name}</p>
    <p class="charDetailsHouse">${charHouse}</p>
    <p class="charDetailsBio">${characters[i].bio}</p>
    `;
    if (characters[i].name.toLowerCase() === charSearch.toLowerCase()) {
      charDetailsInfo.innerHTML = charDetailsInfoHTML;
      // console.log(i);
      break;
    // } else if (characters[i].name.toLowerCase() === charName.toLowerCase()) {
    //   charDetailsInfo.innerHTML = charDetailsInfoHTML;
    //   console.log(charName);
    //   break;
    } else {
      charDetailsInfo.innerHTML = 'Character not found';
    }
  }
}

function clickfilterCharacter(characters, index) {
  for (var i = 0; i < characters.length; i++) {
    var charHouse = '';
    var charDetailsInfoHTML = '';
    var charDetailsInfo = document.querySelector('.charDetailsInfo');
    if (characters[i].house) {
      charHouse = `<img src="./assets/houses/${characters[i].house}.png" alt="${characters[i].house}"></img>`;
    } else {
      charHouse = '';
    }
    charDetailsInfoHTML =
      `
    <img class="charDetailsImg" src="${characters[index].picture}"></img>
    <p class="charDetailsName">${characters[index].name}</p>
    <p class="charDetailsHouse">${charHouse}</p>
    <p class="charDetailsBio">${characters[index].bio}</p>
    `;
    charDetailsInfo.innerHTML = charDetailsInfoHTML;
    // charDetailsInfo.innerHTML = 'Character not found';
  }
}

// add search to p
function gotSearchName(characters) {
  document.querySelector('.charDetailsInputButton').addEventListener('click', function clickChar() {
    filterCharacter(characters);
  });
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var livingCharacters = getJustAlive(userDatas);
  // console.log(livingCharacters);
  sortCharacters(livingCharacters);
  // displayNamesStatic( livingCharacters);
  gotSearch(livingCharacters);
  gotSearchName(livingCharacters);
  generateElements(livingCharacters, livingCharacters);
}


getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);


