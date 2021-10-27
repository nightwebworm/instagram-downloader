/* 
Instagram Downloader BOOKMARKLET
Covers the case of a url with an image
Page with image open
multiple images
blobs
stories (photos or videos)
*/


function download(){

    var final_src;

    // Determine if the user is viewing a story or not
    var title = document.querySelector("title")
    if(title.textContent.includes("• Instagram")){

        // we are on stories
        console.log("we are on stories")
        var video_src = document.querySelectorAll("section video source")
        // Determine if the story is a video or an image
        if (video_src.length>0){
            // window.open(video_src[0].src)
        } else {
            var img = document.querySelectorAll("section div.qbCDp img")
            // window.open(img[0].src)
            final_src = img[0].src;
        }

    } else {
        // Not on story
        console.log("we are not on stories")

        // Determine wich of three possible ways the user views the image
        var pr = document.querySelectorAll("[role='presentation']")
        if (pr.length===2){ // the regular, with multiple photos

            // problem when a) more than two dots
            // b) the responsive for small width

            console.log("Regular view, multiple photos")
            var imgs = pr[1].querySelectorAll("img")
        
            var img_index=0;
            var dots = document.querySelectorAll("div.JSZAJ._3eoV-.IjCL9.WXPwG div")
            if (dots){
                dots.forEach( (dot,index) => {
                    if (dot.classList.contains('XCodT')){
                        img_index = index; // Works fine!
                    }
                } )
            }
        
            var img = imgs[img_index];
            // console.log("url: ", img )
            // // window.open(img.src)
            final_src = img.src;

        } else if (pr.length===3) { // the popup
            console.log("Pop up view")

            var divs = pr[2].querySelectorAll(".KL4Bh")
            if (divs.length===1){
                var img = div[0].querySelectorAll("img")
                console.log("url: ", img[0])
                // window.open(img[0].src)
            } else {
                var img_index=0;
        
                var dots = document.querySelectorAll("div.JSZAJ._3eoV-.IjCL9.WXPwG div")
                if (dots){
                    dots.forEach( (dot,index) => {
                        if (dot.classList.contains('XCodT')){
                            img_index = index;
                        }
                    } )
                }
                var img = div[img_index].querySelectorAll("img")
                // console.log("url: ", img[0])
                // // window.open(img[0].src)
                final_src = img[0].src
            }
            
        }
        else {
            // the regular, no multiple photos
            console.log("Regular view, no multi photos")

            var div = pr[0].querySelectorAll(".KL4Bh")
            var img = div[0].querySelectorAll("img")
            //cconsole.log("url: ", img[0])
            // window.open(img[0].src)
            final_src = img[0].src
        }
    }

    if(final_src){

        // create blob and then download
        fetch(final_src).then(function(response) {
            console.log(response.type); // returns basic by default
            response.blob().then(function(myBlob) {
            console.log("Blob: ", myBlob)
            var objectURL = URL.createObjectURL(myBlob);
            downloadURI(objectURL,"download")
            });
          });
    }
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }