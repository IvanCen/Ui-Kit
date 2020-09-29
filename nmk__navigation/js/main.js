document.addEventListener("DOMContentLoaded", initTopMenu);

function initTopMenu() {
    let hamburgerAll = document.querySelectorAll(".header .header__menu");
    let header = document.querySelector(".header");
    document.body.style.paddingTop = header.clientHeight + "px";
    let headerNavigationClose = document.querySelector(".navigation-element--close");
    hamburgerAll.forEach(function(hamburger){
        hamburger.addEventListener("click", ()=>{
            let headerNavigation = document.querySelector(".navigation");
            headerNavigation.classList.toggle("navigation--opened");
            document.body.classList.toggle("overflow");
            // if (headerNavigation.style.transform == "translateY(-5%)") {
            //     headerNavigation.style.transform = "translateY(-100%)";
            //     document.body.style.overflow = "auto";
            // } else {
            //     headerNavigation.style.transform = "translateY(-5%)";
            //     document.body.style.overflow = "hidden";
            // }
        });
    });
    if(headerNavigationClose){
        headerNavigationClose.addEventListener("click", ()=>{
            let headerNavigation = document.querySelector(".navigation");
            headerNavigation.classList.toggle("navigation--opened");
            document.body.classList.toggle("overflow");
            // if (headerNavigation.style.transform == "translateY(-5%)") {
            //     headerNavigation.style.transform = "translateY(-100%)";
            //     document.body.style.overflow = "auto";
            // } else {
            //     headerNavigation.style.transform = "translateY(-5%)";
            //     document.body.style.overflow = "hidden";
            // }
        });
    }

    let pages = document.querySelectorAll(".page");
    let baskets = document.querySelectorAll(".header .header__basket");
    baskets.forEach(function(basket){
        basket.addEventListener("click", (e)=>{
            pages.forEach(page=>{
                page.classList.remove("page--show");
            });

            let page = document.querySelector(".page[data-page='basket']");
            if(page) page.classList.add("page--show");
        });
    });
}

