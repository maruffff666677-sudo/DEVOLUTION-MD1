/*
🔥 Jangan hapus wm ini atau kamu mati 🔥
💥 Fitur -> Jawaban Acak "Apakah" 💥
🔗 https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z
*/

module.exports = {
   command: "apakah",
   alias: ["tanya", "ask", "apakah-itu"],
   category: ["fun"],
   settings: {
      limit: true
   },
   description: "Beri pertanyaan dengan kata 'apakah' dan dapatkan jawaban",
   async run(m, { text }) {
      if (!text || !text.toLowerCase().startsWith("apakah")) {
         return m.reply("❌ Format salah! Pertanyaan harus diawali dengan 'Apakah'.\nContoh: *!apakah kamu suka coding?*");
      }

      const answers = [
         "Ya, tentu saja!",
         "Tidak, itu bukan pilihan yang tepat.",
         "Mungkin... tapi saya tidak yakin.",
         "Tentu, itu sangat menarik!",
         "Hmm, saya tidak tahu.",
         "Tidak yakin, mungkin di lain waktu.",
         "Itu bisa saja, siapa yang tahu?",
         "Saya rasa itu bisa terjadi.",
         "Sangat mungkin, tetapi belum tentu.",
         "Tidak juga, itu kurang tepat.",
         "Pastinya! Anda bisa melakukannya.",
         "Saya rasa itu ide yang buruk.",
         "Kenapa tidak? Mari coba!",
         "Bisa jadi, tapi mari lihat lagi.",
         "Saya pikir itu bukan jawaban yang benar.",
         "Mungkin nanti, saat yang tepat.",
         "Tidak sekarang, tunggu waktu yang lebih baik.",
         "Saya rasa ini bukan waktu yang tepat.",
         "Ya, sepertinya itu akan berhasil.",
         "Cobalah dan lihat hasilnya.",
         "Saya rasa itu keputusan yang buruk.",
         "Itu adalah pilihan yang menarik.",
         "Tidak terlalu yakin dengan itu.",
         "Ya, sangat mungkin terjadi.",
         "Tidak, bukan itu jawabannya.",
         "Tentu saja, lanjutkan saja!",
         "Saya rasa itu keputusan yang tepat.",
         "Itu bisa menjadi pilihan yang baik."
      ];

      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      m.reply(randomAnswer);
   }
}