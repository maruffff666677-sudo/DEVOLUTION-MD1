module.exports = {
   command: "poison",
   alias: [],
   category: ["rpg"],
   settings: {},
   loading: true,
   async run(m, { sock, text }) {
      let user = db.list().user[m.sender];
      let poisonCount = parseInt(text);

      if (isNaN(poisonCount) || poisonCount <= 0) {
         return m.reply("> Masukkan jumlah poison yang valid (misal: .poison 5).");
      }

      if (user.inventory.poison < poisonCount) {
         return m.reply(`> Kamu tidak memiliki cukup poison! Kamu hanya memiliki ${user.inventory.poison} poison.`);
      }

      let healthToAdd = poisonCount * 10;

      user.inventory.poison -= poisonCount;
      user.stats.health += healthToAdd;

      m.reply(`> Kamu berhasil menggunakan ${poisonCount} poison, menambah ${healthToAdd} Health!\nSekarang kamu memiliki ${user.inventory.poison} poison tersisa.`);
   },
};