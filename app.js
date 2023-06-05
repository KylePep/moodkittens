let currentKitten = {}

let kittens = []

let imageIndex = 0;
let images= [
  "images/brown-cat-angry.jpg",
  "images/brown-cat-gone.jpg",
  "images/brown-cat-happy.jpg",
  "images/brown-cat-tolerant.jpg",
  "images/brown-cat-unaware.jpg"
]

loadKittens()

//Remove hidden to display kittenss
if (kittens.length > 0) {
  document.getElementById("getStarted").classList.remove("hidden")
  getStarted()
}
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kittenName = form.kittenName.value
  currentKitten = kittens.find(kitten => kitten.name == kittenName)
  if(!currentKitten){
    currentKitten = {id: generateId(), name: kittenName, mood: 'unaware', affection: 5, image: "images/brown-cat-unaware.jpg"} 
    kittens.push(currentKitten)
    saveKittens()
    try {
      document.getElementById("getStarted").classList.remove("hidden")
    } catch (error) {}
  }
  form.reset()
  drawKittens();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens",JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData){
    kittens = kittensData
  }
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kitten-page");
  let kittensTemplate = "";
  kittens.forEach(kitten => {
    kittensTemplate += `
      <div class="kitten-card">
        <h3 class="name">${kitten.name}</h3> 
        <div class="kitten ${kitten.mood}">
          <img id= '${kitten.id}' src="${kitten.image}" alt="kitten"> 
        </div>
        <div onclick="pet('${kitten.id}')">Pets</div>
        <div onclick="catnip('${kitten.id}')">Catnip</div>
        <p>Mood: ${kitten.mood}</p>
      </div>
    `;
    console.log(findKittenById(kitten.id));
  });

  kittenListElement.innerHTML = kittensTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  console.log(id);
  let kitten = kittens.find(kitten => kitten.id == id);
  return kitten;
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let petKitten = findKittenById(id);
  // creates random decimal between 0 and 1.
  if (Math.random() > 0.5) {
    petKitten.affection++;
  } else {
    petKitten.affection--;
  }
  saveKittens()
  setKittenMood(petKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let catnipKitten = findKittenById(id);
  // creates random decimal between 0 and 1.
  catnipKitten.affection = 5
  saveKittens()
  setKittenMood(catnipKitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
    console.log(kitten.id)
  if (kitten.affection > 5) {
    kitten.mood= "happy"
    kitten.image= images[2]
  } 
  if (kitten.affection < 5 && kitten.affection > 0) {
    kitten.mood= "angry"
    kitten.image= images[0]
  } 
  if (kitten.affection== 5){
    kitten.mood= "tolerant"
    kitten.image= images[3]
  }
  if (kitten.affection < 0){
    kitten.mood= "gone"
    kitten.image= images[1]
  }
  saveKittens();
  drawKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.splice(0, kittens.length)
  saveKittens()
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kitten-page").classList.remove("hidden")
  document.getElementById("title").classList.remove("hidden")
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:sting, name: string, mood: string, affection: number image: "images/brown-cat-unaware.jpg"}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
