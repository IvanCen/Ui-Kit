class Search {
  constructor(parameters) {
    this.parameters = parameters;
  }

  convertItemsArrayToObject(items) {
    const output = {};
    for (const item of items) {
      output[item] = item;
    }
    return output;
  }

  getChildrenItems(category) {
    let items = [];
    if (typeof category.items === 'object') {
      items = items.concat(category.items);
    }
    if (typeof category.children === 'object') {
      for (const childCategory of Object.values(category.children)) {
        items = items.concat(this.getChildrenItems(childCategory));
      }
    }
    return items;
  }

  getChildrenCategories(id, categories) {
    if (typeof categories[id] === 'object') {
      return categories[id];
    }
    for (const categoryId of Object.keys(categories)) {
      if (typeof categories[categoryId].children === 'undefined') {
        // eslint-disable-next-line no-continue
        continue;
      }
      const result = this.getChildrenCategories(id, categories[categoryId].children);
      if (result !== false) {
        return result;
      }
    }
    return false;
  }
}
