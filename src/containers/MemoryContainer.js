export default class Container {
    constructor() {
        this.content = [];
    }

    getAll() {
        return this.content;
    }
    
    getById(id = +id) {
        const item = this.getAll().filter((item) => item.id == id)
        return item.length == 0 ? null : item;
    }

    deleteById(id = +id) {
        const itemFound = this.getById(id);
        if (!itemFound) {
            return 'Resource not found'
        }
        this.content = this.getAll().filter(item => item.id != id)

        return `Resource with ID: ${id} Deleted`;
    }

    buildId(content) {
        try {
            if (content.length === 0) {
                return 1;
            } else {
                content.sort((a, b) => (a.id > b.id ? 1 : -1));
                return content[content.length - 1].id + 1;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
