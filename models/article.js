const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title text field required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: Array,
        required: [true, 'article array is required']
    }
})

ArticleSchema.pre('save', function preSave(next) {
    now = new Date()
    this.date = now
    next()
}); 

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;