const imageAuthorEl = document.querySelector(".image-author");
const cryptoWrapperEl = document.querySelector(".crypto-wrapper");
const timeEl = document.querySelector(".time");
const weatherEl = document.querySelector(".weather");

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
navigator.geolocation.getCurrentPosition(getPosition);

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
        showCryptoData(data);
      })
      .catch(err => console.error(err));
  });
}

function showCryptoData(crypto) {
  const html = `
    <div class="crypto">
      <div class="crypto__details">
        <img src="${crypto.image.small}" class="crypto__icon"><span class="crypto__name">${crypto.name}</span>
      </div>
      <div class="crypto__prices">
        <p class="crypto__current-price"><span class="crypto__current-price--bold">Price</span>:</span> £${crypto.market_data.current_price.gbp}</p>
        <p class="crypto__market-cap"><span class="crypto__current-price--bold">Market cap:</span> £${crypto.market_data.market_cap.gbp}</p>
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

function getPosition(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;

  updateWeather(latitude, longitude);
}

function updateWeather(latitude, longitude) {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}`
  )
    .then(res => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }

      return res.json();
    })
    .then(data => {
      const currentTemp = Math.ceil(data.main.temp - 273);
      const weatherImg = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const location = data.name;

      const html = `
        <div class="weather__wrapper">
          <img src="${weatherImg}" class="weather__image">
          <p class="weather__temp">${currentTemp}°C</p>
        </div>
        <p class="weather__location">${location}</p>
       `;

      weatherEl.innerHTML = html;
    })
    .catch(err => console.error(err));
}
