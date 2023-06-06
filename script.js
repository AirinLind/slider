const container = document.querySelector('.slider-container');
const slider = container.querySelector('.slider');
const fill = slider.querySelector('.slider-fill');
const thumb = slider.querySelector('.slider-thumb');
const value = thumb.getAttribute('data-value');
const sliderValue = container.querySelector('.slider-value');

const min = 0;
const max = 100;
let currentPercent = 50;

function setPosition(x) {
  const minX = 0;
  const maxX = slider.offsetWidth - thumb.offsetWidth;
  const newX = Math.min(Math.max(x, minX), maxX);
  const newPercent = newX / maxX;
  fill.style.width = newPercent * 100 + '%';
  thumb.style.left = newX + 'px';
  thumb.setAttribute('data-value', Math.round(min + (max - min) * newPercent));

  if (newPercent >= 0.8) {
    fill.style.backgroundColor = 'red';
  } else if (newPercent < 0.8) {
    fill.style.backgroundColor = 'green';
  }

  currentPercent = newPercent;
}

thumb.addEventListener('mousedown', e => {
  e.preventDefault();
  setPosition(e.pageX - container.getBoundingClientRect().left - thumb.offsetWidth / 2);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
  setPosition(e.pageX - container.getBoundingClientRect().left - thumb.offsetWidth / 2);
}

function onMouseUp() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}
