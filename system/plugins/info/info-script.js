module.exports = {
    command: 'script',
    alias: ['sc'],
    category: ["info"],
    description: "Dapatkan Script Devolution Gratis!",
    loading: true,
    async run(m, { sock }) {
        const teks = `
🌐 *🌟 DEVOLUTION-MD1: Membuka Era Baru Bot WhatsApp 🌟* 🌐  

*📌 Versi: 1.0.4 – Stabil & Siap Eksplorasi!*  

*Halo @${m.sender.split('@')[0]}!*  
Kami dari *🚀 DEVOLUTION-DEVELOPMENT 🚀*, dengan bangga mempersembahkan _*DEVOLUTION-MD1*_ – script bot WhatsApp *modern* yang dirancang untuk memenuhi kebutuhan pengguna era digital.  

📚 *💡 Tentang DEVOLUTION-MD1 💡*  
✨ *Versi 1.0.0: Stabil, Efisien, dan Kaya Fitur!*  
✨ *Dibangun untuk efisiensi maksimal dan mendukung inovasi teknologi.*  
✨ *Script siap digunakan dengan dokumentasi lengkap untuk kemudahan pengguna.*  

💼 *🌟 Tim Pengembang 🌟*  
- *Selxyzz* – 🌐 *Koordinator Pengembangan Teknis*  
- *Haidar* – 🎨 *Spesialis Solusi Kreatif*  
- *Sanzz* – 🔌 *Pengurus REST API*  
- *Rioo* – 🔧 *Pengurus Fitur Case*  
- *Vano* – 🛡️ *Pemimpin & Kebijakan Penggunaan REST API*  
- *Axel* – 🛠️ *Penyedia Base Bot & Dasar Sistem DEVOLUTION-MD1*  

🔗 *📂 Akses Script Resmi:*  
✈ https://github.com/DEVOLUTION-BOT/DEVOLUTION-MD1  

✨ *Mengapa Pilih DEVOLUTION-MD1?*  
✔️ *Dirancang untuk memenuhi kebutuhan pengelolaan WhatsApp secara efisien.*  
✔️ *Fitur canggih yang terus diperbarui sesuai tren teknologi.*  
✔️ *Dukungan dari tim profesional dan komunitas pengguna.*  

📝 *⚠️ Catatan Penting:*  
- Script ini kini telah mencapai *versi stabil (1.0.0)* dengan pembaruan rutin di masa depan.  
- Berikan dukungan dengan *follow* dan beri ⭐ di GitHub!  

🎉 *Mari bergabung bersama kami, eksplorasi potensinya, dan jadilah bagian dari revolusi bot WhatsApp ini!*  

*Salam hangat penuh semangat,*  
*💻 DEVOLUTION-DEVELOPMENT 💻*  
        `;
        await sock.sendMessage(m.cht, { text: teks, mentions: [m.sender] }, { quoted: m });
    }
};