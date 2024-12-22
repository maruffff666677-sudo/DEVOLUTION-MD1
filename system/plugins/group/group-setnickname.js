module.exports = {
  command: "setnickname",
  alias: ["setname", "nickname"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "✏️ *Fitur untuk mengubah nama panggilan anggota grup!* ✏️",
  async run(m, { text, sock }) {
    const args = text.split(' ');
    const targetUser = args[0] ? args[0] + '@s.whatsapp.net' : m.sender;
    const nickname = args.slice(1).join(' ');

    if (!nickname) {
      return m.reply("❌ *Format salah!* Gunakan: `setnickname @tag <nama_panggilan>`\nContoh: `setnickname @user123 John`");
    }

    if (!m.isAdmin) {
      return m.reply("❌ *Hanya admin yang bisa mengubah nama panggilan!*");
    }

    try {
      await sock.groupParticipantsUpdate(m.cht, [targetUser], 'modify', nickname);
      m.reply(`✅ *Nama panggilan untuk ${nickname} berhasil diubah!*`);
    } catch (error) {
      console.error(error);
      m.reply("❌ *Terjadi kesalahan saat mengubah nama panggilan!*");
    }
  }
};