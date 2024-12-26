module.exports = {
    command: "shop",
    alias: ["buy"],
    category: ["rpg"],
    settings: {},
    loading: true,
    async run(m, { sock, text }) {
        let user = db.list().user[m.sender];
        let items = {
            health: { price: 10_000, description: "Tambah 10 HP", emoji: "❤️" },
            strength: { price: 10_000, description: "Tambah 1 Strength", emoji: "⚔️" },
            agility: { price: 10_000, description: "Tambah 1 Agility", emoji: "🏃" },
            defense: { price: 10_000, description: "Tambah 1 Defense", emoji: "🛡️" },
            poison: { price: 10_000, description: "Racun untuk membunuh target", emoji: "☠️" },
            exp: { price: 50_000, description: "Tambah 10k EXP", emoji: "⭐" },
            level: { price: 100_000, description: "Tambah 1 Level", emoji: "📊" }
        };

        if (!text) {
            let shopList = `*⚔️ ADVENTURE SHOP ⚔️*

🏪 *Item List:*\n`;
            Object.keys(items).forEach((key) => {
                shopList += `\n${items[key].emoji} *${key.toUpperCase()}*
💰 ${items[key].price.toLocaleString()}
📝 ${items[key].description}`;
            });
            shopList += `\n\n📦 *Cara Membeli:*
• Single: .shop <item>
• Multiple: .shop <item> <jumlah>

💡 Contoh:
• .shop poison
• .shop poison 10`;
            return m.reply(shopList);
        }

        const [itemName, quantity = "1"] = text.toLowerCase().split(" ");
        const amount = parseInt(quantity);

        if (isNaN(amount) || amount < 1) return m.reply(`*❌ INVALID AMOUNT*\n\nMasukkan jumlah yang valid!`);

        if (!items[itemName]) return m.reply(`*❌ ITEM NOT FOUND*\n\n${items[itemName].emoji} Item *${itemName.toUpperCase()}* tidak tersedia!`);

        let { price, description, emoji } = items[itemName];
        let totalPrice = price * amount;

        if (user.money < totalPrice) {
            return m.reply(`*❌ INSUFFICIENT MONEY*

💰 *Harga Total:* ${totalPrice.toLocaleString()}
👝 *Uang Anda:* ${user.money.toLocaleString()}
🪙 *Kurang:* ${(totalPrice - user.money).toLocaleString()}`);
        }

        user.money -= totalPrice;
        
        let beforeValue = 0;
        let afterValue = 0;
        
        switch (itemName) {
            case "health":
                beforeValue = user.stats.health;
                user.stats.health += (10 * amount);
                afterValue = user.stats.health;
                break;
            case "strength":
                beforeValue = user.stats.strength;
                user.stats.strength += (1 * amount);
                afterValue = user.stats.strength;
                break;
            case "agility":
                beforeValue = user.stats.agility;
                user.stats.agility += (1 * amount);
                afterValue = user.stats.agility;
                break;
            case "defense":
                beforeValue = user.stats.defense;
                user.stats.defense += (1 * amount);
                afterValue = user.stats.defense;
                break;
            case "poison":
                beforeValue = user.inventory.poison || 0;
                user.inventory.poison = (user.inventory.poison || 0) + amount;
                afterValue = user.inventory.poison;
                break;
            case "exp":
                beforeValue = user.exp;
                user.exp += (10000 * amount);
                afterValue = user.exp;
                break;
            case "level":
                beforeValue = user.level;
                user.level += (1 * amount);
                afterValue = user.level;
                break;
        }

        return m.reply(`*✅ PURCHASE SUCCESS*

${emoji} *Item:* ${itemName.toUpperCase()}
📦 *Quantity:* ${amount}×
💰 *Total Price:* ${totalPrice.toLocaleString()}

*📊 CURRENT STATUS*
👝 *Sisa Uang:* ${user.money.toLocaleString()}
${emoji} *${itemName.charAt(0).toUpperCase() + itemName.slice(1)}:* ${beforeValue} ➠ ${afterValue}`);
    }
};