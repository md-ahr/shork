const express = require('express');
const ShortUrl = require('../model/ShortUrl');
const router = express.Router();

router.get('/', async (req, res) => {
  const url = `${req.get('host')}/${req.body.fullUrl}`;
  const shortUrls = await ShortUrl.find().sort({ _id: -1 });
  let urlsArr = [];
  shortUrls.forEach(url => {
    const modifiedShortUrls = {
      _id: url._id,
      full: url.full,
      short: `${req.protocol}://${req.get('host')}/${url.short}`
    };
    urlsArr.push(modifiedShortUrls);
  });
  res.render('index', { title: 'SHORK', shortUrls: urlsArr })
});

router.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
});

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.save()
  res.redirect(shortUrl.full)
});

router.post('/admin/:id', async (req, res) => {
  await ShortUrl.findOneAndDelete({ id: req.params.id })
  res.redirect('/')
})

module.exports = router;
