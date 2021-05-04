import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    cover: String,
    details: String,
    file: {
        type: Buffer
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },

});


const Song = mongoose.model('Song', postSchema);
export default Song;