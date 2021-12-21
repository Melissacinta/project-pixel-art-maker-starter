const container = document.querySelector('.container');
const clearBtn = document.getElementById('clear');
const size = document.getElementById('size');
let eraser = document.getElementById('eraser');
let label = document.querySelectorAll('#sizeLablel span');
let colorInput = document.getElementById('colorInput');
let plusBlack = document.getElementById('tenBlack');
let randColor = document.getElementById('randColor');
let colorChosen = 'black';

console.log(colorChosen);
// update spans with range input values
function updateSpans() {
  resetCanvas(container);
  label.forEach((span) => {
    span.textContent = size.value;
  });
  makeRowsAndCols(size.value);
}

//random color generator
function randomColor() {
  const randomColour = Math.floor(Math.random() * 16777215).toString(16);
  colorChosen = '#' + randomColour;
  return colorChosen;
}

// function to create rows and columns
function makeRowsAndCols(rowsize) {
  rowsize = Number(rowsize);
  let rows = rowsize;
  let cols = rowsize;
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement('div');
    container.appendChild(cell).className = 'grid-item';
  }

  let divs = document.querySelectorAll('.grid-item');

  divs.forEach((div) => {
    //listen for mouseover that call the colordiv function
    div.addEventListener('mouseover', colorDiv);

    // listen for click event on the clear button and turn all background color transparent
    clearBtn.addEventListener('click', function () {
      div.style.backgroundColor = '#ffffff';
    });
  });
}

// function to color the div depending on color chosen
function colorDiv() {
  console.log(colorChosen);
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
    this.style.opacity = 1;
    this.style.backgroundColor = colorChosen;
  }
}

// reset the canvas to an empty container div
function resetCanvas(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// create rows and columns with default size input value
makeRowsAndCols(size.value);

// initialize label spans with range default value
label.forEach((span) => {
  span.textContent = size.value;
});

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
  colorChosen = '#ffffff';
});

plusBlack.addEventListener('click', function () {
  colorChosen = 'plusblack';
});
// call the update function for spans when ever the value of the size input changes
size.addEventListener('change', updateSpans);
