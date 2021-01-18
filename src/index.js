

document.addEventListener('DOMContentLoaded', e => {
  //const domController = new DOMController
  fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => createDogBar(data))

    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')
    //let doggoBtn = document.querySelector('.button')

    

    function createDogBar(data) {
      data.forEach(element => {
        dogSpan = document.createElement('span')
        dogSpan.classList.add('dog-name')
        dogSpan.dataset.id = element.id
        dogSpan.innerText = element.name
        dogBar.append(dogSpan)
      });
    }

    dogBar.addEventListener('click', function(e) {
      if (e.target.matches('.dog-name')) {
        getOneDogData(e.target.dataset.id)
      }
    })

    function getOneDogData(dog) {
      fetch(`http://localhost:3000/pups/${dog}`)
    .then(response => response.json())
    .then(data => renderDog(data))
    }


    function renderDog(dog) {
      dogImg = document.createElement('img')
      dogHead = document.createElement('h2')
      dogButton = document.createElement('button')
      dogButton.classList.add('button')

      dogImg.src = dog.image
      dogHead.innerText = dog.name
      if (dog.isGoodDog === true) {
        dogButton.innerText = 'Good Dog!'
      } else {
        dogButton.innerText = 'Bad Dog!'
      }
      dogButton.dataset.id = dog.id
      dogButton.addEventListener("click", onGoodDogButtonClick)

      dogInfo.innerHTML = null
      dogInfo.append(dogImg, dogHead, dogButton)
    }

    function onGoodDogButtonClick(e) {
      //console.log(e.target.dataset.id)
      let newValue;
      if (e.target.innerText.includes('Good')) {
        newValue = false;
        e.target.innerText = "Bad Dog!";
      } else {
        newValue = true;
        e.target.innerText = "Good Dog!";
      }
      patchGoodDog(e.target.dataset.id, {isGoodDog: newValue})
    }
    
    function patchGoodDog(dogId, boolValue) {
      fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(boolValue)
  })
    }
  
})  



