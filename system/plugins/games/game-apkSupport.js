const axios = require('axios');

module.exports = {
   command: "apksupport",
   alias: ["apksup"],
   category: ["games"],
   settings: {
      limit: true
   },
   description: "Cari dan unduh aplikasi melalui Apk Support",
   loading: true,
   async run(m, { config, text, sock }) {
      if (!text) {
         return m.reply(`❌ *Opsi Tidak Valid!*\n\n*Gunakan format berikut:*\n> \`${m.prefix + m.command} --search <query>\`\n> \`${m.prefix + m.command} --download <url>\``);
      }

      if (text.startsWith('--search')) {
         let query = text.replace('--search', '').trim();
         if (!query) {
            return m.reply(`❌ *Query tidak boleh kosong!*\nContoh: \`${m.prefix + m.command} --search naruto\``);
         }

         try {
            let response = await axios.get(`https://anira.site/api/searcher/apksupportsearch?q=${query}&apikey=${config.apikey}`, { timeout: 40000 });
            let results = response.data;

            if (!results || results.length === 0) {
               return m.reply(`🔍 *Tidak ditemukan hasil untuk:*\n\`${query}\``);
            }

            let message = `*📱 Hasil Pencarian Aplikasi: ${query}*\n\n`;
            results.forEach((app, index) => {
               message += `*${index + 1}. ${app.title}*\n`;
               message += `  - Genre: ${app.genre}\n`;
               message += `  - Publisher: ${app.publisher}\n`;
               message += `  - Rating: ${app.rating}\n`;
               message += `  - Downloads: ${app.download}\n`;
               message += `  - Link Aplikasi: ${app.link}\n\n`;
            });

            await sock.sendMessage(m.cht, {
               image: { url: results[0].img },
               caption: message
            }, { quoted: m });

         } catch (error) {
            console.error('Error fetching APK data:', error);
            m.reply('⚠️ *Terjadi kesalahan dalam mengambil data, coba lagi nanti.*');
         }

      } else if (text.startsWith('--download')) {
         let urlApk = text.replace('--download', '').trim();
         if (!urlApk.includes('apk.support')) {
            return m.reply("❌ *URL tidak valid! Pastikan URL mengarah ke situs Apk Support.*");
         }

         try {
            let response = await axios.get(`https://anira.site/api/downloader/apksupportdl?url=${urlApk}&apikey=${config.apikey}`, { timeout: 40000 });
            let result = response.data;

            if (!result || !result.info || !result.download || result.download.length === 0) {
               return m.reply('⚠️ *Gagal mengambil data aplikasi, pastikan URL benar.*');
            }

            let info = result.info;
            let downloadOptions = result.download;

            let message = `*📥 Informasi Aplikasi:*\n\n`;
            message += `*Nama:* ${info.title}\n`;
            message += `*Publisher:* ${info.publisher}\n`;
            message += `*Ukuran APK:* ${info.apk_size}\n`;
            message += `*Jumlah Unduhan:* ${info.downloads}\n`;
            message += `*Android Dibutuhkan:* ${info.requires_android}\n`;
            message += `*Diperbarui Pada:* ${info.updated_on}`;

            await sock.sendMessage(m.cht, {
               document: { 
                  url: downloadOptions[0].final_download_url 
               },
               mimetype: "application/vnd.android.package-archive",
               fileName: downloadOptions[0].name,
               caption: message
            }, { quoted: m });

         } catch (error) {
            console.error('Error downloading APK:', error);
            m.reply('⚠️ *Terjadi kesalahan dalam mengunduh data, coba lagi nanti.*');
         }

      } else {
         return m.reply(`❌ *Opsi Tidak Valid!*\n\n*Gunakan format berikut:*\n> \`${m.prefix + m.command} --search <query>\`\n> \`${m.prefix + m.command} --download <url>\``);
      }
   }
};