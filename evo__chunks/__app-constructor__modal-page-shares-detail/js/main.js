class ToggleModalPageSharesDetail extends ToggleModalPageCardDef {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }


  rendering(productInfo) {
    super.rendering();
    const textArea = new CreateTextAreaSharesDetail({
      selector: ['div'],
      style: ['shares-detail'],
    });

    this.modalPageCard.append(textArea.create(productInfo));

    let sharesOpened = true;


    function activeSharesTouch(container) {
      const INDENT = isIos ? 84 : 24;
      let dragStart = INDENT;
      let dragEnd = INDENT;
      let offsetY = INDENT;
      let offsetYOnStart = INDENT;
      let isOpen = false;
      const isMapOpen = sharesOpened;

      if (isMapOpen === false) {
        offsetY = container.clientHeight;
        offsetYOnStart = container.clientHeight;
        container.style.transform = `translate3d(0,${offsetY}px,0)`;
      }

      function sharesAnimation(action) {
        if (offsetY > (container.clientHeight / 5) && !isOpen && action === 'end') {
          offsetY = container.clientHeight;
          offsetYOnStart = container.clientHeight;
          isOpen = false;
          sharesOpened = false;
          setTimeout(() => {
            toggleModalPageSharesDetail.deletePage();
          }, 500);
        } else if (offsetY > (container.clientHeight / 5) && action === 'move' && isOpen) {
          offsetY = container.clientHeight;
          offsetYOnStart = container.clientHeight;
        } else if (offsetY <= (container.clientHeight / 5) && action === 'move' && isOpen) {
          offsetY = INDENT;
          offsetYOnStart = INDENT;
        } else if (offsetY < (container.clientHeight) && action === 'end' && isOpen) {
          offsetY = INDENT;
          dragStart = INDENT;
          dragEnd = INDENT;
          offsetYOnStart = INDENT;
          isOpen = true;
          sharesOpened = true;
        }
        if (offsetY < (container.clientHeight / 5)) {
          // тут действия, если тянется дальше максимума
          if (action === 'end') {
            offsetY = INDENT;
            dragStart = INDENT;
            dragEnd = INDENT;
            offsetYOnStart = INDENT;
          }
        }
        if (action === 'open') {
          container.classList.add('shares-detail--animation');
          offsetY = INDENT;
          dragStart = INDENT;
          dragEnd = INDENT;
          offsetYOnStart = INDENT;
          container.style.transform = `translate3d(0,${offsetY}px,0)`;
          setTimeout(() => {
            container.classList.remove('shares-detail--animation');
          }, 300);
          return;
        }
        container.style.transform = `translate3d(0,${offsetY}px,0)`;
      }

      const panelTouch = container.querySelector('.shares-detail__touch');
      panelTouch.addEventListener('touchstart', (event) => {
        container.classList.remove('shares-detail--animation');
        event.preventDefault();
        dragStart = event.touches[0].clientY;
      }, { passive: false });

      panelTouch.addEventListener('touchmove', (event) => {
        event.preventDefault();
        dragEnd = event.touches[0].clientY;
        offsetY = offsetYOnStart + dragEnd - dragStart;
        sharesAnimation('move');
      }, { passive: false });

      panelTouch.addEventListener('touchend', (event) => {
        event.preventDefault();
        offsetYOnStart = offsetY;
        container.classList.add('shares-detail--animation');
        sharesAnimation('end');
      }, { passive: false });
      window.sharesAnimation = sharesAnimation;
    }

    const container = document.querySelector('.shares-detail');
    activeSharesTouch(container);
    this.openPage();
  }
}
