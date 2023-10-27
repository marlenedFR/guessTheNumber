import 'index.css';

const nameForm = document.getElementById('nameForm');
nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputElement = document.getElementById('name');
  if (e.target[0].value === '') {
    inputElement.classList.add('input-error');
    inputElement.placeholder = 'Entre ton prénom ! 😠';
    inputElement.addEventListener('click', () => {
      inputElement.classList.remove('input-error');
      inputElement.placeholder = "J'attends...";
    });
    return;
  } else {
    document.getElementById('name').classList.remove('input-error');
  }

  if (!selectedColor) {
    const colorLabel = document.querySelector('label[for="color"]');
    colorLabel.style.color = 'red';
    colorLabel.textContent = 'Choisis ta couleur ! 😠';
    return;
  }

  const formData = new FormData(e.target);
  const name = formData.get('name');
  nameForm.classList.add('hidden');
  const h1 = document.querySelector('h1');
  const instructions = document.querySelector('.instructions');
  const welcomeContainer = document.querySelector('.welcomeContainer');
  welcomeContainer.classList.remove('hidden');
  instructions.classList.remove('hidden');
  h1.textContent = `Bonjour ${name}`;
});

let selectedColor;

const colorBoxes = document.querySelectorAll('.color-box');
colorBoxes.forEach((box) => {
  box.addEventListener('click', function () {
    selectedColor = window.getComputedStyle(this).backgroundColor;
    colorBoxes.forEach((box) => {
      box.classList.remove('selected');
    });
    this.classList.add('selected');
    const h1 = document.querySelector('h1');
    h1.style.color = selectedColor;
    const startBtn = document.querySelector('.start-btn');
    startBtn.style.backgroundColor = selectedColor;
    localStorage.setItem('selectedColor', selectedColor);
  });
});
