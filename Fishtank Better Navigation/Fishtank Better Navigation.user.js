// ==UserScript==
// @name         Fishtank Better Navigation
// @namespace    http://tampermonkey.net/
// @version      2023-12-19.2
// @description  Fishtank Better Navigation
// @author       Credit some guy on le'chan
// @match        https://www.fishtank.live/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fishtank.live
// @downloadURL  https://github.com/HabaneroSpices/userscripts/raw/main/Fishtank%20Better%20Navigation/Fishtank%20Better%20Navigation.user.js
// @updateURL    https://github.com/HabaneroSpices/userscripts/raw/main/Fishtank%20Better%20Navigation/Fishtank%20Better%20Navigation.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==


(function() {
    (new MutationObserver(check)).observe(document, {childList: true, subtree: true});

    function check(changes, observer) {
        if(document.querySelector('.secondary-panel_secondary-panel__vUc65')) {
            observer.disconnect();

            function createFishtankButton(text) {
                var button = document.createElement('button');
                button.classList.add('color-button_color-button__cW61T', 'color-button_md__GaczN');

                var img = document.createElement('img');
                img.src = 'https://cdn.fishtank.live/images/slices/console-button-long-gray-4.png';
                button.appendChild(img);

                var textContainer = document.createElement('div');
                textContainer.classList.add('color-button_text__3OQAq');
                textContainer.innerText = text;
                button.appendChild(textContainer);

                return button;
            }

            var roomList = document.createElement('div');
            var roomIDs = [
                { id: 'hallway-downstairs', name: 'Hallway Downstairs' },
                { id: 'dog-house', name: 'Dog House' },
                { id: 'kitchen', name: 'Kitchen' },
                { id: 'bar', name: 'Bar' },
                { id: 'lounge', name: 'Lounge' },
                { id: 'living-room', name: 'Living Room' },
                { id: 'hallway-upstairs', name: 'Hallway Upstairs' },
                { id: 'bedroom-1', name: 'Bedroom 1' },
                { id: 'bedroom-2', name: 'Bedroom 2' },
                { id: 'bedroom-3', name: 'Bedroom 3' },
                { id: 'the-bunk', name: 'The Bunk' },
                { id: 'attic', name: 'Attic' }
            ];

            var sidebar = document.getElementsByClassName('secondary-panel_secondary-panel__vUc65')[0];
            var footer = document.getElementsByClassName('footer_footer__Mnt6p')[0];

            roomIDs.forEach((room) => {
                var roomButton = createFishtankButton(room.name);
                roomButton.onclick = () => {
                    document.getElementsByClassName('close-button_close-button__BKUKA')[0].click()
                    setTimeout(() => {
                        document.getElementById(room.id).click();
                    }, 200);
                };

                if (room.id == 'hallway-upstairs') {
                    var spacingDiv = document.createElement('div');
                    spacingDiv.style.marginTop = '16px';
                    roomList.appendChild(spacingDiv);
                }
                roomList.appendChild(roomButton);
            })

            sidebar.insertBefore(roomList, footer);
        }
    }
})();
