// ==UserScript==
// @name         AB Hover on Cover
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  AB Hover on Cover!
// @author       Habanero
// @match        https://animebytes.tv/*
// @icon         https://github.com/HabaneroSpices/userscripts/raw/main/img/ab.jpg
// @downloadURL  https://github.com/HabaneroSpices/userscripts/raw/main/AB%20Hover%20on%20Cover/AB%20Hover%20on%20Cover.user.js
// @updateURL    https://github.com/HabaneroSpices/userscripts/raw/main/AB%20Hover%20on%20Cover/AB%20Hover%20on%20Cover.user.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  
  var styles = `
  .enlarge-onhover:hover {
       width: auto;
       height: 80%;
       position: relative;
  }
  `
  
  var styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
  
  var mainimg = document.querySelectorAll(".mainimg");
  [].forEach.call(mainimg, function(mainimg) {
    mainimg.querySelector('img').classList.add("enlarge-onhover");
  });
})();
