import mongoose from 'mongoose';
import { MONGO_DB } from '../config.js';

(async () => {
    try {
        const db = await mongoose.connect(MONGO_DB.URL, MONGO_DB.config);
        console.log('Database is connected to: ', db.connection.name);
    } catch (error) {
        console.error('[DB ERROR]: ', error);
    }
})();
