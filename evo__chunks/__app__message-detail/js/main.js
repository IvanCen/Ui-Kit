class CreateMessageDetail extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(messageInfo) {
    this.element = document.createElement(this.parameters.selector);
    this.date = transformationUtcToLocalDate(messageInfo.timestamp);
    this.template = `
      <div class="messages__detail-date">${this.date}</div>
      <div class="messages__detail-list">
          <div class="messages__detail-element">
              <div class="messages__detail-element-title">${messageInfo.subject}</div>
              <div class="messages__detail-element-text">${messageInfo.message}️</div>
          </div>
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
