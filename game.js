// Récupérer le prénom dans le localStorage
const playerName = localStorage.getItem('name');
// console.log(playerName);

// Score
let currentScore = localStorage.getItem('currentScore')
  ? parseInt(localStorage.getItem('currentScore'))
  : 0;

let isGameOver = false;

// Génération d'un nombre aléatoire
const randomNumber = Math.floor(Math.random() * 11);
// console.log(randomNumber);

// Gestion de la couleur sélectionnée
const getColorFromLocalStorage = () => localStorage.getItem('selectedColor');
const getColorFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('color');
};

const applySelectedColor = (color) => {
  const style = document.createElement('style');
  style.innerHTML = `.dynamic-color { color: ${color}; }`;
  document.head.appendChild(style);
  document.querySelector('.game-title').classList.add('dynamic-color');
  document.querySelector('.validate-btn').style.backgroundColor = color;
};

// Gestion du bouton "valider"
const handleValidateBtnClick = (e) => {
  e.preventDefault();
  const inputValue = document.querySelector('.input-number').value;
  if (inputValue === '' || inputValue < 0 || inputValue > 10 || isNaN(inputValue)) {
    document.querySelector('.input-number').style.borderColor = 'red';
    document.querySelector('.input-number').value = '';
    return;
  }
  if (isGameOver) {
    return;
  }
  // Vérification de la valeur saisie avec le numéro généré aléatoirement
  if (parseInt(inputValue) === randomNumber) {
    // Numéro trouvé
    isGameOver = true;
    // Si les valeurs sont identiques, on retire le message d'indice
    const hintElement = document.querySelector('.hint .hint-value');
    if (hintElement) {
      hintElement.remove();
    }
    // Si les valeurs sont identiques, on affiche un smiley heureux
    displaySmiley(inputValue, true);
    // Si les valeurs sont identiques, on retire les smileys tristes
    const badSmileys = document.querySelectorAll('.bad-smiley');
    badSmileys.forEach((smiley) => smiley.remove());
    // Si les valeurs sont identiques, on affiche un message de félicitations
    displayCongrats();
    // Si les valeurs sont identiques, on incrémente le score
    const scoreElement = document.querySelector('.score');
    currentScore++;
    localStorage.setItem('currentScore', currentScore);
    scoreElement.textContent = `Score : ${currentScore}`;
    document.querySelector('.score');
  } else {
    // Numéro pas trouvé
    // Si les valeurs sont différentes, on affiche un message d'indice
    displayHint();
    // Si les valeurs sont différentes, on affiche un smiley triste
    displaySmiley(inputValue, false);
    // Sur les versions mobiles, on empêche le clavier de se fermer
    document.querySelector('.input-number').focus();
    document.querySelector('.input-number').value = '';
  }
};
// Effacer la valeur de l'input quand on clique dessus (fonction flêchée)
const inputNumber = document.querySelector('.input-number');
inputNumber.addEventListener('click', () => {
  inputNumber.value = '';
});

// Gestion des smileys
const randomSmiley = (smileys) => {
  const randomIndex = Math.floor(Math.random() * smileys.length);
  return smileys[randomIndex];
};
const goodSmileys = ['😀', '👍', '🎉', '🌟', '🥳', '✅'];
const badSmileys = ['😕', '🚫', '❌', '🙁', '😞', '😤', '🥺', '😵‍💫', '😢', '😩'];

const displaySmiley = (inputValue, isGood) => {
  const position = (inputValue / 10) * 95.5;
  const existingSmiley = document.querySelector(`[data-position="${position}"]`);
  // console.log(existingSmiley);
  if (existingSmiley) {
    existingSmiley.remove();
  }
  const smiley = document.createElement('div');
  smiley.setAttribute('data-position', position);

  smiley.classList.add(isGood ? 'good-smiley' : 'bad-smiley');
  smiley.textContent = randomSmiley(isGood ? goodSmileys : badSmileys);
  const resultsBar = document.querySelector('.results-bar');
  resultsBar.appendChild(smiley);
  smiley.style.position = 'absolute';
  smiley.style.left = `${position}%`;
  document.querySelector('.results-bar').appendChild(smiley);
};

// Gestion du message d'indice
const displayHint = () => {
  let hintValue = document.querySelector('.hint .hint-value');

  if (!hintValue) {
    hintValue = document.createElement('p');
    hintValue.classList.add('hint-value');
    document.querySelector('.hint').appendChild(hintValue);
  }

  const inputValue = parseInt(document.querySelector('.input-number').value);
  const hintEmoji = document.createElement('span');
  hintEmoji.classList.add('dynamic-color');

  if (randomNumber > inputValue) {
    hintValue.textContent = 'Je pense à un nombre plus grand ';
    hintEmoji.textContent = '⇧';
  } else if (randomNumber < inputValue) {
    hintValue.textContent = 'Je pense à un nombre plus petit ';
    hintEmoji.textContent = '⇩';
  }
  hintValue.appendChild(hintEmoji);
  document.querySelector('.hint').appendChild(hintValue);
};

// Fonction pour afficher le texte de félicitations
const displayCongratsText = () => {
  const hintElement = document.querySelector('.hint');
  hintElement.innerHTML = ''; // Vide l'élément "hint"

  const congratsText = document.createElement('p');
  congratsText.classList.add('congrats-text');
  congratsText.textContent = `Félicitations ${playerName} !`;
  hintElement.appendChild(congratsText);
};

// Fonction pour afficher le lien "Rejouer"
const displayReplayLink = () => {
  const hintElement = document.querySelector('.replay');

  const replayLink = document.createElement('a');
  replayLink.classList.add('replay-link');
  replayLink.textContent = 'Rejouer ↺';
  const color = getColorFromLocalStorage();
  replayLink.style.color = color;
  replayLink.href = 'javascript:void(0)';
  replayLink.addEventListener('click', () => {
    window.location.reload();
  });
  hintElement.appendChild(replayLink);
};

// Fonction principale pour afficher les félicitations
const displayCongrats = () => {
  displayCongratsText();
  displayReplayLink();
};

// Initialisation du jeu
const init = () => {
  const color = getColorFromLocalStorage() || getColorFromUrl();
  if (color) {
    applySelectedColor(color);
  }
  const validateBtn = document.querySelector('.validate-btn');
  validateBtn.addEventListener('click', handleValidateBtnClick);

  const form = document.getElementById('numberForm');
  form.addEventListener('submit', handleValidateBtnClick);

  const inputNumber = document.querySelector('.input-number');
  inputNumber.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleValidateBtnClick(e);
    }
  });
};
document.querySelector('.score').textContent = `Score : ${currentScore}`;

init();
