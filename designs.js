const container = document.querySelector('.container');
const clearBtn = document.getElementById('clear');
const size = document.getElementById('size');
const rows = document.getElementById('rows');
const cols = document.getElementById('cols');
let eraser = document.getElementById('eraser');
let customGrd = document.getElementById('customGrid');
let label = document.querySelectorAll('#sizeLablel span');
let rowSpan = document.querySelector('#customSizeRow span');
let colSpan = document.querySelector('#customSizeCol span');
let colorInput = document.getElementById('colorInput');
let plusBlack = document.getElementById('tenBlack');
let randColor = document.getElementById('randColor');
let colorChosen = 'black';

// update spans with range input values
function updateSizeSpans() {
  resetCanvas(container);
  label.forEach((span) => {
    span.textContent = size.value;
  });
  makeRowsAndCols(size.value);
}

function updateRowSpans() {
  rowSpan.textContent = this.value;
}

function updateColSpans() {
  colSpan.textContent = this.value;
}
//random color generator
function randomColor() {
  const randomColour = Math.floor(Math.random() * 16777215).toString(16);
  colorChosen = '#' + randomColour;
  return colorChosen;
}

// function to create rows and columns
function makeRowsAndCols(rowsize) {
  container.innerHTML = '';
  let rows;
  let cols;
  // Check for number of arguments in function call
  if (arguments.length > 1) {
    rows = Number(arguments[0]);
    cols = Number(arguments[1]);
    console.log(rows, cols);
  } else {
    rowsize = Number(rowsize);
    rows = rowsize;
    cols = rowsize;
  }
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement('div');
    container.appendChild(cell).className = 'grid-item';
  }

  let divs = document.querySelectorAll('.grid-item');

  divs.forEach((div) => {
    //listen for click event then call the colordiv function
    div.addEventListener('click', colorDiv);
  });
}

// function to color the div depending on color chosen
function colorDiv() {
  if (colorChosen === 'erase') {
    this.style.removeProperty('background-color');
    this.style.removeProperty('opacity');
  } else {
    if (colorChosen === 'black') {
      this.style.backgroundColor = colorChosen;
    } else if (colorChosen === 'randomcolor') {
      this.style.opacity = 1;
      this.style.backgroundColor =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
    } else if (colorChosen === 'plusblack') {
      let current = Number(this.style.opacity);
      if (current > 0.9 && this.style.backgroundColor !== 'black') {
        current = 0.1;
        this.style.opacity = current + 0.1;
      } else if (current > 0.9) {
        return;
      } else {
        this.style.backgroundColor = 'black';
        this.style.opacity = current + 0.1;
      }
    } else {
      this.style.backgroundColor = colo;
      this.style.opacity = current + 0.1;
    }
  }
}

// reset the canvas to an empty container div
function resetCanvas(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  if (parent.innerHTML.trim().length === 0) {
    parent.style.setProperty('--grid-cols', 1);
    parent.style.setProperty('--grid-rows', 1);
    parent.innerHTML =
      '<p class="empty-grid">Empty grid, please create grid</p>';
  }
}

// create rows and columns with default size input value
makeRowsAndCols(size.value);

// initialize label spans with range default value
label.forEach((span) => {
  span.textContent = size.value;
});

// initialize spans with range default value
rowSpan.textContent = rows.value;
colSpan.textContent = cols.value;

// Event listeners to select colors
colorInput.addEventListener('input', function () {
  colorChosen = colorInput.value;
});
colorInput.addEventListener('click', function () {
  colorChosen = colorInput.value;
});
randColor.addEventListener('click', function () {
  colorChosen = 'randomcolor';
});

eraser.addEventListener('click', function () {
  colorChosen = 'erase';
});

plusBlack.addEventListener('click', function () {
  colorChosen = 'plusblack';
});
// call the update function for spans when ever the value of the size input changes
size.addEventListener('change', updateSizeSpans);
rows.addEventListener('change', updateRowSpans);
cols.addEventListener('change', updateColSpans);

// listen for click event on the clear button and turn all delete all child divs
clearBtn.addEventListener('click', function () {
  resetCanvas(container);
});

// listen for click event on the Create Custom Grid button and create grid width custom with and height
customGrd.addEventListener('click', function () {
  makeRowsAndCols(rows.value, cols.value);
});
