module.exports = {
  command: "remindme",
  alias: ["ingatkan", "reminder"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "⏰ *Fitur Pengingat Waktu* – Atur pengingat untuk diri Anda di grup!",
  async run(m, { text, sock }) {
    const args = text.split(' ');
    const timeString = args[0];
    const reminderText = args.slice(1).join(' ');

    if (!timeString || !reminderText) {
      return m.reply("❌ *Format salah!*\nGunakan: `remindme <waktu> <pesan>`\nContoh: `remindme 10m Belajar untuk ujian`");
    }

    const timeUnit = timeString.slice(-1);
    let timeValue = parseInt(timeString.slice(0, -1));

    if (isNaN(timeValue) || !['s', 'm', 'h'].includes(timeUnit)) {
      return m.reply("❌ *Format waktu salah! Gunakan detik(s), menit(m), atau jam(h).*");
    }

    let milliseconds = 0;
    if (timeUnit === 's') milliseconds = timeValue * 1000;
    if (timeUnit === 'm') milliseconds = timeValue * 60 * 1000;
    if (timeUnit === 'h') milliseconds = timeValue * 60 * 60 * 1000;

    const reminderTime = Date.now() + milliseconds;

    setTimeout(() => {
      sock.sendMessage(m.cht, {
        text: `⏰ *Pengingat untuk ${m.pushName}:* ${reminderText}`,
        mentions: [m.sender],
      });
    }, milliseconds);

    m.reply(`✅ *Pengingat berhasil diatur!* Kamu akan diingatkan dalam ${timeValue} ${timeUnit === 's' ? 'detik' : timeUnit === 'm' ? 'menit' : 'jam'}.`);
  }
};