class Cube {
    constructor(size = 3, PieceType = Piece, FaceType = Face) {
        this.size = size;
        this.values = [1, 2, 3, 4, 5, 6];
        this.colors = ["red", "orange", "blue", "green", "white", "yellow"];

        this.values = [];
        this.flatValues = [];

        let { faces1, facesArr1 } = faces(this, FaceType);

        this.faces = faces1;

        this.centerPieceRotationOrder = [
            this.faces.top.id, this.faces.right.id, this.faces.bottom.id, this.faces.left.id
        ];

        this.facesArr = facesArr1;

        for (let x = 0; x < this.size; x++) {
            this.values.push([]);

            for (let y = 0; y < this.size; y++) {
                this.values[x].push([]);

                for (let z = 0; z < this.size; z++) {
                    if (!(x === 1 && y === 1 && z === 1)) {
                        let piece = new PieceType(x, y, z);

                        if (!(y == 1 && z == 1)) {
                            piece.addFace(this.facesArr[0][x]);
                            this.facesArr[0][x].addPiece(piece);
                        }
                        else {
                            piece.addFace(this.facesArr[0][x]);
                            this.facesArr[0][x].setCenterPiece(piece);
                        }

                        if (!(z == 1 && x == 1)) {
                            piece.addFace(this.facesArr[1][y]);
                            this.facesArr[1][y].addPiece(piece);
                        }
                        else {
                            piece.addFace(this.facesArr[1][y]);
                            this.facesArr[1][y].setCenterPiece(piece);
                        }

                        if (!(x == 1 && y == 1)) {
                            piece.addFace(this.facesArr[2][z]);
                            this.facesArr[2][z].addPiece(piece);
                        }
                        else {
                            piece.addFace(this.facesArr[2][z]);
                            this.facesArr[2][z].setCenterPiece(piece);
                        }


                        this.values[x][y].push(piece);
                        this.flatValues.push(piece);
                    }
                    else {
                        this.centerPiece = new PieceType(x, y, z);
                    }
                }
            }
        }

        console.log(this.flatValues);
    }

    swapPieces(piece1, piece2) {
        let pos = piece1.getPos();
        let newPos = piece2.getPos();

        this.values[pos.x][pos.y][pos.z] = piece2;
        this.values[newPos.x][newPos.y][newPos.z] = piece1;
    }
}

class Piece {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = `${x}${y}${z}`;
        this.rotationValue = 0;
        this.faces = [];
    }

    isEdge() {
        return this.rotationValue % 2 === 0 ? false : true;
    }

    isMiddle() {
        return this.rotationValue % 2 !== 0 ? false : true;
    }

    setPos({ x, y, z }) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getPos() {
        return { x: this.x, y: this.y, z: this.z };
    }

    removeFace(remFace) {
        this.rotationValue -= face.value;
        this.faces = this.faces.filter((face) => face.id !== remFace.id)
    }

    removeFaces() {
        this.faces = [];
    }

    changeFaces(piece) {
        // remove from old faces
        this.faces.forEach((face) => face.removePiece(this));

        // add to new faces
        piece.faces.forEach((face) => face.addPiece(this));

        // swap faces arrays
        let tmpFaces = this.faces;
        this.setFaces(piece.getFaces());
    }

    setFaces(faces) {
        this.faces = faces;
    }

    getFaces() {
        return this.faces;
    }

    addFace(face) {
        this.rotationValue += face.id;
        this.faces.push(face);
    }

    toString() {
        return `${x}${y}${z}`;
    }
}

class Face {
    constructor(name, id, cube, axis, pieces = []) {
        this.name = name;
        this.id = id;
        this.pieces = pieces;
        this.cube = cube;
        this.axis = axis;
        this.centerPiece = undefined;
    }

    orderByRotationValue() {
    }

    setCenterPiece(centerPiece) {
        this.centerPiece = centerPiece;
    }

    addPiece(newPiece) {
        this.pieces.push(newPiece);

        let calcPieces = () => {
            let center = [1,1,1];
            for(let i =0;i<3;i++){
                for(let j=0;j<2;j++){
                    let tmp = center.map((val) => val);
                    tmp[i] += Math.pow(-1,j) 
                    tmp.push((3 * (tmp[0]+1)) + (5 *(tmp[1]+1)) + (7*(tmp[2]+1)))
                   console.log(tmp)
                }
            }
        }


        // let indexes = [1, 4, 7, 8, 9, 6, 3, 2];

        // let tmpPos = newPiece.getPos();
        // let pos = Object.keys().filter((pos) => pos !== this.axis).map((pos) => tmpPos[pos]);
        // let value = pos[0] + ((pos[1] * 3) + 5);
        // let index = indexes.findIndex((val) => val = value);

        // this.pieces[index] = newPiece;

        //     [-1, -1],
        //     [-1, 0],
        //     [-1, 1],
        //     [0, 1],
        //     [1, 1],
        //     [1, 0],
        //     [1, -1],
        //     [0, -1]
        // ]
        // cube.faces.front.pieces.map((piece) => Object.keys(piece.getPos()).map((pos) => piece[pos] - cube.faces.front.centerPiece.getPos()[pos]))

        // let centerPos = this.centerPiece.getPos();

        // if (centerPos.x != 1) {
        //     let mask = [centerPos.y - newPiece.y, centerPos.z - newPiece.z];
        // }

        // this.pieces[index] = newPiece;

        // this.pieces.push(newPiece);
    }

    removePiece(remPiece) {
        this.pieces = this.pieces.filter((piece) => piece.id !== remPiece.id)
    }

    rotateFace(face) {
        let pieces = face.pieces;

        let first = { ...pieces[0] }
        let second = { ...pieces[1] }

        // rotate index inside face
        let p = pieces.shift()
        pieces.push(p);
        p = pieces.shift()
        pieces.push(p);



        //update piece positions
        for (let i = 0; i < pieces.length - 2; i++) {
            this.swapPieces(pieces[i], pieces[i + 2]);
        }

        this.swapPieces(pieces[pieces.length - 2], first);
        this.swapPieces(pieces[pieces.length - 1], second);

    }

    swapPieces(piece1, piece2) {
        this.cube.swapPieces(piece1, piece2);
        piece1.changeFaces(piece2);
        piece1.setPos(piece2.getPos());
    }


    rotateFaceReverse(face) {
        let pieces = face.pieces;
        let last = pieces[pieces.length - 1];
        let beforeLast = pieces[pieces.length - 2];

        for (let i = pieces.length - 1; i > 1; i--) {
            this.swapPieces(pieces[i], pieces[i - 2]);
        }

        this.swapPieces(pieces[0], beforeLast);
        this.swapPieces(pieces[1], last);
    }
}

function faces(cube, FaceType) {
    let faces1 = {
        front: new FaceType("front", 1, cube, "z"),
        bottom: new FaceType("bottom", 3, cube, "x"),
        left: new FaceType("left", 5, cube, "y"),
        top: new FaceType("top", 7, cube, "x"),
        right: new FaceType("right", 11, cube, "y"),
        back: new FaceType("back", 13, cube, "z")
    }

    let facesArr1 = [
        [faces1.bottom, new FaceType("centerY", 0, cube), faces1.top],
        [faces1.left, new FaceType("centerX", 0, cube), faces1.right],
        [faces1.front, new FaceType("centerZ", 0, cube), faces1.back]
    ];

    return { faces1, facesArr1 };
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