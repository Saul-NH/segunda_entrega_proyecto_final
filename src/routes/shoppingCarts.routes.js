import Router from 'express';
import * as shoppingCartController from '../controllers/shoppingCart.controller.js';
const shoppingCartRouter = Router();


shoppingCartRouter.get(
    '/:id/products',
    shoppingCartController.getProductsByShoppingCartId
);

shoppingCartRouter.post('/', shoppingCartController.createShoppingCart);

shoppingCartRouter.post(
    '/:id/products/:productId',
    shoppingCartController.addProductToShoppingCart
);

shoppingCartRouter.delete(
    '/:id',
    shoppingCartController.deleteShoppingCartById
);

shoppingCartRouter.delete(
    '/:id/products/:productId',
    shoppingCartController.deleteProductByIdFromShoppingCartId
);



export default shoppingCartRouter;
