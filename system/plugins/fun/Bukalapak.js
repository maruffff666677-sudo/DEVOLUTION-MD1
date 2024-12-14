module.exports = {
  command: "bukalapak",
  alias: ["productsearch"],
  category: ["fun"],
  settings: {
    limit: true,
  },
  description: "🔍 Cari Product Dengan BukaLapak 📦",
  loading: true,
  async run(m, { text, Scraper, sock }) {
    if (!text || typeof text !== "string") {
      return m.reply("❗ *Masukkan Nama Product* yang ingin dicari di BukaLapak!")
    }
    
    try {
      let data = await Scraper.bukalapak.search(text)
      if (data && data.length > 0) {
        let { name, price, discountPrice, rating, sold, imageUrl, productLink } = data[0]
        
        let message = `✨ *Produk Ditemukan!* ✨\n\n`
        message += `📦 *Nama Produk:* ${name}\n`
        message += `💰 *Harga:* ${price}\n`
        if (discountPrice) message += `⚡ *Harga Diskon:* ${discountPrice}\n`
        message += `⭐ *Rating:* ${rating} 🌟\n`
        message += `💸 *Terjual:* ${sold} unit\n`
        message += `🔗 *Link Produk:* ${productLink}\n`

        await sock.sendMessage(m.cht, { image: { url: imageUrl }, caption: message }, { quoted: m })
      } else {
        m.reply("❌ *Produk Tidak Ditemukan* 😞")
      }
    } catch (error) {
      console.error("Terjadi Kesalahan:", error)
      m.reply("⚠️ *Terjadi Kesalahan* dalam pencarian produk, coba lagi nanti!")
    }
  }
}