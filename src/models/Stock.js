class Stock {
    constructor(id, name, description, items = 0, totalItems = 0, products = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.items = items;
        this.totalItems = totalItems;
        this.products = products;
    }

    totalItems(items, totalItems) {
        return items * totalItems;
    }
}

module.exports = { Stock };