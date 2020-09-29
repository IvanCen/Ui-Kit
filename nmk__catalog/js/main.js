document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded(e) {
    initSliders();
    initCategories()
}

function initSliders() {
    var swiperShares = new Swiper('.shares .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        autoHeight: true,
    });

    let texts = document.querySelectorAll(".shares__list-element-text");
    texts.forEach(text=>{
        if(text.textContent.length > 80){
            let newString = text.textContent.substr(0, 80) + "...";
            text.textContent = newString;
        }
    });

    var swipCategories = new Swiper('.catalog__categories', {
        spaceBetween: 24,
        slidesPerView: 'auto',
        autoHeight: true,
    });

    var swipTags = new Swiper('.catalog__tags-container', {
        spaceBetween: 8,
        slidesPerView: 'auto',
        autoHeight: true,
    });

    swipTags.on("click", function (){
        setTimeout(function () {
            swipTags.update();
        }, 500);
    })

    let tags = document.querySelectorAll(".catalog__tags-element");
    tags.forEach(tag=>{
        tag.addEventListener("click", function(e){
            tag.classList.toggle("catalog__tags-element--selected");
            tag.blur();
        }, false);
    });
}

function initCategories() {
    let categories = document.querySelectorAll(".catalog .catalog__categories-element");
    let lists = document.querySelectorAll(".catalog .catalog__list");
    categories.forEach(cat=>{
        cat.addEventListener("click", (e)=>{
            categories.forEach(btn=>{
                btn.classList.remove("catalog__categories-element--active");
            });
            lists.forEach(list=>{
                list.classList.remove("catalog__list--show");
            });
            let list = document.querySelector(".catalog .catalog__list[data-id='" + cat.getAttribute("data-id") + "']");
            if(list) list.classList.add("catalog__list--show");
            cat.classList.add("catalog__categories-element--active");
        });
    });
}
