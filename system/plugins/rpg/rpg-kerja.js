module.exports = {
    command: "kerja",
    alias: ["work", "kerjaan"],
    category: ["rpg"],
    settings: {
        isAdmin: false,
        isBotAdmin: false
    },
    loading: false, 
    async run(m, { text }) {
        try {
            const userId = m.sender;
            const currentTime = Date.now();
            const cooldownTime = 3 * 60 * 60 * 1000;

            const jobs = {
                dokter: {
                    min: 200,
                    max: 400,
                    action: async () => {
                        m.reply("🩺 *Mencari Pasien...* 🚶‍♂️🩻");
                        await sleep(4000);
                        m.reply("👨‍⚕️ *Memeriksa Kondisi Pasien...* 💉");
                        await sleep(4000);
                        m.reply("*Mengobati Pasien...* 💊💪");
                        await sleep(4000);
                        const patientSatisfaction = Math.random() < 0.8 ? "Puas" : "Tidak Puas";
                        const satisfactionText = patientSatisfaction === "Puas" ? "🌟 *Pasien Puas!* 💖" : "😕 *Pasien Tidak Puas!*";
                        m.reply(satisfactionText);
                        return patientSatisfaction === "Puas" ? Math.floor(Math.random() * 10000000) + 200 : Math.floor(Math.random() * 101) + 100;
                    },
                    description: "🩺 Dokter, mengobati pasien dengan penuh dedikasi."
                },
                programmer: {
                    min: 180,
                    max: 380,
                    action: async () => {
                        m.reply("💻 *Membuka IDE...* ⌨️");
                        await sleep(4000);
                        m.reply("🔍 *Debugging Code...* 🐛");
                        await sleep(4000);
                        m.reply("*Push ke Production...* 🚀");
                        const codeQuality = Math.random() < 0.85 ? "Clean Code" : "Bug Ditemukan";
                        const qualityText = codeQuality === "Clean Code" ? "✨ *Code Review Sukses!* 🎉" : "🔧 *Bug Ditemukan, Perlu Perbaikan!* ⚠️";
                        m.reply(qualityText);
                        return codeQuality === "Clean Code" ? Math.floor(Math.random() * 10000000) + 180 : Math.floor(Math.random() * 101) + 80;
                    },
                    description: "💻 Programmer, mengubah kopi menjadi code."
                },
                chef: {
                    min: 150,
                    max: 350,
                    action: async () => {
                        m.reply("👨‍🍳 *Menyiapkan Bahan...* 🥘");
                        await sleep(4000);
                        m.reply("🔥 *Memasak dengan Semangat...* 🍳");
                        await sleep(4000);
                        m.reply("*Plating Hidangan...* 🎨");
                        const cookingResult = Math.random() < 0.88 ? "Sempurna" : "Kurang Sempurna";
                        const resultText = cookingResult === "Sempurna" ? "⭐ *Pelanggan Sangat Puas!* 🍽️" : "😮 *Masakan Kurang Sempurna!* 📝";
                        m.reply(resultText);
                        return cookingResult === "Sempurna" ? Math.floor(Math.random() * 10000000) + 150 : Math.floor(Math.random() * 10000) + 70;
                    },
                    description: "👨‍🍳 Chef, menciptakan seni kuliner."
                },
                designer: {
                    min: 160,
                    max: 360,
                    action: async () => {
                        m.reply("🎨 *Membuka Software Design...* 🖌️");
                        await sleep(4000);
                        m.reply("✏️ *Membuat Sketsa...* 📐");
                        await sleep(4000);
                        m.reply("*Finishing Design...* 🎯");
                        const designQuality = Math.random() < 0.87 ? "Kreatif" : "Revisi";
                        const qualityText = designQuality === "Kreatif" ? "🌟 *Klien Menyukai Design!* 🎨" : "✏️ *Perlu Revisi!* 🔄";
                        m.reply(qualityText);
                        return designQuality === "Kreatif" ? Math.floor(Math.random() * 10000000) + 160 : Math.floor(Math.random() * 91) + 70;
                    },
                    description: "🎨 Designer, menciptakan keindahan visual."
                },
                youtuber: {
                    min: 170,
                    max: 370,
                    action: async () => {
                        m.reply("🎥 *Mempersiapkan Konten...* 📝");
                        await sleep(4000);
                        m.reply("🎬 *Proses Shooting...* 🎦");
                        await sleep(4000);
                        m.reply("*Editing Video...* 🎮");
                        const viewCount = Math.random() < 0.83 ? "Viral" : "Sepi";
                        const viewText = viewCount === "Viral" ? "🔥 *Video Trending!* 📈" : "📉 *Views Kurang!* 😔";
                        m.reply(viewText);
                        return viewCount === "Viral" ? Math.floor(Math.random() * 10000000) + 170 : Math.floor(Math.random() * 91) + 80;
                    },
                    description: "🎥 YouTuber, menghibur dengan konten kreatif."
                },
                musisi: {
                    min: 140,
                    max: 340,
                    action: async () => {
                        m.reply("🎸 *Menyetel Alat Musik...* 🎼");
                        await sleep(4000);
                        m.reply("🎵 *Menciptakan Melodi...* 🎹");
                        await sleep(4000);
                        m.reply("*Recording Lagu...* 🎧");
                        const musicQuality = Math.random() < 0.86 ? "Hit" : "Flop";
                        const qualityText = musicQuality === "Hit" ? "🌟 *Lagu Menjadi Hit!* 🎵" : "😔 *Belum Mendapat Perhatian!* 📉";
                        m.reply(qualityText);
                        return musicQuality === "Hit" ? Math.floor(Math.random() * 10000000) + 140 : Math.floor(Math.random() * 10000) + 60;
                    },
                    description: "🎸 Musisi, menciptakan harmoni kehidupan."
                },
                barista: {
                    min: 130,
                    max: 330,
                    action: async () => {
                        m.reply("☕ *Menyiapkan Biji Kopi...* 🫘");
                        await sleep(4000);
                        m.reply("⚡ *Membuat Kopi...* ♨️");
                        await sleep(4000);
                        m.reply("*Latte Art...* 🎨");
                        const coffeeQuality = Math.random() < 0.89 ? "Perfect" : "Kurang";
                        const qualityText = coffeeQuality === "Perfect" ? "✨ *Pelanggan Terpukau!* ☕" : "😕 *Rasa Kurang Pas!* 📝";
                        m.reply(qualityText);
                        return coffeeQuality === "Perfect" ? Math.floor(Math.random() * 10000000) + 130 : Math.floor(Math.random() * 71) + 60;
                    },
                    description: "☕ Barista, menyeduh kebahagiaan dalam secangkir kopi."
                },
                photographer: {
                    min: 150,
                    max: 350,
                    action: async () => {
                        m.reply("📸 *Menyiapkan Kamera...* 🎞️");
                        await sleep(4000);
                        m.reply("🌟 *Mencari Angle Terbaik...* 📱");
                        await sleep(4000);
                        m.reply("*Post-Processing...* 🖼️");
                        const photoQuality = Math.random() < 0.85 ? "Stunning" : "Biasa";
                        const qualityText = photoQuality === "Stunning" ? "🎉 *Klien Sangat Puas!* 📸" : "😔 *Hasil Kurang Maksimal!* 📝";
                        m.reply(qualityText);
                        return photoQuality === "Stunning" ? Math.floor(Math.random() * 10000000) + 150 : Math.floor(Math.random() * 10000) + 70;
                    },
                    description: "📸 Photographer, menangkap momen berharga."
                },
                guru: {
                    min: 140,
                    max: 340,
                    action: async () => {
                        m.reply("📚 *Menyiapkan Materi...* 📖");
                        await sleep(4000);
                        m.reply("👨‍🏫 *Mengajar Murid...* 📝");
                        await sleep(4000);
                        m.reply("*Evaluasi Pembelajaran...* 📊");
                        const teachingQuality = Math.random() < 0.87 ? "Efektif" : "Kurang";
                        const qualityText = teachingQuality === "Efektif" ? "🌟 *Murid Memahami Materi!* 📚" : "📝 *Perlu Perbaikan Metode!* 🔄";
                        m.reply(qualityText);
                        return teachingQuality === "Efektif" ? Math.floor(Math.random() * 10000000) + 140 : Math.floor(Math.random() * 10000) + 60;
                    },
                    description: "👨‍🏫 Guru, membentuk masa depan bangsa."
                },
                penulis: {
                    min: 130,
                    max: 330,
                    action: async () => {
                        m.reply("📝 *Brainstorming Ide...* 💭");
                        await sleep(4000);
                        m.reply("✍️ *Menulis Draft...* 📜");
                        await sleep(4000);
                        m.reply("*Editing Naskah...* 📖");
                        const writingQuality = Math.random() < 0.86 ? "Bestseller" : "Biasa";
                        const qualityText = writingQuality === "Bestseller" ? "🌟 *Tulisan Mendapat Pujian!* 📚" : "📝 *Perlu Revisi!* ✍️";
                        m.reply(qualityText);
                        return writingQuality === "Bestseller" ? Math.floor(Math.random() * 10000000) + 130 : Math.floor(Math.random() * 71) + 60;
                    },
                    description: "✍️ Penulis, menuangkan ide dalam kata-kata."
                },
                trader: {
                    min: 200,
                    max: 400,
                    action: async () => {
                        m.reply("📊 *Menganalisis Market...* 📈");
                        await sleep(4000);
                        m.reply("💹 *Trading Session...* 📉");
                        await sleep(4000);
                        m.reply("*Mengambil Profit...* 💰");
                        const tradeResult = Math.random() < 0.75 ? "Profit" : "Loss";
                        const resultText = tradeResult === "Profit" ? "💰 *Trading Profit!* 📈" : "📉 *Trading Loss!* 💸";
                        m.reply(resultText);
                        return tradeResult === "Profit" ? Math.floor(Math.random() * 10000000) + 200 : Math.floor(Math.random() * 101) + 100;
                    },
                    description: "📊 Trader, mengambil keuntungan dari pasar."
                },
                pilot: {
                    min: 250,
                    max: 450,
                    action: async () => {
                        m.reply("✈️ *Pre-Flight Check...* 🛫");
                        await sleep(4000);
                        m.reply("🛩️ *Flying Aircraft...* ☁️");
                        await sleep(4000);
                        m.reply("*Landing Procedure...* 🛬");
                        const flightQuality = Math.random() < 0.9 ? "Smooth" : "Bumpy";
                        const qualityText = flightQuality === "Smooth" ? "✈️ *Perfect Landing!* 🌟" : "🌪️ *Turbulent Flight!* ⚠️";
                        m.reply(qualityText);
                        return flightQuality === "Smooth" ? Math.floor(Math.random() * 10000000) + 250 : Math.floor(Math.random() * 101) + 150;
                    },
                    description: "✈️ Pilot, menerbangkan mimpi ke langit biru."
                },
                polisi: {
                    min: 160,
                    max: 360,
                    action: async () => {
                        m.reply("👮 *Patroli Area...* 🚓");
                        await sleep(4000);
                        m.reply("🚨 *Menangani Kasus...* 🔍");
                        await sleep(4000);
                        m.reply("*Menyelesaikan Tugas...* 📝");
                        const dutyResult = Math.random() < 0.88 ? "Sukses" : "Kompleks";
                        const resultText = dutyResult === "Sukses" ? "🌟 *Kasus Terselesaikan!* 👮" : "📋 *Kasus Berlanjut!* 🔍";
                        m.reply(resultText);
                        return dutyResult === "Sukses" ? Math.floor(Math.random() * 10000000) + 160 : Math.floor(Math.random() * 91) + 70;
                    },
                    description: "👮 Polisi, melindungi dan melayani masyarakat."
                },
                pengacara: {
                    min: 180,
                    max: 380,
                    action: async () => {
                        m.reply("⚖️ *Mempelajari Kasus...* 📚");
                        await sleep(4000);
                        m.reply("👨‍⚖️ *Sidang di Pengadilan...* 🏛️");
                        await sleep(4000);
                        m.reply("*Mengajukan Pembelaan...* 📋");
                        const caseResult = Math.random() < 0.85 ? "Menang" : "Kalah";
                        const resultText = caseResult === "Menang" ? "⚖️ *Kasus Dimenangkan!* 🎉" : "📜 *Kasus Ditunda!* ⏳";
                        m.reply(resultText);
                        return caseResult === "Menang" ? Math.floor(Math.random() * 10000000) + 180 : Math.floor(Math.random() * 101) + 80;
                    },
                    description: "⚖️ Pengacara, memperjuangkan keadilan."
                },
                arsitek: {
                    min: 170,
                    max: 370,
                    action: async () => {
                        m.reply("🏗️ *Membuat Desain...* 📐");
                        await sleep(4000);
                        m.reply("📏 *Mengkalkulasi Struktur...* 🔧");
                        await sleep(4000);
                        m.reply("*Presentasi ke Klien...* 🎯");
                        const designResult = Math.random() < 0.87 ? "Diterima" : "Revisi";
                        const resultText = designResult === "Diterima" ? "🌟 *Desain Disetujui!* 🏢" : "✏️ *Perlu Perbaikan!* 📝";
                        m.reply(resultText);
                        return designResult === "Diterima" ? Math.floor(Math.random() * 10000000) + 170 : Math.floor(Math.random() * 91) + 80;
                    },
                    description: "🏗️ Arsitek, merancang masa depan."
                },
                scientist: {
                    min: 190,
                    max: 390,
                    action: async () => {
                        m.reply("🔬 *Melakukan Penelitian...* 🧪");
                        await sleep(4000);
                        m.reply("🧬 *Analisis Data...* 📊");
                        await sleep(4000);
                        m.reply("*Menulis Jurnal...* 📑");
                        const researchResult = Math.random() < 0.83 ? "Breakthrough" : "Ongoing";
                        const resultText = researchResult === "Breakthrough" ? "🌟 *Penemuan Baru!* 🔬" : "📚 *Penelitian Berlanjut!* 🔍";
                        m.reply(resultText);
                        return researchResult === "Breakthrough" ? Math.floor(Math.random() * 10000000) + 190 : Math.floor(Math.random() * 101) + 90;
                    },
                    description: "🔬 Scientist, mengungkap misteri alam."
                },
                athlete: {
                    min: 150,
                    max: 350,
                    action: async () => {
                        m.reply("🏃 *Pemanasan...* 💪");
                        await sleep(4000);
                        m.reply("🎯 *Latihan Intensif...* ⚡");
                        await sleep(4000);
                        m.reply("*Kompetisi...* 🏆");
                        const matchResult = Math.random() < 0.85 ? "Menang" : "Kalah";
                        const resultText = matchResult === "Menang" ? "🏆 *Juara Kompetisi!* 🌟" : "🥈 *Finish Runner Up!* 💪";
                        m.reply(resultText);
                        return matchResult === "Menang" ? Math.floor(Math.random() * 10000000) + 150 : Math.floor(Math.random() * 10000) + 70;
                    },
                    description: "🏃 Athlete, meraih prestasi olahraga."
                },
                dentist: {
                    min: 180,
                    max: 380,
                    action: async () => {
                        m.reply("🦷 *Memeriksa Pasien...* 🔍");
                        await sleep(4000);
                        m.reply("🦷 *Perawatan Gigi...* 💉");
                        await sleep(4000);
                        m.reply("*Finishing Treatment...* ✨");
                        const treatmentResult = Math.random() < 0.88 ? "Sukses" : "Kompleks";
                        const resultText = treatmentResult === "Sukses" ? "✨ *Perawatan Berhasil!* 😁" : "📋 *Perlu Treatment Lanjutan!* 🦷";
                        m.reply(resultText);
                        return treatmentResult === "Sukses" ? Math.floor(Math.random() * 10000000) + 180 : Math.floor(Math.random() * 91) + 90;
                    },
                    description: "🦷 Dentist, merawat senyuman indah."
                },
                peternak: {
                    min: 140,
                    max: 340,
                    action: async () => {
                        m.reply("🐄 *Memberi Makan Ternak...* 🌾");
                        await sleep(4000);
                        m.reply("🥛 *Proses Pemerahan...* 🪣");
                        await sleep(4000);
                        m.reply("*Mengolah Hasil Ternak...* 📦");
                        const farmResult = Math.random() < 0.9 ? "Melimpah" : "Biasa";
                        const resultText = farmResult === "Melimpah" ? "🥛 *Hasil Panen Melimpah!* 🎉" : "📊 *Hasil Standar!* 📝";
                        m.reply(resultText);
                        return farmResult === "Melimpah" ? Math.floor(Math.random() * 10000000) + 140 : Math.floor(Math.random() * 10000) + 60;
                    },
                    description: "🐄 Peternak, merawat hewan dengan kasih sayang."
                },
                nelayan: {
                    min: 130,
                    max: 330,
                    action: async () => {
                        m.reply("🎣 *Menuju Laut...* ⛵");
                        await sleep(4000);
                        m.reply("🌊 *Melempar Jala...* 🎣");
                        await sleep(4000);
                        m.reply("*Mengumpulkan Hasil...* 🐟");
                        const fishResult = Math.random() < 0.85 ? "Banyak" : "Sedikit";
                        const resultText = fishResult === "Banyak" ? "🐟 *Tangkapan Melimpah!* 🎉" : "🎣 *Tangkapan Minim!* 📉";
                        m.reply(resultText);
                        return fishResult === "Banyak" ? Math.floor(Math.random() * 10000000) + 130 : Math.floor(Math.random() * 71) + 60;
                    },
                    description: "🎣 Nelayan, menjelajahi lautan biru."
                },
                psikolog: {
                    min: 160,
                    max: 360,
                    action: async () => {
                        m.reply("🧠 *Sesi Konsultasi...* 💭");
                        await sleep(4000);
                        m.reply("👥 *Analisis Masalah...* 📝");
                        await sleep(4000);
                        m.reply("*Memberikan Solusi...* 💡");
                        const sessionResult = Math.random() < 0.87 ? "Efektif" : "Lanjutan";
                        const resultText = sessionResult === "Efektif" ? "✨ *Klien Merasa Lebih Baik!* 🌟" : "📋 *Perlu Sesi Tambahan!* 🔄";
                        m.reply(resultText);
                        return sessionResult === "Efektif" ? Math.floor(Math.random() * 10000000) + 160 : Math.floor(Math.random() * 10000) + 80;
                    },
                    description: "🧠 Psikolog, membantu menyembuhkan jiwa."
                }, 
                dokter: {
                                min: 200,
                                max: 400,
                                action: async () => {
                                    m.reply("🩺 *Mencari Pasien...* 🚶‍♂️🩻");
                                await sleep(4000);
                                m.reply("👨‍⚕️ *Memeriksa Kondisi Pasien...* 💉");
                                await sleep(4000);
                                m.reply("*Mengobati Pasien...* 💊💪");
                                await sleep(4000);
                                const patientSatisfaction = Math.random() < 0.8 ? "Puas" : "Tidak Puas";
                                const satisfactionText = patientSatisfaction === "Puas" ? "🌟 *Pasien Puas!* 💖" : "😕 *Pasien Tidak Puas!*";
                                m.reply(satisfactionText);
                                return patientSatisfaction === "Puas" ? Math.floor(Math.random() * 201) + 200 : Math.floor(Math.random() * 101) + 100;
                            },
                            description: "🩺 Dokter, mengobati pasien dengan penuh dedikasi."
                        },
                        supir: {
                            min: 150,
                            max: 350,
                            action: async () => {
                                m.reply("🚗 *Memulai Perjalanan...* 🛣️");
                                await sleep(4000);
                                m.reply("🛵 *Menjemput Penumpang di Lokasi...* 👥");
                                await sleep(4000);
                                m.reply("💨 *Mengemudi dengan Hati-hati...* ⚡");
                                const driveResult = Math.random() < 0.85 ? "Sampai Tujuan" : "Tersesat";
                                const resultText = driveResult === "Sampai Tujuan" ? "😊 *Penumpang Senang!* 💕" : "😓 *Tersesat, Penumpang Kesal!* 🚧";
                                await sleep(4000);
                                m.reply(resultText);
                                return driveResult === "Sampai Tujuan" ? Math.floor(Math.random() * 201) + 150 : Math.floor(Math.random() * 101) + 100;
                            },
                            description: "🚗 Supir, mengemudi dan mengantar penumpang dengan aman."
                        },
                        kurir: {
                            min: 100,
                            max: 300,
                            action: async () => {
                                m.reply("📦 *Menerima Paket...* 🏠");
                                await sleep(4000);
                                m.reply("🚚 *Mengantar Paket ke Tujuan...* 🛤️");
                                await sleep(4000);
                                m.reply("*Menyampaikan Paket...* 📦💨");
                                const deliverySuccess = Math.random() < 0.9 ? "Paket Sampai dengan Selamat" : "Paket Tertunda";
                                const successText = deliverySuccess === "Paket Sampai dengan Selamat" ? "🎉 *Paket Terkirim dengan Baik!* 📬" : "😔 *Paket Terlambat, Customer Kesal!* 📦";
                                await sleep(4000);
                                m.reply(successText);
                                return deliverySuccess === "Paket Sampai dengan Selamat" ? Math.floor(Math.random() * 201) + 100 : Math.floor(Math.random() * 51) + 50;
                            },
                            description: "📦 Kurir, mengantar paket dengan penuh semangat!"
                        },
                        pegawai: {
                            min: 120,
                            max: 320,
                            action: async () => {
                                m.reply("🖥️ *Memulai Pekerjaan di Kantor...* 📑");
                                await sleep(4000);
                                m.reply("📋 *Menyelesaikan Tugas Harian...* 🔄");
                                await sleep(4000);
                                m.reply("💼 *Bekerja dengan Fokus...* ⏳");
                                const workPerformance = Math.random() < 0.85 ? "Produktif" : "Lambat";
                                const performanceText = workPerformance === "Produktif" ? "🏆 *Kinerja Baik, Pujian Diterima!* 🙌" : "⚠️ *Lambat, Ditegur Bos!* 📉";
                                await sleep(4000);
                                m.reply(performanceText);
                                return workPerformance === "Produktif" ? Math.floor(Math.random() * 201) + 120 : Math.floor(Math.random() * 81) + 50;
                            },
                            description: "🖥️ Pegawai, bekerja dengan penuh dedikasi!"
                        },
                        petani: {
                            min: 80,
                            max: 280,
                            action: async () => {
                                m.reply("🌱 *Memulai Pekerjaan di Ladang...* 🌾");
                                await sleep(4000);
                                m.reply("👩‍🌾 *Menanam Bibit Tanaman...* 🌿");
                                await sleep(4000);
                                m.reply("*Bertani di Ladang...* 🌻💧");
                                const cropYield = Math.random() < 0.9 ? "Hasil Panen Melimpah" : "Hasil Panen Gagal";
                                const yieldText = cropYield === "Hasil Panen Melimpah" ? "🌾 *Panen Sukses, Hasil Melimpah!* 🌟" : "😔 *Panen Gagal, Hasil Minim!* 🛑";
                                await sleep(4000);
                                m.reply(yieldText);
                                return cropYield === "Hasil Panen Melimpah" ? Math.floor(Math.random() * 201) + 80 : Math.floor(Math.random() * 51) + 30;
                            },
                            description: "🌱 Petani, bertani dengan semangat tinggi!"
                        }
            };

            // Kode lainnya tetap sama
            if (!text || !Object.keys(jobs).includes(text.toLowerCase())) {
                return m.reply(
                    "*💼 Pilih pekerjaan berikut:*\n" +
                    Object.keys(jobs)
                        .map((job) => `- *${job.charAt(0).toUpperCase() + job.slice(1)}*`)
                        .join("\n")
                );
            }

            const selectedJob = text.toLowerCase();
            const job = jobs[selectedJob];

            const lastKerja = db.list().user[userId]?.lastkerja || 0;
            if (currentTime - lastKerja < cooldownTime) {
                const remainingTime = cooldownTime - (currentTime - lastKerja);
                const hours = Math.floor(remainingTime / (60 * 60 * 1000));
                const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
                return m.reply(`> Anda sedang kelelahan. Silakan coba lagi dalam *${hours} jam ${minutes} menit*.`);
            }

            const reward = await job.action();

            db.list().user[userId] = db.list().user[userId] || {};
            db.list().user[userId].lastkerja = currentTime;
            db.list().user[userId].money = (db.list().user[userId].money || 0) + reward;

            return m.reply(`✨ Anda sekarang bekerja sebagai *${selectedJob.charAt(0).toUpperCase() + selectedJob.slice(1)}* 💼 dan mendapatkan bonus 💰 *${reward}*! 🌟`);
        } catch (error) {
            m.reply(`> ⚠️ Terjadi kesalahan: ${error.message}`);
        }
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}