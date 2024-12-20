const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

class Npm {
    async search(moduleName) {
        try {
            const url = `https://www.npmjs.com/package/${moduleName}`;
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const packageName = $('h2 span._50685029').text().trim();
            const version = $('span._76473bea').first().text().split('•')[0].trim();
            const isPublic = $('span._76473bea').eq(1).text().trim() === 'Public';
            const lastPublished = $('span._76473bea time').attr('title');
            const formattedDate = moment(lastPublished).format('MMMM Do YYYY, h:mm:ss a');
            const dependencies = $('li a[href="?activeTab=dependencies"] span').text().trim();
            const description = $('meta[name="description"]').attr('content');

            return {
                url,
                packageName,
                version,
                isPublic,
                lastPublished: formattedDate,
                dependencies,
                description,
            };
        } catch (error) {
            console.error(`Error fetching package data: ${error.message}`);
            return null;
        }
    }
}

module.exports = new Npm()