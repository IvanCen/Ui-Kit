const accordion = document.querySelectorAll(".accordion");

[...accordion].forEach(item => {
    item.addEventListener("click", function () {
        this.classList.toggle("accordion--active");
        this.firstElementChild.classList.toggle("accordion__icon-arrow--active");
        this.nextElementSibling.classList.toggle("accordion__content--show");
        let accordionContent = this.nextElementSibling;
        if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null;
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
    });
});