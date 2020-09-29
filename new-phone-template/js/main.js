let allItems, shop;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded(e) {
    initImages();

    (async () => {
        let request={
            method: 'get-catalog',
            view: 'tree',
            outputFormat: 'json'
        };
        let rawResponse = await fetch('[~30~]', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html'
            },
            body: JSON.stringify(request)
        });
        let successData = JSON.parse(await rawResponse.text()).successData;
        allItems = await successData.items;
        allMidifiers = await successData.modifiers;

        let f3 = []
        for(let id in allItems){
            f3.push(allItems[id]);
        }
        f3 = f3.splice(10,10);
        f3.forEach(el=>{
            createListElement(el);
        });
        let titles = document.querySelectorAll(".catalog__list-element-name");
        titles.forEach(title=>{
            if(title.textContent.length > 30){
                let newString = title.textContent.substr(0, 30) + "...";
                title.textContent = newString;
            }
        });
    })();



    let accordionTriggers = document.querySelectorAll(".accordion__trigger");
    accordionTriggers.forEach(trigger=>{
        trigger.addEventListener("click", function (e){
            let container = document.querySelector(".accordion__container[data-id='" + trigger.dataset["id"] + "']");
            trigger.classList.toggle('accordion__trigger--active');
            container.classList.toggle('accordion__container--show');
            if (container.style.maxHeight) {
                container.style.maxHeight = null;
            } else {
                container.style.maxHeight = `${container.scrollHeight}px`;
            }
        });
    })

    let groups = document.querySelectorAll(".form__group--float");
    groups.forEach(group=>{
        group.addEventListener("click", function (e){
            group.classList.add("form__group--focused");
            group.querySelector("input").focus();
        });
        group.querySelector("input").addEventListener("blur", function (e){
            group.classList.remove("form__group--focused");
            if(group.querySelector("input").value) {
                group.classList.add("form__group--not-empty");
            }else{
                group.classList.remove("form__group--not-empty");
            }
        });
        group.click();
        setTimeout(function (){
            group.classList.remove("form__group--focused");
            if(group.querySelector("input").value) {
                group.classList.add("form__group--not-empty");
            }else{
                group.classList.remove("form__group--not-empty");
            }
        }, 40);
    })

    let sectionReset = document.querySelectorAll(".button__reset");
    sectionReset.forEach(reset=>{
        reset.addEventListener("click", function (e){
            let inputs = reset.closest("section").querySelectorAll("input");
            inputs.forEach(input=>{
               input.value = "";
               input.closest(".form__group").classList.remove("form__group--not-empty");
            });
        });
    })
}

function createListElement(item){
    console.log(item);
    let container = document.querySelector(".catalog__list[data-id='2']");

    let element = document.createElement("div");
    element.classList.add("catalog__list-element");

    let image = document.createElement("div");
    image.classList.add("catalog__list-element-image");
    if(item.mainPhoto.name) {
        image.style.backgroundImage = "url("+item.mainPhoto.name+")";
        element.append(image);
    }

    let detail = document.createElement("div");
    detail.classList.add("catalog__list-element-detail");

    element.append(detail);

    let title = document.createElement("div");
    title.classList.add("catalog__list-element-title");
    let name = document.createElement("div");
    name.classList.add("catalog__list-element-name");
    name.textContent = item.name;
    let price = document.createElement("div");
    price.classList.add("catalog__list-element-price");
    price.textContent = item.price + " ₽";
    title.append(name, price);

    let additional = document.createElement("div");
    additional.classList.add("catalog__list-element-additional");
    let weight = document.createElement("div");
    weight.classList.add("catalog__list-element-name");
    if(item.volume || item.netWeight) weight.textContent = item.volume ? item.volume + " мл" : item.netWeight +" г";
    let plus = document.createElement("div");
    plus.classList.add("catalog__list-element-plus");
    plus.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle opacity="0.12" cx="12.0001" cy="12" r="12" fill="#E6551E"></circle>
                                <path d="M12.0001 6.75V17.25" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M6.75006 12H17.2501" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>`;
    additional.append(weight, plus);

    detail.append(title,additional);

    container.append(element);
}

function initImages() {
    let images = document.querySelectorAll(".catalog__list-element-image");
    images.forEach(image=>{
        console.log(image);
        image.style.backgroundImage = "url(" + image.dataset["image"] + ")";
    });

    images = document.querySelectorAll(".basket__offers-element-image");
    images.forEach(image=>{
        console.log(image);
        image.style.backgroundImage = "url(" + image.dataset["image"] + ")";
    });
}

function isEmptyObj(obj) {
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}