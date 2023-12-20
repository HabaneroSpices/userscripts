// ==UserScript==
// @name         Fishtank Better Navigation
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Fishtank Better Navigation
// @author       Credit some guy on le'chan
// @match        https://www.fishtank.live/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fishtank.live
// @downloadURL  https://github.com/HabaneroSpices/userscripts/raw/main/Fishtank%20Better%20Navigation/Fishtank%20Better%20Navigation.user.js
// @updateURL    https://github.com/HabaneroSpices/userscripts/raw/main/Fishtank%20Better%20Navigation/Fishtank%20Better%20Navigation.user.js
// @require     https://unpkg.com/keycode-js@3.1.0/dist/keycode.min.js
// @require     https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==


(function() {
    (new MutationObserver(check)).observe(document, {childList: true, subtree: true});

    function check(changes, observer) {
        if(document.querySelector('.secondary-panel_secondary-panel__vUc65')) {
            observer.disconnect();

            /*** Auto Dismiss Seasonpass Toast ***/
            const t0 = Date.now();
            document.arrive(".Toast_close__c0JjL", function(controls) {
                if ((Date.now() - t0)/1000 < 9) { //still allow using the GET SEASON PASS button
                    document.querySelector('.Toast_close__c0JjL').click();
                }
            });

            //capture keyboard input over the player
            document.arrive(".LiveStreamsCloudflarePlayer_live-streams-player__OCZ2v", function(player) {
                const overlay = document.createElement('div');
                overlay.id = 'overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = "inherit";
                overlay.style.height = "inherit";
                overlay.style.zIndex = '9999';
                overlay.style.opacity = '0';
                overlay.tabIndex = '0'; // Make the overlay focusable

                player.appendChild(overlay);
            });

            //set thumbnails to HD (still right click on thumbnails in grid view)
            document.arrive(".LiveStreamsGridItem_thumbnail__LAKyg",function(thumb) {
                if (thumb.firstElementChild) {
                    let src = thumb.firstElementChild.src;
                    if (src.substring(src.length-4,src.length) !== "1080") {
                        thumb.firstElementChild.src = src + "?height=1080";
                    }
                }
            });

            //define keyboard controls
            const roomToKeys = [["1","NUMPAD1"],["2","NUMPAD2"],["3","NUMPAD3"],["4","NUMPAD4"],["5","NUMPAD5"],["6","NUMPAD6"],["7","NUMPAD7"],["8","NUMPAD8"],["9","NUMPAD9"],["0","NUMPAD0","MULTIPLY"],["DASH","SUBTRACT"]];
            const keyCodeToRoom = {};
            for (let n=0; n<roomToKeys.length; n++) {
                const keys = roomToKeys[n];
                for (let j=0; j<keys.length; j++) {
                    keyCodeToRoom[ KeyCode["KEY_"+keys[j]] ] = n;
                }
            }

            /*** Keyboard camera navigation (numbers + arrows) ***/
            document.addEventListener("keydown", function(event) {
                if (event.isComposing || document.activeElement?.selectionStart !== undefined || document.activeElement?.isContentEditable) {
                    return;
                }

                if (keyCodeToRoom[event.keyCode] != null) {
                    document.querySelector(".LiveStreamsListItem_live-streams-list-item__rALBj:nth-child("+(keyCodeToRoom[event.keyCode]+3)+")")?.click();
                } else if (event.keyCode === KeyCode.KEY_UP) {
                    document.querySelector(".LiveStreamsControls_prev-next__pbktS button")?.click();
                } else if (event.keyCode === KeyCode.KEY_DOWN) {
                    document.querySelector(".LiveStreamsControls_prev-next__pbktS button:nth-child(2)")?.click();
                } else if (event.keyCode === KeyCode.KEY_M) {
                    document.querySelector(".LiveStreamsControls_mute__POpUL")?.click();
                }
            });

            // BETTER ROOM BETTER
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
