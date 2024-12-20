const axios = require('axios');
const cheerio = require('cheerio');

class Ysl {
    async search(produkName) {
        try {
            const { data: html } = await axios.get(`https://www.yslbeauty.co.id/in_ID/search?q=${produkName}&lang=`);
            const _ = cheerio.load(html);
            const results = [];

            _('.c-product-tile').each((i, el) => {
                const name = _(el).find('.c-product-tile__name').text().trim();
                const price = _(el).find('.c-product-price__value').text().trim();
                const imgUrl = _(el).find('.c-product-tile__image img').attr('src');
                const description = _(el).find('.c-product-tile__description').text().trim();
                const productLink = _(el).find('.c-product-tile__overlay a').attr('href');

                results.push({
                    name,
                    price,
                    imgUrl: imgUrl ? `https://www.yslbeauty.co.id${imgUrl}` : null,
                    description,
                    productLink: productLink ? `https://www.yslbeauty.co.id${productLink}` : null,
                });
            });

            return results;
        } catch (error) {
            console.error(`Terjadi kesalahan: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new Ysl()