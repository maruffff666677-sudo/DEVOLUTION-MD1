module.exports = {
    command: 'tqto',
    alias: ["thanksto"],
    category: ["info"],
    settings: {
       group: true
    },
    description: 'Menampilkan pesan terima kasih bertahap kepada kontributor DEVOLUTION-MD1',
    loading: true,
    async run(m, { sock }) {
        let thankYouMessage = "🎉 *TERIMA KASIH UNTUK PARA KONTRIBUTOR DEVOLUTION-MD1!* 🎉\n\n";
        
        thankYouMessage += "*🌟 Selxyzz* - Terima kasih atas kerja keras dan kreativitas luar biasa yang terus mendukung perkembangan bot ini! 🚀";
        let message = await sock.sendMessage(m.cht, { text: thankYouMessage }, { quoted: m });
        let key = message.key;

        setTimeout(async () => {
            let updatedMessage = thankYouMessage + "\n\n🌟 *Haidar* - Terima kasih telah memberikan ide-ide cemerlang yang membawa bot ini ke level berikutnya! 💡";
            await sock.sendMessage(m.cht, { text: updatedMessage, edit: key }, { quoted: m });

            setTimeout(async () => {
                updatedMessage += "\n\n🌟 *Sanzz* - Terima kasih telah menjadi bagian penting dalam perjalanan bot ini dan memberikan kontribusi yang sangat berharga! 🔧";
                await sock.sendMessage(m.cht, { text: updatedMessage, edit: key }, { quoted: m });

                setTimeout(async () => {
                    updatedMessage += "\n\n🌟 *Rioo* - Terima kasih telah mengurus bagian fitur case dan memberikan kontribusi besar untuk perkembangan bot ini! 🔥";
                    await sock.sendMessage(m.cht, { text: updatedMessage, edit: key }, { quoted: m });

                    setTimeout(async () => {
                        updatedMessage += "\n\n🌟 *Vano* - Terima kasih telah menjadi pengurus dan pemimpin dalam pemeliharaan serta pembijakan REST API, yang memungkinkan bot ini menggunakan REST API untuk berkembang lebih jauh dan efisien di masa depan! 🧑‍💻";

                        await sock.sendMessage(m.cht, { text: updatedMessage, edit: key }, { quoted: m });

                        setTimeout(async () => {
                            updatedMessage += "\n\n🌟 *Axell* - Terima kasih telah menyediakan base bot ini sehingga pengembangan fitur dapat dilakukan dengan baik dan terstruktur! 🛠️\n\n> `REST API OFFICIAL`\n> https://aniravecdo.online\n> https://devolution-cyan.vercel.app\n> https://restapii.rioooxdzz.web.id/\n> https://server.apisanz.my.id";
                            await sock.sendMessage(m.cht, { text: updatedMessage, edit: key }, { quoted: m });
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }
}