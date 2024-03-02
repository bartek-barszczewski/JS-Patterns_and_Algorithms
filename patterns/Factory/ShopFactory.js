class ProductDatabaseFactory {
    constructor(props) {
        this.register = [];
    }

    registerProductWithTax(product) {
        this.register.push(product);
        return this.register;
    }
}

class ProductFactory extends ProductDatabaseFactory {
    constructor() {
        super();
        this.props = "";
    }

    registerProduct(props) {
        const tax = 0.23;
        const taxPrice = tax * props.price;
        const finalPrice = taxPrice + props.price;

        this.props = {
            ...props,
            taxPrice,
            finalPrice,
        };

        this.registerProductWithTax(this.props);
    }

    getRegisterProducts() {
        return this.register;
    }
}

class CustomerFactory {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.phone = "";
    }

    create(props) {
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.phone = props.phone;
    }
}

class CartFactory {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }
}

const registerShopFactories = {};

registerShopFactories.product = ProductFactory;
registerShopFactories.customer = CustomerFactory;
registerShopFactories.cart = CartFactory;

class ShopFactory {
    constructor(type, props) {
        return new registerShopFactories[type](props);
    }
}

const carrot = {
    price: 4,
    name: "Carrot",
    weight: 5,
};

const tomato = {
    price: 2.45,
    name: "Tomato",
    weight: 1,
};

const banana = {
    price: 4,
    name: "Banana",
    weight: 1,
};

const customer = {
    firstName: "Adam",
    lastName: "Kowalski",
    phone: "555-333-111",
};

const shop = {};

shop.product = new ShopFactory("product");
shop.customer = new ShopFactory("customer");
shop.cart = new ShopFactory("cart");

shop.customer.create(customer);

shop.product.registerProduct(tomato);
shop.product.registerProduct(carrot);
shop.product.registerProduct(banana);

shop.cart.addProduct(carrot);
shop.cart.addProduct(banana);

console.log(shop);
