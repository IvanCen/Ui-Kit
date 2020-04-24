/*const page = document.querySelector('.page');
const buttonPage = document.querySelector('.button-page');


buttonPage.addEventListener('click',function(){
    page.classList.toggle('page--opened');
});*/


function createPage() {
    const element = document.createElement('main');
    element.classList.add('page');

    return element;
}
