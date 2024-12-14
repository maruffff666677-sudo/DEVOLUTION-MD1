const axios = require('axios');
const fs = require('fs');

module.exports = {
  command: "mediafire",
  alias: ["mediafiredl", "mfdl"],
  category: ["downloader"],
  settings: {
    limit: true
  },
  description: "Download Mediafire Di Sini",
  loading: true,
  async run(m, { sock, text }) {
    if (!text) {
      return m.reply("Masukkan URL Mediafire");
    }
    if (!text.includes('mediafire.com')) {
      return m.reply('URL tidak valid.');
    }
    try {
      // Ambil data dari API
      let api = await mediafire(text)
      let ress = api.data.data;
      let name = ress.name;
      let filename = ress.filename;
      let type = ress.type;
      let size = ress.size;
      let created = ress.created;
      let dl = ress.media;
      let link = ress.link;

      // Download file dari URL
      let response = await axios.get(dl, { responseType: 'arraybuffer' });
      let buffer = Buffer.from(response.data, 'binary');

      // Kirim file dengan pesan detail, externalAdReply, dan forwardedNewsletterMessageInfo
      await sock.sendMessage(m.cht, {
        document: buffer,
        mimetype: type,
        fileName: filename || name,
        caption: `Berhasil mengunduh file:\n\n*Nama*: ${name}\n*Ukuran*: ${size}\n*Tipe*: ${type}\n*Dibuat*: ${created}\n*Link*: ${link}`,
        contextInfo: {
          externalAdReply: {
            title: name, // Ambil judul dari nama file
            body: `Ukuran file: ${size}`, // Ambil ukuran file sebagai deskripsi
            mediaType: 1,
            thumbnailUrl: "https://files.catbox.moe/ifru42.jpg", // URL thumbnail yang baru
            sourceUrl: link, // Gunakan link file sebagai sumber
            renderLargerThumbnail: true
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "20202020220@newsletter", // ID newsletter
            newsletterName: "🌦 Devolution", // Nama newsletter
            serverMessageId: -1 // ID server
          }
        }
      });
    } catch (error) {
      console.error(error);
      m.reply("Gagal mengunduh file. Pastikan URL valid dan coba lagi.");
    }
  }
};

const cherio = require('cheerio') 
const path = require("path");
      
async function mediafire(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/mediafire\.com\/file\//gi.test(url)) return reject("Invalid URL");
      const res = await fetch(url).then((v) => v.text());
      const $ = cherio.load(res);
      const button = $("body").find(".dl-btn-cont");
      const dlinfo = $("body").find(".dl-info");
      resolve({
        name: $(button).find("div.dl-btn-label").text().trim(),
        filename: $(button).find("div.dl-btn-label").attr("title"),
        type: path.extname($(button).find("div.dl-btn-label").attr("title")),
        size: $(dlinfo)
          .find("ul.details")
          .find("li > span")
          .eq(0)
          .text()
          .trim(),
        created:
          new Date(
            $(dlinfo).find("ul.details").find("li > span").eq(1).text().trim()
          ) - 1,
        descHeader: $(dlinfo).find("div.description > p").eq(0).text().trim(),
        desc: $(dlinfo).find("div.description > p").eq(1).text().trim(),
        media: $(button).find("a.popsok").attr("href"),
        link: url,
      });
    } catch (e) {
      reject(e);
    }
  });
}