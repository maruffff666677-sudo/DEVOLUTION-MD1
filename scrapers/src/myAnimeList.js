const axios = require("axios");
const cheerio = require("cheerio");

class MyAnimeList {
   tags = async (tag) => {
      try {
         const { data: html } = await axios.get(`https://myanimelist.net/anime/genre/1/${tag}`);
         const $ = cheerio.load(html);

         let results = [];

         $(".js-anime-category-producer").each((i, el) => {
            const title = $(el).find(".title-text a").text().trim();
            const url = $(el).find(".title-text a").attr("href");
            const poster = $(el).find(".image img").data("src");
            const synopsis = $(el).find(".synopsis p").text().trim();
            const score = $(el).find(".score-label").text().trim();
            const members = $(el).find(".member").text().trim();
            const genres = [];

            $(el).find(".genres-inner .genre a").each((j, genreEl) => {
               genres.push($(genreEl).text().trim());
            });

            results.push({
               title,
               url,
               poster,
               synopsis,
               score,
               members,
               genres
            });
         });

         if (results.length === 0) {
            return `Tidak ada hasil yang ditemukan untuk genre "${tag}".`;
         }

         return results;
      } catch (error) {
         return `Terjadi kesalahan saat mengambil data: ${error.message}`;
      }
   }
}

module.exports = new MyAnimeList();