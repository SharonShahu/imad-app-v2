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
      if (request.readyState == XMLHttpRequest.DONE){
          //take some action
          if (request.status == 200){
              var names = request.responseText;
              names = JSON.parse(names);
               var list = '';
               for (var i=0; i<names.length; i++){
                   list += '<li>' + names[i] + '</li>';
               }
               var ul = document.getElementById("namelist");
               ul.innerHTML = list;
            /*  var counter = request.responseText;
              var span = document.getElementById("count");
              span.innerHTML = counter.toString();*/
          }
      }
      //not done yet
  };
  
  //Make the request
   var nameInput = document.getElementById("name");
 var name = nameInput.value;
    request.open('GET','http://sharonshahu.imad.hasura-app.io/submit-name?name=' + name,true);
    request.send(null);
};
  
 //Submit name
 var submit = document.getElementById("submit_btn");
 submit.onclick = function(){
   //make a request to the server and send the name
   
   //capture a list of names and render it as a list
   var names = ["name1","name2","name3","name4"];
   var list = '';
   for (var i=0; i<names.length; i++){
       list += '<li>' + names[i] + '</li>';
   }
   var ul = document.getElementById("namelist");
   ul.innerHTML = list;
 };
 
  //Render the variable in the correct span
/*  counter = counter + 1;
  var span = document.getElementById("count");
  span.innerHTML = counter.toString();*/

