import MongoDBContainer from '../../containers/MongoDBContainer.js';

export default class ProductMongoDBDAO extends MongoDBContainer {
    constructor(model) {
        super(model);
    }

    async add(product) {
        try {
            await this.Model.create(product);
        } catch (error) {
            console.error(error);
        }
    }

    async updateById(id, product) {
        try {
            const resourceUpdated = await this.Model.findByIdAndUpdate(
                id,
                product
            );
            if (!resourceUpdated) {
                return 'Product not found';
            }

            return `Product with ID: ${id} Updated`;
        } catch (error) {
            if (error.kind == 'ObjectId') {
                return 'Invalid id';
            }
        }
    }
}
