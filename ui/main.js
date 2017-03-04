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

//var counter = 0;
var button = document.getElementById("counter");
button.onclick = function (){
  
  //create a request object
  var request = new XMLHttpRequest();
  
  //Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE){
          //take some action
          if (request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById("count");
              span.innerHTML = counter.toString();
          }
      }
      //not done yet
  };
  
  //Make the request
    request.open('GET','http://sharonshahu.imad.hasura-app.io/counter',true);
    request.send(null);
};
  
 //Submit name
 
 
  //Render the variable in the correct span
/*  counter = counter + 1;
  var span = document.getElementById("count");
  span.innerHTML = counter.toString();*/

