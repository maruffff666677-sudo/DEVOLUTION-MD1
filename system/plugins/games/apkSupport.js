const axios = require('axios');

module.exports = {
   command: "apksupport",
   alias: ["apksup"],
   category: ["games"],
   settings: {
      limit: true
   },
   description: "Cari Aplikasi Dengan Apk Support",
   loading: true,
   async run(m, { config, text, sock }) {
      if (!text) {
         return m.reply(`Opsi Tidak Valid!\n\n\`BERIKUT OPSI YANG VALID\`\n> ${m.prefix + m.command} --search naruto`);
      }
      
      if (text.includes('--search')) {
         let query = text.replace('--search', '').trim();
         
         try {
            let api = await axios.get(`https://aniravecdo.online/api/searcher/apksupportsearch?q=${query}&apikey=${config.apikey}`, { timeout: 40000 });
            let result = api.data;

            if (!result || result.length === 0) {
                return m.reply('Tidak ada hasil yang ditemukan untuk pencarian: ' + query);
            }

            let message = `*Hasil Pencarian Aplikasi: ${query}*\n\n`;

            for (let i = 0; i < result.length; i++) {
                let app = result[i];
                message += `*${i + 1}. ${app.title}*\n`;
                message += `Genre: ${app.genre}\n`;
                message += `Publisher: ${app.publisher}\n`;
                message += `Rating: ${app.rating}\n`;
                message += `Downloads: ${app.download}\n`;
                message += `Link: ${app.link}\n`;

                await sock.sendMessage(m.cht, {
                    image: { url: app.img },
                    caption: message
                }, { quoted: m });

                message = '';
            }

         } catch (error) {
            console.error('Error fetching APK data:', error);
            m.reply('Terjadi kesalahan dalam mengambil data, coba lagi nanti.');
         }
      } else {
         return m.reply(`Opsi Tidak Valid!\n\n\`BERIKUT OPSI YANG VALID\`\n> ${m.prefix + m.command} --search naruto`);
      }
   }
};