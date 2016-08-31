
const List = Immutable.List;
const Map=Immutable.Map;

//operations on squares
let SW = false;
const GenerateRandomGrid = (dimX, dimY, deathtol) => {
    let tmpArr = [];
    for (let i = 0; i < dimX; i++)
        for (let j = 0; j < dimY; j++)
            if (_.random(0, 100) <= deathtol)

                tmpArr.push("\{" +
                    "row:" + i + "," + "col:" + j + "\}");

    return List(tmpArr);
}
const randomGrid_30x50 = GenerateRandomGrid(30, 50, 10); //start with a grid 10% alive


const sqrToarray = (sqr) => {
    let tmp = sqr.split(",");

    tmp[0] = parseInt(tmp[0].slice(5));
    tmp[1] = parseInt(tmp[1].slice(4).slice(0, -1));
    return tmp;
};
// get list with nearest squares
const getSquareneighbors = (sqr, row, col) => {
    row = row - 1;
    col = col - 1

    if (sqr[0] == row) {
        if (sqr[1] == col)
            return ([
                "\{row:" + row + ",col:" + 0 + "\}",
                "\{row:" + (row - 1) + ",col:" + 0 + "\}",
                "\{row:" + (row - 2) + ",col:" + 0 + "\}",
                "\{row:" + row + ",col:" + 1 + "\}",
                "\{row:" + row + ",col:" + 2 + "\}",
                "\{row:" + (row - 1) + ",col:" + col + "\}",
                "\{row:" + (row - 1) + ",col:" + (col - 1) + "\}",
                "\{row:" + row + ",col:" + (col - 1) + "\}"
            ])
        else if (sqr[1] == 0)
            return ([
                "\{row:" + row + ",col:" + 1 + "\}",
                "\{row:" + (row - 1) + ",col:" + 1 + "\}",
                "\{row:" + (row - 1) + ",col:" + 0 + "\}",
                "\{row:" + row + ",col:" + col + "\}",
                "\{row:" + (row - 1) + ",col:" + col + "\}",
                "\{row:" + (row - 2) + ",col:" + col + "\}",
                "\{row:" + row + ",col:" + (col - 1) + "\}",
                "\{row:" + row + ",col:" + (col - 2) + "\}"

            ]);
        else
            return ([
                "\{row:" + (row - 1) + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + (row - 1) + ",col:" + sqr[1] + "\}",
                "\{row:" + (row - 1) + ",col:" + (sqr[1] + 1) + "\}",
                "\{row:" + row + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + row + ",col:" + (sqr[1] + 1) + "\}",
                "\{row:" + 0 + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + 0 + ",col:" + sqr[1] + "\}",
                "\{row:" + 0 + ",col:" + (sqr[1] + 1) + "\}"
            ]);
        }

    if (sqr[0] == 0) {
        if (sqr[1] == col)
            return ([
                "\{row:" + 1 + ",col:" + col + "\}",
                "\{row:" + 1 + ",col:" + (col - 1) + "\}",
                "\{row:" + 0 + ",col:" + (col - 1) + "\}",
                "\{row:" + 0 + ",col:" + 0 + "\}",
                "\{row:" + 0 + ",col:" + 1 + "\}",
                "\{row:" + 0 + ",col:" + 2 + "\}",
                "\{row:" + 1 + ",col:" + 0 + "\}",
                "\{row:" + 2 + ",col:" + 0 + "\}"
            ]);
        else if (sqr[1] == 0)
            return ([
                "\{row:" + 0 + ",col:" + 1 + "\}",
                "\{row:" + 1 + ",col:" + 0 + "\}",
                "\{row:" + 1 + ",col:" + 1 + "\}",
                "\{row:" + 0 + ",col:" + col + "\}",
                "\{row:" + 0 + ",col:" + (col - 1) + "\}",
                "\{row:" + 0 + ",col:" + (col - 2) + "\}",
                "\{row:" + 1 + ",col:" + col + "\}",
                "\{row:" + 2 + ",col:" + col + "\}"
            ]);
        else {
            return ([
                "\{row:" + 0 + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + 0 + ",col:" + (sqr[1] + 1) + "\}",
                "\{row:" + 1 + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + 1 + ",col:" + sqr[1] + "\}",
                "\{row:" + 1 + ",col:" + (sqr[1] + 1) + "\}",
                "\{row:" + row + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + row + ",col:" + sqr[1] + "\}",
                "\{row:" + row + ",col:" + (sqr[1] + 1) + "\}"
            ]);
        }
    } else {
        if (sqr[1] == col) {
            return ([
                "\{row:" + (sqr[0] - 1) + ",col:" + col + "\}",
                "\{row:" + (sqr[0] - 1) + ",col:" + (col - 1) + "\}",
                "\{row:" + sqr[0] + ",col:" + (col - 1) + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + (col - 1) + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + col + "\}",
                "\{row:" + sqr[0] + ",col:" + 0 + "\}",
                "\{row:" + (sqr[0] - 1) + ",col:" + 0 + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + 0 + "\}"
            ])

        } else if (sqr[1] == 0) {
            return ([
                "\{row:" + (sqr[0] - 1) + ",col:" + 0 + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + 0 + "\}",
                "\{row:" + (sqr[0] - 1) + ",col:" + 1 + "\}",
                "\{row:" + sqr[0] + ",col:" + 1 + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + 1 + "\}",
                "\{row:" + (sqr[0] - 1) + ",col:" + col + "\}",
                "\{row:" + sqr[0] + ",col:" + col + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + col + "\}"
            ]);
        } else {
            return ([
                "\{row:" + (sqr[0] - 1) + ",col:" + sqr[1] + "\}",
                "\{row:" + (sqr[0] - 1) + ",col:" + (sqr[1] + 1) + "\}",
                "\{row:" + sqr[0] + ",col:" + (sqr[1] + 1) + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + (sqr[1] + 1) + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + sqr[1] + "\}",
                "\{row:" + (sqr[0] + 1) + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + sqr[0] + ",col:" + (sqr[1] - 1) + "\}",
                "\{row:" + (sqr[0] - 1) + ",col:" + (sqr[1] - 1) + "\}"
            ]);
        }

    }
};

