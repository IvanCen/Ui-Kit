const topBarSearchIconTypeDelete = document.querySelector('.top-bar-search__icon--type--delete');
const topBarSearchInputArea = document.querySelector('.top-bar-search__input-area');

topBarSearchIconTypeDelete.addEventListener('click', () => {
    topBarSearchInputArea.value = '';
});