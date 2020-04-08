const cardItemIconTypeLike = document.querySelectorAll('.card-item__icon--type--like');

[...cardItemIconTypeLike].forEach(item => {

    item.addEventListener('click', () => {
        item.classList.toggle('card-item__icon--liked');
    });
});

