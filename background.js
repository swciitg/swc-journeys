const ACTIVE_TAB_ID = 0;
const API_URL = 'https://swc.iitg.ac.in/swc_journeys'
const BOOKMARK_END_POINT = '/bookmarksection/bookmarkApi/'

// -------------------for console debug-------------------
console.log("Hello! from the service worker")

chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        const { bookmarkUrl, journeysToken } = request
        
        if (bookmarkUrl && journeysToken) {

            // -------------------for console debug-------------------
            console.log("received message", bookmarkUrl, journeysToken)
            
            // fetch api here
            const resp = await fetch(`${API_URL}${BOOKMARK_END_POINT}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${journeysToken}`,
                    'Content-type': 'application/json' 
                },
                body: JSON.stringify({
                    url_field: bookmarkUrl 
                })
            })
            
            await resp.json()
            
            // -------------------for console debug-------------------
            console.log(`Bearer ${journeysToken}`, resp)
            
            sendResponse(resp)
        }
    }
)

// -------------------prolly unrequitted code-------------------
// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, () => {
//         let active_tab_id = tab.tabId;
//         chrome.scripting.executeScript({
//             target: {
//                 tabId: active_tab_id
//             },
//             files: ['./foreground.js']
//         })
//     });
// });

// -------------------prolly unrequitted code-------------------
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'url pls') {
//         chrome.tabs.sendMessage(ACTIVE_TAB_ID, {message: 'yo i got your message'})
//         chrome.scripting.executeScript({
//             target: {
//                 tabId: ACTIVE_TAB_ID
//             },
//             files: ['./foreground.js']
//         })
//         chrome.storage.local.get("password", value => {
//             console.log(value)
//         });
//     }
// });

// -------------------old API call code-------------------
// const executeThis = (url_field) => {
//     chrome.cookies.get({ url: 'https://swc.iitg.ac.in/journeys', name: 'access' },
//         function (cookie) {
//             if (cookie) {
//                 console.log("cookie found")
//                 // console.log(cookie.value);
//                 // let accessToken = cookie.value;
//                 // var Http = new XMLHttpRequest();
//                 // var apiUrl = "https://swc.iitg.ac.in/swc_journeys/bookmarksection/bookmarkApi/";
//                 // Http.open("POST", apiUrl, true);
//                 // Http.setRequestHeader('Authorization', 'Bearer ' + accessToken);
//                 // Http.setRequestHeader('Content-type', 'application/json');
//                 // Http.onreadystatechange = function () {//Call a function when the state changes.
//                 //     button.innerHTML = Http.status;
//                 //     //document.getElementById("2").innerHTML = Http.responseText;
//                 //     if (Http.readyState == 4 && Http.status == 201) {
//                 //         button.innerHTML = "URL SAVED";
//                 //         // alert(Http.responseText);
//                 //     }
//                 //     if (Http.readyState == 4 && Http.status == 400) {
//                 //         button.innerHTML = "ERROR";
//                 //         // alert(Http.responseText);
//                 //     }
//                 // }
//                 // var bookmarkurl = String(url_field);
//                 // console.log(bookmarkurl);
//                 // var data = JSON.stringify({ 'url_field': bookmarkurl});
//                 // Http.send(data);
//             }
//             else {
//                 console.log("cookie not found")
//                 // window.open("https://swc.iitg.ac.in/journeys/login", width=100, height=100)
//                 // console.log('Can\'t get cookie! Check the name!');
//             }
//         })
// }