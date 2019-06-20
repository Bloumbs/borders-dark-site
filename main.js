const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://marketplace.visualstudio.com/items?itemName=bloumbs.borders-dark"

let intDown = 0

window.onload = function () {
   scrape();
};

function scrape() {
   axios.get(url).then((response) => {
      const $ = cheerio.load(response.data)

      let downloads = $('.ux-item-rating .downloads-text').html($.downloadsText)
      let downSplit = String(downloads.split(" ")[1]).replace(/,/g, "")
      intDown = parseInt(downSplit)
      
      main();
   })
}

function main() {
   var nf = new Intl.NumberFormat()
   var downloadCount = intDown

   const badge = document.getElementById("badge");
   var i = 1;

   function count() {
      setTimeout(function () {
         if (i < downloadCount + 1) {
            badge.innerText = nf.format(i)
            i++
            count()
         } else {
            setTimeout(function () {
               badge.style.textAlign = "center"
               badge.innerText = "1.7.0"
            }, 1000)
         }
      }, 0)
   }
   count()
}