window.onload = (event) => {
    var canvas = document.getElementById("renderCanvas"); // Get the canvas element
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    var scene = new Scene(canvas, engine); //Call the createScene function
    window.scene = scene;

    let cube = new BabylonCube();
    window.cube = cube;

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });

    canvas.addEventListener("onClick", () => {
        myPoints1.push(new Vector3(Math.random() * 10 - 5), new Vector3(Math.random() * 10 - 5), new Vector3(Math.random() * 10 - 5));
        line2 = BABYLON.MeshBuilder.CreateLines("lines", { points: myPoints1, instance: line2 }, scene.scene);
    });
}

class Scene {
    constructor(canvas, engine) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = new BABYLON.Scene(engine);
        this.map = {}; //object for multiple key presses

        // this.addKeyBindings();
        this.addCamera();
        this.addLights();
        this.addSkyBox();
    }

    addSkyBox() {
        // Skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("kaki", { size: 1000.0 }, this.scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("kaki", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("http://127.0.0.1:8080/textures/skybox", this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    }

    addCamera() {
        this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), this.scene);
        this.camera.attachControl(this.canvas, true);
    }

    addLights() {
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);
    }

    addKeyBindings() {
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);

        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            this.map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        this.scene.registerAfterRender(function () {
            if ((map["w"] || map["W"])) {
                translateCube(0, 0, 0.1)
            };

            if ((map["s"] || map["S"])) {
                translateCube(0, 0, -0.1)
            };

            if ((map["d"] || map["D"])) {
                translateCube(-0.1, 0, 0)
            };

            if ((map["a"] || map["A"])) {
                translateCube(0.1, 0, 0)
            };

            if ((map["i"] || map["I"])) {
                rotateFront(1, BABYLON.Axis.X)
            };

            if ((map["k"] || map["K"])) {
                rotateFront(-1, BABYLON.Axis.X)
            };

            if ((map["j"] || map["J"])) {
                rotateFront(1, BABYLON.Axis.Y)
            };

            if ((map["l"] || map["L"])) {
                rotateFront(-1, BABYLON.Axis.Y)
            };

            if (map["1"]) {
                // rotateFace("front");
                // rotateFaceAnimation(faces.bottom);
            }

            if (map["!"]) {
                // rotateFaceAnimation(faces.bottom, true);
                // rotateFace("front", true);
            }

            if (map["2"]) {
                rotateFace("back");
            }

            if (map["@"]) {
                rotateFace("back", true);
            }

            if (map["3"]) {
                rotateFace("left");
            }

            if (map["#"]) {
                rotateFace("left", true);
            }

            if (map["4"]) {
                rotateFace("right");
            }

            if (map["$"]) {
                rotateFace("right", true);
            }

            if (map["5"]) {
                rotateFace("top");
            }

            if (map["%"]) {
                rotateFace("top", true);
            }

            if (map["6"]) {
                rotateFace("bottom");
            }

            if (map["^"]) {
                rotateFace("bottom", true);
            }
        });
    }
}