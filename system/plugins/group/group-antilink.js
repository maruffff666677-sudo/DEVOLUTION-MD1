module.exports = {
   command: "antilink",
   alias: ["anti-link"],
   category: ["group"],
   settings: {},
   loading: true,
   async run(m, { text, sock }) {
      if (!m.isAdmin && !m.isOwner) {
         return m.reply("🚫 Kamu bukan admin! Permintaan ditolak oleh DEVOLUTION-MD1.");
      }
      if (!m.isBotAdmin) {
         return m.reply("🚫 Bot bukan admin! Perintah tidak dapat diproses. Pastikan bot memiliki hak admin.");
      }
      try {
         let dbb = db.list().group[m.cht];
         if (text === "on") {
            if (dbb.antilinkv1) {
               return m.reply("🚨 Sistem Anti-Link sudah aktif sebelumnya.");
            }
            dbb.antilinkv1 = true;
            return m.reply(
               `🚨 *SISTEM ANTILINKV1 AKTIF!* 🚨

DEVOLUTION-MD1 kini telah mengaktifkan mode Anti-Link All! Semua tautan yang dikirim di grup ini akan diawasi dengan ketat. 🛡️

⚠️ *PERHATIAN:* Jangan coba-coba melanggar, karena tindakan tegas akan segera diambil!

Mari kita jaga grup ini tetap aman dan nyaman bersama. DEVOLUTION-MD1 siap mengawasi! 👀`
            );
         } else if (text === "off") {
            if (!dbb.antilinkv1) {
               return m.reply("🚨 Sistem Anti-Link sudah nonaktif sebelumnya.");
            }
            dbb.antilinkv1 = false;
            return m.reply(
               `🚨 *SISTEM ANTILINKV1 NONAKTIF!* 🚨

DEVOLUTION-MD1 kini telah menonaktifkan mode Anti-Link All. Grup ini tidak lagi diawasi untuk pengiriman tautan. 🔓

Namun, tetap dihimbau untuk menjaga kenyamanan bersama dengan tidak menyalahgunakan kebebasan ini. 🙏

DEVOLUTION-MD1 akan selalu siap jika sistem ini perlu diaktifkan kembali! 💪`
            );
         } else {
            return m.reply(
               `⚠️ Pilihan tidak valid! Gunakan perintah berikut:
               
> *antilink on* — Untuk mengaktifkan sistem Anti-Link.
> *antilink off* — Untuk menonaktifkan sistem Anti-Link.`
            );
         }
      } catch (e) {
         console.error(`Terjadi error: ${e.message}`);
         return m.reply("❌ Gagal mengubah status Anti-Link. Silakan coba lagi nanti.");
      }
   },
};