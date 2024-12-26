module.exports = {
    command: "bonus",
    alias: ["daily"],
    category: ["rpg"],
    settings: {
        owner: false
    },
    loading: true,
    async run(m, { sock }) {
        const user = db.list().user[m.sender]

        if (!user) return m.reply("❌ User tidak terdaftar dalam database");

        let time = new Date().getTime();
        let cooldown = 86400000;
        let lastBonus = user.lastbonus || 0;

        if (time - lastBonus < cooldown) {
            let remaining = cooldown - (time - lastBonus);
            let hours = Math.floor(remaining / 3600000);
            let minutes = Math.floor((remaining % 3600000) / 60000);

            return m.reply(`⏰ Tunggu *${hours} jam ${minutes} menit* sebelum mengambil bonus harian lagi`);
        }

        let moneyReward = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
        let expReward = Math.floor(Math.random() * (200 - 100 + 1)) + 100;

        user.money = (user.money || 0) + moneyReward;
        user.exp = (user.exp || 0) + expReward;
        user.lastbonus = time;

        let requiredXP = (user.level || 1) * 1000;
        if (user.exp >= requiredXP) {
            user.level = (user.level || 1) + 1;
            user.exp -= requiredXP;
            await m.reply(`🎉 Level Up! Sekarang level kamu adalah *${user.level}*`);
        }

        let rewardText = `
🎁 *Bonus Harian*
💰 Money: +${moneyReward}
✨ EXP: +${expReward}

📊 *Status*
Level: ${user.level || 1}
EXP: ${user.exp}/${requiredXP}
Money: ${user.money}

⏰ Kembali lagi dalam 24 jam!
        `.trim();

        await m.reply(rewardText);
    }
};