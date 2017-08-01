/**
 * Initialize the scene, the camera, the renderer
 */
function init(){
    //initialize the scene
    var scene = new THREE.Scene();

    //get the box
    var box = getBox( 1, 1, 1);

    //add the mesh to the scene
    scene.add(box);

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
    //we need to move the camera or the away from the zero coordinate to able to see our mesh - all objects are by default initialized with position zero
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    //the camera must be adjusted by setting which direction it is looking to
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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

/**
 * Create the mesh by adding geometry and material together, the parameters are the dimensions of the geometry
 * @param width
 * @param height
 * @param depth
 * @returns {Raycaster.params.Mesh|*}
 */
function getBox(width, height, depth) {
    //3D objects are made of two parts, geometry that defines the shape and the material
    //initialize the geometry
    var geometry = new THREE.BoxGeometry(width, height, depth);
    //initiate the material, default is mesh (not affected by the light)
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    //create the mesh
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

init();






