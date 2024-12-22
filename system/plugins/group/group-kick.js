module.exports = {
  command: "kick",
  alias: ["kik", "sulap", "tendang"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk mengeluarkan Member dari group",
  async run(m, { sock, text }) {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;
    if (!who) throw "> Tag/Balas pesan member yang mau di kick";

    let user = await sock.onWhatsApp(who);
    if (!user[0]?.exists) throw "> Member tidak terdaftar di WhatsApp";

    await sock.groupParticipantsUpdate(m.cht, [who], "remove").then(() => {
      sock.sendMessage(
        m.cht,
        {
          text: `*⛔ Member telah dikeluarkan!*\n\n👤 *User:* @${who.split("@")[0]}\n\nSemoga hari-harimu lebih baik di luar sana!`,
          mentions: [who],
        },
        { quoted: m }
      );
    });
  },
};