// var app = chrome.runtime.getBackgroundPage();
 
function getAndParseDom() {

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id,{
        file: 'contentscript.js'
    },
    function(data){
        download(data[0], "download.html", "text/html");
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }
    }
    );
    }); 
}

document.getElementById('analyzer').addEventListener('click', getAndParseDom);



