const button = document.getElementById("1");

button.addEventListener('click', () => {
    button.classList.add('disabled');
    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];
        tab_title = tab.title;
        chrome.tabs.executeScript(tab.id, {
            code: 'window.location.href'
        }, (url_field) => {
            chrome.cookies.get({ url: 'https://swc.iitg.ac.in/journeys', name: 'access' },
                function (cookie) {
                    if (cookie) {
                        console.log(cookie.value);
                        let accessToken = cookie.value;
                        var Http = new XMLHttpRequest();
                        var apiUrl = "https://swc.iitg.ac.in/swc_journeys/bookmarksection/bookmarkApi/";
                        Http.open("POST", apiUrl, true);
                        Http.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                        Http.setRequestHeader('Content-type', 'application/json');
                        Http.onreadystatechange = function () {//Call a function when the state changes.
                            button.innerHTML = Http.status;
                            //document.getElementById("2").innerHTML = Http.responseText;
                            if (Http.readyState == 4 && Http.status == 201) {
                                button.innerHTML = "URL SAVED";
                                // alert(Http.responseText);
                            }
                            if (Http.readyState == 4 && Http.status == 400) {
                                button.innerHTML = "ERROR";
                                // alert(Http.responseText);
                            }
                        }
                        var bookmarkurl = String(url_field);
                        console.log(bookmarkurl);
                        var data = JSON.stringify({ 'url_field': bookmarkurl});
                        Http.send(data);
                    }
                    else {
                        window.open("https://swc.iitg.ac.in/journeys/login", width=100, height=100)
                        console.log('Can\'t get cookie! Check the name!');
                    }
                })
        });
    });
});

