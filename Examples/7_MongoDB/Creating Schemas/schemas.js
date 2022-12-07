import mongoose from 'mongoose';

// Schemas are the backbone of a collection's inserted document. It is essentially the data that gets sent in as a BSON Format.
const exampleSchema = new mongoose.Schema({
    // Define your own key values, and then assign a data type for those key values.
    _id: String,
    restarts: Number,
});

// We export by default, which will also allow us to declare our import to whatever name we like.
export default mongoose.model('example', exampleSchema);

// 'example' is our collection name. It can be named however you want.
