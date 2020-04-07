/*function switchActive(nodeList, activeClass, activeSubClass) {
    [...nodeList].forEach((item) => {
        item.addEventListener('click', function() {
            [...nodeList].forEach(item => {
                item.classList.remove(activeClass);
                console.log(item);
                if(item.hasChildNodes()) {
                    item.firstElementChild.classList.remove(activeSubClass);
                }
            });
            this.classList.add(activeClass);
            if(item.hasChildNodes()) {
                item.firstElementChild.classList.add(activeSubClass);
            }
        })
    });
}*/

function switchActive(nodeList, activeClass, activeSubClass) {
    [...nodeList].forEach((item) => {
        item.addEventListener('click', function () {
            [...nodeList].forEach(item => {
                item.classList.remove(activeClass);
                if (item.childList) {
                    item.firstElementChild.classList.remove(activeSubClass);
                }
            });
            this.classList.add(activeClass);
            if (item.childList) {
                this.firstElementChild.classList.add(activeSubClass);
            }
        })
    });
}
