import fs from 'fs'
export default class FileContainer {
    
    constructor(filename) {
        this.filename = filename;
    }

    async getById(id = +id) {
        try {
            let content = await this.readFile();
            let item = content.filter((item) => item.id == id);
            return content.length == 0 ? null : item[0];
        } catch (error) {
            console.error(error);
        }
    }
    
    getAll() {
        try {
            return this.readFile();
        } catch (error) {
            console.error(error);
        }
    }
    
    async deleteById(id) {
        try {
            let content = await this.readFile();
            let item = content.filter((item) => item.id == id)
            
            if (item.length > 0) {
                this.writeFile(content.filter((item) => item.id != id));
                return 'Resource deleted'
            }else{
                return 'Resource not found'
            }

        } catch (error) {
            console.error(error);
        }
    }

    async readFile() {
        try {
            return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'));
        } catch (error) {
            console.error(error);
        }
    }
    
    async writeFile(content) {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(content));
        } catch (error) {
            console.error(error);
        }
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