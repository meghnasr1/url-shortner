const { nanoid } = require('nanoid');
const { URL } = require('../models/url');

async function handlegenerateShortUrl(req, res) {
    const shortID = nanoid(8);
    const body = req.body;

    if (!body || !body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHIstory: [],
    });

    return res.json({ id: shortID });
}

module.exports = {
    handlegenerateShortUrl,
};