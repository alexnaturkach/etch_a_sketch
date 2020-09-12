const container = document.getElementById('cont');
const contSize = 60; //size of container in pixels
let size = 16; //number of columns and rows
let mouseDown = false;
let randomColor =


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
    if (e.target.className === 'cell') {
      e.target.style.backgroundColor = 'black';
    }
  }
}

function drawRainbow(e) {
  if (mouseDown) {
    if (e.target.className === 'cell' & e.target.className !== 'filled') {
      e.target.style.backgroundColor = getRandomColor();
      e.target.className = 'filled';
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
    document.getElementById('currentSize').innerHTML = "Current size is: " + size;
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



document.addEventListener('mouseover', drawRainbow);

window.addEventListener('mousedown', (e) => {
  mouseDown = true;
  drawBlack(e);
})
window.addEventListener('mouseup', () => {
  mouseDown = false;
})