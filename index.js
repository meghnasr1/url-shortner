const express = require('express');
const app = express();
const PORT = 8001;
const urlRoute = require('./routes/url');
const { connectToMongoose } = require('./connect');
const { URL } = require('./models/url');

app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHIstory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.redirect(entry.redirectURL);
});

async function startServer() {
    await connectToMongoose('mongodb://127.0.0.1:27017/my-app-2');

    app.listen(PORT, () => {
        console.log('Server Started at PORT:', PORT);
    });
}

startServer();