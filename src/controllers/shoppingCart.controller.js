import { PERSISTENCE_TYPE } from '../config.js';
let shoppingCartDAO;

if (PERSISTENCE_TYPE === 'MEMORY') {
    import('../daos/index.js').then(
        ({shoppingCartMemoryDAO}) => (shoppingCartDAO = shoppingCartMemoryDAO)
    );
}
if (PERSISTENCE_TYPE === 'FILE') {
    import('../daos/index.js').then(
        ({shoppingCartFileDAO}) => (shoppingCartDAO = shoppingCartFileDAO)
    );
}

if (PERSISTENCE_TYPE === 'MONGO') {
    import('../database/dbConection.js')
        .then(() => {})
        .then(() => {
            import('../daos/index.js').then(
                ({ shoppingCartMongoDBDAO }) => (shoppingCartDAO = shoppingCartMongoDBDAO)
            );
        })
        .catch((error) => {
            console.error(error);
        });
}

export const createShoppingCart = async (req, res) => {
    try {
        const shoppingCartCreated = await shoppingCartDAO.save();
        res.json({
            message: 'Shopping Cart created successfully',
            shoppingCartId: shoppingCartCreated.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong',
        });
    }
};

export const addProductToShoppingCart = async (req, res) => {
    try {
        const message = await shoppingCartDAO.addProductToShoppingCart(
            req.params.id,
            req.params.productId
        );

        res.json({
            message,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong',
        });
    }
};

export const getProductsByShoppingCartId = async (req, res) => {
    try {
        const productsFound = await shoppingCartDAO.getProducts(req.params.id);

        if (!productsFound) {
            return res.status(404).json({
                error: 'Shopping Cart is empty or not found',
            });
        }

        return res.json({
            products: productsFound,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong',
        });
    }
};

export const deleteProductByIdFromShoppingCartId = async (req, res) => {
    try {
        const message = await shoppingCartDAO.deleteProductById(
            req.params.id,
            req.params.productId
        );

        res.json({
            message,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong',
        });
    }
};

export const deleteShoppingCartById = async (req, res) => {
    try {
        let message = await shoppingCartDAO.deleteById(req.params.id);
        return res.json({
            message,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong',
        });
    }
};
