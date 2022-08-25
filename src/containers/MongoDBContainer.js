export default class MongoDBContainer {
    constructor(model) {
        this.Model = model;
    }

    async getAll() {
        try {
            return await this.Model.find({});
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        return await this.Model.findById(id);
    }

    async deleteById(id) {
        try {
            const resourceDeleted = await this.Model.findByIdAndDelete(id);

            if (!resourceDeleted) {
                return 'Resource not found';
            }

            return `Resource with ID: ${id} Deleted`;
        } catch (error) {
            if (error.kind == 'ObjectId') {
                return 'Invalid id';
            }
        }
    }
}
