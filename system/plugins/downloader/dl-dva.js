module.exports = {
   command: "dvadl",
   alias: [],
   category: ["downloader"],
   settings: { limit: true },
   loading: true,
   async run(m, { sock, text, Func, Scraper }) {
      if (!text) {
         return m.reply("🔴 *Masukkan URL aplikasi terlebih dahulu!*");
      }
      if (!Func.isUrl(text)) {
         return m.reply("🚫 *URL tidak valid!* Pastikan URL yang dimasukkan benar.");
      }
      if (!text.includes('gamedva.com')) {
         return m.reply("🔍 *URL valid*, tapi hanya mendukung link dari `gamedva.com`.");
      }
      try {
         const dl = await Scraper.dva.getDownloadInfo(text);
         const linkDl = dl.link;
         const title = dl.detail.title || "Aplikasi Tidak Diketahui";
         const img = dl.detail.image || "";
         const desc = dl.detail.description || "Tidak ada deskripsi.";
         const caption = `🎮 *Title:* ${title}\n📝 *Description:* ${desc}\n\n🔗 *Link Asli:* ${dl.detail.links}\n🚀 *Siap untuk diunduh!*\n`;

         await sock.sendMessage(m.cht, {
            document: { url: linkDl },
            mimetype: "application/vnd.android.package-archive",
            fileName: `${title}.apk`,
            caption: caption,
            contextInfo: {
               externalAdReply: {
                  title: "🔴 Devolution || Room Chat",
                  body: "",
                  mediaType: 1,
                  thumbnailUrl: img,
                  sourceUrl: "https://chat.whatsapp.com/LE7EdDWaxl29DUl2rRxFCo",
                  renderLargerThumbnail: true
               }
            }
         });
      } catch (error) {
         m.reply("❌ Terjadi kesalahan saat memproses URL ini.");
         console.error(error.message)
      }
   }
};