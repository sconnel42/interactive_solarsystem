// Initial values
var m = [1.98892*Math.pow(10,29), 1.98892*Math.pow(10,29)];
var AU = 1.496*Math.pow(10,11);
var G = 6.67428*Math.pow(10,-11);
var timestep = 24*3600;       

var x = [0, -0.5*AU];
var y = [0, 0];
var vx = [0, 0];
var vy = [-9.783*1000, 9.783*1000];

// Graph
Plotly.plot('graph', [{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
        color: m,
        cmin: Math.pow(10,26),
        cmax: Math.pow(10,30),
        opacitysrc: 1.0
    },
    colorbar: [
        [0.0, 'rgb(0,0,255)'],
        [0.5, 'rgb(255,255,0)'],
        [1.0, 'rgb(255,165,0)']
    ]
}], {
    //paper_bgcolor: 'rgb(173, 252, 255)',
    //plot_bgcolor: 'rgb(173, 252, 255)',
    xaxis: {
	range: [-3*AU, 3*AU],
	showgrid: false,
	zeroline: false,
	showline: false,
	autotick: false,
        fixedrange: true,
	ticks: "",
	showticklabels: false
    },
    yaxis: {
	range: [-3*AU, 3*AU], 
	showgrid: false,
	zeroline: false,
	showline: false,
	autotick: false,
        fixedrange: true,
	ticks: "",
	showticklabels: false
    },
    autosize: true,
    /*margin: {
        l: 100,
        r: 0,
        t: 0,
        b: 0,
        pad: 0
   }*/
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
// Computations done during update
function compute () {
    var ts = 24*3600;
    var n = m.length;
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
var doanimate = false;

// Update graph
function update () {
    if(doanimate) {
        compute();
    }    

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

function toggle_animate () {
    doanimate = !doanimate;   
}

requestAnimationFrame(update);

