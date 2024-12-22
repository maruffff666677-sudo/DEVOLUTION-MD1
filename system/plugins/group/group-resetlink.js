module.exports = {
  command: "resetlinkgc",
  alias: ["revoke"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "🛠 *Reset Link Group Anda*",
  loading: true,
  async run(m, { sock, config }) {
    if (!m.isBotAdmin) return m.reply(config.messages.botAdmin);

    await sock.groupRevokeInvite(m.cht)
      .then(res => {
        m.reply(`🎉 *Sukses!* Link grup telah disetel ulang. 🔗\n\n🛠 Anda dapat membuat undangan baru sekarang!`);
      })
      .catch(() => {
        m.reply('⚠️ *Terjadi kesalahan* saat mencoba mengatur ulang link grup. Silakan coba lagi nanti.');
      });
  }
};