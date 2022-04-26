const CAROUSEL = document.getElementById('carousel')
let counter = 1 //page number
let cardsQuantity //cards quantity on page
let allPets //random array of pets cards
/* The first 8 animal cards always match the layout.
Random generation is performed for all of the following cards
 */
(window.matchMedia("(min-width: 1280px)").matches)?(cardsQuantity = 8):(window.matchMedia("(max-width: 767px)").matches?cardsQuantity = 3:cardsQuantity = 6)
async function getPets() {  
    const petsData = '../../pets.json';
    const res = await fetch(petsData);
    const pets = await res.json(); 
    return pets
  }
  let pets = 0 
  
getPets().then(tmp=>{
    pets = tmp
    createPets()
    cardEdit()

});
function cardEdit(){
     
    for (let i = 0; i < (cardsQuantity) ; i++){
        CAROUSEL.children[i].children[0].src = allPets[i+(counter-1)*cardsQuantity].img
        CAROUSEL.children[i].children[0].alt = allPets[i+(counter-1)*cardsQuantity].type
        CAROUSEL.children[i].petId = (i+(counter-1)*cardsQuantity)
        CAROUSEL.children[i].children[1].innerText = allPets[i+(counter-1)*cardsQuantity].name   
    }
}

function createPets(){
    allPets = [...pets]
    for (let a = 0;a<5;a++){
        let tmpArr = [allPets[0], allPets[1], allPets[2]]
        randomizePets(tmpArr)
        tmpArr = [allPets[3], allPets[4], allPets[5]]
        randomizePets(tmpArr)
        tmpArr = [allPets[6], allPets[7]]
        randomizePets(tmpArr)
    }
   
}
function randomizePets(tmpArr){
    for (let i = tmpArr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
        allPets.push(tmpArr[i])   
    }
}



window.addEventListener('resize', ()=>{
    const tmp = cardsQuantity;
    (window.matchMedia("(min-width: 1280px)").matches)?(cardsQuantity = 8):(window.matchMedia("(max-width: 767px)").matches?cardsQuantity = 3:cardsQuantity = 6)
    if (tmp !== cardsQuantity){
        counter = 1
        cardEdit()
        document.getElementById('currentButton').innerHTML = counter
        prev.disabled = true
        toStart.disabled = true
        next.disabled = false
        toEnd.disabled = false
    }
    
})
exitModalWindow.onclick = ()=>{
    modalWindow.style.display = "none"
    document.body.style.overflow = "auto"
    modalshadow.style.display = "none"
}
CAROUSEL.addEventListener('click', (e)=>{
    if (e.target.closest('.pets_card') != null){
        //console.log(modalWindow.children[0].children[1].src)
        document.body.style.overflow = "hidden"
        modalWindow.style.display = "flex"
        modalshadow.style.display = "flex"
        const tmp = e.target.closest('.pets_card').petId
        modalWindow.children[1].children[0].src = allPets[tmp].img
        modalWindow.children[1].children[0].alt = allPets[tmp].type
        modalWindow.children[2].children[0].innerText = allPets[tmp].name
        modalWindow.children[2].children[1].innerText = allPets[tmp].type + " - " + allPets[tmp].breed
        modalWindow.children[2].children[2].innerText = allPets[tmp].description
        modalWindow.children[2].children[3].children[0].children[1].innerText = allPets[tmp].age
        modalWindow.children[2].children[3].children[1].children[1].innerText = allPets[tmp].inoculations.join(', ')
        modalWindow.children[2].children[3].children[2].children[1].innerText = allPets[tmp].diseases.join(', ')
        modalWindow.children[2].children[3].children[3].children[1].innerText = allPets[tmp].parasites.join(', ')
        //console.log(modalWindow.children[2].children[3].children[3].children[1].innerText)
    }
    //console.log(e.target.closest('.pets_card').petId)
})



burgerShadow.onclick = ()=>{
    burgerShadow.style.display = "none"
}
burgerMenu.onclick = function(){
    if (burgerMenu.checked){
        document.body.style.overflow = "hidden"
        burgerShadow.style.display = "flex"
        burgerShadow.style.cursor = "pointer"
        burgerShadow.style.zIndex = '-1'
        document.getElementById('logo').classList.add("logoBurger")
        document.getElementById('menuNav').classList.add("petsNavMenu")
        document.getElementById('menuNav').addEventListener('click', ()=>{
            document.body.style.overflow = "auto"
            burgerShadow.style.display = "none"
            document.getElementById('logo').classList.remove("logoBurger")
            burgerMenu.checked = false
        })
    }
    else{ 
        document.body.style.overflow = "auto"
        document.getElementById('logo').classList.remove("logoBurger")
        document.getElementById('menuNav').classList.remove("petsNavMenu")
        burgerShadow.style.display = "none"
    }

}

toStart.onclick = function(){
    counter = 1
    cardEdit()
    document.getElementById('currentButton').innerHTML = counter
    prev.disabled = true
    toStart.disabled = true
    next.disabled = false
    toEnd.disabled = false
}
prev.onclick = function(){
    counter--
    cardEdit()
    document.getElementById('currentButton').innerHTML = counter
    if (counter === 1){
        prev.disabled = true
        toStart.disabled = true
    }
    if (counter < (allPets.length/cardsQuantity)){
        next.disabled = false
        toEnd.disabled = false
    }
}
next.onclick = function(){
    counter++
    cardEdit()
    
    document.getElementById('currentButton').innerHTML = counter
    if (counter > 1){
        prev.disabled = false
        toStart.disabled = false
    }
    if (counter === (allPets.length/cardsQuantity)){
        next.disabled = true
        toEnd.disabled = true
    }
}
toEnd.onclick = function(){
    counter = (allPets.length/cardsQuantity)
    cardEdit()
    document.getElementById('currentButton').innerHTML = counter
    next.disabled = true
    toEnd.disabled = true
    prev.disabled = false
    toStart.disabled = false
}