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
    let inputValue = event.target.value;

    if (rangeSlider.offsetWidth < 330) {
        rangeSliderLine.style.width = `${inputValue / 1.48}px`;
    } else {
        rangeSliderLine.style.width = `${inputValue / 1.35}px`;
    }
    for (let i = 0; i <= limits.length - 1; i++) {
        if (inputValue >= limits[i]) {
            [...rangeSliderLabel].forEach(item => {
                item.classList.remove('range-slider__label--active');
            })
            addActiveClass(rangeSliderLabel[i]);
        } else {
            removeActiveClass(rangeSliderLabel[i]);
        }
    }
}

function appTouch(event) {
    let x = event.touches[0].clientX;
    rangeSliderInput.value = x * 1.35;
    rangeSliderLine.style.width = `${x / 1.1}px`;
    inputChanger(event);
}

rangeSliderInput.addEventListener('input', inputChanger);
rangeSliderInput.addEventListener('touchmove', appTouch);
rangeSliderInput.addEventListener('touchstart', appTouch);


