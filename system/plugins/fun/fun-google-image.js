module.exports = {
   command: "gimage",
   alias: ["google-image"],
   category: ["fun"],
   settings: {
      limit: true
   },
   description: "Cari Gambar Dengan Google 🌐📸✨",
   loading: true,
   async run(m, { text, sock }) {
     if (!text) {
        return m.reply("❌ *Tidak Ada Query Pencarian* ❌");
     }
     try {
        let api = await fetch(`https://api.siputzx.my.id/api/images?query=${text}`);
        let json = await api.json();
        let gambarList = json.data;

        if (gambarList.length === 0) {
            return m.reply("❌ *Tidak ada gambar yang sesuai ditemukan* ❌");
        }

        let firstImage = gambarList[0];
        await sock.sendMessage(m.cht, { image: { url: firstImage.url }, caption: `🎉 *Sisa ${gambarList.length - 1} gambar akan dikirim ke pribadi* 🎉`, quoted: m });

        for (let i = 1; i < gambarList.length; i++) {
            let image = gambarList[i];
            await sock.sendMessage(m.sender, { image: { url: image.url }, caption: `📸 *Gambar ke-${i + 1}* 📸` }, { quoted: m });
        }

        m.reply(`🎉🎉 *Semua gambar telah dikirim! 🎉🎉*`);
     } catch (error) {
        console.error(error);
        m.reply("⚠️ *Terjadi kesalahan dalam mencari gambar* ⚠️");
     }
   }
}