module.exports = {
  command: "add",
  alias: ["tambahkan"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "✨ *Tambahkan Peserta Ke Group dengan Ledakan Kekuatan!* ✨",
  async run(m, { text, sock }) {
    if (!m.isAdmin) return m.reply("❌ *Kamu bukan admin grup!* Hanya admin yang bisa menambah anggota.");
    if (!m.isBotAdmin) return m.reply("🚫 *Bot belum jadi admin!* Jadikan bot admin terlebih dahulu.");

    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    try {
      const participants = await sock.groupMetadata(m.cht);
      const memberJids = participants.participants.map(member => member.jid);
      if (memberJids.includes(users)) {
        m.reply("🫡 *Target sudah menjadi anggota grup sebelumnya!*");
      } else {
        await sock.groupParticipantsUpdate(m.cht, [users], "add");
        m.reply("🎉 *Sukses menambahkan target ke dalam grup!*");
      }
    } catch (err) {
      m.reply("😔 *Ups, terjadi kesalahan! Coba lagi ya!*");
    }
  }
};