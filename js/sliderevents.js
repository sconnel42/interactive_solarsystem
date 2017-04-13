// Change slider values when user moves slider
$("#m1").bootstrapSlider();
$("#m1").on("slide", function(slideEvt) {
    $("#m1SliderVal").text(slideEvt.value);
});

$("#r1").bootstrapSlider();
$("#r1").on("slide", function(slideEvt) {
    $("#r1SliderVal").text(slideEvt.value);
});

$("#v0").bootstrapSlider();
$("#v0").on("slide", function(slideEvt) {
    $("#v0SliderVal").text(slideEvt.value);
});

$("#deg").bootstrapSlider();
$("#deg").on("slide", function(slideEvt) {
    $("#degSliderVal").text(slideEvt.value);
});

$('#evolve').click(function() {
    if($("#evolve").val() == "1") {
        $("#evolve").text('Start Evolution');
        $("#evolve").val("0");
    }
    else {
        $("#evolve").text('Stop Evolution');
        $("#evolve").val("1");
    }
})

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

    var info = document.getElementById('info');
    var textbox = document.getElementById('gbox');
 
    var rect = textbox.getBoundingClientRect();
    var midX = (rect.right+rect.left)/2.0;
    var midY = (rect.bottom+rect.top)/2.0;
    // Mouse position comes from the 'mousemove' event
    var mouseX = ev.clientX;
    var mouseY = ev.clientY;
    var info = document.getElementById('info');
    if(mouseX>=rect.left && mouseX<=rect.right && mouseY>=rect.top && mouseY<=rect.bottom) {
       // Mouse is in the box
       var myx = (mouseX-midX)*(6.0/rect.width); // converted to AU
       var myy = -1.0*(mouseY-midY)*(6.0/rect.height); // y-axis is flipped on webpages
       info.innerHTML = 'Position X : ' + myx + '<br />Position Y : ' + myy;
       console.log(document.getElementById('m1').value);
       var mym = document.getElementById('m1').value*Math.pow(10,26);
       var v0 = document.getElementById('v0').value*1000;
       var ang = document.getElementById('deg').value*Math.PI/180.0;
       var myvx = v0*Math.cos(ang);
       var myvy = v0*Math.sin(ang);
       m.push(mym);
       x.push(myx*AU);
       y.push(myy*AU);
       vx.push(myvx);
       vy.push(myvy);
  }
  else {
    info.innerHTML = 'Position X : inf <br />Position Y : inf';
  }
}

// Creating function that will tell the position of cursor
// PageX and PageY will getting position values and show them in P
/*function tellPos(p){
  var info = document.getElementById('info');
  var textbox = document.getElementById('gbox');
 
  var rect = textbox.getBoundingClientRect();
  var midX = (rect.right+rect.left)/2.0;
  var midY = (rect.bottom+rect.top)/2.0;
  // Mouse position comes from the 'mousemove' event
  var mouseX = p.pageX;
  var mouseY = p.pageY;
  var info = document.getElementById('info');
  if(mouseX>=rect.left && mouseX<=rect.right && mouseY>=rect.top && mouseY<=rect.bottom) {
       // Mouse is in the box
       var myx = (mouseX-midX)*(6.0/rect.width); // converted to AU
       var myy = -1.0*(mouseY-midY)*(6.0/rect.height); // y-axis is flipped on webpages
       info.innerHTML = 'Position X : ' + myx + '<br />Position Y : ' + myy;
  }
  else {
    info.innerHTML = 'Position X : inf <br />Position Y : inf';
  }
}

addEventListener('mousemove', tellPos, false);*/
