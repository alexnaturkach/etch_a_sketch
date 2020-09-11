const container = document.getElementById('cont');
const contSize = 600; //size of container in pixels
let size = 16; //number of columns and rows
let mouseDown = false;

generateGrid();

function generateGrid() {
  for (i = 0; i < (size * size); i++) {
    const createDiv = document.createElement('div');
    createDiv.style.width = contSize / size + 'px';
    createDiv.style.height = contSize / size + 'px';
    createDiv.className = 'cell';
    container.appendChild(createDiv);
  }
}

document.addEventListener('mouseover', function(e) {
  if (mouseDown) {
    if (e.target.className === 'cell') {
      e.target.style.backgroundColor = 'orange';
    }
  }
})

window.addEventListener('mousedown', () => {
  mouseDown = true;
})
window.addEventListener('mouseup', () => {
  mouseDown = false;
})
window.addEventListener('mouseout', () => {
  mouseDown = false;
})