const CAROUSEL = document.getElementById('carousel')
let counter = 0
let carouselType = true
let allPets = []
async function getPets() {  
    const petsData = '../../pets.json';
    const res = await fetch(petsData);
    const pets = await res.json(); 
    //console.log(pets);
    return pets
    
  }
  let pets = 0 
getPets().then(tmp=>{
    pets = tmp
    createPets()
    for (let i = 0; i < (CAROUSEL.children.length) ; i++){
        activeCardEdit(i, 0)
    }
}); 
function createPets(){
    allPets = [pets[0], pets[1], pets[2]]
    let tmpArr = [pets[3], pets[4], pets[5]]
        randomizePets(tmpArr)
        tmpArr = [pets[6], pets[7]]
        randomizePets(tmpArr)
    for (let a = 0;a<5;a++){
        let tmpArr = [pets[0], pets[1], pets[2]]
        randomizePets(tmpArr)
        tmpArr = [pets[3], pets[4], pets[5]]
        randomizePets(tmpArr)
        tmpArr = [pets[6], pets[7]]
        randomizePets(tmpArr)
    }
    //console.log(allPets)
}
function randomizePets(tmpArr){
    for (let i = tmpArr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
        allPets.push(tmpArr[i])   
    }
}

function activeCardEdit(cardPosition, petsOffset){
    
    for (let i = 0; i < (CAROUSEL.children[cardPosition].children.length) ; i++){
        let tmp = petsOffset+i;
        
        (tmp<0)?tmp=(tmp%allPets.length+allPets.length):tmp;
        (tmp>=allPets.length)?tmp=tmp%allPets.length:tmp;
        CAROUSEL.children[cardPosition].children[i].children[0].src = allPets[tmp].img
        CAROUSEL.children[cardPosition].children[i].children[0].alt = allPets[tmp].type
        CAROUSEL.children[cardPosition].children[i].petId = tmp
        CAROUSEL.children[cardPosition].children[i].children[1].innerText = allPets[tmp].name   
        
    }
}
function rndCounter(offset){
    if (carouselType === true){
        counter = counter +3;
        (counter>=allPets.length)?counter=counter%allPets.length:counter;
    }
    if (carouselType === false){
        counter = counter + offset
    }

}
btnLeft.onclick = function(){
    //console.log(counter)
    activeCardEdit(2,(counter))
    rndCounter(-3)
    //console.log(counter)
    activeCardEdit(1,(counter))
    btnRight.disabled = true
    btnLeft.disabled = true
    CAROUSEL.classList.add("transitionLeft")    
}
btnRight.onclick = function(){
    //console.log(counter)
    activeCardEdit(0,counter)
    rndCounter(3)
    //console.log(counter)
    activeCardEdit(1,counter)
    btnRight.disabled = true
    btnLeft.disabled = true
    CAROUSEL.classList.add("transitionRight")
}
exitModalWindow.onclick = ()=>{
    modalWindow.style.display = "none"
    document.body.style.overflow = "auto"
    modalShadow.style.display = "none"
}
CAROUSEL.addEventListener('click', (e)=>{
    if (e.target.closest('.pets_card') != null){
        //console.log(modalWindow.children[0].children[1].src)
        document.body.style.overflow = "hidden"
        modalWindow.style.display = "flex"
        modalShadow.style.display = "flex"
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



CAROUSEL.addEventListener("animationend", (animationEvent)=>{
    
    CAROUSEL.classList.remove("transitionLeft")
    CAROUSEL.classList.remove("transitionRight")
    btnRight.disabled = false
    btnLeft.disabled = false
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
        burgerShadow.style.display = "none"
        
    }

}
console.log(modalWindow.children[2].children[3].children[0].children[0].childNodes[0].childNodes[0])
console.log('пропиши "carouselType = false" что бы получить НОРМАЛЬНУЮ карусель (появится возможность вернуться к предыдущим слайдам)')