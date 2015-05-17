

document.getElementById('links').addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                     text: "links" 
                }, 
                addContent
                );
            }
        )

        flushContent();
        addHeading("Links");
    }
);

document.getElementById('images').addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                     text: "images" 
                }, 
                addContent
                );
            }
        )
        flushContent();
        addHeading("Images");
    }
);

document.getElementById('fonts').addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                     text: "fonts" 
                }, 
                addFonts
                );
            }
        )
        flushContent();
        addHeading("Fonts");
    }
);

document.getElementById('colors').addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                     text: "colors" 
                }, 
                showColors
                );
            }
        )
        flushContent();
        addHeading("Colors");
    }
);


function showColors(response)
{
    var colors = response.data;
    if (colors && colors.length) {
      var url = 'http://colorpeek.com/#' + colors.join(',');
      chrome.tabs.create({ url: url });
    } else {
      $("div.content > p").html('No background colors were found! :(');
    }
}

function addContent(response)
{
    if(response){
        var list = response.data.split(",");
        var length = list.length;
        for( i = 0 ; i < length ; i++)
        {
           $("div.content table").append("<tr><td>" + list[i] + "</td><tr>" );
        }
    }
}

function addFonts(response)
{

    if(response){
        var length = response.data.length;       
        for( i = 0 ; i < length ; i++)
        {
           $("div.content table").append("<tr><td>" + response.data[i] + "</td></tr>" );
        }
    }
    else{
        $("div.content > p").html("Nothing found!");
    }
}

function addHeading(heading)
{
    $("div.heading > p").append("<h3>"+heading+"</h3>");
}

function flushContent()
{
    $("div.content > p").empty();
    $("div.content  table").empty();
    $("div.heading > p").empty();
}
