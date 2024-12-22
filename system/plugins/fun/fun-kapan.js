/*
🔥🔥🔥 Jangan hapus wm ini atau kamu bakal ngerasain akibatnya 🔥🔥🔥
💥💥💥 Fitur -> Jawaban Acak "Kapan" 💥💥💥
🔗 🔥 https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z 🔥
*/

module.exports = {
   command: "kapankah",
   alias: ["when", "bilakah", "kapan"],
   category: ["fun"],
   settings: {
      limit: true
   },
   description: "Beri pertanyaan dengan kata 'kapan' dan dapatkan jawaban",
   async run(m, { text }) {
      if (!text) {
         return m.reply("❌ *Bro, formatnya salah!* Pertanyaan harus diawali dengan *'kapankah'*. \nContoh: *.kapankah kita jalan bareng?*");
      }

      const answers = [
         "🔮 *5 tahun lagi sih, pasti ada waktunya!* 🔮",
         "⏳ *Besok aja, kan besok lebih baik daripada nanti!* ⏳",
         "🎉 *Mungkin minggu depan, setelah semua kerjaan selesai!* 🎉",
         "🌟 *1 tahun lagi, sabar ya!* 🌟",
         "🕒 *Lusa deh, biar semua sempet dipersiapin!* 🕒",
         "⏰ *Tunggu aja bulan depan, lagi ada waktu kosong!* ⏰",
         "🌈 *Setelah kamu selesai nonton semua drama, baru deh kita jalan!* 🌈",
         "💥 *Mungkin setelah semester selesai, jadi udah nggak sibuk!* 💥",
         "🔥 *Kapan aja sih, asal cuaca cerah dan mood bagus!* 🔥",
         "🚀 *3 bulan lagi deh, biar waktu kita ngumpul bareng lebih panjang!* 🚀"
      ];

      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      m.reply(randomAnswer);
   }
}