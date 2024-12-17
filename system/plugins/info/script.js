module.exports = {
    command: 'script',
    alias: ['sc'],
    category: ["info"],
    description: "Dapatkan Script Devolution Gratis!",
    loading: true,
    async run(m, { sock }) {
        const teks = `
🌐 *DEVOLUTION-MD1: Membuka Era Baru Bot WhatsApp* 🌐

Hai *@${m.sender.split('@')[0]}*,  
Kami dari *DEVOLUTION-DEVELOPMENT*, dengan bangga memperkenalkan _DEVOLUTION-MD1_ – sebuah script bot WhatsApp yang sedang dalam tahap *Beta* dan dikembangkan dengan visi modern untuk memenuhi kebutuhan pengguna di masa kini.

💼 *Tim Pengembang:*  
- *Selxyzz* – Koordinator Pengembangan Teknis  
- *Haidar* – Spesialis Solusi Kreatif  
- *Sanzz* – Pengurus REST API  

🔗 *Akses script dan mulai eksplorasi:*  
👉 https://github.com/DEVOLUTION-BOT/DEVOLUTION-MD1  

*Mengapa DEVOLUTION-MD1?*  
✨ Dibangun untuk mendukung kebutuhan pengelolaan WhatsApp secara efisien.  
🚀 Fitur yang terus diperbarui sesuai tren teknologi terkini.  
📢 Dukungan dari tim yang berdedikasi.  

📝 *Catatan Penting:*  
- Script ini masih versi _Beta_, jadi mungkin akan ada pembaruan dan perbaikan secara berkala.  
- Berikan dukunganmu dengan *follow* dan beri ⭐ di GitHub!  

💡 *Mari bergabung bersama kami dan jadilah bagian dari pengembangan bot ini.*  

*Salam hangat,*  
*DEVOLUTION-DEVELOPMENT*
        `;
        await m.reply(teks, { mentions: [m.sender] });
    }
};