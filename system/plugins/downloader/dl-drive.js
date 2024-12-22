const axios = require('axios');
const cherio = require('cheerio');

module.exports = {
  command: "drive",
  alias: ["drivedl", "drivdl"],
  category: ["downloader"],
  settings: {
    limit: true
  },
  description: "✨ Unduh file dari Google Drive dengan mudah dan cepat! 🌐",
  loading: true,
  async run(m, { sock, text }) {
    if (!text) {
      return m.reply("⚠️ *Masukkan URL Drive Anda terlebih dahulu!* 🌟");
    }
    if (!/^https?:\/\/(www\.)?drive\.google\.com\/file\/d\/.+$/.test(text)) {
      return m.reply("❌ *URL tidak valid!* Mohon gunakan URL yang benar. 🔗");
    }
    try {
      let ress = await drive(text);
      let name = ress.name;
      let dl = ress.download;
      let link = ress.link;
      let mimetype = dl.endsWith('.zip') ? 'application/zip' : 'application/octet-stream';

      let response = await axios.get(dl, { responseType: 'arraybuffer' });
      let buffer = Buffer.from(response.data, 'binary');

      await sock.sendMessage(m.cht, {
        document: buffer,
        mimetype: mimetype,
        fileName: name,
        caption: `🎉 *Berhasil mengunduh file!* 📂\n\n📛 *Nama*: ${name}\n🔗 *Link*: ${link}`,
        contextInfo: {
          externalAdReply: {
            title: name,
            body: `~ Devolution - DriveDl 🚀`,
            mediaType: 1,
            thumbnailUrl: "https://pomf2.lain.la/f/7bp4f541.jpg",
            sourceUrl: link,
            renderLargerThumbnail: true
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "20202020220@newsletter",
            newsletterName: "🌦 Devolution",
            serverMessageId: -1
          }
        }
      });
    } catch (error) {
      m.reply("💥 *Gagal mengunduh file!* Pastikan URL valid dan coba lagi. 🔄");
    }
  }
};

async function drive(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/drive\.google\.com\/file\/d\//gi.test(url)) 
        return reject("Invalid URL");
      const res = await axios.get(url).then((v) => v.data);
      const $ = cherio.load(res);
      const id = url.split("/")[5];
      const data = {
        name: $("title").text().split("-")[0].trim(),
        download: `https://drive.google.com/uc?id=${id}&export=download`,
        link: url,
      };

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}