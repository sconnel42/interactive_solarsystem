// Initial values
var m = [1.98892*Math.pow(10,29), 1.98892*Math.pow(10,29)];
var AU = 1.496*Math.pow(10,11);
var G = 6.67428*Math.pow(10,-11);
var timestep = 24*3600;       

var x = [0, -0.5*AU];
var y = [0, 0];
var vx = [0, 0];
var vy = [-9.783*1000, 9.783*1000];
function setVals(val) //A slider for each would be cooler.
{
    var m1 = document.getElementById('n1').value;
    var m2 = document.getElementById('n2').value;
    var xy1 = document.getElementById('n3').value;
    var x1 = xy1.split(' ')[0];
    var y1 = xy1.split(' ')[1];
    var xy2 = document.getElementById('n4').value;
    var x2 = xy2.split(' ')[0];
    var y2 = xy2.split(' ')[1];
    var vxy1 = document.getElementById('n5').value;
    var vx1 = vxy1.split(' ')[0];
    var vy1 = vxy1.split(' ')[1];
    var vxy2 = document.getElementById('n6').value;
    var vx2 = vxy2.split(' ')[0];
    var vy2 = vxy2.split(' ')[1];
    m[0] = Number(m1);
    m[1] = Number(m2);
    x[0] = Number(x1);
    x[1] = Number(x2);
    y[0] = Number(y1);
    y[1] = Number(y2);
    vx[0] = Number(vx1);
    vx[1] = Number(vx2);
    vy[0] = Number(vy1);
    vy[1] = Number(vy2);
    console.log(m[0]);
    //alert("Parameters Set");
}

// Graph
Plotly.plot('graph', [{
    x: x,
    y: y,
    mode: 'markers'
}], {
    //paper_bgcolor: 'rgb(173, 252, 255)',
    //plot_bgcolor: 'rgb(173, 252, 255)',
    xaxis: {
	range: [-3*AU, 3*AU],
	showgrid: false,
	zeroline: false,
	showline: false,
	autotick: true,
	ticks: "",
	showticklabels: false
    },
    yaxis: {
	range: [-3*AU, 3*AU], 
	showgrid: false,
	zeroline: false,
	showline: false,
	autotick: true,
	ticks: "",
	showticklabels: false
    }
})

function forces (i, j) {
    var dx = x[j]-x[i];
    var dy = y[j]-y[i];
    var d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    var f = G*m[i]*m[j]/Math.pow(d,2);
    var theta = Math.atan2(dy,dx);
    var fx = Math.cos(theta)*f;
    var fy = Math.sin(theta)*f;
    return [fx, fy];
}
// Computations done during update --> Remove all of this
function compute () {
    var ts = 24*3600;
    var n = 2;
    var all_forces = [];
    for(var ii = 0; ii < n; ii++) {
	var tot_fx = 0;
	var tot_fy = 0;
	for(var jj = 0; jj < n; jj++) {
	    if(ii == jj) {
		continue;
	    }
	    var my_forces = forces(ii,jj);
	    tot_fx += my_forces[0];
	    tot_fy += my_forces[1];
	    all_forces.push([tot_fx,tot_fy]);
	}
    }

    for(var ii = 0; ii < n; ii++) {
	vx[ii] += (all_forces[ii][0]/m[ii])*ts;
	vy[ii] += (all_forces[ii][1]/m[ii])*ts;
	x[ii] += vx[ii]*ts;
	y[ii] += vy[ii]*ts;
    }

}
// Update graph
function update () {
    compute();    

    Plotly.animate('graph', {
	data: [{x: x, y: y}]
    }, {
	transition: {
	    duration: 0,
	},
	frame: {
	    duration: 0,
	    redraw: false,
	}
    });
  
    requestAnimationFrame(update);
}

//doanimate = false;

function toggle_animate () {
    doanimate = true;   
}
//if(doanimate) {
    requestAnimationFrame(update);
//}

