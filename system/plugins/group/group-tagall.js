module.exports = {
   command: "tagall",
   alias: ["mentionall", "tagusers"],
   category: ["group"],
   settings: {
      limit: true
   },
   description: "Tag semua anggota grup dengan ID peserta",
   async run(m, { text, sock }) {
        const groupMetadata = m.isGroup ? await sock.groupMetadata(m.cht).catch(e => {}) : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
      if (!m.isGroup) return m.reply("*[ 🛑 sʏsᴛᴇᴍ ]* ᴅɪ ɢᴜɴᴀᴋᴀɴ ʜᴀɴʏᴀ ɢʀᴏᴜᴘ ᴅᴏᴀɴɢ 🌟");
      if (!m.isAdmin && m.isOwner) return m.reply("*[ 🛑 sʏsᴛᴇᴍ ]* ᴍᴀᴀғ ɪɴɪ ᴋʜᴜsᴜs ᴀᴅᴍɪɴ 🌟");

      let teks = `🌟✨ *Tag All*\n\n*Message :* ${text ? text : 'Tidak Ada Pesan'}\n\n`;
      for (let mem of participants) {
         teks += `💥 @${mem.id.split('@')[0]}\n`;
      }

      await m.reply(teks, {
         mentions: participants.map(a => a.id),
         contextInfo: { mentionedJid: participants.map(a => a.id) }
      });
      m.reply(`🎉🌟 *Semua Anggota Grup Telah Ter-tag!* 🌟🎉\n\n💥 *Terima Kasih atas Partisipasinya! Semoga Hari Anda Luar Biasa!* 💥`);
   }
}