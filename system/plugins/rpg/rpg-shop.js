module.exports = {
   command: "shop",
   alias: ["buy"],
   category: ["rpg"],
   settings: {},
   loading: true,
   async run(m, { sock, text }) {
      let user = db.list().user[m.sender];
      let items = {
         health: { price: 10_000, description: "Tambah 10 HP" },
         strength: { price: 10_000, description: "Tambah 1 Strength" },
         agility: { price: 10_000, description: "Tambah 1 Agility" },
         defense: { price: 10_000, description: "Tambah 1 Defense" },
         poison: { price: 10_000, description: "Beli 1 Poison" },
         exp: { price: 50_000, description: "Tambah 10k EXP" },
         level: { price: 100_000, description: "Tambah 1 Level" },
      };

      if (!text) {
         let shopList = "╔══━「 🛒 SHOP 」━══╗\n\n";
         Object.keys(items).forEach((key, index) => {
            shopList += `  ${index + 1}. ${key.toUpperCase()} - ${items[key].price.toLocaleString()} Money\n     ${items[key].description}\n`;
         });
         shopList += "\nKetik *!shop <item>* untuk membeli.\n╚══━━━━━━━━━━━━━══╝";
         return m.reply(shopList);
      }

      let item = text.toLowerCase();
      if (!items[item]) return m.reply(`> Item *${item}* tidak tersedia di shop.`);

      let { price, description } = items[item];
      if (user.money < price) return m.reply(`> Uang kamu tidak cukup! Harga *${item.toUpperCase()}* adalah ${price.toLocaleString()} Money.`);

      user.money -= price;
      switch (item) {
         case "health":
            user.stats.health += 10;
            break;
         case "strength":
            user.stats.strength += 1;
            break;
         case "agility":
            user.stats.agility += 1;
            break;
         case "defense":
            user.stats.defense += 1;
            break;
         case "poison":
            user.inventory.poison = (user.inventory.poison || 0) + 1;
            break;
         case "exp":
            user.exp += 10000;
            break;
         case "level":
            user.level += 1;
            break;
      }

      m.reply(`> Kamu berhasil membeli *${item.toUpperCase()}* seharga ${price.toLocaleString()} Money!\n${description}`);
   },
};