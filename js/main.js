/**
 * Initialize the scene, the camera and the renderer
 */
function init(){
    //initialize the scene
    var scene = new THREE.Scene();

    //get the box
    var box = getBox( 1, 1, 1);
    //get the p;ane
    var plane = getPlane(4, 4);

    //give a name to the plane so we can easily find it
    plane.name = 'plane-1';

    //reposition the box from its bottom instead that from the center
    box.position.y = box.geometry.parameters.height/2;
    //rotate the plane to have it horizontal, webgl uses radiants instead of angles
    plane.rotation.x = Math.PI/2; //this is the equivalent of 90 degrees

    //add the mesh to the plane as a child and the plane to the scene
    plane.add(box);
    scene.add(plane);

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
    //we call the function that does the renderings
    update(renderer, scene, camera);

    return scene;

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
        color: 0xf7786b
    });
    //create the mesh
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

/**
 * Create the 2d plane by adding geometry and material together, the parameters are the dimensions of the plane geometry
 * @param width
 * @param depth
 * @returns {Raycaster.params.Mesh|*}
 */
function getPlane(width, depth){
    var geometry = new THREE.PlaneGeometry(width, depth);
    var material = new THREE.MeshBasicMaterial({
        color: 0xf7cac9,
        side: THREE.DoubleSide
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

/**
 * Call the renderer method and request animation frame
 * @param renderer
 * @param scene
 * @param camera
 */
function update(renderer, scene, camera) {
    //call the render method using the scene and the camera
    renderer.render(
        scene,
        camera
    );

    //get the plane object by name and add some rotation
    var plane = scene.getObjectByName('plane-1');
    plane.rotation.y += 0.001;
    plane.rotation.z += 0.001;

    //add a scale function to all the objects in the scene with the traverse function
    //the traverse function applies the callback function to all of the children of the object
    scene.traverse(function(child){
        child.scale.x += 0.001;
    });

    //we use the request animation frame function to keep updating about 60 times a second the page and allow animation
    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    });
}

//assign the scene object to a variable so we can see what's inside from the console
var scene = init();






