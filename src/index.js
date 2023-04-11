const URL = 'http://localhost:3000/toys';
let addToy = false;
let toyCollection = document.getElementById('toy-collection');

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
.then(res => res.json())
.then((toys) => {render(toys)})


function render(toys) {
  let toyCollection = document.getElementById('toy-collection');
  toyCollection.innerHTML = '<br>';

  toys.forEach((toy) => {
    let card = document.createElement('div');
    card.setAttribute("class", "card")
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id=${toy.id}>Like</button>
    `;
    toyCollection.append(card);

    let likeButton = card.querySelector('.like-btn');
    likeButton.addEventListener('click', (e) => {
      e.preventDefault();
      toy.likes = parseInt(toy.likes) + 1;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Tyepe': 'application/json'
        },
        body: JSON.stringify(toy)
      });
      render(toys);
    });
  });
}

const addToyForm = document.querySelector('.add-toy-form');
addToyForm.addEventListener('submit', (e) => {
  let nameInput = event.target.children[1].value;
  let imageInput = event.target.children[3].value;
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput,
      image: imageInput,
      likes: 0
    })
  });
});