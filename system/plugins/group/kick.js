module.exports = {
    command: "kick",
    alias: ["sulap"],
    category: ["group"],
    settings: {
        group: true
    },
    description: "Kick Member Di Group",
    loading: true,
    async run(m, { sock, text }) {
        if (!m.isAdmin) {
            return m.reply("⚠️ *Hanya admin yang bisa menggunakan perintah ini!* ⚡️");
        }

        if (!m.isBotAdmin) {
            return m.reply("⚠️ *Bot harus menjadi admin untuk dapat melakukan tindakan ini!* ⚡️");
        }

        let users;

        if (m.mentionedJid && m.mentionedJid[0]) {
            users = m.mentionedJid[0];
        } else if (m.quoted && m.quoted.sender) {
            users = m.quoted.sender;
        } else if (text) {
            users = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        }

        if (!users) {
            return m.reply("❌ *Tag, reply, atau kirim nomor yang mau di kick.*");
        }

        try {
            await sock.groupParticipantsUpdate(m.cht, [users], 'remove');
            m.reply({
                text: `Berhasil Kick @${users.split('@')[0]}`,
                mentions: [users]
            });
        } catch (err) {
            m.reply(`Gagal Kick Member: ${err.message}`);
        }
    }
};