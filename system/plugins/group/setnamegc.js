module.exports = {
  command: "setnamegc",
  alias: ["gcname"],
  category: ["group"],
  settings: {
    group: true
  },
  description: "🔑 *Ubah Nama Group* 💬",
  loading: true,
  async run(m, { text, sock }) {
    try {
      if (!m.isAdmins) return m.reply("❌ *Kamu Bukan Admin Grup* 😔");
      if (!m.isBotAdmins) return m.reply("⚠️ *Devolution Tidak Admin, Perintah Tidak Valid* 🚫");
      if (text.length < 1) return m.reply(`💡 *Contoh Penggunaan*: ${prefix + command} <Nama Grup>`);
      await sock.groupUpdateSubject(m.cht, text);
      m.reply(`🎉 *Sukses Mengganti Nama Grup Menjadi*: "${text}" 🎉`);
    } catch (error) {
      console.error(error);
      m.reply("❌ *Terjadi Kesalahan, Gagal Mengubah Nama Grup* 🚫");
    }
  }
};