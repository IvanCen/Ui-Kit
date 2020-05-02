class CreateMapItemStores extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="top-bar-search">
          <span class="top-bar-search__info">find</span>
        </div>
        <div class="map__container">
          <div class="map__item">
            <div class="map__content">
              <input type="radio" class="radio__input" id="radio" name="radio"/>
              <label class="map__item-title radio__label map__radio-label" for="radio">Footnote <br>
                <span class="map__item-text">Nevsky Ave., 114\\116, Saint-Petersburg <br>
                <span class="map__item-dist">2.8 mi</span>
                </span>
              </label>
            </div>
            <img src="[+chunkWebPath+]/img/icon-info.svg" alt="" class="map__icon map__icon&#45;&#45;position&#45;&#45;top">
          </div>
          <div class="map__item">
            <div class="map__content">
              <input type="radio" class="radio__input" id="radio2" name="radio"/>
              <label class="map__item-title radio__label map__radio-label" for="radio2">Footnote <br>
                <span class="map__item-text" for="radio3">Nevsky Ave., 114\\116, Saint-Petersburg <br>
                <span class="map__item-dist">2.8 mi</span>
                </span>
              </label>
            </div>
            <img src="[+chunkWebPath+]/img/icon-info.svg" alt="" class="map__icon map__icon&#45;&#45;position&#45;&#45;top">
          </div>
          <div class="map__item">
            <div class="map__content">
              <input type="radio" class="radio__input" id="radio4" name="radio"/>
              <label class="map__item-title map__radio-button radio__label map__radio-label" for="radio4">Footnote <br>
                <img src="[+chunkWebPath+]/img/icon-attention-circle.svg" alt="" class="map__icon">
                <span class="map__item-text">Nevsky Ave., 114\\116, Saint-Petersburg <br>
                <span class="map__item-dist">2.8 mi</span>
                </span>
              </label>
            </div>
          <img src="[+chunkWebPath+]/img/icon-info.svg" alt="" class="map__icon">
         </div>
         <div class="map__item">
            <div class="map__content">
              <input type="radio" class="radio__input" id="radio5" name="radio"/>
              <label class="map__item-title map__radio-button radio__label map__radio-label" for="radio5">Footnote <br>
                <img src="[+chunkWebPath+]/img/icon-attention-circle.svg" alt="" class="map__icon">
                <span class="map__item-text">Nevsky Ave., 114\\116, Saint-Petersburg <br>
                <span class="map__item-dist">2.8 mi</span>
                </span>
              </label>
            </div>
          <img src="[+chunkWebPath+]/img/icon-info.svg" alt="" class="map__icon">
         </div>
         <div class="map__item">
            <div class="map__content">
              <input type="radio" class="radio__input" id="radio6" name="radio"/>
              <label class="map__item-title map__radio-button radio__label map__radio-label" for="radio6">Footnote <br>
                <img src="[+chunkWebPath+]/img/icon-attention-circle.svg" alt="" class="map__icon">
                <span class="map__item-text">Nevsky Ave., 114\\116, Saint-Petersburg <br>
                <span class="map__item-dist">2.8 mi</span>
                </span>
              </label>
            </div>
          <img src="[+chunkWebPath+]/img/icon-info.svg" alt="" class="map__icon">
         </div>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
