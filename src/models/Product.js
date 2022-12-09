class Product {
    constructor(id, idStock, name, description, price, quantity) {
        this.id = id;
        this.idStock = idStock;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }    
}

module.exports = { Product };