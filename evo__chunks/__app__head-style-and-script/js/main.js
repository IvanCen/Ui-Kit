function switchActive(nodeList, activeClass) {
    [...nodeList].forEach((item) => {
        item.addEventListener('click', function () {
            [...nodeList].forEach(item => {
                item.classList.remove(activeClass);
            });
            this.classList.add(activeClass);
        })
    });
}
