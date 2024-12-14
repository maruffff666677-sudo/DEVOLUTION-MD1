const axios = require('axios');
const cheerio = require('cheerio');

class BukaLapak {
  search = async (nameProduk) => {
    try {
      const { data: html } = await axios.get(`https://m.bukalapak.com/products?source=navbar&from=omnisearch&search%5Bkeywords%5D=${nameProduk}`);
      const $ = cheerio.load(html);
      const products = [];
      
      $('.dp-card-container').each((index, element) => {
        const name = $(element).find('.dp-card__name-tag').text().trim();
        const price = $(element).find('.bl-text--body-16.bl-text--bold').text().trim();
        const discountPrice = $(element).find('.discount-price').text().trim() || "No Discount";
        const rating = $(element).find('.bl-text--caption-10').first().text().trim();
        const sold = $(element).find('.bl-text--caption-10').last().text().trim();
        const imageUrl = $(element).find('.dp-card__img').attr('src');
        const productLink = $(element).find('a.dp-card__head').attr('href');

        products.push({
          name,
          price,
          discountPrice,
          rating,
          sold,
          imageUrl,
          productLink: `https://m.bukalapak.com${productLink}`,
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  detail = async (url) => {
    try {
      const { data: kyah } = await axios.get(url);
      const $ = cheerio.load(kyah);

      const name = $('h1.c-main-info-product__product-name').text().trim();
      const price = $('span.c-product-price').first().text().trim();
      const imageUrl = $('div[data-testid="slider-items"] picture img').attr('data-src');
      const category = $('span.bl-text--secondary').first().next().text().trim();
      const condition = $('div.bl-capsule').text().trim();
      const weight = $('table.c-information__specs-table').find('tr').eq(2).find('td').text().trim();
      const brand = $('table.c-information__specs-table').find('tr').eq(3).find('a').text().trim();

      return {
        name,
        price,
        category,
        condition,
        weight,
      };
    } catch (error) {
      console.error('Error fetching product detail:', error);
      return null;
    }
  }
}

module.exports = new BukaLapak()