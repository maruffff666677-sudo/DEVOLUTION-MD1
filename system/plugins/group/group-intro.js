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
        `➩ intro
✩ nama :
✩ kelas :
✩ umur :
✩ hobi :
✩ askot :
☆ gender :
Salken mem baruuᥫ᭡`
  
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