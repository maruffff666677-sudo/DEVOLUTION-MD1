module.exports = {
    command: "linkgc",
    alias: ["gclink"],
    category: ["group"],
    settings: {
        group: true,
    },
    description: "*💥 Dapatkan Link Group Ini 💥*",
    loading: true,

    async run(m, { sock, config }) {
      const groupMetadata = m.isGroup ? await sock.groupMetadata(m.cht) :''
        if (!m.ieBotAdmin) {
            return m.reply(config.messages.botAdmin);
        }

        try {
            const inviteCode = await sock.groupInviteCode(m.cht);
            const groupSubject = (await sock.groupMetadata(m.cht)).subject;

            const linkMessage = `*💥 LINK GROUP 💥*\n\n` +
                                `📌 *Nama Grup:* ${groupSubject}\n` +
                                `🔗 *Link:* https://chat.whatsapp.com/${inviteCode}\n\n` +
                                `_Gunakan link ini untuk mengundang anggota baru!_`;

            await sock.sendMessage(m.chat, { text: linkMessage }, { quoted: m });
        } catch (error) {
            m.reply("*❗ Terjadi kesalahan saat mengambil link grup.*");
        }
    }
};