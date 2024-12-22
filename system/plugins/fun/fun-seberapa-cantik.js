module.exports = {
    command: "seberapa-cantik",
    alias: ["apakah-gw-cantik"],
    category: ["fun"],
    settings: {
        group: true
    },
    loading: true,
    async run(m, { sock }) {
        try {
            let random = Math.floor(Math.random() * 100) + 1;
            let response;

            switch (random) {
                case 100:
                    response = "💯 *100% Wah, ini sih bener-bener dewi cantik! Semua orang pasti terpesona!*";
                    break;
                case 99:
                    response = "🔥 *99% Hampir sempurna! Kamu cantik banget, semua mata pasti terpikat!*";
                    break;
                case 98:
                    response = "😎 *98% Cantik maksimal, semua orang pasti ingin berfoto denganmu!*";
                    break;
                case 97:
                    response = "😉 *97% Cantik banget, kamu bakalan jadi primadona di mana pun!*";
                    break;
                case 96:
                    response = "😁 *96% Kamu cantik banget, senyummu bikin hati berdebar-debar!*";
                    break;
                case 95:
                    response = "😍 *95% Pesonamu luar biasa, setiap langkahmu membuat orang menoleh!*";
                    break;
                case 94:
                    response = "🫣 *94% Cantik banget, tapi jangan terlalu pede ya, bisa kena karma!*";
                    break;
                case 93:
                    response = "💥 *93% Cantik, tapi ada yang sedikit lebih cantik dari kamu.*";
                    break;
                case 92:
                    response = "😏 *92% Cantik, tapi nggak langsung bikin orang jatuh cinta.*";
                    break;
                case 91:
                    response = "🙃 *91% Ganteng dan cantik sih, cuma bisa lebih baik lagi!*";
                    break;
                case 90:
                    response = "😜 *90% Agak menarik, tapi kadang terlihat biasa saja.*";
                    break;
                case 89:
                    response = "😬 *89% Cantik sih, tapi jangan kebanyakan pamer ya!*";
                    break;
                case 88:
                    response = "🥴 *88% Biasa aja sih, tapi masih oke lah, jangan khawatir!*";
                    break;
                case 87:
                    response = "🙄 *87% Cantik nggak terlalu mencolok, tapi masih lumayan.*";
                    break;
                case 86:
                    response = "🤔 *86% Mungkin kalau lebih sering dandan bisa lebih oke.*";
                    break;
                case 85:
                    response = "🤨 *85% Cantik, tapi kurang punya daya tarik yang kuat.*";
                    break;
                case 84:
                    response = "🤭 *84% Lumayan cantik, cuma agak biasa aja sih.*";
                    break;
                case 83:
                    response = "😅 *83% Cantik sedikit, tapi kalau lebih percaya diri bisa lebih keren!*";
                    break;
                case 82:
                    response = "😌 *82% Cantik sih, cuma nggak terlalu menonjol.*";
                    break;
                case 81:
                    response = "😏 *81% Cantik cukup, tapi masih bisa lebih baik lagi.*";
                    break;
                case 80:
                    response = "😉 *80% Ya, lumayanlah. Tapi bukan tipe yang langsung menarik perhatian.*";
                    break;
                case 79:
                    response = "😆 *79% Cantik, tapi jangan kebanyakan berharap terlalu banyak!*";
                    break;
                case 78:
                    response = "😂 *78% Cantik sih, tapi nggak bikin orang terpesona gitu.*";
                    break;
                case 77:
                    response = "😬 *77% Cantiknya agak kurang... Mungkin bisa lebih baik lagi.*";
                    break;
                case 76:
                    response = "🥺 *76% Cantik sih, tapi kayaknya perlu usaha lebih supaya lebih mempesona.*";
                    break;
                case 75:
                    response = "🤭 *75% Cantik cukup lah, tapi ya biasa aja kok.*";
                    break;
                case 74:
                    response = "🥱 *74% Cantik sih, tapi lebih ke standar aja.*";
                    break;
                case 73:
                    response = "😐 *73% Cantik bisa lebih oke lagi kalau lebih sering dandan!*";
                    break;
                case 72:
                    response = "😝 *72% Cantik agak pas-pasan, ya, tapi bisa lebih lagi kalau mau!*";
                    break;
                case 71:
                    response = "😏 *71% Hmmm, lumayan sih cantiknya. Cuma... belum bisa bikin orang terpukau.*";
                    break;
                case 70:
                    response = "😆 *70% Ya, lumayan juga lah. Tapi jangan khawatir, nggak jelek kok.*";
                    break;
                case 69:
                    response = "🤨 *69% Cantik sih, tapi agak aneh sedikit, jangan sedih!*";
                    break;
                case 68:
                    response = "🤔 *68% Cukup oke sih, tapi masih bisa lebih menarik lagi.*";
                    break;
                case 67:
                    response = "😜 *67% Biasa aja, tapi tetep oke. Keep it up!*";
                    break;
                case 66:
                    response = "🤭 *66% Cantiknya sih cukup, tapi jauh dari sempurna.*";
                    break;
                case 65:
                    response = "😎 *65% Ya, nggak jelek sih, tapi lebih keren kalau lebih percaya diri!*";
                    break;
                case 64:
                    response = "😉 *64% Cantiknya sih biasa aja, bisa lebih menarik kalau kamu percaya diri!*";
                    break;
                case 63:
                    response = "😅 *63% Cantik nggak terlalu menonjol, lebih baik kalau sering berlatih gaya!*";
                    break;
                case 62:
                    response = "😏 *62% Cantik, tapi lebih banyak yang lebih menarik sih.*";
                    break;
                case 61:
                    response = "🙃 *61% Masih oke sih, tapi lebih sering senyum biar keliatan lebih cantik!*";
                    break;
                case 60:
                    response = "😜 *60% Cantiknya sih bisa lah, tapi butuh sedikit usaha lebih.*";
                    break;
                case 59:
                    response = "😉 *59% Cantik standar, nggak buruk tapi juga nggak wah.*";
                    break;
                case 58:
                    response = "😬 *58% Cantik, tapi nggak sampai bikin orang terpesona.*";
                    break;
                case 57:
                    response = "😆 *57% Biasa aja, tapi masih oke lah kalau banyak senyum!*";
                    break;
                case 56:
                    response = "😏 *56% Cantik sih, cuma nggak ada yang spesial banget.*";
                    break;
                case 55:
                    response = "🤔 *55% Cantik nggak buruk, cuma agak kurang menonjol!*";
                    break;
                case 54:
                    response = "😎 *54% Ya, masih oke sih, tapi lebih keren kalau lebih percaya diri!*";
                    break;
                case 53:
                    response = "😐 *53% Cantiknya sih ada, tapi biasa banget.*";
                    break;
                case 52:
                    response = "😂 *52% Hahaha, lumayan cantik lah, tapi lebih oke kalau lebih nyantai!*";
                    break;
                case 51:
                    response = "🙃 *51% Cantik sih, tapi bisa lebih menarik kalau lebih percaya diri.*";
                    break;
                case 50:
                    response = "😏 *50% Cantik lumayan, tapi jangan terlalu pamer ya!*";
                    break;
                case 49:
                    response = "😒 *49% Cantik sih, tapi ya biasa aja.*";
                    break;
                case 48:
                    response = "😜 *48% Cukup cantik lah, tapi bisa lebih baik lagi.*";
                    break;
                case 47:
                    response = "🤔 *47% Cantik? Yah, cukup sih.*";
                    break;
                case 46:
                    response = "😉 *46% Agak biasa aja, tapi nggak jelek kok.*";
                    break;
                case 45:
                    response = "🤭 *45% Cantiknya standar, nggak buruk tapi bisa lebih.*";
                    break;
                case 44:
                    response = "🥱 *44% Cantiknya sih biasa aja, nggak ada yang luar biasa.*";
                    break;
                case 43:
                    response = "😂 *43% Cantik sih, tapi nggak ada yang bikin kagum.*";
                    break;
                case 42:
                    response = "🙃 *42% Cantik? Hmm, nggak jelek sih, cuma biasa.*";
                    break;
                case 41:
                    response = "😬 *41% Cantik tapi agak standar banget.*";
                    break;
                case 40:
                    response = "😅 *40% Cantik? Ya lumayan, tapi jangan kebanyakan berharap.*";
                    break;
                case 39:
                    response = "🤭 *39% Cantik banget sih, cuma agak biasa aja.*";
                    break
                case 38:
                    response = "😏 *38% Lumayan sih, kamu bisa jadi lebih keren dengan sedikit usaha!*";
                    break;
                case 37:
                    response = "🙃 *37% Cantik sih, tapi agak kurang percaya diri ya? Lebih percaya diri bisa lebih cantik!*";
                    break;
                case 36:
                    response = "😆 *36% Cantik nggak terlalu mencolok, tapi masih oke lah!*";
                    break;
                case 35:
                    response = "😉 *35% Cantik sih, tapi masih butuh effort biar lebih menonjol!*";
                    break;
                case 34:
                    response = "🤭 *34% Cantiknya biasa aja, lebih banyak senyum biar lebih menarik!*";
                    break;
                case 33:
                    response = "😜 *33% Cantik sih, tapi agak kurang spesial gitu.*";
                    break;
                case 32:
                    response = "😬 *32% Cantiknya standar banget, coba lebih percaya diri ya!*";
                    break;
                case 31:
                    response = "🤔 *31% Nggak jelek sih, tapi agak kurang percaya diri.*";
                    break;
                case 30:
                    response = "😝 *30% Cantik standar, tapi lebih bisa dengan penampilan dan percaya diri!*";
                    break;
                case 29:
                    response = "😏 *29% Lumayan cantik, tapi nggak terlalu menonjol.*";
                    break;
                case 28:
                    response = "😉 *28% Agak biasa sih, tapi tetep oke kok!*";
                    break;
                case 27:
                    response = "🙃 *27% Cantik sih, cuma nggak bisa menarik perhatian banyak orang.*";
                    break;
                case 26:
                    response = "😆 *26% Cantik biasa aja, nggak buruk sih!*";
                    break;
                case 25:
                    response = "😅 *25% Bisa lebih baik dengan lebih percaya diri dan gaya!*";
                    break;
                case 24:
                    response = "😬 *24% Cantik nggak terlalu menonjol, tapi tetep oke kok!*";
                    break;
                case 23:
                    response = "😐 *23% Agak biasa, tapi masih bisa diubah dengan usaha!*";
                    break;
                case 22:
                    response = "😜 *22% Nggak jelek, tapi bisa lebih baik dengan sedikit usaha!*";
                    break;
                case 21:
                    response = "😉 *21% Cantik sih, tapi nggak terlalu memikat.*";
                    break;
                case 20:
                    response = "🤭 *20% Cantik sih, tapi bisa lebih keren kalau lebih percaya diri!*";
                    break;
                case 19:
                    response = "😂 *19% Agak biasa aja, coba lebih tampil percaya diri!*";
                    break;
                case 18:
                    response = "😏 *18% Cantik sih, tapi jangan lupa lebih pede!*";
                    break;
                case 17:
                    response = "😬 *17% Cantik standar, lebih pede sedikit pasti lebih menarik!*";
                    break;
                case 16:
                    response = "🙄 *16% Lumayan, tapi butuh lebih banyak percaya diri dan usaha!*";
                    break;
                case 15:
                    response = "🤔 *15% Cantiknya standar banget, coba tampil beda!*";
                    break;
                case 14:
                    response = "😅 *14% Bisa lebih baik dengan sedikit usaha dan percaya diri!*";
                    break;
                case 13:
                    response = "😜 *13% Cantiknya lumayan, lebih percaya diri pasti lebih cantik!*";
                    break;
                case 12:
                    response = "😏 *12% Kamu bisa lebih cantik dengan lebih percaya diri!*";
                    break;
                case 11:
                    response = "😉 *11% Cantiknya oke lah, tapi bisa lebih keren dengan gaya!*";
                    break;
                case 10:
                    response = "😬 *10% Cantiknya biasa aja, coba lebih percaya diri dan tampil beda!*";
                    break;
                case 9:
                    response = "🙃 *9% Agak kurang cantik, tapi nggak jelek sih!*";
                    break;
                case 8:
                    response = "🙄 *8% Cantiknya biasa aja, coba tampil dengan lebih percaya diri!*";
                    break;
                case 7:
                    response = "😜 *7% Cantiknya biasa banget, coba tampil lebih percaya diri!*";
                    break;
                case 6:
                    response = "🤭 *6% Cantiknya sih biasa aja, lebih baik kalau tampil dengan percaya diri!*";
                    break;
                case 5:
                    response = "😂 *5% Nggak jelek sih, tapi butuh usaha lebih biar lebih menarik!*";
                    break;
                case 4:
                    response = "😏 *4% Cantik sih, tapi nggak terlalu menonjol.*";
                    break;
                case 3:
                    response = "😬 *3% Cantiknya biasa aja, coba tampil lebih percaya diri!*";
                    break;
                case 2:
                    response = "🙃 *2% Cantik? Hmm, lebih banyak latihan aja biar lebih menarik!*";
                    break;
                case 1:
                    response = "🙄 *1% Maaf, tapi mungkin kamu bisa lebih memperhatikan gaya dan penampilan!*";
                    break;
                default:
                    response = "🤔 *Perhitungan error, coba lagi!*";
            }
            sock.sendMessage(m.cht, { text: response }, { quoted: m });
        } catch (error) {
            console.error(error);
            m.reply("Terjadi kesalahan, coba lagi.");
        }
    }
};