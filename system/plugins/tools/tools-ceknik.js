module.exports = {
   command: "ceknik",
   alias: ["nik"],
   category: ["tools"],
   settings: {
      limit: true
   },
   description: "🔍 Periksa Nik Anda 🔍",
   loading: true,
   async run(m, { text }) {
      if (!text) return m.reply(`⚠️ *Perhatian* ⚠️\n\n Anda harus mendapatkan *NIK* target terlebih dahulu dan lakukan perintah seperti ini:\n\n \` ${prefix + command} 16070xxxxx \`\n\n🚨 Pastikan NIK yang dimasukkan benar! 🚨`);
       if (text.length !== 16) {
         return m.reply("❌ *NIK tidak valid!* ❌\nPastikan NIK yang Anda masukkan memiliki 16 digit.");
      }
      const { nikParser } = require('nik-parser');
      const ktp = text;
      const nik = nikParser(ktp);
      
      m.reply(`
✨ *Hasil Cek NIK Anda* ✨

🔑 *Validasi NIK*: ${nik.isValid() ? '✔️ Valid' : '❌ Tidak Valid'}
🏙️ *Provinsi ID*: ${nik.provinceId()}
🌍 *Nama Provinsi*: ${nik.province()}
🏡 *Kabupaten ID*: ${nik.kabupatenKotaId()}
🌆 *Nama Kabupaten*: ${nik.kabupatenKota()}
🏘️ *Kecamatan ID*: ${nik.kecamatanId()}
🌳 *Nama Kecamatan*: ${nik.kecamatan()}
📮 *Kode Pos*: ${nik.kodepos()}
👨‍👩‍👧‍👦 *Jenis Kelamin*: ${nik.kelamin()}
🎂 *Tanggal Lahir*: ${nik.lahir()}
🔐 *Uniqcode*: ${nik.uniqcode()}
`);
   }
}