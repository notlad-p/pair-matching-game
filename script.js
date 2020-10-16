const cards = [
  {
    card: 'crab',
    img: 'crab.png'
  },
  {
    card: 'crab',
    img: 'crab.png'
  },
  {
    card: 'clownfish',
    img: 'clownfish.png'
  },
  {
    card: 'clownfish',
    img: 'clownfish.png'
  },
  {
    card: 'eel',
    img: 'eel.png'
  },
  {
    card: 'eel',
    img: 'eel.png'
  },
  {
    card: 'jellyfish',
    img: 'jellyfish.png'
  },
  {
    card: 'jellyfish',
    img: 'jellyfish.png'
  },
  {
    card: 'turtle',
    img: 'turtle.png'
  },
  {
    card: 'turtle',
    img: 'turtle.png'
  },
  {
    card: 'whale',
    img: 'whale.png'
  },
  {
    card: 'whale',
    img: 'whale.png'
  },
];


const gameContainer = document.querySelector('.container');

// on game load
document.addEventListener('DOMContentLoaded', function(){
  shuffleCards(cards);
  
  createCards(cards);

  // flip card on click
  const cardContainer = document.querySelectorAll('.card-container');

  cardContainer.forEach(function(card){
    card.addEventListener('click', flipCard);
  });
  
  // check for win
  let checkWin = setInterval(function(){
    let matchedCards = [];
    for(let i = 0; i < cardContainer.length; i++) {
      if(cardContainer[i].classList.contains('matched')){
        matchedCards.push(cardContainer[i]);
      }
    }
    if(matchedCards.length === 12) {
      const winDiv = document.createElement('div');
      winDiv.classList.add('win')
      winDiv.innerHTML = `<h1>You Win!</h1>
      <p>Click anywhere to reset.</p>`
      document.body.appendChild(winDiv);
  
      winDiv.addEventListener('click', function(){
        location.reload();
      });
      clearInterval(checkWin);
    }
  }, 500);
});

// create cards on game board
function createCards(array){
  for(let i = 0; i < array.length; i++) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    let attr = document.createAttribute('data-id');
    attr.value = `${array[i].card}`;
    cardContainer.setAttributeNode(attr);
    cardContainer.innerHTML = `<div class="card">
    <div class="card-back">
      <img class="card-back-img" src="https://opengameart.org/sites/default/files/card%20back%20black.png" alt="card back">
    </div>
    
      <div class="card-front">
        <img src="./img/${array[i].img}" alt="${array[i].card}" class="card-front-img">
      </div>
    </div>`;
    gameContainer.appendChild(cardContainer);
  }
}

// card flipping & matching
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard(){
  this.classList.add('active');

  if(!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;

    // do cards match?
    cardMatch();
}

function cardMatch(){
  if(firstCard.dataset.id === secondCard.dataset.id && firstCard !== secondCard) {
    // cards matched
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    const cardContainer = document.querySelectorAll('.card-container');

    cardContainer.forEach(function(card){
      card.removeEventListener('click', flipCard);
    });

      setTimeout(function(){
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        cardContainer.forEach(function(card){
          card.addEventListener('click', flipCard);
        });
      }, 800);
    } else if (firstCard === secondCard) {
      firstCard.classList.remove('active');
    } else {
      // cards not matched
      const cardContainer = document.querySelectorAll('.card-container');

      cardContainer.forEach(function(card){
        card.removeEventListener('click', flipCard);
      });

      setTimeout(function(){
        if (firstCard.classList.contains('matched') || secondCard.classList.contains('matched')) {
          console.log('first or second contains matched')

        }
        cardContainer.forEach(function(card){
          if (!card.classList.contains('matched')) {
            card.addEventListener('click', flipCard);
          }
          if(firstCard.classList.contains('matched') && !secondCard.classList.contains('matched')) {
            secondCard.classList.remove('active');
          } else if(!firstCard.classList.contains('matched') && secondCard.classList.contains('matched')) {
            firstCard.classList.remove('active');
          } else {
            firstCard.classList.remove('active');
            secondCard.classList.remove('active');
          }
        });
      }, 1000);    
    }
  }
}


// check if game won
function checkCards(cardList){
  setInterval(function(){
    cardList.forEach(function(card){
      card.classList.contains('active');
    })
  }, 1000);
}

// Fisher Yates shuffle
function shuffleCards(array){
  for(let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
  
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}