import { APOLLO_SITES, NAKAMURA_1979_SM, NAKAMURA_1983_AI, NAKAMURA_2005_DM } from './data.js'
var container, controls, camera, renderer, scene, pinLight,
rotationSpeed = 0.01,
clock = new THREE.Clock(),
WIDTH = window.innerWidth - 50,
HEIGHT = window.innerHeight - 50;
            
//cam vars
var angle = 45,
aspect = WIDTH / HEIGHT,
near = 1.1,
far = 5000;
const radius = 400;



//mesh vars
//var Atmos, AtmosMat;
    
container = document.getElementById('container');
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

//https://stackoverflow.com/questions/28365948/javascript-latitude-longitude-to-xyz-position-on-earth-threejs
function latLonRad2xyz(lat,lon,rad) {
    const phi   = (90-lat)*(Math.PI/180);
    const theta = (lon+180)*(Math.PI/180);

    const x = -(rad * Math.sin(phi)*Math.cos(theta));
    const z = (rad * Math.sin(phi)*Math.sin(theta));
    const y = (rad * Math.cos(phi));

    return {x:x,y:y,z:z};
}

function createLine(site,color) {
    const pointsOfLine = [];
    const initPoint = latLonRad2xyz(site[0],site[1],400); 
    const endPoint = latLonRad2xyz(site[0],site[1],500);
    pointsOfLine.push( new THREE.Vector3( initPoint.x, initPoint.y, initPoint.z ) );
    pointsOfLine.push( new THREE.Vector3( endPoint.x,endPoint.y,endPoint.z ) );
    const geometry2 = new THREE.BufferGeometry().setFromPoints( pointsOfLine );
    const material2 = new THREE.LineBasicMaterial( { color: color } );
    return new THREE.Line( geometry2, material2 );
}

var group = new THREE.Group();
for (let i = 0 ; i< APOLLO_SITES.length; i++){
    let site = APOLLO_SITES[i];
    const line = createLine(site,0x0000ff);
    group.add( line );
}
for (let i = 0 ; i< NAKAMURA_1979_SM.length; i++){
    let site = NAKAMURA_1979_SM[i];
    const line = createLine(site,0xffff00);
    group.add( line );
}
for (let i = 0 ; i< NAKAMURA_1983_AI.length; i++){
    let site = NAKAMURA_1983_AI[i];
    const line = createLine(site,0x00ff00);
    group.add( line );
}
for (let i = 0 ; i< NAKAMURA_2005_DM.length; i++){
    let site = NAKAMURA_2005_DM[i];
    const line = createLine(site,0xff0000);
    group.add( line );
}
scene.add( group );

//EARTH

const earthGeo = new THREE.SphereGeometry( radius, 1800, 1800 );
const earthMat = new THREE.MeshPhongMaterial( );
const earthMesh = new THREE.Mesh( earthGeo, earthMat );
earthMesh.position.set( 0, 0, 0 );
earthMesh.rotation.y = 0;

scene.add( earthMesh );

//diffuse
earthMat.map = new THREE.TextureLoader().load('lroc_color_poles_8k.jpg');


//bump
earthMat.bumpMap = new THREE.TextureLoader().load('ldem_64_uint_8k.jpeg');
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
    group.rotation.y += rotationSpeed * delta;
    renderer.clear();
    renderer.render(scene, camera); 
}

animate();