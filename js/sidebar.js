$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var node = document.getElementById(data).cloneNode(true);
    node.id = "planet2";
    ev.target.appendChild(node);
    //ev.target.appendChild(document.getElementById(data));
}

function isMouseInBox(e) {
  var textbox = document.getElementById('graph');

  // Box position & sizes
  var boxX = textbox.offsetLeft;
  var boxY = textbox.offsetTop;
  var boxWidth = textbox.offsetWidth;
  var boxHeight = textbox.offsetHeight;

  // Mouse position comes from the 'mousemove' event
  var mouseX = e.pageX;
  var mouseY = e.pageY;
  var info = document.getElementById('info');
  if(mouseX>=boxX && mouseX<=boxX+boxWidth) {
    if(mouseY>=boxY && mouseY<=boxY+boxHeight){
       // Mouse is in the box
       info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
    }
  }
  info.innerHTML = 'Position X : ' + 0 + '<br />Position Y : ' + 0;
}



// Creating function that will tell the position of cursor
// PageX and PageY will getting position values and show them in P
function tellPos(p){
  var info = document.getElementById('info');
  //info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
  var textbox = document.getElementById('gbox');
 
  var rect = textbox.getBoundingClientRect();
  console.log(rect);
  var midX = (rect.right+rect.left)/2.0;
  var midY = (rect.bottom+rect.top)/2.0;
  console.log(rect);
  // Mouse position comes from the 'mousemove' event
  var mouseX = p.pageX;
  var mouseY = p.pageY;
  var info = document.getElementById('info');
  if(mouseX>=rect.left && mouseX<=rect.right) {
    if(mouseY>=rect.top && mouseY<=rect.bottom){
       // Mouse is in the box
       var myx = (mouseX-midX)*(6.0/rect.width); // converted to AU
       var myy = -1.0*(mouseY-midY)*(6.0/rect.height); // y-axis is flipped on webpages
       info.innerHTML = 'Position X : ' + myx + '<br />Position Y : ' + myy;
    }
  }
  //info.innerHTML = 'Position X : inf <br />Position Y : inf';
}

addEventListener('mousemove', tellPos, false);
