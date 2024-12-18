const axios = require('axios');
const cheerio = require('cheerio');

class Wardah {
    search = async (produkName) => {
        const { data: wardah } = await axios.get(`https://www.wardahbeauty.com/id/search?q=${produkName}`);
        const $ = cheerio.load(wardah);

        const results = [];

        $('.item-box').each((i, el) => {
            const title = $(el).find('h1').text();
            const date = $(el).find('.date').text();
            const link = $(el).find('a').attr('href');
            const image = $(el).find('img').attr('src');
            const description = $(el).find('.desktop').text().trim();

            results.push({ title, date, link, image, description });
        });

        return results;
    };

    detail = async (urlProduk) => {
        const { data: wardahDetail } = await axios.get(urlProduk);
        const $ = cheerio.load(wardahDetail);

        const title = $('h1.fw-light').text();
        const date = $('span').first().text();
        const image = $('.img-fill').first().attr('src');
        const content = $('.container .row .col-md-7 p').text().trim();

        return { title, date, image, content };
    };
}

module.exports = new Wardah();