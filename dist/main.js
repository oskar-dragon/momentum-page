/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const imageAuthorEl = document.querySelector(\".image-author\");\r\nconst cryptoWrapperEl = document.querySelector(\".crypto-wrapper\");\r\nconst timeEl = document.querySelector(\".time\");\r\n\r\nconst imageUrl =\r\n  \"https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=minimal\";\r\nlet cryptoIds = [\"cardano\", \"solana\"];\r\nlet cryptoData = [];\r\n\r\nfetch(imageUrl)\r\n  .then(res => res.json())\r\n  .then(imageData => {\r\n    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(\"${imageData.urls.full}\")`;\r\n    imageAuthorEl.innerText = `By ${imageData.user.name}`;\r\n  })\r\n  .catch(err => {\r\n    document.body.style.backgroundImage = \"\";\r\n    document.body.style.backgroundColor = \"#000\";\r\n    imageAuthorEl.innerText = `By Anonymous`;\r\n  });\r\n\r\ngetCryptoDetails(cryptoIds);\r\nsetInterval(updateTime, 1000);\r\n\r\nfunction getCryptoDetails(cryptoIds) {\r\n  cryptoIds.forEach(cryptoId => {\r\n    fetch(\r\n      `https://api.coingecko.com/api/v3/coins/${cryptoId}?tickers=false&market_data=true&community_data=false&developer_data=false`\r\n    )\r\n      .then(res => {\r\n        if (!res.ok) {\r\n          throw Error(\"Something went wrong\");\r\n        }\r\n\r\n        return res.json();\r\n      })\r\n      .then(data => {\r\n        cryptoData.push(data);\r\n        console.log(cryptoData);\r\n        showCryptoData(data);\r\n      })\r\n      .catch(err => console.error(err));\r\n  });\r\n}\r\n\r\nfunction showCryptoData(crypto) {\r\n  const html = `\r\n    <div class=\"crypto\">\r\n      <div class=\"crypto-details\">\r\n        <img src=\"${crypto.image.small}\" class=\"crypto__icon\"><span class=\"crypto__name\">${crypto.name}</span>\r\n      </div>\r\n      <div class=\"crypto__prices\">\r\n        <p class=\"crypto__prices__current\">Current price: £ ${crypto.market_data.current_price.gbp}</p>\r\n        <p class=\"crypto__prices__market-cap\">Market cap: £ ${crypto.market_data.market_cap.gbp}</p>\r\n      </div>\r\n    </div>`;\r\n\r\n  cryptoWrapperEl.insertAdjacentHTML(\"beforeend\", html);\r\n}\r\n\r\nfunction updateTime() {\r\n  const date = new Date();\r\n  const formattedDate = date.toLocaleTimeString(\"en-gb\", {\r\n    timeStyle: \"short\",\r\n  });\r\n\r\n  timeEl.innerText = `${formattedDate}`;\r\n}\r\n\n\n//# sourceURL=webpack://momentum-page/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;