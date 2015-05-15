
DOMtoString(document);

function DOMtoString(document) {
    if(document.body)
    {
        console.log(document.body);
    }
    var elements = document.getElementsByTagName("*");
    
    var images = "";
    var hyperLinks = ""
    var fonts = "";
    var imageCtr = 0;
    var hyperLinksCtr = 0;
    var fontsCtr = 0;
    var i;
    
    for (i = 0; i < elements.length; i++) {
        
        var fontMatches = elements[i].style.cssText.match(/.*font-family:(.*?);/);
        if(fontMatches)
        {
            fonts += fontMatches[1] + '\n';
            fontsCtr++;
        }
    
        switch (elements[i].tagName)
        {
            case "IMG" :
                images += elements[i].src + '\n';
                imageCtr++;
                break;
            case "A" :
                hyperLinks += elements[i].href + '\n';
                hyperLinksCtr++;
                break;
        }
        

    }
    console.log("Total Number of Images:\n" + imageCtr);
    console.log("Images:\n" + images);
    console.log("Total Number of Links:\n" + hyperLinksCtr);
    console.log("Links:\n" + hyperLinks);
    console.log("Total Number of Fonts:\n" + fontsCtr);
    console.log("Fonts:\n" + fonts);
}
