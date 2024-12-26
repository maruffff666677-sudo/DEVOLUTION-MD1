const util = require("util");
const config = require("../settings.js");
const { exec } = require("child_process");
const fs = require("node:fs");
const axios = require("axios");
const Func = require("../lib/function");
const { writeExif } = require("../lib/sticker");
const { catbox } = require("../lib/uploader");
const { downloadContentFromMessage } = require('baileys');


module.exports = async (m, sock, store) => {
    const isCommand = m.prefix && m.body.startsWith(m.prefix);
    const quoted = m.isQuoted ? m.quoted : m;
    const scrape = await scraper.list();
    const text = m.isQuoted ? m.quoted.body : m.text;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    switch (isCommand ? m.command.toLowerCase() : false) {
    case "llama":{
    let input = m.isQuoted ? m.quoted.body : m.text;
    if (!input) {
      return m.reply("Input textnya?");
    }

    try {
      let pee = await axios.get(`https://restapii.rioooxdzz.web.id/api/llama?message=${input}`);
      let llamaResponse = pee.data.data.response;
      await m.reply(llamaResponse)
    } catch (e) {
      console.error(e.message);
      return m.reply("Llama Sedang Maintenance");
    }
  }
  break
        case "sticker":
        case "s": {
            try {
                if (/image|video|webp/.test(quoted.msg?.mimetype)) {
                    let media = await quoted.download();
                    if (quoted.msg?.seconds > 10) throw "> Video di atas durasi 10 detik tidak bisa";

                    let exif = m.text
                        ? { packName: m.text.split("|")[0] || "", packPublish: m.text.split("|")[1] || "" }
                        : { packName: config.sticker.packname, packPublish: m.pushName };

                    let sticker = await writeExif({ mimetype: quoted.msg.mimetype, data: media }, exif);
                    await sock.sendMessage(m.cht, { sticker }, { quoted: m });
                } else {
                    m.reply("> Reply foto atau video yang ingin dijadikan stiker");
                }
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${error.message}`);
            }
            break;
        }

        case "smeme": {
            try {
                if (!/image/.test(quoted.msg?.mimetype)) {
                    return m.reply(`Kirim/kutip gambar dengan caption ${m.prefix + m.command} San|Abc`);
                }

                let atas = text.split("|")[0] || "-";
                let bawah = text.split("|")[1] || "-";

                let media = await quoted.download();
                let url = await catbox(media); // Menggunakan uploader

                // Buat URL meme
                let smemeUrl = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${url}`;

                // Convert ke stiker
                let sticker = await writeExif(
                    { mimetype: "image/png", data: await axios.get(smemeUrl, { responseType: "arraybuffer" }).then((res) => res.data) },
                    { packName: config.sticker.packname, packPublish: config.sticker.author }
                );

                await sock.sendMessage(m.chat, { sticker }, { quoted: m });
            } catch (error) {
                m.reply(`Gagal membuat meme: ${error.message}`);
            }
            break;
        }

case 'confess':
case 'menfess': {
    this.menfes = this.menfes ? this.menfes : {}
    
    // Check existing session
    const roof = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
    if (roof) {
        return m.reply(`╭━━━━━━━━━━━━━━┅
│ ⚠️ *SESI AKTIF*
├━━━━━━━━━━━━━━┅
│ Kamu masih berada dalam
│ sesi menfess yang aktif!
│ Tunggu hingga selesai...
╰━━━━━━━━━━━━━━┅`)
    }

    // Validate private chat
    if (m.isPc) {
        return m.reply({ 
            text: `╭━━━━━━━━━━━━━━┅
│ 🔒 *PRIVATE ONLY*
├━━━━━━━━━━━━━━┅
│ Fitur ini khusus untuk
│ penggunaan pribadi!
╰━━━━━━━━━━━━━━┅`, 
            quoted: m.fverif 
        })
    }

    // Validate input format
    if (!text || !text.includes(' ')) {
        return m.reply(`╭━━━━━━━━━━━━━━┅
│ ℹ️ *CARA PENGGUNAAN*
├━━━━━━━━━━━━━━┅
│ ${m.prefix + m.command} nama 628xxx pesan
│
│ 📝 *Contoh:*
│ ${m.prefix + m.command} Rahasia 628776xxxx
│ Hay, I like you!
╰━━━━━━━━━━━━━━┅`)
    }

    // Parse input
    let [namaNya, nomorNya, ...pesanArray] = text.split` `
    let pesanNya = pesanArray.join(' ')

    // Validate number format
    if (nomorNya.startsWith('0') || isNaN(nomorNya)) {
        return m.reply(`╭━━━━━━━━━━━━━━┅
│ ⚠️ *FORMAT SALAH*
├━━━━━━━━━━━━━━┅
│ Gunakan format 628xxx
│ bukan 08xxx
│
│ 📝 *Contoh:*
│ ${m.prefix + m.command} Rahasia 628776xxxx
│ Hay, I like you!
╰━━━━━━━━━━━━━━┅`)
    }

    // Prepare menfess message
    const menfessText = `╭━━━━━━━━━━━━━━┅
│ 💌 *PESAN RAHASIA*
├━━━━━━━━━━━━━━┅
│ Dari: ${namaNya}
│ 
│ ${pesanNya}
├━━━━━━━━━━━━━━┅
│ Reply:
│ • *Balasmenfes* - Terima
│ • *Tolakmenfess* - Tolak
╰━━━━━━━━━━━━━━┅`

    // Create session
    let id = m.sender
    this.menfes[id] = {
        id,
        a: m.sender,
        b: nomorNya + "@s.whatsapp.net",
        state: 'WAITING'
    }

    // Send notification to target
    await sock.sendMessage(nomorNya + "@s.whatsapp.net", { 
        text: `╭━━━━━━━━━━━━━━┅
│ 📨 *MENFESS BARU*
├━━━━━━━━━━━━━━┅
│ Kamu menerima pesan 
│ rahasia baru!
│ Cek sekarang...
╰━━━━━━━━━━━━━━┅`, 
        quoted: m.fverif 
    })

    // Send success message
    return m.reply(`╭━━━━━━━━━━━━━━┅
│ ✅ *TERKIRIM*
├━━━━━━━━━━━━━━┅
│ Pesan telah dikirim ke
│ nomor tujuan!
│
│ Tunggu balasan ya...
╰━━━━━━━━━━━━━━┅`)
}
break

case 'balasconfess':
case 'balasmenfess': {
roof = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
if (!roof) return m.reply("Belum ada sesi menfess sebelumnya!")
find = Object.values(this.menfes).find(menpes => menpes.state == 'WAITING')
let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING')
let other = [room.a, room.b].find(user => user !== m.sender)
find.b = m.sender
find.state = 'CHATTING'
this.menfes[find.id] = {...find}
await sock.sendMessage(other, {text: `@${m.sender.split("@")[0]} telah menerima menfess mu, sekarang kamu bisa chatan lewat bot ini!\n\n*NOTE:* Ketik ${m.prefix}stopmenfess untuk stop`, mentions: [m.sender]})
sock.sendMessage(m.cht, {text: `Menfess telah siterima, sekarang kamu bisa chatan lewat bot ini!\n\n*NOTE:* Ketik ${m.prefix}stopmenfess untuk stop`})
}
break

case 'tolakconfess':
case 'tolakmenfess': {
roof = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
if (!roof) return m.reply("Belum ada sesi menfess aebelumnya!")
let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING')
let other = [room.a, room.b].find(user => user !== m.sender)
find = Object.values(this.menfes).find(menpes => menpes.state == 'WAITING')
sock.sendMessage(other, {text: `${m.sender.split("@")[0]} menolak menfess dari mu...`, mentions: [m.sender]})
m.reply('Menfess berhasil ditolak!')
delete this.menfes[roof.id]
}
break
case 'wm':
case 'swm': {
    try {
        if (!m.quoted) {
            return m.reply(`Kirim/kutip stiker atau media lalu ketik ${m.prefix + m.command} San|Abc`);
        }

        let text = m.text.split('|');
        let packname = text[0]?.trim() || config.sticker.packname;
        let author = text[1]?.trim() || config.sticker.author;

        await sock.sendMessage(m.cht, { react: { text: "🔎", key: m.key } });

        if (/image|video|webp/.test(quoted.msg?.mimetype)) {
            let media = await quoted.download();

            if (/video/.test(quoted.msg?.mimetype) && quoted.msg?.seconds > 25) {
                return m.reply('Maksimal durasi video adalah 25 detik!');
            }

            let sticker = await writeExif(
                { mimetype: quoted.msg.mimetype, data: media },
                { packName: packname, packPublish: author }
            );

            if (sticker) {
                await sock.sendMessage(m.cht, { sticker }, { quoted: m });
            } else {
                m.reply('Gagal membuat stiker dengan watermark.');
            }
        } else {
            m.reply(`Kirim/kutip stiker, foto, atau video lalu ketik ${m.prefix + m.command} San|Abc`);
        }
    } catch (error) {
        m.reply(`Terjadi kesalahan: ${error.message}`);
    }
}
break;
case "ssearch": {
const axios = require("axios");
const cheerio = require("cheerio");

class Sticker {
  constructor(stickerPackName, url = null) {
    this.sticker = stickerPackName;
    this.BASE_URL = "https://getstickerpack.com/stickers?query=" + this.sticker;
    this.url = url;
  }

  async search() {
    try {
      const { data: html } = await axios.get(this.BASE_URL);
      const $ = cheerio.load(html);
      const stickerPacks = [];

      $(".sticker-pack-cols").each((i, el) => {
        const packUrl = $(el).find("a").attr("href");
        const trayImage = $(el).find("img").attr("src");
        const username = $(el).find(".username").text();
        const title = $(el).find(".title").text();

        stickerPacks.push({ packUrl, trayImage, username, title });
      });

      return stickerPacks;
    } catch (error) {
      console.error("Error fetching stickers:", error);
      return [];
    }
  }
  async download() {
    try {
      const { data: hl } = await axios.get(this.url);
      const $ = cheerio.load(hl);
      const stickers = [];

      $(".sticker-image").each((i, el) => {
        const stickerImage = $(el).attr("data-src-large");
        stickers.push(stickerImage);
      });

      return stickers;
    } catch (error) {
      console.error("Error downloading stickers:", error);
    }
  }
}
  try {
    if (m.text) {
      const stickerName = m.text.trim();
      const data = new Sticker(stickerName);
      const results = await data.search();

      if (results && results.length > 0) {
        let message = "Stiker ditemukan, pilih pack yang ingin diunduh:\n\n";
        results.forEach((result, index) => {
          message += `${index + 1}. *${result.title}* oleh ${result.username}\n`;
          message += `Preview: ${result.trayImage}\n`;
          message += `Pack Url: ${result.packUrl}\n\n`
        });

        m.reply(message);
      } else {
        m.reply("Tidak ditemukan stiker dengan kata kunci tersebut.");
      }
    } else {
      m.reply("Masukkan kata kunci untuk mencari stiker.");
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
  break;
}       
case "download_sticker":
case "ds": {
const axios = require("axios");
const cheerio = require("cheerio");

class Sticker {
  constructor(stickerPackName, url = null) {
    this.sticker = stickerPackName;
    this.BASE_URL = "https://getstickerpack.com/stickers?query=" + this.sticker;
    this.url = url;
  }

  async search() {
    try {
      const { data: html } = await axios.get(this.BASE_URL);
      const $ = cheerio.load(html);
      const stickerPacks = [];

      $(".sticker-pack-cols").each((i, el) => {
        const packUrl = $(el).find("a").attr("href");
        const trayImage = $(el).find("img").attr("src");
        const username = $(el).find(".username").text();
        const title = $(el).find(".title").text();

        stickerPacks.push({ packUrl, trayImage, username, title });
      });

      return stickerPacks;
    } catch (error) {
      console.error("Error fetching stickers:", error);
      return [];
    }
  }

  async download() {
    const { data: html } = await axios.get(this.url);
    const $ = cheerio.load(html);
    const imageUrls = [];

    $(".sticker-image").each((i, el) => {
      const imageUrl = $(el).attr("data-src-large");
      imageUrls.push(imageUrl);
    });

    return imageUrls;
  }
}
    m.react("🕖 ") 
  try {
    if (m.text) {
      const stickerUrl = m.text.trim();
      const data = new Sticker("", stickerUrl);
      const imageUrls = await data.download();
      await m.reply("*Semua Sticker Di Kirim Lewat Private Untuk Mengindari Spam.*") 
        
      if (imageUrls && imageUrls.length > 0) {
        for (const imageUrl of imageUrls) {
          const media = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(media.data, 'binary');
          let exif = { packName: "Devolution", packPublish: m.pushName };

          let sticker = await writeExif({ mimetype: 'image/png', data: buffer }, exif);
          await sock.sendMessage(m.sender, { sticker }, { quoted: m });
        }
        m.reply("Semua stiker berhasil diunduh dan dikirim.");
      } else {
        m.reply("Tidak ada gambar ditemukan untuk stiker.");
      }
    } else {
      m.reply("Masukkan URL untuk mengunduh stiker.");
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
  break;
}
        case "brat": {
            try {
                let input = m.isQuoted ? m.quoted.body : m.text;
                if (!input) return m.reply("> Reply/Masukan pesan");

                m.reply(config.messages.wait);
                let media = await scrape.brat(input);
                let sticker = await writeExif(
                    { mimetype: "image", data: media },
                    { packName: config.sticker.packname, packPublish: config.sticker.author }
                );

                await sock.sendMessage(m.cht, { sticker }, { quoted: m });
            } catch (error) {
                m.reply(`Gagal membuat stiker BRAT: ${error.message}`);
            }
            break;
        }

        default:
        if (db.list().group[m.cht].antilinkv1) {
            if (m.body.match('https://')) {
                const adminMessage = `⚡ 𝗣𝗲𝗿𝗶𝗻𝗴𝗮𝘁𝗮𝗻
🔒 Kamu Admin Kamu Aman Bree🤣`;
        
                if (!m.isAdmin) return m.reply(adminMessage);
                if (!m.key.fromMe) return m.reply(adminMessage);
                if (!m.isOwner) return m.reply(adminMessage);
        
                await sock.sendMessage(m.cht, {
                    delete: {
                        remoteJid: m.cht,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
        
                const warningText = `🛡️ 𝗦𝗶𝘀𝘁𝗲𝗺 𝗔𝗻𝘁𝗶𝗹𝗶𝗻𝗸
        
⚠️ 𝗣𝗲𝗺𝗯𝗲𝗿𝗶𝘁𝗮𝗵𝘂𝗮𝗻:
Demi keamanan grup, pengiriman tautan tidak diizinkan.        
🔒 𝗧𝗶𝗻𝗱𝗮𝗸𝗮𝗻:
Sistem akan menghapus pesan yang mengandung tautan.       
📌 𝗞𝗲𝗯𝗶𝗷𝗮𝗸𝗮𝗻:
Hanya admin & pengelola yang dapat mengirim tautan.`;
        
                await sock.sendMessage(m.cht, {
                    text: warningText
                }, { quoted: m.fopenai });
            }
        }
        if (m.body.startsWith('@6283168629450')) {
         if (!m.text || !m.quoted.text) {
            return m.reply("Masukkan Pertanyaan Mu Bree🤣")
         }
         let input = m.text ? m.text : m.quoted.text
          const apiResponse = await fetch(`https://anira.site/api/ai/claude?q=${encodeURIComponent(text)}&apikey=${config.apikey}`);
            const json = await apiResponse.json();

            if (!json || !json.result) {
                return m.reply("Tidak dapat menerima respons dari AI. Coba lagi nanti.");
            }

            const cleanedResponse = json.result.replace(/\*\*/g, "*");
            await m.reply(cleanedResponse);
        }
            // Eval command untuk owner
        if (
        [">", "eval", "=>"].some((a) =>
          m.command.toLowerCase().startsWith(a),
        ) &&
        m.isOwner
      ) {
        let evalCmd = "";
        try {
          evalCmd = /await/i.test(m.text)
            ? eval("(async() => { " + m.text + " })()")
            : eval(m.text);
        } catch (e) {
          evalCmd = e;
        }
        new Promise((resolve, reject) => {
          try {
            resolve(evalCmd);
          } catch (err) {
            reject(err);
          }
        })
          ?.then((res) => m.reply(util.format(res)))
          ?.catch((err) => m.reply(util.format(err)));
      }
            // Exec command untuk owner
            if (["exec", "$"].includes(m.command.toLowerCase()) && m.isOwner) {
                try {
                    exec(m.text, (err, stdout) => {
                        if (err) return m.reply(util.format(err));
                        m.reply(util.format(stdout));
                    });
                } catch (error) {
                    m.reply(util.format(error));
                }
            }
    }
};



// Auto reload file
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    delete require.cache[file];
    console.log(`File ${file} telah diperbarui`);
});