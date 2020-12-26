const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsModel = new Schema({
    title: { type: String },
    description: { type: String },
    url: { type: String },
    urlToImg: { type: String },
    isSportsNews: { type: Boolean, default: false },
    publishedAt: { type: String }
})

module.exports = mongoose.model('news', newsModel, 'news_list')

