const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    command: "alkitab",
    alias: ["kitab"],
    category: ["search"],
    settings: {},
    loading: true,

    async run(m, { text }) {
        if (!text) {
            return m.reply(`❗ *Teks pencarian tidak ditemukan!*\n\nContoh penggunaan:\n${m.prefix + m.command} kejadian`);
        }

        try {
            let res = await axios.get(`https://alkitab.me/search?q=${encodeURIComponent(text)}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
                }
            });

            let $ = cheerio.load(res.data);
            let result = [];

            $('div.vw').each((a, b) => {
                let teks = $(b).find('p').text().trim();
                let link = $(b).find('a').attr('href');
                let title = $(b).find('a').text().trim();
                result.push({ teks, link, title });
            });

            let caption = result.map(v => `${v.title}\n${v.teks}`).join('\n────────\n');
            m.reply(caption);
        } catch (error) {
            m.reply('❗ *Terjadi kesalahan saat mengambil data!*');
        }
    }
};