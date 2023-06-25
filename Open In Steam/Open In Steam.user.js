// ==UserScript==
// @name         Open In Steam
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace "Store Page" button with "Open In Steam"!
// @author       You
// @match        https://steamcommunity.com/*
// @icon         https://raw.githubusercontent.com/gilbarbara/logos/main/logos/steam.svg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var curURL = window.location.href;
    var [storePage] = document.querySelectorAll('[data-appid="431960"]');

    storePage.querySelector('span:not([class])').innerHTML = "Open in Steam";
    storePage.href = "steam://openurl/" + curURL;
})();
