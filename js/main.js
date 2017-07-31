/**
 * Initialize the scene, the camera and the renderer
 */
function init(){
    //initialize the scene
    var scene = new THREE.Scene();

//initialize the camera
    var camera = new THREE.PerspectiveCamera(
        //field of view
        45,
        //aspect ratio
        window.innerWidth/window.innerHeight,
        //near clipping plane - anything beyond this distance will not be visible in the scene
        1,
        //far clipping plane - anything beyond this distance will not be visible in the scene
        1000
    );

//initialize the renderer
    var renderer = new THREE.WebGLRenderer();
//set the size of the renderer proportional to the window
    renderer.setSize(window.innerWidth, window.innerHeight);
//append the domElement for the renderer to the HTML
    document.getElementById('webgl').appendChild(renderer.domElement);

//call the render method using the scene and the camera
    renderer.render(
        scene,
        camera
    );

}

init();


