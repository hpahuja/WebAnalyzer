function addContent(response)
{
    if(response)
        $("div.content > p").html(response.data);
}

function flushContent()
{
    $("div.content > p").empty();
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
    }
);

document.getElementById('pictures').addEventListener('click', function(){
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
    }
);

document.getElementById('fonts').addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                     text: "fonts" 
                }, 
                addContent
                );
            }
        )
        flushContent();
    }
);
