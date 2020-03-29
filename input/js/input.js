const input = document.querySelectorAll('input');
const iconContainer = document.querySelectorAll('.input__icon-eye');
const inputAreaPassword = document.querySelectorAll('.input__area-password');

function visibleTogglePass(el) {
    [...el].forEach(item => {
        if (item.type === "password") {
            item.type = "text";
        } else {
            item.type = "password";
        }
    });
}

function focused(el) {
    el.nextElementSibling.classList.add('input--focused')
}

function unfocused(el) {
    if (el.value === '') {
        el.nextElementSibling.classList.remove('input--focused');
    }
}

[...input].forEach(item => {
    item.addEventListener('focus', () => focused(item));
    item.addEventListener('blur', () => unfocused(item));
});

[...iconContainer].forEach(item => {
    item.addEventListener('click', () => visibleTogglePass(inputAreaPassword));
});