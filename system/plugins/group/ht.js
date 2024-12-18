module.exports = {
    command: "hidetag",
    alias: ["ht"],
    category: ["group"],
    settings: {
        group: true
    },
    description: "🔒 Hidetag Di Group! 🎯",
    loading: true,
    async run(m, { text, sock }) {
        if (!m.isAdmin) {
            return m.reply("❌ Anda harus menjadi *admin* untuk menggunakan perintah ini.");
        }

        if (!m.isBotAdmin) {
            return m.reply("🤖 Bot harus menjadi *admin* untuk menggunakan perintah ini.");
        }

        if (!text) {
            return m.reply("📝 Masukkan Text Yang Ingin Kamu Jadikan Info.");
        }

        const groupMetadata = await sock.groupMetadata(m.cht).catch(e => {});
        if (!groupMetadata) {
            return m.reply("⚠️ Gagal mendapatkan informasi grup.");
        }

        const participants = groupMetadata.participants;

        sock.sendMessage(m.cht, {
            text: text,
            contextInfo: {
                mentionedJid: participants.map(a => a.id),
                groupMentions: [{
                    groupJid: m.cht,
                    groupSubject: '~ Devolution 💥'
                }]
            }
        });
    }
};