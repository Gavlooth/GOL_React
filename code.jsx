//<editor-fold>
const getSquareneighbors = (sqr, row, col) => {
    if (sqr[0] == row) {
        if (sqr[1] == col)
            return (new[
                [
                    sqr[0], 0
                ],
                [
                    sqr[0] - 1,
                    0
                ],
                [
                    sqr[0] - 2,
                    0
                ],
                [
                    sqr[0], 1
                ],
                [
                    sqr[0], 2
                ],
                [
                    sqr[0] - 1,
                    col
                ],
                [
                    sqr[0] - 1,
                    col - 1
                ],
                [
                    sqr[0], col - 1
                ]
            ])
        else if (sqr[1] == 0)
            return new([
                [
                    row, 1
                ],
                [
                    row - 1,
                    1
                ],
                [
                    row - 1,
                    0
                ],
                [
                    row, col
                ],
                [
                    row - 1,
                    col
                ],
                [
                    row - 2,
                    col
                ],
                [
                    row, col - 1
                ],
                [
                    row, col - 2
                ]

            ]);

else
            return ([
                [
                    row - 1,
                    sqr[1] - 1
                ],
                [
                    row - 1,
                    sqr[1]
                ],
                [
                    row - 1,
                    sqr[1] + 1
                ],
                [
                    row, sqr[1] - 1
                ],
                [
                    row, sqr[1] + 1
                ],
                [
                    0, sqr[1] - 1
                ],
                [
                    0, sqr[1]
                ],
                [
                    0, sqr[1] + 1
                ]
            ]);
        }

    if (sqr[0] == 0) {
        if (sqr[1] == col)
            return ([
                [
                    1, col
                ],
                [
                    1, col - 1
                ],
                [
                    0, col - 1
                ],
                [
                    0, 0
                ],
                [
                    0, 1
                ],
                [
                    0, 2
                ],
                [
                    1, 0
                ],
                [2, 0]
            ]);
        else if (sqr[1] == 0)
            return ([
                [
                    0, 1
                ],
                [
                    1, 0
                ],
                [
                    1, 1
                ],
                [
                    0, col
                ],
                [
                    0, col - 1
                ],
                [
                    0, col - 2
                ],
                [
                    1, col
                ],
                [2, col]
            ]);

else {
            return ([
                [
                    0, sqr[1] - 1
                ],
                [
                    0, sqr[1] + 1
                ],
                [
                    1, sqr[1] - 1
                ],
                [
                    1, sqr[1]
                ],
                [
                    1, sqr[1] + 1
                ],
                [
                    row, sqr[1] - 1
                ],
                [
                    row, sqr[1]
                ],
                [
                    row, sqr[1] + 1
                ]
            ]);
        }
    } else {
        if (sqr[1] == col) {
            return ([
                [
                    sqr[0] - 1,
                    col
                ],
                [
                    sqr[0] - 1,
                    col - 1
                ],
                [
                    sqr[0], col - 1
                ],
                [
                    sqr[0] + 1,
                    col - 1
                ],
                [
                    sqr[0] + 1,
                    col
                ],
                [
                    sqr[0], 0
                ],
                [
                    sqr[0] - 1,
                    0
                ],
                [
                    sqr[0], + 1
                ]
            ])

        } else if (sqr[1] == 0) {
            return ([
                [
                    sqr[0] - 1,
                    0
                ],
                [
                    sqr[0] + 1,
                    0
                ],
                [
                    sqr[0] - 1,
                    1
                ],
                [
                    sqr[0], 1
                ],
                [
                    sqr[0] + 1,
                    1
                ],
                [
                    sqr[0] - 1,
                    col
                ],
                [
                    sqr[0], col
                ],
                [
                    sqr[0] + 1,
                    col
                ]
            ]);
        } else {
            return ([
                [
                    sqr[0] - 1,
                    sqr[1]
                ],
                [
                    sqr[0] - 1,
                    sqr[1] + 1
                ],
                [
                    sqr[0], sqr[1] + 1
                ],
                [
                    sqr[0] + 1,
                    sqr[1] + 1
                ],
                [
                    sqr[0] + 1,
                    sqr[1]
                ],
                [
                    sqr[0] + 1,
                    sqr[1] - 1
                ],
                [
                    sqr[0], sqr[1] - 1
                ],
                [
                    sqr[0] - 1,
                    sqr[1] - 1
                ]
            ]);
        }

    }
}

