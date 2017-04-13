function add_random_point() {
    var mym = Math.random()*10000*Math.pow(10,26);
    var myx = Math.random()*6.0 - 3.0;
    var myy = Math.random()*6.0 - 3.0;
    var v0 = Math.random()*100.0;
    var deg = Math.random()*2*Math.PI;
    var myvx = v0*Math.cos(deg);
    var myvy = v0*Math.sin(deg);
    m.push(mym);
    x.push(myx*AU);
    y.push(myy*AU);
    vx.push(myvx*1000.0);
    vy.push(myvy*1000.0);
}
