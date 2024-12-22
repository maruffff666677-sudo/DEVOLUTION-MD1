module.exports = {
    command: "wardah",
    alias: ["wardahbeauty"],
    category: ["cosmetic"],
    settings: {
        group: true
    },
    description: "Cari atau dapatkan detail tentang produk Wardah",
    loading: true,
    async run(m, { text, sock, Scraper }) {
        if (!text) {
            return m.reply(`*Perintah dibatalkan!*  
⛔ Tidak mendeteksi *nama produk* atau *link produk*.  

📌 *Format yang benar:*  
> ${m.prefix + m.command} lipstik  
> ${m.prefix + m.command} https://example.com`);
        }
        try {
            if (text.startsWith('http')) {
                const detail = await Scraper.wardah.detail(text);
                if (!detail.title) {
                    return m.reply(`❌ *Produk tidak ditemukan!*  
Pastikan link yang diberikan benar.`);
                }
                const teks = `
🔎 *Detail Produk Wardah*  

🛍️ *Nama Produk:* ${detail.title}  
📅 *Tanggal Rilis:* ${detail.date || 'Tidak tersedia'}  
📖 *Deskripsi:*  
${detail.content || 'Tidak tersedia'}  
🔗 *Link Produk:*  
${text}
                `;
                await sock.sendMessage(m.cht, { image: { url: detail.image }, caption: teks }, { quoted: m })
            } else {
                const searchResults = await Scraper.wardah.search(text);
                if (!searchResults.length) {
                    return m.reply(`❌ *Produk tidak ditemukan!*  
Coba masukkan nama produk yang lebih spesifik.`);
                }

                const firstResult = searchResults[0];
                const teks = `
🔍 *Hasil Pencarian Produk Wardah*  

🛍️ *Nama Produk:* ${firstResult.title}  
📅 *Tanggal Rilis:* ${firstResult.date || 'Tidak tersedia'}  
📖 *Deskripsi Singkat:*  
${firstResult.description || 'Tidak tersedia'}  
🔗 *Detail Produk:*  
${firstResult.link}
                `;
                await sock.sendMessage(m.cht, { image: { url: firstResult.image }, caption: teks }, { quoted: m })
            }
        } catch (error) {
            m.reply(`❌ *Terjadi kesalahan:*  
${error.message}`);
        }
    }
};