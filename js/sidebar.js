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
  info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
}
addEventListener('mousemove', tellPos, false);
