const axios = require('axios');
const cheerio = require('cheerio');

async function liveChart(anime) {
  try {
    const { data: html } = await axios.get(`https://www.livechart.me/search?q=${anime}`);
    const $ = cheerio.load(html);

    const animeData = [];

    $('.grouped-list-item.anime-item').each((index, element) => {
      const title = $(element).data('title');
      const premiere = $(element).find('[data-action="click->anime-item#showPremiereDateTime"]').text().trim();
      const rating = $(element).find('.icon-star').parent().text().trim();
      const poster = $(element).find('img').attr('src');
      const link = `https://www.livechart.me${$(element).find('a[data-anime-item-target="mainTitle"]').attr('href')}`;
  if (link && rating) {
      animeData.push({
        title,
        premiere,
        rating,
        poster,
        link,
      });
  }
    });

    return animeData;
  } catch (error) {
    console.error(`Error fetching anime data: ${error.message}`);
    return [];
  }
}

module.exports = { liveChart }