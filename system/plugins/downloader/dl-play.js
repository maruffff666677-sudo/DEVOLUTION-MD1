/*
Thanks To Deku
*/
const yts = require("yt-search");
const axios = require('axios');

module.exports = {
  command: "play",
  alias: [],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "Search and play YouTube videos/music",
  loading: true,
  async run(m, { sock, Scraper, Func, config, text }) {
    if (!text) throw "Please provide a song name. Example: .play wind breaker reido zettai";

    let convert = await yts({ search: text, hl: 'id', gl: 'ID' });
    let result = convert.all[0];

    if (!result) {
      return m.reply('No results found...');
    }

    const message = `『 *YOUTUBE PLAYER* 』
┌ Title: ${result.title}
├ Duration: ${result.timestamp}
├ Views: ${result.views}
├ Uploaded: ${result.ago}
└ URL: ${result.url}`;
    
    await sock.sendMessage(m.cht, {
      text: message,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: result.title,
          mediaType: 1,
          previewType: 1,
          body: `Duration: ${result.timestamp} • Views: ${result.views}`,
          thumbnailUrl: result.image,
          renderLargerThumbnail: true,
          mediaUrl: result.url,
          sourceUrl: result.url
        }
      }
    }, { quoted: m });
  
    try {
      const mp3 = await SaveTube.dl(result.url, "4", "audio");
      await sock.sendMessage(m.cht, {
        audio: { url: mp3.link },
        mimetype: 'audio/mpeg'
      }, { quoted: m });
    } catch (err) {
      m.reply(`Error: ${err.message}`);
    }
  }
};
const SaveTube = {
    qualities: {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    },
    
    headers: {
        'accept': '*/*',
        'referer': 'https://ytshorts.savetube.me/',
        'origin': 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json'
    },
    
    cdn() {
        return Math.floor(Math.random() * 11) + 51;
    },
    
    checkQuality(type, qualityIndex) {
        if (!(qualityIndex in this.qualities[type])) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
        }
    },
    
    async fetchData(url, cdn, body = {}) {
        const headers = {
            ...this.headers,
            'authority': `cdn${cdn}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download`;
    },
    
    async dl(link, qualityIndex, typeIndex) {
        const type = typeIndex
        const quality = SaveTube.qualities[type][qualityIndex];
        if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
        SaveTube.checkQuality(type, qualityIndex);
        const cdnNumber = SaveTube.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;
        
        const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
        const badi = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };

        const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);

        return {
            link: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};