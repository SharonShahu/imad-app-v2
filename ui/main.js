/*console.log('Loaded!');
/*
//Change the text of the main page invoking by ID
var element = document.getElementById("main-test");
element.innerHTML = "New";

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
*/

//counter code
var button = document.getElementById("counter");
var counter = 0;
button.onclick = function (){
  
  //Make a request to the counter endpoint
  
  //Capture the response and store it in a variable
  
  //Render the variable in the correct span
  counter = counter + 1;
  var span = document.getElementById("count");
  span.innerHTML = counter.toString();
};
