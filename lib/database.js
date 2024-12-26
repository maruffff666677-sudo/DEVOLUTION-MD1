const fs = require('node:fs');
const path = require('node:path');

class Database {
    #data; 
    constructor(filename) {
        this.databaseFile = path.join('.', filename);
        this.#data = {};  
   }
    default = () => {
        return {
            "user": {},
            "group": {},
            "changelog": {},
            "settings": {
                self: false,
                online: false,
                anticall: false,
                blockcmd: [],
                max_upload: '50MB',
                resetlimit: '00:00'        
            }
        };
    };
   init = async () => {
        const data = await this.read();
        this.#data = { ...this.#data, ...data }; 
        return this.#data;
    };
    read = async () => {
        if (fs.existsSync(this.databaseFile)) {
            const data = fs.readFileSync(this.databaseFile);
            return JSON.parse(data);  
        } else {
            return this.default(); 
        }
    };

    save = async () => {
         const jsonData = JSON.stringify(this.#data, null, 2);
         fs.writeFileSync(this.databaseFile, jsonData); 
    };
    add = async (type, id, newData) => {
        if (!this.#data[type]) return `- Tipe data ${type} tidak ditemukan!`;
        if (!this.#data[type][id]) {
            this.#data[type][id] = newData;  
        }
        await this.save();
        return this.#data[type][id];
    };
    delete = async (type, id) => {
        if (this.#data[type] && this.#data[type][id]) {
            delete this.#data[type][id]; 
            await this.save();  
          return `- ${type} dengan ID ${id} telah dihapus.`;
        } else {
            return `- ${type} dengan ID ${id} tidak ditemukan!`;
        }
    };
   get = (type, id) => {
        if (this.#data[type] && this.#data[type][id]) {
           return this.#data[type][id]; 
        } else {
            return `- ${type} dengan ID ${id} tidak ditemukan!`;
        }
    };
    main = async (m) => {
        await this.read(); 
        if (m.isGroup) {
            await this.add("group", m.cht, {
                mute: false,
                messages: [],
                antilinkv1: false,
                sewa: {
                    status: false,
                    expired: 0
                },
                message: 0,
                status: "not_announcement"
            });
        }
        await this.add("user", m.sender, {
            name: m.pushName,
            limit: 100,
            register: false,
            lastLimitClaim: 0,
            lastHitman: 0,
            lastGajian: 0,
            lastHunter: 0,
            lastDaily: 0,
            bank: 0,
            lastMonthly: 0,
            lastYearly: 0,
            dosa: 0,
            level: 1,
            exp: 0,
            money: 0,
            lastkerja: 0,
            inventory: {
               poison: 0,
            },
            pet: {
               kyubi: 0,
               kucing: 0,
               anjing: 0,
            },
            memories: "", 
            stats: {
               strength: 5,
               agility: 5,
               health: 100,
               defense: 5
            },
            premium: {
                status: false,
                expired: 0
            },
            banned: {
                status: false,
                expired: 0
            }
        });
        await this.save(); 
        return this.list();
    };
    list = () => {
        return this.#data
    };
}

module.exports = Database;
