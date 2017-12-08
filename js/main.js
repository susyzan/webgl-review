/**
 * Initialize the scene, the camera and the renderer
 */
function init(){
    //initialize the scene
    var scene = new THREE.Scene();
    //use dat.gui library to add user interface from where we edit the properties
    var gui = new dat.GUI();

    var enableFog = false;
    if (enableFog){
        //set up the fog property to allow the scene to fade off to white
        //the fog object takes two parameters, color and density of the fog
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }

    //get the box
    var box = getBox( 1, 1, 1);
    //get the p;ane
    var plane = getPlane(20, 20);
    var pointLight = getPointLight(1);
    var sphere = getSphere(0.05);

    //give a name to the plane so we can easily find it
    plane.name = 'plane-1';

    //reposition the box from its bottom instead that from the center
    box.position.y = box.geometry.parameters.height/2;
    //rotate the plane to have it horizontal, webgl uses radiants instead of angles
    plane.rotation.x = Math.PI/2; //this is the equivalent of 90 degrees
    pointLight.position.y = 2;
    pointLight.intensity = 2;

    gui.add(pointLight, 'intensity', 0, 10);
    gui.add(pointLight.position, 'y', 0, 5);

    //add the mesh and the plane to the scene
    scene.add(box);
    scene.add(plane);
    scene.add(pointLight);
    pointLight.add(sphere);

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
    //set background color for the scene
    renderer.setClearColor('rgb(120, 120, 120)');
    //append the domElement for the renderer to the HTML
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    update(renderer, scene, camera, controls);

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
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)'
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
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)',
        side: THREE.DoubleSide
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

/**
 * Add a point light to illuminate the scene, since the phong material is not self illuminated, we need this
 *
 * @param intensity
 * @returns {*}
 */
function getPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);
    return light;
}


/**
 * Create a sphere that will be added as child element of the point of light so that it is easy to see what is position of the light
 * @param size
 * @returns {Raycaster.params.Mesh|*}
 */
function getSphere(size){
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255, 255)'
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
function update(renderer, scene, camera, controls) {
    //call the render method using the scene and the camera
    renderer.render(
        scene,
        camera
    );

    controls.update();

    //we use the request animation frame function to keep updating about 60 times a second the page and allow animation
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    });
}

//assign the scene object to a variable so we can see what's inside from the console
var scene = init();






