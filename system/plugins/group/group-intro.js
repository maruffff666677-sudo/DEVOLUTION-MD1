module.exports = {
    command: "intro",
    alias: ["perkenalan"],
    category: ["group"],
    settings: {
      group: true,
      admin: false,
      botAdmin: false,
    },
    description: "Menampilkan template perkenalan untuk user baru",
    async run(m, { sock }) {
      const introTemplate = 
        `╭─── *INTRO PERKENALAN* ───╮\n` +
        `Silakan isi format berikut untuk memperkenalkan diri:\n\n` +
        `Nama: \n` +
        `Umur: \n` +
        `Gender: \n` +
        `Status: \n` +
        `Alasan Join: ` +
        `╰─────────────────────╯`;
  
      await sock.sendMessage(
        m.cht,
        { 
          text: introTemplate, 
          mentions: [m.sender],
        },
        { quoted: m }
      );
    },
  };