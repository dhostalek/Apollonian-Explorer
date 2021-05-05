var scene, renderer, labelRenderer, camera;
var controls;
// Setting Radius for Spheres and Label Renderer
let RADIUS = .3;

var group = new THREE.Group(); //group of spheres


var obj = {
    message: 'Hello World',
    displayOutline: false,

    Radius: .3,
    speed: 5,

    height: 10,
    noiseStrength: 10.2,
    growthSpeed: 0.2,

    type: 'three',

    explode: function () {
      alert('Bang!');
    },

    color0: "#ffae23", // CSS string
    color1: [ 0, 128, 255 ], // RGB array
    color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
    color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};

var gui = new dat.gui.GUI();

gui.remember(obj);

gui.add(obj, 'message');
gui.add(obj, 'displayOutline');
gui.add(obj, 'explode');

gui.add(obj, 'Radius').min(0).max(1).step(0.05);
gui.add(obj, 'height').step(5); // Increment amount

// Choose from accepted values
gui.add(obj, 'type', [ 'one', 'two', 'three' ] );

// Choose from named values
gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );

var f1 = gui.addFolder('Colors');
f1.addColor(obj, 'color0');
f1.addColor(obj, 'color1');
f1.addColor(obj, 'color2');
f1.addColor(obj, 'color3');

var f2 = gui.addFolder('Another Folder');
f2.add(obj, 'noiseStrength');

var f3 = f2.addFolder('Nested Folder');
f3.add(obj, 'growthSpeed');

init();
animate();

function init()
{
	// Renderer setup
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);
	
    // Creating a scene
    scene = new THREE.Scene();

    // #Adding our Geometry    
    // Spheres (1,2,0), (2,3,1) (3,2,1), (-2,2 2), (3,2,2)
    draw_sphere (0, 0, -1);
    draw_sphere (1, 0, 2);
    draw_sphere (-1, 0, 2);
    draw_sphere (0,2,3);
    draw_sphere (0, -2, 3);
    draw_sphere (3, 4, 6);
    draw_sphere (-3, 4, 6);
    draw_sphere (3, -4, 6);
    draw_sphere (-3, -4, 6);
    draw_sphere (8, 6, 11);
    draw_sphere (-8, 6, 11);
    draw_sphere (8, -6, 11);
    draw_sphere (-8, -6, 11);
    draw_sphere (5, 12, 14);
    draw_sphere (-5, 12, 14);
    draw_sphere (5, -12, 14);
    draw_sphere (-5, -12, 14);
    draw_sphere (0, 4, 15);
    draw_sphere (0, -4, 15);
    draw_sphere (15, 8, 18);
    draw_sphere (-15, 8, 18);
    draw_sphere (15, -8, 18);
    draw_sphere (-15, -8, 18);
    draw_sphere (8, 12, 23);
    draw_sphere (-8, 12, 23);
    draw_sphere (8, -12, 23);
    draw_sphere (-8, -12, 23);
    draw_sphere (7, 24, 26);
    draw_sphere (-7, 24, 26);
    draw_sphere (7, -24, 26);
    draw_sphere (-7, -24, 26);
    draw_sphere (24, 10, 27);
    draw_sphere (-24, 10, 27);
    draw_sphere (24, -10, 27);
    draw_sphere (-24, -10, 27);
    draw_sphere (21, 20, 30);
    draw_sphere (-21, 20, 30);
    draw_sphere (21, -20, 30);
    draw_sphere (-21, -20, 30);
    draw_sphere (0, 6, 35);
    draw_sphere (0, -6, 35);
    draw_sphere (16, 30, 35);
    draw_sphere (-16, 30, 35);
    draw_sphere (16, -30, 35);
    draw_sphere (-16, -30, 35);
    draw_sphere (3, 12, 38);
    draw_sphere (-3, 12, 38);
    draw_sphere (3, -12, 38);
    draw_sphere (-3, -12, 38);
    draw_sphere (35, 12, 38);
    draw_sphere (-35, 12, 38);
    draw_sphere (35, -12, 38);
    draw_sphere (-35, -12, 38);
    draw_sphere (24, 20, 39);
    draw_sphere (-24, 20, 39);
    draw_sphere (24, -20, 39);
    draw_sphere (-24, -20, 39);
    draw_sphere (9, 40, 42);
    draw_sphere (-9, 40, 42);
    draw_sphere (9, -40, 42);
    draw_sphere (-9, -40, 42);

    scene.add(group);

    // Grids/Planes
    const plane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
	const helper = new THREE.PlaneHelper( plane, 10, 0xffff00 );
	scene.add( helper );
    const plane2 = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 );
	const helper2 = new THREE.PlaneHelper( plane2, 10, 0xff00ff );
	scene.add( helper2 );
    const plane3 = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 );
	const helper3 = new THREE.PlaneHelper( plane3, 10, 0x00ffff );
	scene.add( helper3 );
    //var gridXZ = new THREE.PlaneHelper(new THREE.Vector3( 1, 1, 0.2 ), 3);
    //scene.add(gridXZ);

    // Directing the Camera where to look
    camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
    //camera.position.x = 1;
    camera.position.y = 10;
    camera.position.z = 15;
    camera.lookAt (new THREE.Vector3(0,0,0));

    // Adding our Trackball Controller
    controls = new THREE.TrackballControls (camera, renderer.domElement);

}

function animate()
{
    controls.update();
    requestAnimationFrame ( animate );  
    renderer.render (scene, camera);
}

function draw_sphere(x, y, b) {
	
	const geometry = new THREE.SphereGeometry(obj.Radius, 16, 16);
	const material = new THREE.MeshNormalMaterial( { transparent: true, opacity: .97 } );
	const sphere = new THREE.Mesh( geometry, material );
	
	/*//label creation
	const sphereDiv = document.createElement( 'div' );
	sphereDiv.className = 'label';
	sphereDiv.textContent = 'test';
	sphereDiv.style.marginTop = '-1em';
	const sphereLabel = new CSS2DObject( sphereDiv );
	sphereLabel.position.set( 0, RADIUS, 0 );
	sphere.add( sphereLabel );
	*/

	t=(b*b + x*x + y*y - 1)/(2*b);
   	z=(b*b - x*x - y*y + 1)/(2*b);
    xx = x/t, yy = y/t; zz= z/t;
    xxx = 3*xx/(zz+1); yyy = 3*yy/(zz+1); ttt= t/2;

//      x,y,time
//	sphere.position.set (x,y,t);
//      x,y,z
//	sphere.position.set (x,y,z);
//      x,y,z,t projected into a tube
	sphere.position.set (xxx,yyy,ttt);

	group.add(sphere);

	return sphere;
}