var container, controls, camera, renderer, scene, light,
rotationSpeed = 0.01,
clock = new THREE.Clock(),
WIDTH = window.innerWidth - 50,
HEIGHT = window.innerHeight - 50;
            
//cam vars
var angle = 45,
aspect = WIDTH / HEIGHT,
near = 1.1,
far = 5000;

var SEISMIC_COORDS = [[-21.2, -3.94],[-27.86, -2.75],[-26.02, -8.09],[-19.67, -3.42],[-11.81, -1.51],[0.25, 26.36],[-12.31, -4.21],
[30.51, 19.99],[35.0, 48.0],[-24.0, 42.0],[-47.0, 43.0],[101.0, 54.0],[46.0, 12.0],[45.0, 51.0],[-80.0, -20.0],[35.0, 33.0],
[-134.0, -84.0],[-71.0, -1.0],[-29.0, -37.0],[-16.0, 36.0],[-106.0, -48.0],[42.0, -37.0],[88.0, 21.0],[-98.0, 29.0],[40.0, 75.0],
[-51.0, -2.0],[-26.0, -19.0],[-45.0, -49.0],[-58.0, 3.0],[64.0, -8.0],[30.0, 50.0],[44.0, 38.0],[-20.0, 50.0],[-12.0, -19.0],[-10.0, 77.0],
[-36.6, -15.7],[-50.3, -2.9],[-44.7, 1.1],[55.5, 43.5],[53.2, 25.0],[-35.5, -23.7],[-19.7, -6.0],[-40.3, -35.7],[17.5, 9.2],
[-41.7, -19.1],[-44.4, -29.6],[-3.9, 0.7],[6.3, 7.5],[-21.9, 25.5],[32.7, 23.3],[34.4, 27.7],[-31.4, 23.7],[-50.8, -18.2],
[43.6, 21.6],[59.8, 35.1],[5.2, 14.3],[20.4, 23.0],[10.3, 8.1],[60.9, 53.4],[-35.7, 12.7],[43.6, 25.0],[115.8, 5.1],[-7.2, 6.8],
[36.1, 5.0],[-4.6, 27.5],[29.7, 22.5],[43.3, 7.8],[-12.7, -21.9],[-10.3, -1.3],[-29.2, 13.8],[-50.7, 22.2],[60.2, 50.2],[-50.8, 8.6],
[-53.4, 8.7],[37.7, 12.3],[-39.2, -10.1],[-52.4, 13.1],[-20.6, 1.1],[-53.6, -9.5],[-52.2, 24.1],[53.2, 30.1],[42.3, 46.6],[63.0, 34.8],
[-16.8, -20.9],[-44.0, 21.1],[60.1, 34.7],[-23.4, 24.6],[34.3, 27.5],[-40.6, -40.9],[11.9, 6.2],[17.9, -8.4],[22.8, 10.0],[32.2, -2.0],
[53.4, 41.0],[55.6, 15.5],[-3.8, -40.6],[2.8, 1.0],[47.3, 0.5],[-66.6, -28.4],[-35.1, -26.5],[-36.2, 12.8],[-21.6, -13.7],[-73.3, -2.4],
[-2.4, 36.1],[-21.4, -50.7],[22.1, 6.3],[45.0, 34.3],[26.1, 24.1],[21.2, 36.8],[5.4, -7.8],[3.5, 12.2],[20.0, 26.3],[5.2, 26.7],[75.4, -69.4],
[54.2, 58.6],[8.3, 7.0],[56.1, 34.6],[73.0, 8.6],[24.3, 19.4],[3.6, 5.3],[12.5, -3.4],[21.5, -3.6],[38.9, -46.5],[15.0, 1.4],[19.1, 35.0],
[15.3, -7.1],[2.0, 3.4],[18.0, -1.7],[36.7, -7.6],[35.2, 53.8],[53.2, -50.0],[-33.9, -3.7],[-4.7, 4.4],[46.1, 2.4],[-54.4, -53.2],[97.0, 15.5],
[22.5, 7.1],[110.9, 42.9],[56.5, 54.2],[35.7, 24.8],[6.4, 10.6]];


//mesh vars
var earthMesh, Atmos, AtmosMat;
    
container = document.createElement('div');
document.body.appendChild(container);


//cam
camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.set(1380, -17, 394);


//scene
scene = new THREE.Scene();
camera.lookAt(scene.position);

pinLight = new THREE.PointLight( 0xFFFFFF );
pinLight.position.set( 100, 100, 2 );
camera.add(pinLight);

scene.add(camera);


//scene.add( sprite );

//EARTH
var earthGeo = new THREE.SphereGeometry( 400, 1800, 1800 ),
    earthMat = new THREE.MeshPhongMaterial( );
earthMesh = new THREE.Mesh( earthGeo, earthMat );

earthMesh.position.set( 0, 0, 0 );
earthMesh.rotation.y = 0;
scene.add( earthMesh );

//diffuse
earthMat.map = new THREE.TextureLoader().load('lroc_color_poles_16k.jpeg');


//bump
earthMat.bumpMap = new THREE.TextureLoader().load('ldem_64_uint.jpeg');
earthMat.bumpScale = 20;
         
earthMesh.castShadow = true;
earthMesh.receiveShadow = true;


//renderer
renderer = new THREE.WebGLRenderer({antialiasing : true});
renderer.setSize(WIDTH, HEIGHT);

container.appendChild(renderer.domElement);


//controls
controls = new THREE.OrbitControls( camera, renderer.domElement);
controls.addEventListener( 'change', render );
controls.autoRotate = true;
controls.enableDamping = true;

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
    
function render(){
    var delta = clock.getDelta();
    earthMesh.rotation.y += rotationSpeed * delta;
    renderer.clear();
    renderer.render(scene, camera); 
}

animate();
