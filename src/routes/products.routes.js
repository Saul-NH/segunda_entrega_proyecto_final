import Router from 'express';
import * as productController from '../controllers/products.controller.js';
const router = Router();


router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.post('/', productController.addProduct)
router.put('/:id', productController.updateProductById)
router.delete('/:id', productController.deleteProductById)



export default router;
