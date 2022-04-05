let active_tab_id = 0;






chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        active_tab_id = tab.tabId;
        // chrome.tabs.insertCSS(null, { file: './mystyles.css' });
        chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))

    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'url pls') {
        chrome.tabs.sendMessage(active_tab_id, {message: 'yo i got your message'})
        chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
        chrome.storage.local.get("password", value => {
            console.log(value)
        });
    }
});