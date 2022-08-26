import ShoppingCart from '../../containers/MemoryContainer.js';
import { productMemoryDAO } from '../index.js';

export default class ShoppingCartMemoryDao extends ShoppingCart {
    save() {
        let shoppingCart = {};
        let content = this.getAll();
        shoppingCart.id = this.buildId(content);
        shoppingCart.timestamp = Date.now();

        this.content.push(shoppingCart);

        return shoppingCart;
    }

    async getProducts(shoppingCartId) {
        try {
            const shoppingCart = await this.getById(+shoppingCartId);
            if (
                !shoppingCart ||
                !shoppingCart[0].products ||
                shoppingCart[0].products.length === 0
            ) {
                return null;
            }

            return shoppingCart[0].products;
        } catch (error) {
            console.error(error);
        }
    }

    async addProductToShoppingCart(shoppingCartId = +shoppingCartId, productId = +productId) {
        try {
            const shoppingCart = await this.getById(shoppingCartId);
            if (!shoppingCart) {
                return 'Shopping Cart not found';
            }

            const productFound = await productMemoryDAO.getById(productId);

            if (!productFound) {
                return 'Product not found';
            }

            if (!shoppingCart[0].products) {
                //First product in array
                productFound[0].count = 1;
                shoppingCart[0].products = [productFound[0]];
            } else {
                let product = shoppingCart[0].products.find(
                    (product) => product.id == productId
                );
                if (!product) {
                    //Add new product to array
                    productFound[0].count = 1;
                    shoppingCart[0].products.push(productFound[0]);
                } else {
                    // we increase the counter of the product plus 1

                    let indexProduct = shoppingCart[0].products.findIndex(
                        (product) => product.id == productId
                    );
                    shoppingCart[0].products[indexProduct].count++;
                }
            }

            await this.addProduct(shoppingCartId, shoppingCart[0]);

            return `Product with id ${productId} added to cart`;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProductById(shoppingCartId = +shoppingCartId, productId = +productId) {
        try {
            let shoppingCarts = await this.getAll();
            const shoppingCart = await this.getById(shoppingCartId);

            if (!shoppingCart) {
                return 'Shopping Cart not found';
            } else {
                let product = shoppingCart[0].products.find(
                    (product) => product.id == productId
                );

                if (!product) {
                    return 'Product not found';
                } else {
                    let indexProduct = shoppingCart[0].products.findIndex(
                        (product) => product.id == productId
                    );

                    shoppingCart[0].products[indexProduct].count--;

                    if (shoppingCart[0].products[indexProduct].count == 0) {
                        // If count of product is 0 we remove it from the array
                        shoppingCart[0].products =
                            shoppingCart[0].products.filter(
                                (product) => product.id != productId
                            );
                    }
                }

                let indexShoppingCart = shoppingCarts.findIndex(
                    (shoppingCart) => shoppingCart.id == shoppingCartId
                );
                this.content[indexShoppingCart].products =
                    shoppingCart[0].products;

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

            this.content[index] = newShoppingCart;
        } catch (error) {
            console.error(error);
        }
    }
}
