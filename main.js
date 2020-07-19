const cheerio = require('cheerio');
const fetch = require('node-fetch');
const url = "https://marketplace.visualstudio.com/items?itemName=bloumbs.borders-dark"

window.onload = function () {
    scrape();
};

function scrape() {
    fetch(url)
        .then(res => res.text())
        .then((body) => {
            const $ = cheerio.load(body);
            let installs = parseInt($('span.installs-text').text().split(' ')[1].replace(',', ''));
            let nf = new Intl.NumberFormat();
            let nf_installs = nf.format(installs);

            let badge = document.getElementById("version");
            badge.innerText = `${nf_installs} Installs`;
            console.log(`Borders Dark v1.7.0\n${nf_installs} Installs.`);
            setTimeout(function () {
                badge.innerText = "v1.7.0";
            }, 1500);
        });
};
