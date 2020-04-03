const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://marketplace.visualstudio.com/items?itemName=bloumbs.borders-dark"

let int_installs = 0;

window.onload = function () {
    scrape();
};

function scrape() {
    axios.get(url).then((response) => {
        console.log("Getting Borders Dark v1.7.0 info...");
        const $ = cheerio.load(response.data);

        let installs = $('.ux-item-rating .installs-text').html($.installsText);
        let install_num = String(installs.split(" ")[1]).replace(',', '');
        int_installs = parseInt(install_num);

        main();
    })
}

function main() {
    let nf = new Intl.NumberFormat();
    let install_count = int_installs;

    console.log("Installs:", int_installs);
    const badge = document.getElementById("version");
    //badge.style.textAlign = "left";
    let i = 1;

    function count() {
        setTimeout(function () {
            if (i < install_count + 1) {
                badge.innerText = nf.format(i);
                i += 3;
                count();
            } else {
                badge.innerText = `${nf.format(i)} Installs`;
                setTimeout(function () {
                    //badge.style.textAlign = "center";
                    badge.innerText = "v1.7.0";
                }, 1500);
            }
        }, 0);
    }
    count();
}
