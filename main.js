import "./style.css"

import * as THREE from 'three';
import {OrbitControls} from'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene =new THREE.Scene(); //scene=container

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)//PerspectiveCamera(視野範圍)

const renderer=new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),

})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);

renderer.render(scene,camera);//顯示在畫面上

//建立物件

const geometry= new THREE.TorusGeometry(10,3,16,100)
// const material = new THREE.MeshBasicMaterial({color:0xFF6347,wireframe:true});//no light
const material = new THREE.MeshStandardMaterial({color:0xFF6347});//have light
const torus=new THREE.Mesh(geometry,material);//mesh=material+geometry
// scene.add(torus);

//lights
const pointLight=new THREE.PointLight(0xffffff,10,100);
pointLight.position.set(0,3,0);

const pointLight2=new THREE.PointLight(0xffffff,10,100);
pointLight2.position.set(0,-3,0);

const ambientLight=new THREE.AmbientLight(0xffffff);
scene.add(ambientLight,pointLight,pointLight2); 

const gridHelper= new THREE.GridHelper(200,50);
const lightHelper=  new THREE.PointLightHelper(pointLight);
scene.add(lightHelper,gridHelper);

const controls=new OrbitControls(camera,renderer.domElement);

const watermelonTexture= new THREE.TextureLoader().load("threejs_Watermeloncube.png");
const cube =new THREE.Mesh(
  new THREE.BoxGeometry(10,10,10),
  new THREE.MeshBasicMaterial({map:watermelonTexture})
)
// scene.add(cube);

//moon
const moonTexture=new THREE.TextureLoader().load("threejs_WatermelonSkin.png");
const moon=new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture
  })
)
scene.add(moon)

//load model
const loader = new GLTFLoader();
var  model;
loader.load( 'watermelonman.glb', function ( gltf ) {
  model=gltf.scene;
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

function animate(){
  requestAnimationFrame( animate );//loop
  // torus.rotation.x+=0.01;
  // torus.rotation.y+=0.005;
  // torus.rotation.z+=0.01;
  // console.log(model.rotation);
  if(model){

    model.rotation.y+=0.05;
    // model.rotation.x+=0.001;
  }
  moon.position.x=30;
  controls.update();
  renderer.render(scene,camera);

}

animate();