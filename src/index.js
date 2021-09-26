const imageAuthorEl = document.querySelector(".image-author");
const cryptoWrapperEl = document.querySelector(".crypto-wrapper");
const timeEl = document.querySelector(".time");

const imageUrl =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=minimal";
let cryptoIds = ["cardano", "solana"];
let cryptoData = [];

fetch(imageUrl)
  .then(res => res.json())
  .then(imageData => {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url("${imageData.urls.full}")`;
    imageAuthorEl.innerText = `By ${imageData.user.name}`;
  })
  .catch(err => {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "#000";
    imageAuthorEl.innerText = `By Anonymous`;
  });

getCryptoDetails(cryptoIds);
setInterval(updateTime, 1000);

function getCryptoDetails(cryptoIds) {
  cryptoIds.forEach(cryptoId => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}?tickers=false&market_data=true&community_data=false&developer_data=false`
    )
      .then(res => {
        if (!res.ok) {
          throw Error("Something went wrong");
        }

        return res.json();
      })
      .then(data => {
        cryptoData.push(data);
        console.log(cryptoData);
        showCryptoData(data);
      })
      .catch(err => console.error(err));
  });
}

function showCryptoData(crypto) {
  const html = `
    <div class="crypto">
      <div class="crypto-details">
        <img src="${crypto.image.small}" class="crypto__icon"><span class="crypto__name">${crypto.name}</span>
      </div>
      <div class="crypto__prices">
        <p class="crypto__prices__current">Current price: £ ${crypto.market_data.current_price.gbp}</p>
        <p class="crypto__prices__market-cap">Market cap: £ ${crypto.market_data.market_cap.gbp}</p>
      </div>
    </div>`;

  cryptoWrapperEl.insertAdjacentHTML("beforeend", html);
}

function updateTime() {
  const date = new Date();
  const formattedDate = date.toLocaleTimeString("en-gb", {
    timeStyle: "short",
  });

  timeEl.innerText = `${formattedDate}`;
}
