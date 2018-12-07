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

function getJustAlive(data) {
  console.log(Array.isArray(data));
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

function displayNamesStatic(data) {
  var charExtra = document.querySelector('.portraits');
  // console.log(charExtra);
  for (var k = 0; k < data.length; k += 1) {
    charExtra.innerHTML +=
      `
    <article class="charDetailsPerson">
      <img class="charPicture${k}" src="${data[k].portrait}" alt="${data[k].name}">
      <p class="charName${k}"> ${data[k].name} </p>
    </article>  
    `;
    clickPerson();
  }
}

function clickPerson() {
  var charClassName = document.querySelector('.charDetailsPerson');
  charClassName.addEventListener('click', function clickPers() {
    console.log(charClassName);
    getCharDetails();
  });
}

function getCharDetails(data) {
  var k = 0;
  console.log(data.length);
  while (k < data[k].length) {
    if (data[k].hasOwnProperty) {
      // if (gameOfThronesCharacters[i].organization) {
      document.querySelector('.charDetailsTbody').innerHTML +=
        `
        <article>
        <img class ="charPicture"
        src="${data[k].picture}"
        alt="${data[k].name}">
        <p class="charName">${data[k].name}</p>
        <p class="charBio">${data[k].bio}</p>
        </article>
        `;
    }
    k++;
  }
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var livingCharacters = getJustAlive(userDatas);
  console.log(livingCharacters);
  sortCharacters(livingCharacters);
  displayNamesStatic(livingCharacters);
  // displayNamesStatic(sortedCharacters);
}


getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
