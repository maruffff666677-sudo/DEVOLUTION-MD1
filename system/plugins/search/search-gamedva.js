module.exports = {
    command: "gamedva",
    alias: ["game-dva", "carigame", "searchgame"],
    category: ["search"],
    settings: { limit: true },
    loading: true,
    
    async run(m, { text, Scraper }) {
        if (!text) {
            return m.reply(`╭═══❯ *GAME SEARCH* ❮═══
│
│ ❌ Masukkan nama game yang ingin
│    dicari!
│ 
│ 📝 *Contoh:*
│ .gamedva minecraft
│ .gamedva gta
│
╰═════════════════════`);
        }

        try {
            await m.reply("🎮 *Searching game...*");
            
            const data = await Scraper.dva.searchApp(text);
            
            if (!data || data.length === 0) {
                return m.reply(`╭═══❯ *GAME NOT FOUND* ❮═══
│
│ ❌ Game "${text}" tidak ditemukan!
│ 
│ 💡 *Tips:*
│ • Periksa ejaan nama game
│ • Coba kata kunci lain
│ • Gunakan nama game yang populer
│
╰═════════════════════`);
            }

            let caption = `╭═══❯ *GAME RESULTS* ❮═══
│
│ 🎯 *Kata Kunci:* ${text}
│ 📱 *Total:* ${data.length} hasil
│
╰═════════════════════\n\n`;

            data.forEach((game, index) => {
                caption += `╭═══❯ *GAME ${index + 1}* ❮═══
│
│ 🎮 *Title:* ${game.title}
│ 📱 *Version:* ${game.version}
│ 
│ 🔗 *Download:*
│ ${game.link}
│
╰═════════════════════\n\n`;
            });

            caption += `💡 *Tips:*
• Ketik dvaDl < url downloas > Untuk Mendownload
• Pastikan versi sesuai device
• Baca petunjuk instalasi

📝 *Note:* Gunakan aplikasi eksternal
untuk mendownload APK.`;

            await m.reply(caption);

        } catch (error) {
            console.error('Error in gamedva command:', error);
            return m.reply(`╭══════════════════════
│ ❌ *Terjadi Kesalahan*
│ Mohon coba beberapa saat lagi
╰══════════════════════`);
        }
    }
};