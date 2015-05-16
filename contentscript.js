var images = "";
var imageCtr = 0;
var hyperLinks = "";
var hyperLinksCtr = 0;
var fonts = "";
var fontsCtr = 0;
var nodes;

function getNodes(){
    if(!nodes)
    {
        nodes = document.body.querySelectorAll('*');
    }
    images = "";
    imageCtr = 0;
    hyperLinks = "";
    hyperLinksCtr = 0;
    fonts = "";
    fontsCtr = 0;

    for (i = 0; i < nodes.length; i++) {
        
        var fontMatches = nodes[i].style.cssText.match(/.*font-family:(.*?);/);
        if(fontMatches)
        {
            fonts += fontMatches[1] + '\n';
            fontsCtr++;
        }
    
        switch (nodes[i].tagName)
        {
            case "IMG" :
                images += nodes[i].src + '\n';
                imageCtr++;
                break;
            case "A" :
                hyperLinks += nodes[i].href + '\n';
                hyperLinksCtr++;
                break;
        }
    } 
    return nodes;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {  
    
    var data = {};
    var nodes = {};

    nodes = getNodes();
    data = nodes.length;

    console.log(data);
    
    if(msg.text ==  "links")
    {
        sendResponse({data : hyperLinks});
    }
    else if (msg.text == "images")
    {
        sendResponse({data : hyperLinks});
    }
});



