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
      const INDENT = isIos ? 84 : 24;
      let dragStart = INDENT;
      let dragEnd = INDENT;
      let offsetY = INDENT;
      let offsetYOnStart = INDENT;
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
          offsetY = INDENT;
          offsetYOnStart = INDENT;
          isOpen = !isOpen;
          cardOpened = true;
        }
        if (offsetY < 0) {
          // тут действия, если тянется дальше максимума
          if (action === 'end') {
            offsetY = INDENT;
            dragStart = INDENT;
            dragEnd = INDENT;
            offsetYOnStart = INDENT;
          } else if (action === 'move') {
            offsetY = INDENT;// уменьшапем скорость смещения в 2 раза
          }
        }
        if (action === 'open') {
          container.classList.add('card--animation');
          offsetY = INDENT;
          dragStart = INDENT;
          dragEnd = INDENT;
          offsetYOnStart = INDENT;
          container.style.transform = `translate3d(0,${offsetY}px,0)`;
          setTimeout(() => {
            container.classList.remove('card--animation');
          }, 300);
          return;
        }
        container.style.transform = `translate3d(0,${offsetY}px,0)`;
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