const AllNeibghbors = (alive, dimX, dimY) => List(alive.map(x => getSquareneighbors(sqrToarray(x), dimX, dimY)).reduce((a, b) => a.concat(b)));
//some action types for redux
let EF = () => {};
let defaultState = Map({
    grid: randomGrid_30x50,
    Rows: 30,
    Columns: 50,
    viewbox: 100,
    Run: EF,
    Pause: EF,
    Clear: EF,
    generation: "0000",
    To30x50: EF,
    To50x70: EF,
    To80x100: EF,
    SlowSpeed: EF,
    MediumSpeed: EF,
    FastSpeed: EF

});

const CHANGE_SQUARE_STATUS = "CHANGE_SQUARE_STATUS";
const RESET_SIMULATION = "RESET_SIMULATION";
const PAUSE_SIMULATION = "PAUSE_SIMULATION";
const RUN_SIMULATION = "RUN_SIMULATION";
const CHANGE_SPEED = "CHANGE_SPEED";

const ChangeGridSize = (Grid) => {
    switch (Grid) {
        case "30x50":
            return "GRID_30X50"
        case "50x80":
            return "GRID_50X80"
        case "80x100":
            return "GRID_80X100"
        default:
            return "GRID_30X50"

    }
};
/*
StartSimulation = ()=>{
while (SF==true)

 }
*/
const AdvanceGeneration = () => {
    return {type: 'ADVANCE_GENERATION'};
}

const CountOccurances = (x, list) => {
    let counter = 0;
    list.map(alpha => {
        if (x == alpha)
            n++;
        }
    );
    return n;
};

const EvolutionReducer = (state, action) => {
    switch (action.type) {
        case 'ADVANCE_GENERATION':
            const grid=state.get("grid");
            const Rows = state.get("Rows");
            const Columns = state.get("Columns")
            let allNeibghbors = AllNeibghbors(grid, Rows, Columns);
            let Ressurected = allNeibghbors.filter(x => !grid.contains(x)).filter(x => CountOccurances(x, grid) == 3);
            let survived = allNeibghbors.filter(x => grid.contains(x)).filter(x => {
                return CountOccurances(x, grid) == 3 || CountOccurances(x, grid) == 2
            });

            return state.update("grid",survived.merge(Ressurected));

        default:
            return state

    }

};

let tmp = AllNeibghbors(randomGrid_30x50);
console.log(List.isList(tmp));
const DrawGrid = (props) => {

    let vH = props.viewbox * props.Rows;
    let vW = props.viewbox * props.Columns;
    let SpaceBetween = (props.viewbox * 0.1)
    let side = (props.viewbox * 0.9);
    let viewBox = "0 0 " + vW + " " + vH;
    let GridRows = _.times(props.Rows, (n) => n);
    let EmptyGrid = _.times(props.Columns, () => GridRows);
    return (
        <div id="cnt2">
            <UperControls/>
            <div id="grid-cnt">
                <svg viewBox={viewBox}>
                    {EmptyGrid.map((x, i) => {
                        let yindex = i * (side + SpaceBetween);
                        return x.map((y) => {
                            let id = "\{" +
                            "row:" + y + "," + "col:" + i + "\}";
                            let xindex = y * (side + SpaceBetween);
                            if (props.grid.contains(id)) {
                                //console.log("mach found:", id);
                                return (<rect className={"alive"} id={id} key={id} width={side} height={side} y={xindex} x={yindex}/>)
                            } else
                                return (<rect className={"dead"} id={id} key={id} width={side} height={side} x={yindex} y={xindex}/>)

                        });
                    })}
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
                <div className="btn" onClick={props.Run}>
                    <p>{"RUN"}</p>
                </div>
                <div className="btn" onClick ={props.Pause}>
                    <p>{"PAUSE"}</p>
                </div>
                <div className="btn" onClick={props.Clear}>
                    <p>{"CLEAR"}</p>
                </div>
            </div>
            <div id="display">
                <div id="display-caption">
                    <p>
                        Generation: {props.generation}
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
                <div id="upper-caption" className="noTextSelect">
                    <p>Board Size:</p>
                </div>

                <div className="btn" onClick={props.To30x50}>
                    <p>{"30x50"}</p>
                </div>
                <div className="btn" onClick={props.To50x70}>
                    <p>{"50x70"}</p>
                </div>
                <div className="btn" onClick={props.To80x100}>
                    <p>{"80x100"}</p>
                </div>

            </div>
            <div id="lower-sub-controls">
                <div id="lower-caption" className="noTextSelect">
                    <p>Sim Speed:</p>
                </div>

                <div className="btn" onClick={props.SlowSpeed}>
                    <p>{"Slow"}</p>
                </div>
                <div className="btn" onClick={props.MediumSpeed}>
                    <p>{"Medium"}</p>
                </div>
                <div className="btn" onClick={props.FastSpeed}>
                    <p>{"Fast"}</p>
                </div>
            </div>
        </div>
    )

}

let store = Redux.createStore(EvolutionReducer,defaultState);




ReactDOM.render(
    <DrawGrid grid ={randomGrid_30x50} Rows={30} Columns={50} viewbox={100}/>, document.getElementById('cnt'));
