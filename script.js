const container = document.getElementById('cont');
const contSize = 60; //size of container in pixels
let size = 16; //number of columns and rows
let mouseDown = false;
let drawingMethod = drawBlack;
let colorPick = document.getElementById("colorPicker");
let currentColor = colorPick.value;
generateGrid();


function getRandomColor() {
  let letter = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letter[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawBlack(e) {
  if (mouseDown) {
    if (e.target.classList.contains('cell')) {
      e.target.style.backgroundColor = currentColor + "";
    }
  }
}

function drawRainbow(e) {
  if (mouseDown) {
    if (e.target.className === 'cell' & e.target.className !== 'filled') {
      e.target.style.backgroundColor = getRandomColor();
      e.target.classList.add('filled');
      e.target.setAttribute('color-brightness', '100');
    } else if (e.target.classList.contains('filled')) {
      let currentBrightness = e.target.getAttribute('color-brightness');
      currentBrightness -= 10;
      e.target.setAttribute('color-brightness', currentBrightness);
      e.target.style.filter = "brightness(" + currentBrightness + "%)";
    }
  }
}

function resetGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  generateGrid();
}

function generateGrid() {
  for (i = 0; i < (size * size); i++) {
    const createDiv = document.createElement('div');
    createDiv.style.width = contSize / size + 'vw';
    createDiv.style.height = contSize / size + 'vw';
    createDiv.className = 'cell';
    container.appendChild(createDiv);
    document.getElementById('currentSize').innerHTML = "Current size is: " + size + "x" + size;
  }
}

function changeSize() {
  customSize = parseInt(prompt("Enter your custom size. Default size is 16x16"));
  if (isNaN(customSize)) {
    alert("That wasn't a number. Use a number please");
    changeSize();
  } else if (customSize >= 100) {
    let confirmationCap = confirm("Are you sure you want to set this size: " + customSize + "? It's " + customSize * customSize + " cells. That's a lot and can blow up your computer.");
    if (!confirmationCap) {
      changeSize();
    } else {
      size = customSize;
      resetGrid();
      generateGrid();
    }
  } else {
    let confirmation = confirm("If you change the size you will lose your existing work. Want to proceed?");
    if (confirmation) {
      size = customSize;
      resetGrid();
      generateGrid();
    }
    return false;
  }
}

function switchToRainbow() {
  document.removeEventListener('mouseover', drawBlack);
  document.addEventListener('mouseover', drawRainbow);
  drawingMethod = drawRainbow;
}

function switchToBlack() {
  currentColor = 'black';
  document.removeEventListener('mouseover', drawRainbow);
  document.addEventListener('mouseover', drawBlack);
  drawingMethod = drawBlack;
}

colorPick.addEventListener('input', () => {
  switchToBlack();
  currentColor = colorPick.value;
})
document.addEventListener('mouseover', drawBlack);

window.addEventListener('mousedown', (e) => {
  mouseDown = true;
  drawingMethod(e);
})
window.addEventListener('mouseup', () => {
  mouseDown = false;
})