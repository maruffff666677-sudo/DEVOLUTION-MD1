module.exports = {
  command: "mediafire",
  alias: ["mediafiredl", "mfdl"],
  category: ["downloader"],
  settings: {
    limit: true
  },
  description: "📥 Download file dari Mediafire dengan cepat! 🚀",
  loading: true,
  async run(m, { sock, text }) {
    if (!text) {
      return m.reply("⚠️ *Masukkan URL Mediafire terlebih dahulu!* 🌐");
    }
    if (!text.includes('mediafire.com')) {
      return m.reply('❌ *URL tidak valid!* Pastikan URL Mediafire benar. 🔗');
    }
    try {
      const response = await fetch(`https://restapii.rioooxdzz.web.id/api/mediafire?url=${text}`);
      const json = await response.json();
      
      if (!json.data.response) throw '❌ *Gagal mengambil data!*';

      let { download, filename, size, ext, uploaded, mimetype } = json.data.response;

      let caption = `
🎉 *Berhasil Mengunduh File!* 📂
*💌 Nama:* ${filename}
*📊 Ukuran:* ${size}
*🗂️ Ekstensi:* ${ext}
*📨 Diunggah:* ${uploaded}
`.trim();

      await sock.sendMessage(m.cht, {
        document: { url: download },
        mimetype: mimetype,
        fileName: filename,
        caption: caption,
        contextInfo: {
          externalAdReply: {
            title: filename,
            body: `📏 Ukuran: ${size}`,
            mediaType: 1,
            thumbnailUrl: "https://files.catbox.moe/ifru42.jpg",
            sourceUrl: download,
            renderLargerThumbnail: true
          },
        }
      });

    } catch (error) {
      console.error(error);
      m.reply("💥 *Gagal mengunduh file!* Pastikan URL valid dan coba lagi. 🔄");
    }
  }
};