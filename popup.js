const button = document.getElementById("1");

const setCookie = () => {
    window.open("https://swc.iitg.ac.in/journeys/login", width=100, height=100)
}

const handleButtonClick = async () => {
 
    button.classList.add('disabled');
 
    let cookie = await chrome.cookies.get({ url: 'https://swc.iitg.ac.in/journeys', name: 'access' })
    
    if(!(cookie?.value)) {
        setCookie();
    }
    
    cookie = await chrome.cookies.get({ url: 'https://swc.iitg.ac.in/journeys', name: 'access' })
    
    if(cookie?.value) {
        const tabs = await chrome.tabs.query({active: true})
        const { url } = tabs[0]
        
        await chrome.runtime.sendMessage({
            bookmarkUrl: url,
            journeysToken: cookie.value
        }, (response) => {
            console.log("resp", response)
        })
        console.log(url, cookie.value)
    }
    else {
        handleButtonClick()
    }
}

button.addEventListener('click', handleButtonClick)

    
