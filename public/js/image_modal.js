function image_modal_show(el){
    console.log("showing image modal");
    document.getElementById("image_modal").style.display = "table";
    document.getElementById("image_modal_caption").innerHTML = el.getAttribute("title");
    document.getElementById("image_modal_img").src = el.getAttribute("src");
    document.getElementsByTagName("html")[0].style.overflowY = "hidden";
}

function image_modal_hide(){
    console.log("hiding image modal");
    document.getElementById("image_modal").style.display = "none";
    document.getElementsByTagName("html")[0].style.overflowY = "auto";
}

(function() {
   console.log("running");
   /* adding onload on every image in assets */
   var images = document.getElementsByTagName('img');
   var c;
   for (var i=0; i<images.length; i++) {
      if (images[i].getAttribute("src").startsWith("/as")) {
        // images[i].onclick = image_modal_show.call(this);
        images[i].setAttribute("onclick","image_modal_show(document.getElementsByTagName('img')["+i+"])");
        // c = images[0].class;
        // c = c + " zommable";
        images[i].setAttribute("class","zoomable");
      }
   }
}
)();

