import Product from '../database/models/products.model.js';

import ProductMemoryDAO from './products/ProductMemoryDAO.js';
import ShoppingCartMemoryDao from './shoppingCarts/ShoppingCartMemoryDAO.js';

import ProductFileDAO from './products/ProductFileDAO.js';
import ShoppingCartFileDAO from './shoppingCarts/ShoppingCartFileDAO.js';

import ProductMongoDBDAO from './products/ProductMongoDBDAO.js';

//MEMORY DAO'S
export const productMemoryDAO = new ProductMemoryDAO();
export const shoppingCartMemoryDAO = new ShoppingCartMemoryDao();

//FILE DAO'S
export const productFileDAO = new ProductFileDAO(
    './src/database/data/products.txt'
);
export const shoppingCartFileDAO = new ShoppingCartFileDAO(
    './src/database/data/shoppingCarts.txt'
);

//MONGO DB DAO'S
export const productMongoDBDAO = new ProductMongoDBDAO(Product);
