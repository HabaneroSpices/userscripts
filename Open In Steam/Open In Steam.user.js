// ==UserScript==
// @name         Open In Steam
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Replace "Store Page" button with "Open In Steam"!
// @author       Habanero
// @match        https://steamcommunity.com/*
// @icon         https://github.com/HabaneroSpices/userscripts/raw/main/img/steam.svg
// @downloadURL  https://github.com/HabaneroSpices/userscripts/raw/main/Open%20In%20Steam/Open%20In%20Steam.user.js
// @updateURL    https://github.com/HabaneroSpices/userscripts/raw/main/Open%20In%20Steam/Open%20In%20Steam.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var curURL = window.location.href;
    var [storePage] = document.querySelectorAll(".apphub_OtherSiteInfo");

    storePage.querySelector('span:not([class])').innerHTML = "Open in Steam";
    storePage.querySelector('[data-appid]').href = "steam://openurl/" + curURL;
})();
