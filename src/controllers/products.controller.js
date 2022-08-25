import { PERSISTENCE_TYPE } from '../config.js';
let productDAO;

if (PERSISTENCE_TYPE === 'MEMORY') {
    import('../daos/index.js').then(
        ({productMemoryDAO}) => (productDAO = productMemoryDAO)
    );
}
if (PERSISTENCE_TYPE === 'FILE') {
    import('../daos/index.js').then(
        ({productFileDAO}) => (productDAO = productFileDAO)
    );
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productDAO.getAll();
        res.json({
            count: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = (req, res) => {
    try {
        productDAO.add(req.body);
        res.json({
            message: 'Product added successfully',
        });
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async(req, res) => {
    try {
        const product = await productDAO.getById(+req.params.id);
        if (!product) {
            return res.json({
                message: 'Product not found',
            });
        }
        res.json({
            product,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateProductById = async(req, res) => {
    try {
        res.json({
            message: await productDAO.updateById(+req.params.id, req.body),
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductById = async(req, res) => {
    try {
        res.json({
            message: await productDAO.deleteById(+req.params.id),
        });
    } catch (error) {
        console.log(error);
    }
};