//</editor-fold>

const ChangeSquareStatus = (i, j) => { 
}
//<editor-fold>
const randomGrid_30x50 = GenerateRandomGrid(30, 50, 10)
const ADVANCE_GENERATION = "ADVANCE_GENERATION";
const CHANGE_SQUARE_STATUS = "CHANGE_SQUARE_STATUS";
const RESET_SIMULATION = "RESET_SIMULATION";
const PAUSE_SIMULATION = "PAUSE_SIMULATION";
const RUN_SIMULATION = "RUN_SIMULATION";
const CHANGE_SPEED = "CHANGE_SPEED";
//</editor-fold>
const ChangeSpeed = (speed) => {
    return {type: CHANGE_SPEED, payload: speed}
}

const SingleReducer(state, action) => {
    switch (action.type) {
        case ADVANCE_GENERATION:
          {
              state.grid.map()


            break;
                }
        default:
            return state

    }

}

const List = Immutable.List;
const deadgrid30x50 = Immutable.fromJS(_.times(30, () => {
    return _.times(50, () => {
        return "dead"
    })
}));

const GenerateRandomGrid = (dimX, dimY, deathtol) => {

    return Immutable.fromJS(_.times(dimX, () => {
        return _.times(dimY, () => {
            let rnd = _.random(0, 100);
            if (rnd > deathtol)
                return "dead"
            else
                return "alive"
        })
    }));
}

const DrawGrid = (props) => {
    //  console.log(props.viewbox);
    // console.log(props.grid.size);
    let width = props.measure;
    //    console.log(List.isList(props.grid.get(0)));
    let height = props.measure * (props.grid.size / props.grid.get(0).size);
    let vH = props.viewbox * props.grid.size;
    let vW = props.viewbox * props.grid.get(0).size;
    let border = (vW / (10 * props.grid.size))
    let side = (vW / props.grid.size) - border; // (vW / (0.1 * props.grid.size)) ;
    let viewBox = "0 0 " + vW + " " + vH;

    //console.log("height: ", height);
    //console.log("width: ", width);
    //console.log("viewbox ", viewBox);
    //console.log("side: ", side);
    // width={width} height={height}

    return (
        <div id="cnt2">
            <UperControls/>
            <div id="grid-cnt">
                <svg viewBox={viewBox} preserveAspectRatio="none">
                    {props.grid.map((x, i) => {
                        let yindex = i * (side + border);
                        //console.
                        return x.map((y, j) => {
                            let id = "rect_" + i + "," + j;
                            let xindex = j * (side + border);
                            return (<rect className={y} id={id} key={id} width={side} height={side} x={xindex} y={yindex}/>);
                        });
                    }).toArray()}
                </svg>
            </div>
            <LowerControls/>
        </div>
    );

};

const UperControls = function(props) {

    return (
        <div id="controls-cnt">
            <div id="controls">
                <div className="btn" o>
                    <p>{"RUN"}</p>
                </div>
                <div className="btn">
                    <p>{"PAUSE"}</p>
                </div>
                <div className="btn">
                    <p>{"CLEAR"}</p>
                </div>
            </div>
            <div id="display">
                <div id="display-caption">
                    <p>
                        Generation:
                    </p>
                </div>
                <div id="display-area"></div>

            </div>

        </div>
    )

};

const LowerControls = function(props) {

    return (
        <div id="controls-cnt2">
            <div id="upper-sub-controls">
                <div id="upper-caption">
                    <p>Board Size:</p>
                </div>

                <div className="btn">
                    <p>{"30x50"}</p>
                </div>
                <div className="btn">
                    <p>{"50x70"}</p>
                </div>
                <div className="btn">
                    <p>{"80x100"}</p>
                </div>

            </div>
            <div id="lower-sub-controls">
                <div id="lower-caption">
                    <p>Sim Speed:
                    </p>
                </div>

                <div className="btn">
                    <p>{"Slow"}</p>
                </div>
                <div className="btn">
                    <p>{"Medium"}</p>
                </div>
                <div className="btn">
                    <p>{"Fast"}</p>
                </div>
            </div>
        </div>
    )

}

ReactDOM.render(
    <DrawGrid grid ={randomGrid_30x50} measure={500} viewbox={1000}/>, document.getElementById('cnt'));
