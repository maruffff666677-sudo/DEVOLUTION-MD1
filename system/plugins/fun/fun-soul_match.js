const moment = require('moment-timezone');

module.exports = {
    command: "soulmatch",
    alias: ["soul", "match-soul", "soul-analyze"],
    category: ["fun"],
    settings: { limit: true },
    loading: true,

    async run(m, { text }) {
        if (!text) {
            return m.reply(`╭═══❯ *SOUL MATCH* ❮═══
│
│ ❌ Masukkan 2 nama untuk dianalisis!
│ 
│ 📝 *Format:*
│ .soulmatch nama1|nama2
│
│ 📌 *Contoh:*
│ .soulmatch Raiden|Mei
│
╰════════════════════`);
        }

        try {
            const [nama1, nama2] = text.split("|").map(name => name.trim());
            
            if (!nama2) {
                return m.reply("❌ Format salah! Gunakan tanda '|' untuk memisahkan nama\nContoh: .soulmatch Raiden|Mei");
            }

            const generateSoulData = (name) => {
                const numerologyValue = name.toLowerCase().split('')
                    .map(char => char.charCodeAt(0) - 96)
                    .reduce((a, b) => a + b, 0) % 9 + 1;

                const elements = ['Api 🔥', 'Air 💧', 'Tanah 🌍', 'Angin 🌪️', 'Petir ⚡', 'Es ❄️', 'Cahaya ✨', 'Bayangan 🌑'];
                const element = elements[Math.floor(name.length % elements.length)];

                const zodiacSigns = ['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo', 
                                   '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces'];
                const zodiac = zodiacSigns[Math.floor((name.length * numerologyValue) % zodiacSigns.length)];

                return { numerologyValue, element, zodiac };
            };

            const soul1 = generateSoulData(nama1);
            const soul2 = generateSoulData(nama2);

            const calculateCompatibility = (soul1, soul2) => {
                const baseComp = Math.abs(soul1.numerologyValue - soul2.numerologyValue);
                const elementComp = soul1.element === soul2.element ? 20 : 10;
                const nameComp = (nama1.length + nama2.length) % 20;
                
                return Math.min(100, Math.max(0, 
                    70 + (9 - baseComp) * 5 + elementComp + nameComp
                ));
            };

            const compatibility = calculateCompatibility(soul1, soul2);
            
            const getSoulType = (numerology) => {
                const types = {
                    1: "Pemimpin Yang Berani",
                    2: "Penyeimbang Bijaksana",
                    3: "Kreator Ekspresif",
                    4: "Pembangun Solid",
                    5: "Petualang Bebas",
                    6: "Pelindung Setia",
                    7: "Pemikir Mistis",
                    8: "Penakluk Kuat",
                    9: "Humanitarian Murni"
                };
                return types[numerology];
            };

            const getMatchDescription = (score) => {
                if (score >= 90) return "💫 Takdir Sejati";
                if (score >= 80) return "✨ Harmoni Sempurna";
                if (score >= 70) return "🌟 Koneksi Kuat";
                if (score >= 60) return "⭐ Potensi Bagus";
                if (score >= 50) return "🌙 Perlu Perjuangan";
                return "🌑 Tantangan Berat";
            };

            await m.reply("🔮 *Menganalisis jiwa...*");
            await new Promise(resolve => setTimeout(resolve, 1500));
            await m.reply("✨ *Menghitung resonansi...*");
            await new Promise(resolve => setTimeout(resolve, 1500));

            const caption = `╭═══❯ *SOUL MATCH* ❮═══
│
│ 👤 *${nama1}*
│ ├ 🔮 Soul Type: ${getSoulType(soul1.numerologyValue)}
│ ├ 🌟 Element: ${soul1.element}
│ └ 🎯 Zodiac: ${soul1.zodiac}
│
│ 👤 *${nama2}*
│ ├ 🔮 Soul Type: ${getSoulType(soul2.numerologyValue)}
│ ├ 🌟 Element: ${soul2.element}
│ └ 🎯 Zodiac: ${soul2.zodiac}
│
│ 💫 *COMPATIBILITY*
│ ├ 📊 Score: ${compatibility}%
│ └ 🎭 Status: ${getMatchDescription(compatibility)}
│
│ 🔮 *Soul Reading*
${generateSoulReading(compatibility)}
│
╰════════════════════

📅 *Analysis Date:* ${moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}`;

            return m.reply(caption);

        } catch (error) {
            console.error('Error in soulmatch command:', error);
            return m.reply(`╭══════════════════════
│ ❌ *Terjadi Kesalahan*
│ Mohon coba beberapa saat lagi
╰═════════════════════`);
        }
    }
};

function generateSoulReading(compatibility) {
    const readings = [
        compatibility >= 90 ? [
            "│ ✨ Jiwa kalian memiliki koneksi yang sangat",
            "│    istimewa dan langka",
            "│ 🌟 Takdir telah merencanakan pertemuan ini",
            "│ 💫 Resonansi jiwa kalian menciptakan",
            "│    harmoni sempurna"
        ] : compatibility >= 80 ? [
            "│ 🌟 Ada chemistry yang sangat kuat di antara",
            "│    kalian",
            "│ ✨ Jiwa kalian saling melengkapi dengan",
            "│    cara yang unik",
            "│ 💫 Pertemuan kalian membawa energi positif"
        ] : compatibility >= 70 ? [
            "│ 🌙 Potensi hubungan yang dalam dan berarti",
            "│ ✨ Perbedaan kalian justru menciptakan",
            "│    harmoni",
            "│ 💫 Ada pelajaran berharga dalam pertemuan",
            "│    ini"
        ] : compatibility >= 60 ? [
            "│ 🌟 Butuh waktu untuk saling memahami",
            "│ 💫 Setiap tantangan akan memperkuat ikatan",
            "│ ✨ Fokus pada hal positif dari perbedaan",
            "│    kalian"
        ] : compatibility >= 50 ? [
            "│ 🌙 Perlu usaha ekstra untuk harmonisasi",
            "│ ✨ Tantangan akan menguji kesungguhan",
            "│ 💫 Komunikasi jadi kunci utama hubungan"
        ] : [
            "│ 🌑 Perbedaan yang signifikan dalam energi",
            "│    jiwa",
            "│ ✨ Butuh banyak adaptasi dan pengertian",
            "│ 💫 Setiap hubungan punya maksud tersendiri"
        ]
    ];

    return readings[0].join('\n');
}