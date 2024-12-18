/*
🔥🔥🔥 Jangan hapus wm ini atau kamu mati 🔥🔥🔥
💥💥💥 Fitur -> Jawaban Acak "Mengapa" 💥💥💥
🔗 🔥 https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z 🔥
*/

module.exports = {
   command: "mengapa",
   alias: ["why", "kenapa", "mengapakah"],
   category: ["fun"],
   settings: {
      limit: true
   },
   description: "Beri pertanyaan dengan kata 'mengapa' dan dapatkan jawaban",
   async run(m, { text }) {
      if (!text || !text.toLowerCase().startsWith("mengapa")) {
         return m.reply("❌ *Eh salah, cuy!* Pertanyaan harus diawali dengan *'Mengapa'*. \nContoh: *!mengapa mantan nikah duluan?*");
      }

      const answers = [
         "💬 *Karena Tuhan nggak mau lo terlalu bahagia, gitu aja.* 😌",
         "😂 *Lah, lo nanya mulu tapi hidup lo gitu-gitu aja. Fokus cuy!*",
         "🔥 *Karena takdir bilang 'Hidup lo belum cukup berat!'* 🤣",
         "💀 *Udah, nggak usah nanya. Jawabannya? Nasib lo aja.*",
         "🎉 *Karena lo kurang olahraga, jadi otak lo ngelantur.*",
         "🤔 *Yah, karena lo kebanyakan mikir yang nggak penting.*",
         "💥 *Karena dunia ini kejam, sama kayak mantan lo.*",
         "⚡️ *Udah jangan tanya kenapa, tanya kapan lo sukses aja.*",
         "🍔 *Karena lo mending fokus makan burger daripada mikir beginian.*",
         "🌭 *Karena bumi ini nggak peduli sama lo, gitu.*",
         "🫡 *Tanya kenapa? Karena gue bot, bukan motivator!*",
         "🗿 *Lo kebanyakan drama. Dunia nggak punya waktu buat lo.*",
         "🤷‍♂️ *Karena lo masih nanya, bukannya action.*",
         "😏 *Lo nanya kenapa? Gue malah nanya balik, lo ngapain hidup?*",
         "🥴 *Karena hidup itu nggak adil, tapi tetep harus dijalanin.*",
         "🌟 *Tanya kenapa, tanya juga kapan lo move on.*",
         "🙃 *Karena ada yang lebih bodoh dari lo, jadi lo aman.*",
         "😜 *Karena gue bot dan gue lebih waras dari lo.*",
         "👀 *Karena Tuhan pengen lo belajar sabar, makanya dikasih pertanyaan beginian.*"
      ];

      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      m.reply(randomAnswer);
   }
}
