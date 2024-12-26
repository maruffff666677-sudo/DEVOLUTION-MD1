module.exports = {
    command: "hitman",
    alias: ["hunt", "kill", "assassin"],
    category: ["rpg"],
    settings: {
    },
    loading: true,

    async run(m, { sock }) {
        let user = db.list().user[m.sender]
        try {
            if (user.stats.health < 50) {
                return m.reply(`╭══━「 ❌ INSUFFICIENT HEALTH 」━══╗
│
│ ❤️ Health minimal 50 untuk
│    melakukan misi berbahaya ini
│ 
│ 📊 Health anda: ${user.stats.health}
│
╰════════════════════`)
            }

            if (user.stats.strength < 10 || user.stats.agility < 10 || user.stats.defense < 10) {
                return m.reply(`╭══━「 ❌ STATS TOO LOW 」━══╗
│
│ 📊 Requirements:
│ ⚔️ Strength: 10 (Yours: ${user.stats.strength})
│ 🏃 Agility : 10 (Yours: ${user.stats.agility})
│ 🛡️ Defense : 10 (Yours: ${user.stats.defense})
│
╰════════════════════`)
            }

            if (user.lastHitman && (Date.now() - user.lastHitman) < 300000) {
                let timeLeft = Math.ceil((300000 - (Date.now() - user.lastHitman)) / 1000 / 60)
                return m.reply(`╭══━「 🔪 HITMAN COOLDOWN 」━══╗
│
│ ⏰ Tunggu ${timeLeft} menit untuk
│    membunuh target selanjutnya
│
╰════════════════════`)
            }

            let targets = [
                { name: "Pengusaha Kaya", reward: 15000, exp: 2000, difficulty: "Easy", counter: 10 },
                { name: "Pejabat Korup", reward: 25000, exp: 3500, difficulty: "Medium", counter: 20 },
                { name: "Bos Mafia", reward: 40000, exp: 5000, difficulty: "Hard", counter: 35 },
                { name: "Kepala Kartel", reward: 50000, exp: 6500, difficulty: "Expert", counter: 45 },
                { name: "Pembunuh Bayaran Elite", reward: 65000, exp: 8000, difficulty: "Master", counter: 60 },
                { name: "Mantan Agen Rahasia", reward: 75000, exp: 9500, difficulty: "Expert", counter: 65 },
                { name: "Raja Narkoba", reward: 85000, exp: 10000, difficulty: "Master", counter: 70 },
                { name: "Pemimpin Yakuza", reward: 100000, exp: 12000, difficulty: "Legendary", counter: 75 },
                { name: "Bos Underground", reward: 120000, exp: 15000, difficulty: "Mythical", counter: 80 },
                { name: "The Godfather", reward: 150000, exp: 20000, difficulty: "Ultimate", counter: 90 }
            ]

            let target = targets[Math.floor(Math.random() * targets.length)]
            let success_rate = Math.min(
                95,
                60 + 
                (user.stats.strength * 2) + 
                (user.stats.agility * 3) + 
                (user.stats.defense)
            )

            await m.reply(`╭══━「 🎯 TARGET LOCATED 」━══╗
│
│ 🎭 Target: ${target.name}
│ 💰 Reward: ${target.reward.toLocaleString()}
│ ⭐ EXP: ${target.exp}
│ ⚔️ Difficulty: ${target.difficulty}
│ 📊 Success Rate: ${success_rate}%
│ ☠️ Counter Kill: ${target.counter}%
│
│ ⏳ Memulai misi...
╰════════════════════`)

            await new Promise(resolve => setTimeout(resolve, 3000))

            let isSuccess = Math.random() * 100 < success_rate
            let isCounterKilled = Math.random() * 100 < target.counter

            if (isSuccess && !isCounterKilled) {
                user.money += target.reward
                user.exp += target.exp
                user.dosa = (user.dosa || 0) + 5
                user.lastHitman = Date.now()
                await sleep(23000)
                return m.reply(`╭══━「 🎯 MISSION SUCCESS 」━══╗
│
│ 💀 Target Eliminated: ${target.name}
│ 💰 Reward: +${target.reward.toLocaleString()}
│ ⭐ EXP: +${target.exp}
│ 📈 Dosa: +5
│
│ 💹 Total Money: ${user.money.toLocaleString()}
│ 📊 Total EXP: ${user.exp}
│ ⚖️ Total Dosa: ${user.dosa}
│
╰════════════════════`)
            } else if (isCounterKilled) {
                let healthLoss = Math.floor(user.stats.health * 0.8)
                user.stats.health = Math.max(1, user.stats.health - healthLoss)
                user.lastHitman = Date.now()
                await sleep(23000)
                return m.reply(`╭══━「 💀 COUNTER KILLED 」━══╗
│
│ ⚠️ ${target.name} terlalu kuat!
│ 💔 Health -${healthLoss}
│ 😱 Target berhasil membalas!
│
│ ❤️ Health tersisa: ${user.stats.health}
│ 🏥 Segera cari penyembuhan!
│
╰════════════════════`)
            } else {
                let healthLoss = Math.floor(user.stats.health * 0.3)
                user.stats.health = Math.max(1, user.stats.health - healthLoss)
                user.lastHitman = Date.now()
                await sleep(23000)

                return m.reply(`╭══━「 😱 MISSION FAILED 」━══╗
│
│ ❌ Target: ${target.name} lolos!
│ 💔 Health -${healthLoss}
│ 🏃 Target berhasil melarikan diri
│
│ ❤️ Health tersisa: ${user.stats.health}
│
╰═════════════════════`)
            }

        } catch (error) {
            console.error('Error in hitman command:', error)
            return m.reply(`╭══════════════════════
│ ❌ Terjadi kesalahan
│ Mohon coba beberapa saat lagi
╰══════════════════════`)
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
