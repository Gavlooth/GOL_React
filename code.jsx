const Map = Immutable.Map;
const connect = ReactRedux.connect;
const Provider = ReactRedux.Provider;
const MeasurePerformance = (str, func) => {
    let t01 = performance.now();

    let tmp = (() => {

        let result = func();
        return {result: result, t02: performance.now()}
    })();
    console.log(str, tmp.t02 - t01);
    return tmp.result;

}
const Evolve = function(grid = []) {
    let Dimensions = {
        X: grid[0].length,
        Y: grid.length
    };

    const SumSquareNeighbors = (x, y) => {
        const DimX = Dimensions.X - 1;
        const DimY = Dimensions.Y - 1;
        let above = x - 1 < 0
            ? (DimY)
            : x - 1;
        let bellow = (x === DimY)
            ? 0
            : x + 1;
        let left = y - 1 < 0
            ? (DimX)
            : y - 1;
        let right = (y === DimX)
            ? 0
            : y + 1;

        return grid[above][left] + grid[above][y] + grid[above][right] + grid[x][left] + grid[x][right] + grid[bellow][left] + grid[bellow][y] + grid[bellow][right];

    };

    return grid.map((row, i) => row.map((sqr, j) => {
        //let IsAlive = grid[i][j];
        let SumOfAlive = SumSquareNeighbors(i, j);
        switch (sqr) {
            case 1:
                if (SumOfAlive == 3 || SumOfAlive == 2)
                    return 1;
                else
                    return 0;
                case 0:
                if (SumOfAlive === 3)
                    return 1;
                else
                    return 0;

                }
            }));

    }
    let SW = false;
    const GenerateRandomGrid = (dimX, dimY, deathtoll) => {
        const RessurectRandom = () => (_.random(0, 100) <= deathtoll)
            ? 1
            : 0;

        return _.times(dimY, () => _.times(dimX, RessurectRandom));

    };
    const randomGrid_30x50 = GenerateRandomGrid(30, 50, 30);

    const SpaceBetween = 10;
    const side = 90;
    const viewBox = "0 0 5000 3000";

    const SetLoopSpeed = (speed) => {
        switch (speed) {
            case "PAUSE":
                return {type: "PAUSE"}
            case "SLOW":
                return {type: "CHANGE_SPEED", payload: 200}
            case "FAST":
                return {type: "CHANGE_SPEED", payload: 50}

        }
    }

    const Id2Coords = (sqr) => {
        let tmp = sqr.split(",");

        tmp[0] = parseInt(tmp[0].slice(5));
        tmp[1] = parseInt(tmp[1].slice(4).slice(0, -1));
        return {row: tmp[0], column: tmp[1]};
    };

    const ChangeGridSize = (Grid) => {
        switch (Grid) {
            case "30x50":
                return {
                    type: 'CHANGE_GRID_DIMENSIONS',
                    payload: {
                        DimX: 30,
                        DimY: 50,
                        boardSize: "_30x50"
                    }
                }
            case "40x80":
                return {
                    type: 'CHANGE_GRID_DIMENSIONS',
                    payload: {
                        DimX: 40,
                        DimY: 80,
                        boardSize: "_40x80"
                    }
                }

            default:
                return {
                    type: 'CHANGE_GRID_DIMENSIONS',
                    payload: {
                        DimX: 30,
                        DimY: 50,
                        boardSize: "_30x50"

                    }
                }

        }
    };
    const ClearGrid = () => {
        return {type: 'CLEAR_GRID'}
    };
    const AdvanceGeneration = () => {
        return {type: 'ADVANCE_GENERATION'};
    }
    const TurnSquare = (sqr) => {
        return {type: 'FLIP_SQUARE', payload: sqr}
    }

    const SingleReducer = (state, action) => {

        switch (action.type) {
            case 'ADVANCE_GENERATION':
                const population = parseInt(state.get("generation"), 10);
                const padToFour = (number) => {
                    number++;
                    if (number <= 99999) {
                        number = ("0000" + number).slice(-5);
                    }
                    return number;
                };
                return state.withMutations(map => map.set("grid", Evolve(state.get("grid"))).set("generation", padToFour(population)));
            case 'CHANGE_SPEED':
                loop.Clear();
                return state.set("speed", action.payload)
            case 'CHANGE_GRID_DIMENSIONS':
                let viewBox = "0 0 " + (action.payload.DimY * 100) + " " + (action.payload.DimX * 100);
                let newGrid = GenerateRandomGrid(action.payload.DimX, action.payload.DimY, 30);
                return state.withMutations(map => map.set("grid", newGrid).set("generation", "00000").set("viewBox", viewBox).set("boardSize", action.payload.boardSize));
            case "CLEAR_GRID":
                let EmptyGrid = GenerateRandomGrid(state.get("grid")[0].length, state.get("grid").length, -1);
                loop.Clear();
                return state.withMutations(map => map.set("grid", EmptyGrid).set("generation", "00000"));
            case 'PAUSE':
                loop.Clear();
                return state;
            case 'FLIP_SQUARE':
                let square = Id2Coords(action.payload);
                let tmpArr = state.get("grid").map(x => x.slice(0));
                let skata  = tmpArr[square.column][square.row] === 0
                    ? 1
                    : 0;
                tmpArr[square.column][square.row]=skata;
                return state.set("grid", tmpArr)
            default:
                return state;

        }
    };

    const Square = ({
        status,
        id,
        side,
        vertical,
        horizontal,
        FlipSquare
    }) => <rect className={status} id={id} key={id} width={side} height={side} x={horizontal} y={vertical} onClick ={FlipSquare(id)}/>

    const Grid = ({
        SpaceBetween,
        side,
        viewBox,
        grid,
        boardSize,
        FlipSquare,
        Pause
    }) => {

        return (

            <div id="grid-cnt" className={boardSize}>
                <svg viewBox={viewBox} preserveAspectRatio="none">
                    {grid.map((x, i) => {
                        let yindex = i * (side + SpaceBetween);
                        return x.map((y, j) => {
                            let id = "\{" +
                            "row:" + j + "," + "col:" + i + "\}";
                            let status = (y === 1)
                                ? "alive"
                                : "dead";
                            let xindex = j * (side + SpaceBetween);
                            return <Square status={status} id={id} side={side} horizontal={yindex} vertical={xindex} FlipSquare={FlipSquare}/>

                        });
                    })}
                </svg>
            </div>
        );
    };

    let HasAlive = (grid) => {
        let thereIsAlive = 0;
        for (let i = 0; i < grid.length; i++)
            for (let j = 0; j < grid[0].length; j++)
                if (grid[i][j] > 0)
                    thereIsAlive++;
    return thereIsAlive;

    }

    class DrawGrid extends React.Component {
        componentDidMount() {
            this.Run();
        }

        Run() {
            let hasAlive = HasAlive(this.props.grid);

            if (hasAlive > 0) {
                if (loop.interval === null)
                    loop.Start();
                }
            else if (this.props.grid.length == 80) {
                this.props.To40x80();
                loop.Start();
            } else {
                this.props.To30x50();
                loop.Start();
            }

        }

        render() {
            return (
                <div id="cnt2">
                    <UperControls Run={() => this.Run()} Pause={this.props.Pause} Clear={this.props.Clear} generation={this.props.generation}/>
                    <Grid SpaceBetween={this.props.SpaceBetween} side={this.props.side} viewBox={this.props.viewBox} GridRows={this.props.GridRows} grid={this.props.grid} boardSize={this.props.boardSize} FlipSquare={this.props.ChangeSquare}/>
                    <LowerControls To30x50={this.props.To30x50} To40x80 ={this.props.To40x80} SlowSpeed={() => {
                        let check = (loop.interval == null);
                        this.props.SlowSpeed();
                        if (!check)
                            this.Run();
                        }} FastSpeed={() => {
                        let check = (loop.interval == null);
                        this.props.FastSpeed();
                        if (!check)
                            this.Run();
                        }}/>
                </div>
            )
        }

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
                            Generation:
                        </p>
                    </div>
                    <div id="display-area">
                        {props.generation}</div>

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
                    <div className="btn" onClick={props.To40x80}>
                        <p>{"40x80"}</p>
                    </div>

                </div>
                <div id="lower-sub-controls">
                    <div id="lower-caption" className="noTextSelect">
                        <p>Sim Speed</p>
                    </div>

                    <div className="btn" onClick={props.SlowSpeed}>
                        <p>{"Slow"}</p>
                    </div>

                    <div className="btn" onClick={props.FastSpeed}>
                        <p>{"Fast"}</p>
                    </div>
                </div>
            </div>
        )

    }
    const defaultState = Map({
        speed: 250,
        boardSize: "_30x50",
        grid: randomGrid_30x50,
        viewBox: viewBox,
        SpaceBetween: SpaceBetween,
        side: side,
        generation: "0000"
    });

    let store = Redux.createStore(SingleReducer, defaultState);

    let loop = {
        interval: null,
        Start: () => {
            let speed = store.getState().get("speed");

            let interval = setInterval(() => store.dispatch(AdvanceGeneration()), speed);
            loop.interval = interval;
        },
        Clear: () => {
            clearInterval(loop.interval);
            loop.interval = null;
        }
    };

    const mapStateToProps = (state) => {
        return {
            boardSize: state.get("boardSize"),
            SpaceBetween: state.get("SpaceBetween"),
            side: state.get("side"),
            viewBox: state.get("viewBox"),
            grid: state.get("grid"),
            generation: state.get("generation"),
            speed: state.get("speed")
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {

            To30x50: () => dispatch(ChangeGridSize("30x50")),
            To40x80: () => dispatch(ChangeGridSize("40x80")),

            Clear: () => {
                dispatch(ClearGrid())
            },
            SlowSpeed: () => dispatch(SetLoopSpeed("SLOW")),
            FastSpeed: () => dispatch(SetLoopSpeed("FAST")),
            ChangeSquare: (sqr) => {
                return () => dispatch(TurnSquare(sqr))
            },
            Pause: () => dispatch(SetLoopSpeed("PAUSE"))
        }

    };

    let ReduxGrid = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DrawGrid);
    ReactDOM.render(
        <Provider store={store}>
        <ReduxGrid/>
    </Provider>, document.getElementById('cnt'));

    /*            function myLoop(i) {
                    setTimeout(function() {
                        alert('hello'); //  your code here
                        if (--i)
                            myLoop(i); //  decrement i and call myLoop again if i > 0
                        }
                    , 3000)
                }(10);*/
