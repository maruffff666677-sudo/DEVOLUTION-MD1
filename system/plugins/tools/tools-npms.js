module.exports = {
   command: "npm",
   alias: ["npmsearch", "npmjs"],
   category: ["tools"],
   settings: {
      limit: true,
   },
   description: "🔍 Mencari Module NPM dengan mudah!",
   loading: true,
   async run(m, { text, sock, Scraper }) {
      if (!text) {
         return m.reply(`⚠️ *Error*: Mohon masukkan Nama Module Yang Ingin Anda Cari!\n\n📌 *Contoh Penggunaan*:\n> ${m.prefix + m.command} axios`);
      }
      
      try {
         let scaperr = await Scraper.npmjs.search(text);
         if (!scaperr) {
            return m.reply("❌ *Module tidak ditemukan!*");
         }

         let { url, packageName, version, isPublic, lastPublished: formattedDate, dependencies, description } = scaperr;

         const dependenciesText = dependencies && dependencies !== 'Tidak ada dependencies' 
            ? dependencies 
            : 'Tidak ada dependencies';

         const response = `
💻 *Nama Package*: ${packageName}
📝 *Deskripsi*: ${description || 'Tidak ada deskripsi tersedia'}
🔧 *Versi*: ${version}
🌍 *URL*: ${url}
🔒 *Publik*: ${isPublic ? 'Ya' : 'Tidak'}
🗓️ *Terakhir Dipublikasikan*: ${formattedDate}
📦 *Dependencies*: ${dependenciesText}`;

         return m.reply(response);

      } catch (error) {
         return m.reply(`❌ *Terjadi kesalahan*: ${error.message}`);
      }
   }
}