const mongoose = require('mongoose');
const db = process.env.ATLAS_URL;

const conenctDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db);

        console.log('MongoDB activated')

    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = conenctDB;