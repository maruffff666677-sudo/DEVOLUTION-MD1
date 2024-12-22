const axios = require('axios');
const cheerio = require('cheerio');

class Wallpaper {
  wallpapers = async (name) => {
    try {
      const res = await axios.get(`https://wallpapers.com/search/${name}`);
      const $ = cheerio.load(res.data);
      
      const wallpapers = [];
      
      $('li.content-card').each((i, el) => {
        const title = $(el).find('figcaption span').text();
        const imageUrl = $(el).find('img').attr('data-src');
        const detailLink = $(el).find('a').attr('href');
        
        wallpapers.push({
          title,
          imageUrl: `https://wallpapers.com${imageUrl}`,
          detailLink: `https://wallpapers.com${detailLink}`
        });
      });

      return wallpapers;
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
      return [];
    }
  };
}

module.exports = new Wallpaper();