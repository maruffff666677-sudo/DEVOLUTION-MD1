const moment = require('moment-timezone');

module.exports = {
    command: "timecapsule",
    alias: ["capsule", "memory", "memorycapsule"],
    category: ["fun"],
    settings: { limit: true },
    loading: true,

    async run(m, { text }) {
        try {
            if (!text) {
                return m.reply(`╭═══❯ *TIME CAPSULE* ❮═══
│
│ 📝 *Command List:*
│ ${m.prefix}timecapsule store [pesan]
│ ${m.prefix}timecapsule read
│ ${m.prefix}timecapsule random
│ 
│ 📌 *Contoh:*
│ ${m.prefix}timecapsule store Hari ini aku bahagia
│ ${m.prefix}timecapsule read
│
╰═════════════════════`);
            }

            let user = db.list().user[m.sender];
            if (!user.memories) user.memories = [];

            const args = text.split(' ');
            const command = args[0].toLowerCase();
            const memory = args.slice(1).join(' ');
            const currentTime = moment().tz('Asia/Jakarta');

            switch (command) {
                case 'store': {
                    if (!memory) return m.reply('❌ Masukkan pesan yang ingin disimpan!');

                    if (user.memories.length >= 10) {
                        return m.reply(`╭═══❯ *CAPSULE FULL* ❮═══
│
│ ❌ Kapsul waktu penuh!
│ 📝 Hapus beberapa memori lama
│    atau baca yang tersimpan
│
╰═════════════════════`);
                    }

                    const moodEmojis = ['😊','😢','😍','😌','🥳','😎','🤔','😤','🥺','😪'];
                    const weatherEmojis = ['☀️','🌧️','⛈️','🌤️','🌈','🌪️','❄️','🌊','🌺','🍃'];
                    
                    const newMemory = {
                        text: memory,
                        date: currentTime.format(),
                        mood: moodEmojis[Math.floor(Math.random() * moodEmojis.length)],
                        weather: weatherEmojis[Math.floor(Math.random() * weatherEmojis.length)],
                        songOfDay: generateRandomSong(),
                        prediction: generateFuturePrediction()
                    };

                    user.memories.push(newMemory);

                    await m.reply("✨ *Menyimpan memori...*");
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    await m.reply("🎯 *Menganalisis momen...*");
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    return m.reply(`╭═══❯ *MEMORY STORED* ❮═══
│
│ ✨ *Memory has been saved!*
│ 
│ 📝 *Catatan:* ${memory}
│ 📅 *Tanggal:* ${currentTime.format('DD/MM/YYYY')}
│ ⏰ *Waktu:* ${currentTime.format('HH:mm:ss')}
│ 
│ 🎭 *Mood Terdeteksi:* ${newMemory.mood}
│ 🌈 *Cuaca Jiwa:* ${newMemory.weather}
│ 🎵 *Lagu Hari Ini:* ${newMemory.songOfDay}
│ 
│ 🔮 *Prediksi Masa Depan:*
│ ${newMemory.prediction}
│
╰═════════════════════`);
                }

                case 'read': {
                    if (!user.memories || user.memories.length === 0) {
                        return m.reply(`╭═══❯ *EMPTY CAPSULE* ❮═══
│
│ ❌ Belum ada memori tersimpan
│ 
│ 💫 *Tip:* Mulai simpan momen
│    berhargamu sekarang!
│
╰═════════════════════`);
                    }

                    await m.reply("🎯 *Membuka kapsul waktu...*");
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    let caption = `╭═══❯ *YOUR MEMORIES* ❮═══
│
│ 📝 *Total Memories:* ${user.memories.length}
│
╰═════════════════════\n\n`;

                    user.memories.forEach((memory, index) => {
                        const memoryDate = moment(memory.date);
                        const daysAgo = currentTime.diff(memoryDate, 'days');
                        
                        caption += `╭═══❯ *MEMORY #${index + 1}* ❮═══
│
│ 📝 *Catatan:* ${memory.text}
│ ⏳ *${daysAgo} hari yang lalu*
│ 🎭 *Mood:* ${memory.mood}
│ 🌈 *Cuaca Jiwa:* ${memory.weather}
│ 🎵 *Lagu:* ${memory.songOfDay}
│ 
│ 🔮 *Prediksi saat itu:*
│ ${memory.prediction}
│
╰═════════════════════\n\n`;
                    });

                    caption += `💫 *Tip:* Setiap memori adalah
harta yang tak ternilai harganya.`;

                    return m.reply(caption);
                }

                case 'random': {
                    if (!user.memories || user.memories.length === 0) {
                        return m.reply("❌ Belum ada memori tersimpan!");
                    }

                    await m.reply("🎲 *Mengacak memori...*");
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    const randomMemory = user.memories[Math.floor(Math.random() * user.memories.length)];
                    const memoryDate = moment(randomMemory.date);
                    const daysAgo = currentTime.diff(memoryDate, 'days');

                    return m.reply(`╭═══❯ *RANDOM MEMORY* ❮═══
│
│ 💫 *Memory Time Machine*
│ ⏳ *${daysAgo} hari yang lalu...*
│ 
│ 📝 *Catatan:* ${randomMemory.text}
│ 🎭 *Mood:* ${randomMemory.mood}
│ 🌈 *Cuaca Jiwa:* ${randomMemory.weather}
│ 🎵 *Lagu:* ${randomMemory.songOfDay}
│ 
│ 🔮 *Prediksi saat itu:*
│ ${randomMemory.prediction}
│
╰═════════════════════`);
                }

                default:
                    return m.reply("❌ Command tidak valid!");
            }
        } catch (error) {
            console.error('Error in timecapsule command:', error);
            return m.reply(`╭══════════════════════
│ ❌ *Terjadi Kesalahan*
│ Mohon coba beberapa saat lagi
╰══════════════════════`);
        }
    }
};

function generateRandomSong() {
    const songs = [
        "Perfect - Ed Sheeran",
        "Memories - Maroon 5",
        "Happier - Marshmello",
        "A Thousand Years - Christina Perri",
        "Someone Like You - Adele",
        "Yellow - Coldplay",
        "Photograph - Ed Sheeran",
        "When We Were Young - Adele",
        "All of Me - John Legend",
        "Say You Won't Let Go - James Arthur"
    ];
    return songs[Math.floor(Math.random() * songs.length)];
}

function generateFuturePrediction() {
    const predictions = [
        "Memori ini akan membawa kebahagiaan di masa depan ✨",
        "Momen ini adalah awal dari sesuatu yang indah 🌟",
        "Tantangan hari ini adalah kekuatan di masa depan 💪",
        "Keputusan ini akan membawa perubahan positif 🌈",
        "Perjalanan baru yang menyenangkan akan dimulai 🚀",
        "Kesuksesan besar menanti di balik momen ini 🎯",
        "Hubungan spesial akan terbentuk dari kejadian ini 💫",
        "Mimpi yang terpendam akan segera terwujud 🌙",
        "Peluang emas akan datang dari pengalaman ini ⭐",
        "Kebijaksanaan baru akan ditemukan dari momen ini 🔮"
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
}