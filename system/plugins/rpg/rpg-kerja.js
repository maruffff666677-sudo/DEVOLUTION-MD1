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