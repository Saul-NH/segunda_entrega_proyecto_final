import ShoppingCart from '../../containers/MongoDBContainer.js';
import { productMongoDBDAO } from '../index.js';

export default class ShoppingCartMongoDBDAO extends ShoppingCart {
    constructor(model) {
        super(model);
    }
    async save() {
        const shoppingCart = await this.Model.create({});
        return shoppingCart;
    }

    async getProducts(shoppingCartId) {
        try {
            const shoppingCart = await this.getById(shoppingCartId);
            if (!shoppingCart || shoppingCart.products.length == 0) {
                return null;
            }

            return shoppingCart.products;
        } catch (error) {
            console.error(error);
            if (error.kind == 'ObjectId') {
                return 'Invalid id';
            }
        }
    }

    async addProductToShoppingCart(shoppingCartId, productId) {
        try {
            const shoppingCart = await this.getById(shoppingCartId);
            if (!shoppingCart) {
                return 'Shopping Cart not found';
            }
            const productFound = await productMongoDBDAO.getById(productId);

            if (!productFound) {
                return 'Product not found';
            }
            if (shoppingCart.products.length == 0) {
                //First product in array
                shoppingCart.products = [productFound];
            } else {
                let product = shoppingCart.products.find(
                    (product) => product._id == productId
                );
                if (!product) {
                    //Add new product to array
                    shoppingCart.products.push(productFound);
                } else {
                    // we increase the counter of the product plus 1

                    let indexProduct = shoppingCart.products.findIndex(
                        (product) => product._id == productId
                    );
                    shoppingCart.products[indexProduct].count++;
                }
            }

            await this.Model.findByIdAndUpdate(shoppingCartId, shoppingCart);

            return `Product with id ${productId} added to cart`;
        } catch (error) {
            console.error(error);
            if (error.kind == 'ObjectId') {
                return 'Invalid id';
            }
        }
    }

    async deleteProductById(shoppingCartId, productId) {
        try {
            const shoppingCart = await this.getById(shoppingCartId);

            if (!shoppingCart) {
                return 'Shopping Cart not found';
            } else {
                let product = shoppingCart.products.find(
                    (product) => product._id == productId
                );

                if (!product) {
                    return 'Product not found';
                } else {
                    let indexProduct = shoppingCart.products.findIndex(
                        (product) => product._id == productId
                    );

                    shoppingCart.products[indexProduct].count--;

                    if (shoppingCart.products[indexProduct].count === 0) {
                        // If count of product is 0 we remove it from the array
                        shoppingCart.products = shoppingCart.products.filter(
                            (product) => product._id != productId
                        );
                    }
                }

                await this.Model.findByIdAndUpdate(
                    shoppingCartId,
                    shoppingCart
                );

                return 'Product deleted';
            }
        } catch (error) {
            console.error(error);
            if (error.kind == 'ObjectId') {
                return 'Invalid id';
            }
        }
    }
}
