import { Wireframe } from 'three/examples/jsm/Addons.js';
import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const moonTexture = new THREE.TextureLoader().load('src/moon.jpg')
const moonBumps = new THREE.TextureLoader().load('src/normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

const earthTexture = new THREE.TextureLoader().load('src/earth.jpg')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);

const marsTexture = new THREE.TextureLoader().load('src/mars.jpg')
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);

scene.add(moon)
scene.add(earth)
earth.position.set(10, 10, 10);
scene.add(mars)
mars.position.set(20, 15, 3);



const light1 = new THREE.PointLight(0xffffff, 150)
light1.position.set(2,1,2)

const light2 = new THREE.AmbientLight(0xFFFFFF);

scene.add(light1, light2)

const controls = new OrbitControls(camera, renderer.domElement);

function stars(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(300).fill().forEach(stars);

const space = new THREE.TextureLoader().load('src/space.jpg')
scene.background = space;



function moveCam(){
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.02;
  camera.position.y = t * -0.02;
}

document.body.onscroll = moveCam

function animate(){
  requestAnimationFrame(animate);
  moon.rotation.x += 0.002;
  moon.rotation.y += 0.001;
  moon.rotation.z += 0.005;
  
  earth.rotation.x += 0.002;
  earth.rotation.y += 0.001;
  earth.rotation.z += 0.005;

  mars.rotation.x += 0.002;
  mars.rotation.y += 0.001;
  mars.rotation.z += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate()