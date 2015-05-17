var nodes;
var images = "";
var imageCtr = 0;
var hyperLinks = "";
var hyperLinksCtr = 0;

var colors = {};
var colorsData = {};
var allFonts = {};
var fontsData = {};

function getNodes(){
    
    images = "";
    imageCtr = 0;
    hyperLinks = "";
    hyperLinksCtr = 0;
    fonts = "";
    colors = {};
    var nodeArea ;
    var bgColor;
    var node;
    var someFont;

    if(!nodes)
    {
        nodes = document.body.querySelectorAll('*');
    }
      

    for (i = 0; i < nodes.length; i++) {
        
        node = nodes[i];
        
        //compute colors
        nodeArea = node.clientWidth * node.clientHeight;
        bgColor = window.getComputedStyle(node)['background-color'];
        bgColor = bgColor.replace(/ /g, '');
        if ( bgColor != 'rgb(255,255,255)' && !(bgColor.indexOf('rgba') === 0 && bgColor.substr(-3) === ',0)') ) 
        {
          colors[bgColor] = (colors[bgColor] >> 0) + nodeArea;
        }
        
        colorsData = Object.getOwnPropertyNames(colors).sort(
        function (a, b) {
            return colors[b] - colors[a];colorsData
        });
        
        //compute fonts
        
        fontList = window.getComputedStyle(node)['font-family'].replace(/ /g, '').replace(/'/g,'');
        fontArr = fontList.split(',');
        fontArrLength = fontArr.length;
        //fontsData = [];
        for (j = 0; j < fontArrLength; j++) 
        {
            someFont = fontArr[j] ;
            allFonts[someFont.toLowerCase()] = 1;  
        }
        
        fontsData = Object.getOwnPropertyNames(allFonts).sort(
        function (a, b) {
            return colors[b] - colors[a];colorsData
        });
        
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
    var allNodes = {};

    allNodes = getNodes();
    
    if(msg.text ==  "links")
    {
        sendResponse({data : hyperLinks});
    }
    else if (msg.text == "images")
    {
        sendResponse({data : images});
    }
    else if (msg.text == "fonts")
    {
        console.log("fontsData:"+fontsData);
        sendResponse({data: fontsData});
    }
    else if (msg.text == "colors")
    {
        sendResponse({data : colorsData});
    }
});

