class BabylonCube extends Cube {
    constructor(size = 3) {
        super(size, BabylonPiece, BabylonFace);

        this.scene = scene.scene;
    }

    groupAllToCenter() {
        this.flatValues.forEach((piece) => piece.box.setParent(this.centerPiece.box));
    }

    translateCube(x, y, z) {
        this.groupAllToCenter();
        this.centerPiece.box.position.x += x;
        this.centerPiece.box.position.y += y;
        this.centerPiece.box.position.z += z;
    }

    rotateCube(x, y, z) {
        this.groupAllToCenter();
        this.centerPiece.box.rotation.x += x;
        this.centerPiece.box.rotation.y += y;
        this.centerPiece.box.rotation.z += z;
    }

    rotateFace(face, reverse) {
        face.rotateFace(reverse);
    }

    rotateFaceReverse(face) {
    }
}

class BabylonPiece extends Piece {
    constructor(x, y, z) {
        super(x, y, z);

        this.scene = scene.scene;
        this.box = BABYLON.MeshBuilder.CreateBox(`box${x - 1}${y - 1}${z - 1}`, { faceColors: faceColors() }, this.scene);
        this.setBoxPosition(x, y, z);
        this.addText();
    }

    setBoxPosition(x, y, z, positionUnits = 1.1) {
        this.box.position.x = x * positionUnits;
        this.box.position.y = y * positionUnits;
        this.box.position.z = z * positionUnits;
    }

    addText() {
        var textCanvas = document.createElement('canvas');
        textCanvas.width = 512;
        textCanvas.height = 512;

        let boxMaterial = new BABYLON.StandardMaterial("texture", this.scene);
        boxMaterial.ambientTexture = new BABYLON.DynamicTexture("dynamic", textCanvas, this.scene, true);
        this.box.material = boxMaterial;

        //the context of the canvas
        var context = textCanvas.getContext("2d");

        //standard is black => mesh is black, need to be recoulered
        context.fillStyle = "white";
        context.fillRect(0, 0, textCanvas.width, textCanvas.height);

        //the black is used for the text
        context.fillStyle = "black";
        context.font = "100px serif";

        //writes the text on the canvas
        context.fillText(`box${this.x}${this.y}${this.z}`, 100, 100);

        this.box.material.ambientTexture.update();
    }
}

class BabylonFace extends Face {
    constructor(name, id, cube, axis = '', pieces = []) {
        super(name, id, cube, pieces = []);

        this.scene = scene.scene;
        this.axis = axis;
        this.inAnimation = false;
    }

    rotate() {
        this.centerPiece
    }

    groupFace() {
        this.pieces.forEach((piece) => piece.box.setParent(this.centerPiece.box));
    }

    rotateFace(reverse = false) {
        if (!this.inAnimation) {
            this.inAnimation = true;

            let degrees_to_radians = (degrees) => {
                var pi = Math.PI;
                return degrees * (pi / 180);
            }

            let radians_to_degrees = (radians) => {
                var pi = Math.PI;
                return radians * (180 / pi);
            }

            this.groupFace();

            let center = this.centerPiece.box;

            let startAngle = center.rotation[this.axis];

            let animationBox = new BABYLON.Animation("myAnimation", "rotation." + this.axis, 30,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            // An array with all animation keys
            let keys = [];

            //At the animation key 0, the value of scaling is "1"
            keys.push({
                frame: 0,
                value: startAngle
            });

            if (!reverse) {
                keys.push({
                    frame: 100,
                    value: startAngle + degrees_to_radians(90)
                });
            }
            else {
                keys.push({
                    frame: 100,
                    value: startAngle - degrees_to_radians(90)
                });
            }

            animationBox.setKeys(keys);
            center.animations.push(animationBox);

            this.scene.beginAnimation(center, 0, 100, false, 1, () => {
                this.inAnimation = false;
                // alert("finished")
            });
        }
    }
}

function faceColors() {
    return (
        [new BABYLON.Color4(1, 0, 0, 1)],
        [new BABYLON.Color4(0, 1, 0, 1)],
        [new BABYLON.Color4(0, 0, 1, 1)],
        [new BABYLON.Color4(1, 1, 0, 1)],
        [new BABYLON.Color4(0, 1, 1, 1)],
        [new BABYLON.Color4(1, 1, 1, 1)]
    )
}