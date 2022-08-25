import ProductMemoryDAO from './products/ProductMemoryDAO.js'
import ShoppingCartMemoryDao from './shoppingCarts/ShoppingCartMemoryDAO.js'

import ProductFileDAO from './products/ProductFileDAO.js'
import ShoppingCartFileDAO from './shoppingCarts/ShoppingCartFileDAO.js'



export const productMemoryDAO = new ProductMemoryDAO() 
export const shoppingCartMemoryDAO = new ShoppingCartMemoryDao()

export const productFileDAO = new ProductFileDAO('./src/database/data/products.txt')
export const shoppingCartFileDAO = new ShoppingCartFileDAO('./src/database/data/shoppingCarts.txt')