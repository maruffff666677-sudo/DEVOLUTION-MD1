const axios = require("axios");

module.exports = {
    command: "cuaca",
    alias: ["suhu"],
    category: ["info"],
    settings: {
        group: true,
    },
    loading: true,
    async run(m, { text, sock }) {
        try {
            if (!text) {
                return m.reply("❗ *Masukkan nama kota atau daerah untuk mengecek cuaca!* ❗");
            }

            let response = await axios.get(`https://server.apisanz.my.id/search/cuaca?text=${text}`);
            let { caption, iconUrl } = response.data.data;

            await sock.sendMessage(
                m.cht, 
                {
                    image: { url: iconUrl },
                    caption: `🌤️ *Cuaca untuk daerah: ${text}*\n\n${caption}`,
                },
                { quoted: m }
            );
        } catch (error) {
            console.error(error.message);
            return m.reply("❗ *Terjadi kesalahan saat mengambil data cuaca.* ❗");
        }
    },
};