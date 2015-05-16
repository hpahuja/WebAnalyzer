document.getElementById('analyzer').addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                     text: "links" 
                }, 
                function (response)
                {
                    alert("I received :" + response.data);
                });
            }
        )
    }
);
