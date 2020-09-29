document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded(e) {
  const titles = document.querySelectorAll('.basket__offers-element-name');
  titles.forEach((title) => {
    if (title.textContent.length > 30) {
      const newString = `${title.textContent.substr(0, 30)}...`;
      title.textContent = newString;
    }
  });
}
