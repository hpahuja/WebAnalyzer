function addContent(response)
{
    if(response){

        $("div.content > p").html(response.data);
    }
}

function addFonts(response)
{
    if(response){

        $("div.content > p").html(response.data);
    }
}

function addHeading(heading)
{
    $("div.heading > p").append("<h3>"+heading+"</h3>");
}

function flushContent()
{
    $("div.content > p").empty();
    $("div.heading > p").empty();
}

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
