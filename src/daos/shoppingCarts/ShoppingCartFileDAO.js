import ShoppingCart from '../../containers/FileContainer.js';
import { productFileDAO } from '../index.js';

export default class ShoppingCartMemoryDao extends ShoppingCart {
    constructor(filename) {
        super(filename);
    }

    async save() {
        let shoppingCart = {};
        let content = await this.readFile();
        shoppingCart.id = this.buildId(content);
        shoppingCart.timestamp = Date.now();

        content.push(shoppingCart);

        await this.writeFile(content);

        return shoppingCart;
    }

    async getProducts(shoppingCartId) {
        try {
            const shoppingCart = await this.getById(shoppingCartId);
            if (
                !shoppingCart ||
                !shoppingCart.products ||
                shoppingCart.products.length === 0
            ) {
                return null;
            }

            return shoppingCart.products;
        } catch (error) {
            console.error(error);
        }
    }

    async addProductToShoppingCart(shoppingCartId, productId) {
        try {
            const shoppingCart = await this.getById(shoppingCartId);
            if (!shoppingCart) {
                return 'Shopping Cart not found';
            }

            const productFound = await productFileDAO.getById(productId);

            if (!productFound) {
                return 'Product not found';
            }

            if (!shoppingCart.products) {
                //First product in array
                productFound.count = 1;
                shoppingCart.products = [productFound];
            } else {
                let product = shoppingCart.products.find(
                    (product) => product.id === productId
                );
                if (!product) {
                    //Add new product to array
                    productFound.count = 1;
                    shoppingCart.products.push(productFound);
                } else {
                    // we increase the counter of the product plus 1

                    let indexProduct = shoppingCart.products.findIndex(
                        (product) => product.id == productId
                    );
                    shoppingCart.products[indexProduct].count++;
                }
            }

            await this.addProduct(shoppingCartId, shoppingCart);

            return `Product with id ${productId} added to cart`;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProductById(shoppingCartId, productId) {
        try {
            let shoppingCarts = await this.getAll();
            const shoppingCart = await this.getById(shoppingCartId);

            if (!shoppingCart) {
                return 'Shopping Cart not found';
            } else {
                let product = shoppingCart.products.find(
                    (product) => product.id === productId
                );

                if (!product) {
                    return 'Product not found';
                } else {
                    let indexProduct = shoppingCart.products.findIndex(
                        (product) => product.id === productId
                    );

                    shoppingCart.products[indexProduct].count--;

                    if (shoppingCart.products[indexProduct].count === 0) {
                        // If count of product is 0 we remove it from the array
                        shoppingCart.products = shoppingCart.products.filter(
                            (product) => product.id !== productId
                        );
                    }
                }

                let indexShoppingCart = shoppingCarts.findIndex(
                    (shoppingCart) => shoppingCart.id == shoppingCartId
                );

                shoppingCarts[indexShoppingCart].products =
                    shoppingCart.products;

                this.writeFile(shoppingCarts);

                return 'Product deleted';
            }
        } catch (error) {
            console.error(error);
        }
    }

    async addProduct(shoppingCartId, newShoppingCart) {
        try {
            const shoppingCarts = await this.getAll();

            const index = shoppingCarts.findIndex(
                (shoppingCart) => shoppingCart.id == shoppingCartId
            );

            shoppingCarts[index] = newShoppingCart;
            this.writeFile(shoppingCarts);
        } catch (error) {
            console.error(error);
        }
    }
}
