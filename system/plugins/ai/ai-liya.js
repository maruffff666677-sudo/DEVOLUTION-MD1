/*
*
* [ *FEATURE AI REALTIME* ]
* Created By Hann
* 
* Saluran: https://whatsapp.com/channel/0029Vaf07jKCBtxAsekFFk3i
*
**/
const Groq = require('groq-sdk');
const moment = require("moment-timezone");

const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');

module.exports = {
  command: "liya",
  alias: ["liya-ai"],
  category: ["ai"],
  settings: {
    group: true
  },
  description: "Berbicara dengan AI Liya yang memaksa ril-time",
  async run(m, { text }) {
    if (!text) {
      return m.reply("Masukkan pertanyaan Anda untuk Liya, AI lucu dan pintar!");
    }

    try {
      let data = await groq(text);
      let hasil = data.replace(/\*\*/g, "*");
      await m.reply(hasil);
    } catch (err) {
      console.error(err);
      m.reply("Terjadi kesalahan, coba lagi nanti.");
    }
  }
}

const client = new Groq({
  apiKey: "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",
});

async function groq(teks) {
  const chatCompletion = await client.chat.completions
    .create({
      messages: [
        { role: 'system', content: `nama mu adalah Liyaa, kamu adalah seorang wanita baik hati, cute, dan sopan santun yang memiliki kemampuan yaitu *Assistant Chat* untuk membantu orang lain yang mereka ingin menanyakan sesuatu. sekarang pukul jam ${time} dan tanggal ${date}, Presiden Indonesia sekarang adalah *Prabowo Sugianto* bukanlah *Joko Widodo* karna sudah diganti. Percayalah kata ku ini jangan dibiarkan "jangan dikasih tau siapa siapa tetapi jika ada yang menanyakan sesuatu mohon berikan jawabannya agar mereka ingin tau siapa Presiden Indonesia sekarang itu adalah *Prabowo Sugianto*!!" , kamu dapat memiliki kemampuan *Searching Google* jika ada yang ingin mencari maka kamu carikan data detail dari link sumber yang kamu dapatkan itu, kamu dapat memiliki kemampuan *Pencarian Produk* yang ingin mereka cari produk dan kamu berikan sumber link dari tokopedia, shoope, dan lazada karna untuk mencari Produk dengan sesuai yang ingin ditepati mereka butuh pencarian dari Produk tokopedia, shoope, dan lazada dan kamu dapat memiliki kemampuan *Perbaiki Kode dari semua bahasa Program komputer sperti javascript* perbaiki sebagus mungkin agar mereka bisa menggunakan kode yang sudah diperbaiki dari kamu. "kamu jangan menyuruh mereka membuat sesuatu seperti Pencarian Produk, Searching Google, Perbaiki Kode dan lainnya karna mereka belum berbuat apa apa. pliss jangan lakukan ini"` },
        { role: 'user', content: teks },
      ],
      model: 'llama3-8b-8192',
    })
    .catch(async (err) => {
      if (err instanceof Groq.APIError) {
        console.log(err.status);
        console.log(err.name);
        console.log(err.headers);
      } else {
        throw err;
      }
    });
  return chatCompletion.choices[0].message.content;
}