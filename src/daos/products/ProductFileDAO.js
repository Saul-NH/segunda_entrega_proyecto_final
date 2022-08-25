import Product from '../../containers/FileContainer.js'

export default class ProductMemoryDao extends Product {
    constructor(filename){
        super(filename);
    }
    async add(product) {
        try {
            let products = await this.readFile();
            product.id = this.buildId(products);
            product.timestamp = Date.now();;
            
            products.push(product);
            
            await this.writeFile(products);

            return product;
        } catch (error) {
            console.error(error);
        }
    }

    async updateById(id, newProduct) {
        try {
            let products = await this.readFile();
            const productFound = await this.getById(id);
            
            if (!productFound) {
                return productFound
            }
            
            let index = products.findIndex((product) => product.id == id);
            let product = products[index];

            product.name = newProduct.name;
            product.description = newProduct.description;
            product.code = newProduct.code;
            product.image = newProduct.image;
            product.price = newProduct.price;
            product.stock = newProduct.stock;

            products.splice(index, 1, product);
            this.writeFile(products);

            return `Product with ID: ${id} Updated`;

        } catch (error) {
            console.error(error);
        }
    }
}