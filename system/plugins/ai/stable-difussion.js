const axios = require('axios');

module.exports = {
   command: "diffusion",
   alias: ["text2img-2"],
   category: ["ai"],
   settings: {
     group: true,
     limit: true
   },
   description: "Buat Gambar Anda Dengan Stable Diffusion",
   loading: true,
   async run(m, { text, sock, config }) {
     if (!text) {
        return m.reply(`Penggunaan Anda Salah!\n\n> ${m.prefix + m.command} Girl in cross`)
     }
     try {
        let api = await axios.get(`https://aniravecdo.online/api/ai/t2image1?q=${text}&apikey=` + config.apikey);
        let result = api.data.result;

        if (result && result.length > 0) {
            let caption = `*🎨 Hasil Gambar Stable Diffusion*\n\n🔍 *Prompt*: ${text}\n🖼️ *Jumlah Gambar*: ${result.length}\n\n⚠️ *Note*: Sisa gambar akan di kirim ke private chat.`;

            await sock.sendMessage(m.cht, { image: { url: result[0] }, caption }, { quoted: m });
            
            let privateCaption = `*📨 Gambar Tambahan:*\nBerikut adalah sisa gambar dari prompt *${text}* yang Anda minta.`;
            await sock.sendMessage(m.sender, { text: privateCaption });

            for (let i = 1; i < result.length; i++) {
                await sock.sendMessage(m.sender, { image: { url: result[i] }, caption: "" });
            }
        } else {
            m.reply(`⚠️ Tidak ada hasil gambar yang ditemukan untuk prompt: *${text}*`);
        }
     } catch (error) {
        console.error(error);
        m.reply(`❌ Terjadi kesalahan saat mengambil gambar!\n\n🔍 Detail Error: ${error.message}`);
     }
   }
}