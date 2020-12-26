
const News = require('./../../models/media.news')

exports.addNews = (req, res) => {
    const { body } = req;
    const d0 = Date.now();
    const d = new Date(d0).toLocaleDateString()
    body.publishedAt = new Date();
    News.create(body, (err, News) => {
        if (err) return res.status(500).send('There was a problem with adding news');
        res.status(201).send({ Message: 'News Added', body });
    })
}

exports.News = (req, res) => {
    News.find({}).sort('-publishedAt').exec((err, News) => {
        if (err) return res.status(500).send('No news added');

        res.status(201).send({ News });

    })
}

exports.listGeneralNews = (req, res) => {
    News.find({}).where({ isSportsNews: 'false' }).sort('-publishedAt').limit(3).exec((err, News) => {
        if (err) return res.status(500).send('No news added');

        res.status(201).send({ News });

    })
}

exports.listSportsNews = (req, res) => {
    News.find({}).where({ isSportsNews: 'true' }).sort('-publishedAt').limit(3).exec((err, News) => {
        if (err) return res.status(500).send('No news added');

        res.status(201).send({ News });

    })
}

exports.updateNews = (req, res) => {
    return new Promise((resolve, reject) => {
        return News.findOneAndUpdate({ _id: req.params.id }, req.body).exec(
            (err, items) => {
                if (err) return reject(res.status(500).send(new Error(err)));
                if (!items) return reject(res.status(400).send(new Error('No News found')));
                return resolve(res.status(200).send({ message: 'News updated successfully!' }));
            }
        );
    });
}

exports.deleteNews = req => {
    return new Promise((resolve, reject) => {
        return News.deleteOne({ _id: req.params.id }).exec((err, items) => {
            if (err) return reject(res.status(500).send(new Error('No News found')));
            if (!items) return reject(res.status(400).send(new Error('No News found')));
            return resolve(res.status(200).send({ message: 'News deleted successfully!' }));
        });
    });
};