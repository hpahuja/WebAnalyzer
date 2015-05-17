var nodes;

var hyperLinks = "";
var colorsData = {};
var fontsData = {};

var hyperLinksCtr = 0;
var colors = {};
var allFonts = {};

function getLinksImages(){
    
    images = "";
    hyperLinks = "";
    
    imageCtr = 0;
    hyperLinksCtr = 0;


    for (i = 0; i < nodes.length; i++) {
        
        var node = nodes[i];

        //compute image links and hyper-links
        switch (nodes[i].tagName)
        {
            case "IMG" :
                images += nodes[i].src + '\n';
                //imageCtr++;
                break;
            case "A" :
                hyperLinks += nodes[i].href + '\n';
                //hyperLinksCtr++;
                break;
        }
    } 
}hyperLinks

function getLinks(){
    
    var links = "";

    for (i = 0; i < nodes.length; i++) 
    {    
        var node = nodes[i];

        if (nodes[i].tagName == "A")
        {
            links += nodes[i].href + ',';
        }
    } 
    return links;
}


function getImages(){
    
    var images = "";

    for (i = 0; i < nodes.length; i++) 
    {
        if (nodes[i].tagName == "IMG")
        {
            images += nodes[i].src + ',';
        }
    } 
    return images;
}


function getColors()
{
    colors = {};
    for (i = 0; i < nodes.length; i++) 
    {
        var node = nodes[i];    
        var nodeArea = node.clientWidth * node.clientHeight;
        var bgColor = window.getComputedStyle(node)['background-color'];
        bgColor = bgColor.replace(/ /g, '');
        if ( bgColor != 'rgb(255,255,255)' && !(bgColor.indexOf('rgba') === 0 && bgColor.substr(-3) === ',0)') ) 
        {
          colors[bgColor] = (colors[bgColor] >> 0) + nodeArea;
        }
    }
    colorsData = Object.getOwnPropertyNames(colors).sort(
        function (a, b) {
            return colors[b] - colors[a];
        });
    return colorsData;
}


function getFonts()
{
    allFonts = {};
    for (i = 0; i < nodes.length; i++) 
    {    
        var node = nodes[i];
        var fontList = window.getComputedStyle(node)['font-family'].replace(/ /g, '').replace(/'/g,'');
        var fontArr = fontList.split(',');
        var fontArrLength = fontArr.length;
        for (j = 0; j < fontArrLength; j++) 
        {
            allFonts[fontArr[j].toLowerCase()] = 1;  
        }
    }
    fontsData = Object.getOwnPropertyNames(allFonts).sort(
        function (a, b) {
            return allFonts[b] - allFonts[a];
        });
    return fontsData;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {  
    
    if(!nodes)
    {
        nodes = document.body.querySelectorAll('*');
    }
    
    var data = {};

    
    
    if(msg.text ==  "links")
    {
        getLinksImages();
        sendResponse({data : getLinks()});
    }
    else if (msg.text == "images")
    {
        sendResponse({data : getImages()});
    }
    else if (msg.text == "fonts")
    {
        sendResponse({data: getFonts()});
    }
    else if (msg.text == "colors")
    {
        sendResponse({data : getColors()});
    }
});

