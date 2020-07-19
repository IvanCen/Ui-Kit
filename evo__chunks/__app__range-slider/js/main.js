/* function activeRangeSlider() {
  const rangeSliderInput = document.querySelector('.range-slider__input');
  const rangeSliderLabel = document.querySelectorAll('.range-slider__label');
  const rangeSliderLine = document.querySelector('.range-slider__line');
  const rangeSlider = document.querySelector('.range-slider');
  const limits = [25, 118, 210, 303, 394];

  function addActiveClass(defaultClass) {
    defaultClass.classList.add('range-slider__label--active');
    defaultClass.classList.add('range-slider__label--selected');
  }

  function removeActiveClass(defaultClass) {
    defaultClass.classList.remove('range-slider__label--active');
    defaultClass.classList.remove('range-slider__label--selected');
  }

  function inputChanger(event) {
    const inputValue = event.target.value;

    if (rangeSlider.offsetWidth < 330) {
      rangeSliderLine.style.width = `${inputValue / 1.48}px`;
    } else {
      rangeSliderLine.style.width = `${inputValue / 1.35}px`;
    }
    for (let i = 0; i <= limits.length - 1; i++) {
      if (inputValue >= limits[i]) {
        [...rangeSliderLabel].forEach((item) => {
          item.classList.remove('range-slider__label--active');
        });
        addActiveClass(rangeSliderLabel[i]);
      } else {
        removeActiveClass(rangeSliderLabel[i]);
      }
    }
  }

  function appTouch(event) {
    const x = event.touches[0].clientX;
    rangeSliderInput.value = x * 1.35;
    rangeSliderLine.style.width = `${x / 1.1}px`;
    inputChanger(event);
  }

  rangeSliderInput.addEventListener('input', inputChanger);
  rangeSliderInput.addEventListener('touchmove', appTouch);
  rangeSliderInput.addEventListener('touchstart', appTouch);
} */

function activeRangeSlider() {
  const rangeSliderInput = document.querySelector('.range-slider__input');
  const rangeSliderLabel = document.querySelectorAll('.range-slider__label');
  const rangeSliderLine = document.querySelector('.range-slider__line');
  const rangeSlider = document.querySelector('.range-slider');
  const limits = [25, 118, 210, 303, 394];

  function addActiveClass(defaultClass) {
    defaultClass.classList.add('range-slider__label--active');
    defaultClass.classList.add('range-slider__label--selected');
  }

  function removeActiveClass(defaultClass) {
    defaultClass.classList.remove('range-slider__label--active');
    defaultClass.classList.remove('range-slider__label--selected');
  }

  function inputChanger(event) {
    const inputValue = event.target.value;
    console.log(inputValue);
    if (rangeSlider.offsetWidth < 330) {
      rangeSliderLine.style.width = `${inputValue / 1.48}px`;
    } else {
      rangeSliderLine.style.width = `${inputValue / 1.35}px`;
    }
    for (let i = 0; i <= limits.length - 1; i++) {
      if (inputValue >= limits[i]) {
        [...rangeSliderLabel].forEach((item) => {
          item.classList.remove('range-slider__label--active');
        });
        addActiveClass(rangeSliderLabel[i]);
      } else {
        removeActiveClass(rangeSliderLabel[i]);
      }
    }
  }

  /*function appTouch(event) {
    const x = event.touches[0].clientX;
    console.log(x);
    rangeSliderInput.value = x * 1.35;
    rangeSliderLine.style.width = `${x / 1.1}px`;
    inputChanger(event);
  }*/

  rangeSliderInput.addEventListener('input', inputChanger);
  //rangeSliderInput.addEventListener('touchmove', appTouch);
  //rangeSliderInput.addEventListener('touchstart', appTouch);
}

class CreateRangeSlider extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="range-slider">
        <input class="range-slider__input" type="range" min="0" max="400" steps="1" value="0">
        <div class="range-slider__line"></div>
        <ul class="range-slider__labels">
          <li class="range-slider__label">1</li>
          <li class="range-slider__label">2</li>
          <li class="range-slider__label">3</li>
          <li class="range-slider__label">4</li>
          <li class="range-slider__label">5</li>
        </ul>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
