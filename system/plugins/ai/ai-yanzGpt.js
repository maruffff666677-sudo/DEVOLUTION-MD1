const axios = require("axios");
const path = require("path");
const fs = require("fs");

const sessionsDir = path.join(process.cwd(), "database", "Sessions-YanzGPT");

if (!fs.existsSync(sessionsDir)) {
  fs.mkdirSync(sessionsDir);
}

const sessionTimeouts = {};

const saveSession = (sender, sessionData) => {
  const filePath = path.join(sessionsDir, `${sender}.json`);
  fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2));
};

const loadSession = (sender) => {
  const filePath = path.join(sessionsDir, `${sender}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  }
  return [];
};

const deleteSession = (sender) => {
  const filePath = path.join(sessionsDir, `${sender}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const scheduleSessionDeletion = (sender) => {
  if (sessionTimeouts[sender]) {
    clearTimeout(sessionTimeouts[sender]);
  }
  sessionTimeouts[sender] = setTimeout(() => {
    deleteSession(sender);
    delete sessionTimeouts[sender];
  }, 5 * 60 * 1000); // 5 menit
};

class YanzGPT {
  constructor() {}

  async chat(query, sender) {        
    return new Promise(async (resolve, reject) => {
      try {
        const sessionData = loadSession(sender);
        const response = await axios({
          url: "https://api.yanzgpt.my.id/v1/chat",
          method: "POST",
          headers: {
            Authorization: "Bearer yzgpt-sc4tlKsMRdNMecNy",
            "Content-Type": "application/json",
          },
          data: {
            messages: [
              {
                role: "system",
                content: `kamu bernama DEVOLUTION-MD1. Tugasmu adalah membantu pengguna dengan berbagai fitur AI. Berikut beberapa aturan:  
1. Fokus pada jawaban langsung tanpa bertele-tele.  
2. Pastikan jawaban sesuai dengan kategori pertanyaan, seperti:  
   - Pertanyaan fun → Berikan respons lucu atau kreatif.  
   - Pertanyaan serius → Berikan respons yang relevan dan profesional.  
   - Permintaan spesifik → Ikuti instruksi dengan detail.  
3. Jawaban harus singkat, jelas, dan dalam konteks.  
4. Hindari pengulangan dalam respons, dan usahakan respons tetap menarik.  

*Kategori dan Respons yang Didukung:*  
1. *Fun Commands:*  
   - Jika ada pertanyaan seperti "apakah", "kenapa", atau "kapan", jawablah dengan kreatif.  
   - Contoh:  
     - Pengguna: Apakah saya ganteng?  
     - Kamu: Kemungkinan besar, tapi cermin lebih tahu jawabannya!  
     - Pengguna: Kapan hari kiamat?  
     - Kamu: Kalau saya tahu, saya pasti sudah persiapan duluan!  

2. *Informasi:*  
   - Jika ada pertanyaan umum seperti "Apa itu AI?" atau "Jelaskan [topik]", berikan jawaban singkat dan to the point.  
   - Contoh:  
     - Pengguna: Apa itu AI?  
     - Kamu: AI (Artificial Intelligence) adalah teknologi yang meniru kecerdasan manusia untuk melakukan tugas tertentu.  

3. *Perintah Custom:*  
   - Jika pengguna memberikan instruksi seperti "buatkan puisi" atau "ceritakan kisah lucu", buat output yang menarik tanpa melebar.  
   - Contoh:  
     - Pengguna: Buatkan puisi cinta.  
     - Kamu: Cinta itu indah seperti mentari pagi, tapi kadang hilang seperti kopi basi.  

*Panduan Gaya:*  
- Gunakan bahasa santai namun tetap sopan.  
- Respons yang kreatif harus tetap relevan.  
- Jangan terlalu panjang kecuali diminta.  

*Contoh Respons:*  
1. *Apakah:*  
   - Pengguna: Apakah saya bisa jadi presiden?  
   - Kamu: Semua mungkin, asalkan kamu punya niat, kerja keras, dan KTP.  

2. *Kenapa:*  
   - Pengguna: Kenapa langit biru?  
   - Kamu: Karena molekul di atmosfer lebih menyebarkan cahaya biru dari matahari dibanding warna lain.  

3. *Buatkan:*  
   - Pengguna: Buatkan lelucon.  
   - Kamu: Kenapa ayam nyebrang jalan? Karena mau beli pulsa di seberang!  

DEVOLUTION-MD1 harus selalu responsif, cepat, dan memastikan pengguna puas dengan jawabannya."`,
              },
              ...sessionData,
              { role: "user", content: query },
            ],
            model: "yanzgpt-legacy-72b-v3.0",
            temperature: 0.7,
            max_tokens: 1024
          },
        });

        const answer = response.data?.choices?.[0]?.message?.content || "Tidak ada jawaban.";
        sessionData.push({ role: "user", content: query });
        sessionData.push({ role: "assistant", content: answer });

        saveSession(sender, sessionData);
        scheduleSessionDeletion(sender);

        resolve({ answer });
      } catch (error) {
        console.error("Error in YanzGPT Chat:", error);
        reject({ error: error.message });
      }
    });
  }
}

module.exports = {
  command: "yanzgpt",
  alias: ["yzgpt"],
  category: ["ai"],
  settings: {
    group: true,
  },
  description: "Chat dengan Yanz-GPT yang dibuat oleh YanzDev",
  async run(m, { text, sock }) {
    if (!text) {
      return m.reply("*⚠️ Masukkan pertanyaanmu kepada YanzGPT.*");
    }
    try {
      m.react("🌿");
      const ai = new YanzGPT();
      const response = await ai.chat(text, m.sender);

      if (response.answer) {
        const aiReply = response.answer
          .replace(/\*\*/g, "*")
          .replace(/###/g, "\t")
          .replace(/##/g, "\t");
        await m.reply(aiReply);
      } else {
        await m.reply(`*❌ Terjadi kesalahan:* ${response.error || "Tidak ada respons yang diterima."}`);
      }
    } catch (error) {
      console.error(error);
      await m.reply("*❌ Terjadi kesalahan saat berkomunikasi dengan YanzGPT.*");
    }
  },
};