import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';
import { GLTFLoader }from 'https://unpkg.com/three@latest/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'https://unpkg.com/three@latest/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@latest/examples/jsm/controls/OrbitControls.js';

//FUNCTIONS
function onWindowResize() {
    const { clientWidth, clientHeight } = canvas;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
}

//SCENE SETUP
const canvas = document.querySelector('canvas');
const scene = new THREE.Scene();
//CAMERA
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 5;//INITIAL CAMERA SETUP.
//RENDERER
const renderer = new THREE.WebGLRenderer({ canvas });

//LIGHT SETUP
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

//THREE.JS ELEMENTS
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//CUSTOM MODEL LOADING
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://unpkg.com/three@latest/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

loader.load(
    '../assets/3D/comp_sphere.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0,2,0);
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

const controls = new OrbitControls(camera, renderer.domElement);
//ANIMATE
function animate() {
    requestAnimationFrame(animate); 
    controls.update();
    renderer.render(scene, camera);
}
onWindowResize();
animate();

//GLOBAL EVENT LISTENERS
window.addEventListener('resize', onWindowResize);