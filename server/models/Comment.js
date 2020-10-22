const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    writer : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video'
    },
    reponseTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content: {
        type:String
    }
}, { timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }