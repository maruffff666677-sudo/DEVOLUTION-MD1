module.exports = {
    command: "hunter",
    alias: ["hunt", "buru"],
    category: ["rpg"],
    settings: {},
    loading: true,

    async run(m, { sock }) {
        let user = db.list().user[m.sender];
        const now = Date.now();

        try {
            if (!user) {
                return m.reply(`╭══━「 ❌ USER NOT FOUND 」━══╗
│
│ ⚠️ Anda belum terdaftar.
│    Ketik *register* untuk mendaftar.
│
╰════════════════════`);
            }

            // Check cooldown
            if (user.lastHunter && now - user.lastHunter < 3600000) {
                const remainingTime = Math.ceil((3600000 - (now - user.lastHunter)) / 60000);
                return m.reply(`╭══━「 🕒 COOLDOWN 」━══╗
│
│ ⏳ Anda baru saja berburu.
│    Tunggu ${remainingTime} menit lagi
│    untuk berburu berikutnya.
│
╰════════════════════`);
            }

            if (user.stats.health < 50) {
                return m.reply(`╭══━「 ❌ INSUFFICIENT HEALTH 」━══╗
│
│ ❤️ Health minimal 50 untuk
│    berburu monster.
│ 📊 Health Anda: ${user.stats.health}
│
╰════════════════════`);
            }

            if (user.stats.strength < 10 || user.stats.agility < 10 || user.stats.defense < 10) {
                return m.reply(`╭══━「 ❌ STATS TOO LOW 」━══╗
│
│ 📊 Requirements:
│ ⚔️ Strength: 10 (Yours: ${user.stats.strength})
│ 🏃 Agility : 10 (Yours: ${user.stats.agility})
│ 🛡️ Defense : 10 (Yours: ${user.stats.defense})
│
╰════════════════════`);
            }

            const monsters = [
    { name: "Slime", reward: 5000, exp: 500, stats: 1, difficulty: "Easy", counter: 10 },
    { name: "Goblin", reward: 10000, exp: 1000, stats: 2, difficulty: "Medium", counter: 15 },
    { name: "Orc", reward: 20000, exp: 2000, stats: 3, difficulty: "Hard", counter: 20 },
    { name: "Troll", reward: 30000, exp: 3000, stats: 4, difficulty: "Expert", counter: 25 },
    { name: "Dragon", reward: 50000, exp: 5000, stats: 5, difficulty: "Legendary", counter: 35 },
    { name: "Ancient Dragon", reward: 500000, exp: 35000, stats: 35, difficulty: "Mythical", counter: 50 },
    { name: "Zeroth God", reward: 1000000, exp: 80000, stats: 75, difficulty: "Godlike", counter: 65 },
    { name: "Dire Wolf", reward: 15000, exp: 1200, stats: 2, difficulty: "Medium", counter: 12 },
    { name: "Ghoul", reward: 18000, exp: 1400, stats: 3, difficulty: "Hard", counter: 18 },
    { name: "Shadow Fiend", reward: 25000, exp: 2100, stats: 4, difficulty: "Expert", counter: 25 },
    { name: "Fire Elemental", reward: 40000, exp: 3500, stats: 5, difficulty: "Legendary", counter: 30 },
    { name: "Ice Golem", reward: 55000, exp: 4500, stats: 6, difficulty: "Legendary", counter: 32 },
    { name: "Cyclops", reward: 75000, exp: 5500, stats: 7, difficulty: "Legendary", counter: 40 },
    { name: "Undead Knight", reward: 100000, exp: 7500, stats: 8, difficulty: "Mythical", counter: 45 },
    { name: "Lich", reward: 120000, exp: 9000, stats: 9, difficulty: "Mythical", counter: 50 },
    { name: "Behemoth", reward: 180000, exp: 12000, stats: 10, difficulty: "Mythical", counter: 55 },
    { name: "Vampire Lord", reward: 250000, exp: 15000, stats: 12, difficulty: "Mythical", counter: 60 },
    { name: "Wyvern", reward: 320000, exp: 20000, stats: 15, difficulty: "Mythical", counter: 65 },
    { name: "Frost Dragon", reward: 450000, exp: 28000, stats: 18, difficulty: "Mythical", counter: 70 },
    { name: "Abyssal Wyrm", reward: 550000, exp: 35000, stats: 20, difficulty: "Mythical", counter: 75 },
    { name: "Nightmare Rider", reward: 700000, exp: 42000, stats: 25, difficulty: "Godlike", counter: 80 },
    { name: "Phoenix", reward: 800000, exp: 50000, stats: 30, difficulty: "Godlike", counter: 85 },
    { name: "Storm Titan", reward: 900000, exp: 60000, stats: 35, difficulty: "Godlike", counter: 90 },
    { name: "Eldritch Horror", reward: 1200000, exp: 80000, stats: 50, difficulty: "Godlike", counter: 95 },
    { name: "Cosmic Leviathan", reward: 1500000, exp: 100000, stats: 75, difficulty: "Godlike", counter: 98 },
    { name: "The Forgotten One", reward: 2000000, exp: 150000, stats: 100, difficulty: "Apocalyptic", counter: 99 },
    { name: "Infinity Beast", reward: 3000000, exp: 250000, stats: 150, difficulty: "Eternal", counter: 99 },
];


            const monster = monsters[Math.floor(Math.random() * monsters.length)];
            const successRate = Math.min(
                85,
                50 + 
                (user.stats.strength * 2) + 
                (user.stats.agility * 2) + 
                (user.stats.defense)
            );

            await m.reply(`╭══━「 🐾 MONSTER FOUND 」━══╗
│
│ 🐉 Monster: ${monster.name}
│ 💰 Reward: ${monster.reward.toLocaleString()}
│ ⭐ EXP: ${monster.exp}
│ 📈 Stats Bonus: +${monster.stats}
│ ⚔️ Difficulty: ${monster.difficulty}
│ 📊 Success Rate: ${successRate}%
│
│ ⏳ Memulai perburuan...
╰════════════════════`);

            await new Promise(resolve => setTimeout(resolve, 23000));

            const isSuccess = Math.random() * 100 < successRate;
            const isCounterKilled = Math.random() * 100 < monster.counter;

            if (isSuccess && !isCounterKilled) {
                user.money += monster.reward;
                user.exp += monster.exp;
                user.stats.strength += monster.stats;
                user.stats.agility += monster.stats;
                user.stats.defense += monster.stats;

                // Set cooldown
                user.lastHunter = now;

                return m.reply(`╭══━「 🎯 SUCCESS 」━══╗
│
│ 💀 Monster: ${monster.name} defeated!
│ 💰 Reward: +${monster.reward.toLocaleString()}
│ ⭐ EXP: +${monster.exp}
│ 📈 Stats: +${monster.stats} (Strength, Agility, Defense)
│
╰════════════════════`);
            } else if (isCounterKilled) {
                user.stats.health = 0; // Mati
                return m.reply(`╭══━「 💀 YOU DIED 」━══╗
│
│ ⚠️ ${monster.name} terlalu kuat!
│ 💔 Anda terbunuh saat bertarung.
│ 🏥 Silakan gunakan item penyembuhan
│    atau minta bantuan admin.
│
╰═══════════════════`);
            } else {
                const healthLoss = Math.floor(user.stats.health * 0.5);
                user.stats.health -= healthLoss;
                return m.reply(`╭══━「 ❌ FAILED 」━══╗
│
│ ❌ Monster: ${monster.name} melarikan diri!
│ 💔 Health -${healthLoss}
│ ❤️ Health tersisa: ${user.stats.health}
│
╰═══════════════════`);
            }
        } catch (error) {
            console.error('Error in hunter command:', error);
            return m.reply(`╭═════════════════════
│ ❌ Terjadi kesalahan
│ Mohon coba beberapa saat lagi
╰═════════════════════`);
        }
    },
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}