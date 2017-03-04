console.log('Loaded!');
/*
//Change the text of the main page invoking by ID
var element = document.getElementById("main-test");
element.innerHTML = "New";
*/
//Move the image
var img = document.getElementById("madi");
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 4;
    img.style.marginLeft = marginLeft + 'px';
}
//every 100ms moveRight function is called
img.onclick = function (){
    var interval = setInterval(moveRight,100);
};
