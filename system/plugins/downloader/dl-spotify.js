const axios = require("axios");

module.exports = {
    command: "spotify",
    alias: [],
    category: ["downloader"],
    settings: {
        limit: true
    },
    description: "🎶 *Mencari/Download Musik dari Spotify* 🎧",
    loading: true,
    async run(m, { sock, Func, Scraper, text }) {
        if (!text) throw `
*📋 Cara Penggunaan:*
🔍 *Masukkan Query untuk mencari musik*  
🔗 *Masukkan URL untuk mendownload musik Spotify*

*🎯 Contoh Penggunaan:*
➤ *${m.prefix + m.command} Video lucu*  
➤ *${m.prefix + m.command} https://open.spotify.com/track/057YRaQ57p70MVg4hMIIkB*  
`;

        if (/open.spotify.com/.test(text)) {
            let data = await Scraper.spotify.download(text);
            m.reply({
                audio: {
                    url: data.download,
                },
                mimetype: "audio/mpeg"
            });
        } else {
            let data = await Scraper.spotify.search(text);
            let cap = `🎧 *SPOTIFY - Pencarian Musik* 🎶\n\n`;
            cap += `🔗 Ketik *${m.prefix + m.command} ${data[0].url}* untuk mendownload musik dari Spotify\n\n`;
            cap += data.map((a) => Object.entries(a).map(([b, c]) => `🔹 *${b.capitalize()}* : ${c}`).join("\n")).join("\n\n");
            m.reply(cap);
        }
    }
};