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

// Nombre aléatoire entre 0 et 10
const getRandomNumber = () => Math.floor(Math.random() * 11);
console.log(getRandomNumber());

// Gestion du bouton "valider"
const handleValidateBtnClick = (e) => {
  e.preventDefault();
  const inputValue = document.querySelector('.input-number').value;
  console.log(inputValue);
  const redDot = document.createElement('div');
  redDot.classList.add('red-dot');
  const resultsBar = document.querySelector('.results-bar');
  resultsBar.appendChild(redDot);
  const position = (inputValue / 10) * 100;
  redDot.style.position = 'absolute';
  redDot.style.left = `${position}%`;
};

// // Comparer la valeur saisie avec la valeur aléatoire
// const compareNumbers = (inputValue, randomNumber) => {
//   if (inputValue === randomNumber) {
//     return 'BRAVO !';
//   }
//   if (inputValue > randomNumber) {
//     return 'Trop grand';
//   }
//   return 'Trop petit';
// };

// Initialisation du jeu
const init = () => {
  const color = getColorFromLocalStorage() || getColorFromUrl();
  if (color) {
    applySelectedColor(color);
  }
  const validateBtn = document.querySelector('.validate-btn');
  validateBtn.addEventListener('click', handleValidateBtnClick);
};

init();
