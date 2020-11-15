class ToggleModalPageCard extends ToggleModalPageCardDef {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }


  rendering(productInfo) {
    super.rendering();
    const textArea = new CreateTextAreaProductCard({
      selector: ['div'],
      style: ['product-card'],
    });

    this.modalPageCard.append(textArea.create(productInfo));

    window.addEventListener('resize', test);
    let cardOpened = false;
    function onDOMContentLoaded() {
      const container = document.querySelector('.card');
      activeTouch(container);

      const images = document.querySelectorAll('.card__modifiers-section-list-element-image');
      images.forEach((img) => {
        img.style.backgroundImage = `url(${img.dataset.img})`;
      });

      const sectionGroupTriggers = document.querySelectorAll('.card__info-section-name');
      sectionGroupTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          const container = trigger.parentElement.querySelector('.card__info-section-list');
          trigger.parentElement.classList.toggle('card__info-section--opened');
          if (container.style.maxHeight) {
            container.style.maxHeight = null;
          } else {
            container.style.maxHeight = `${container.scrollHeight}px`;
          }
        });
      });

      const offersFromCatalog = document.querySelectorAll('.catalog__list-element');
      offersFromCatalog.forEach((offer) => {
        offer.addEventListener('click', () => {
          window.cardAnimation('open');
        });
      });
    }
    function test() {
      const container = document.querySelector('.card');
      activeTouch(container);
    }

    function activeTouch(container) {
      let dragStart = isIos ? 54 : 24;
      let dragEnd = isIos ? 54 : 24;
      let offsetY = isIos ? 54 : 24;
      let offsetYOnStart = isIos ? 54 : 24;
      let isOpen = false;
      const isMapOpen = cardOpened;

      if (isMapOpen === false) {
        offsetY = container.clientHeight;
        offsetYOnStart = container.clientHeight;
        container.style.transform = `translate3d(0,${offsetY}px,0)`;
      }
      window.cardAnimation = cardAnimation;
      function cardAnimation(action) {
        if (offsetY > (container.clientHeight / 5) && !isOpen && action === 'end') {
          offsetY = container.clientHeight;
          offsetYOnStart = container.clientHeight;
          isOpen = !isOpen;
          cardOpened = false;
          toggleModalPageCard.deletePage();
        } else if (offsetY > (container.clientHeight / 5) && action === 'move' && isOpen) {
          offsetY = container.clientHeight;
          offsetYOnStart = container.clientHeight;
        } else if (offsetY < (container.clientHeight) && action === 'end' && isOpen) {
          offsetY = isIos ? 54 : 24;
          offsetYOnStart = isIos ? 54 : 24;
          isOpen = !isOpen;
          cardOpened = true;
        }
        if (offsetY < 0) {
          // тут действия, если тянется дальше максимума
          if (action === 'end') {
            offsetY = isIos ? 54 : 24;
            dragStart = isIos ? 54 : 24;
            dragEnd = isIos ? 54 : 24;
            offsetYOnStart = isIos ? 54 : 24;
          } else if (action === 'move') {
            offsetY = isIos ? 54 : 24;// уменьшапем скорость смещения в 2 раза
          }
        }
        if (action === 'open') {
          container.classList.add('card--animation');
          offsetY = isIos ? 54 : 24;
          dragStart = isIos ? 54 : 24;
          dragEnd = isIos ? 54 : 24;
          offsetYOnStart = isIos ? 54 : 24;
          container.style.transform = `translate3d(0,${offsetY}px,0)`;
          setTimeout(() => {
            container.classList.remove('card--animation');
          }, 300);
          return;
        }
        container.style.transform = `translate3d(0,${offsetY}px,0)`;
        const s = document.querySelector('.card__name');
        // s.textContent = "offsetY - " + offsetY +"; container.clientHeight - " + container.clientHeight + "; container.scrollHeight - " + container.scrollHeight;
      }

      const panelTouch = container.querySelector('.card__touch');
      panelTouch.addEventListener('touchstart', (event) => {
        container.classList.remove('card--animation');
        event.preventDefault();
        dragStart = event.touches[0].clientY;
      }, { passive: false });

      panelTouch.addEventListener('touchmove', (event) => {
        event.preventDefault();
        dragEnd = event.touches[0].clientY;
        offsetY = offsetYOnStart + dragEnd - dragStart;
        cardAnimation('move');
      }, { passive: false });

      panelTouch.addEventListener('touchend', (event) => {
        event.preventDefault();
        offsetYOnStart = offsetY;
        container.classList.add('card--animation');
        cardAnimation('end');
      }, { passive: false });
    }

    onDOMContentLoaded();
    this.openPage();
  }
}
