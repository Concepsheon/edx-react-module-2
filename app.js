// Function Components for board setup

function Circle(props) {
    
    // change circle color based on the cell state. 
    // If the cell state is 1 or 2 the circle will change to be black or red respectively
    
    var color = "white"
    if(props.cell == 1){
        color = "black"
    }
    else if(props.cell == 2){
        color = "red"
    }
    
    var style = {
        backgroundColor: color,
        border: "1px solid black",
        borderRadius: "100%",
        paddingTop: "98%"
    };
    
    return (
        <div style={style}></div>
    );
}

function Cell(props) {
    var style = {
        height:50,
        width:50,
        border:"1px solid black",
        backgroundColor:"yellow"
    };
    
    return (
        <div style={style} onClick = {() => props.handleClick(props.row,props.col)}>
          <Circle cell = {props.cell}/>
        </div>
    )
    
}

function Row(props) {
    var style = {
        display: "flex"
    };
    
    var cells = [];
    
    for(let i = 0; i < 7; i++) {
        cells.push(<Cell key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
    }
    
    return (
        <div style = {style}>
            {cells}
        </div>
    )
    
}

function Board(props) {
    var rows = [];
    
    for(let i = 5; i >= 0; i--) {
        rows.push(<Row key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
    }
    
    return (
        <div>
            {rows}
        </div>
    )
}

// Class Component to hold applications's state
class Game extends React.Component {
    constructor(props) {
        super(props)
        
        // initial state
        var cells = [];
        for(let i = 0; i < 6; i++) {
            cells.push(new Array(7).fill(0));
        }
        
        /* state should keep track of the following:
        player's turn it is (true for player 1, false for player 2)
        which grid cell's have pieces and what color those pieces should be (0 for empty, 1 for black(player 1), 2 for red(player 2))
        which player has won ( 0 for no one, 1 for player 1, 2 for player 2) */
        this.state = { player: false, cells: cells, winner: 0 }
        
        this.handleClick = this.handleClick.bind(this)
    }
    
    // check for wins
    checkDiagonal(row,col){
        //find right and left tops
        var c = this.state.cells;
        var val = this.state.player? 2:1;
        var rR = row;
        var cR = col;
        
        while(rR < 5 && cR < 6){
            rR++; 
            cR++;
        }

        while( rR >= 3 && cR >= 3){
            if(c[rR][cR] == val && c[rR-1][cR-1] == val && c[rR-2][cR-2] == val && c[rR-3][cR-3] == val){
                return 1
            }
            
            rR--
            cR--
        }   

        var rL = row;
        var cL = col;

        while(rL < 5 && cL > 0){
            rL++
            cL--
        }

        while(rL >= 3 && cL <= 3){
            if(c[rL][cL] == val && c[rL-1][cL+1] == val && c[rL-2][cL+2] == val && c[rL-3][cL+3] == val){
                return 1
            }
            rL--
            cL++
        }
        return 0
    }
    
    checkHorizontal(row,col){
        var c = this.state.cells;
        var i = 6;
        var val = this.state.player? 2:1;

        while( i >= 3){
            if(c[row][i] == val && c[row][i-1] == val && c[row][i-2] == val && c[row][i-3] == val){
                return 1
            }
            
            i--
        }
        
        return 0
    }
    
    checkVertical(row,col){
        var c = this.state.cells;
        var i = row;
        var val = this.state.player? 2: 1;

        if(i >= 3){
            if(c[i][col] == val && c[i - 1][col] == val && c[i - 2][col] == val && c[i - 3][col] == val){
                return 1
            }
        }
        return 0
    }
    
    checkVictory(row,col){
        return this.checkVertical(row,col)   || this.checkHorizontal(row,col) ||   this.checkDiagonal(row,col)
    }
    
    // loops through the cells state attribute and checks all of the cells in a specified column.
    // It starts at the bottom of the column and checks each grid cell to see if a piece has been placed there. 
    // If a grid cell is empty, the method will return the row of that cell. Otherwise, it will return -1
    findAvailableRow(col){
        for(var i = 0; i < 6; i++){
            if(this.state.cells[i][col] == 0){
                return i;
            } 
        }
        return -1;
    }
    
    handleClick(row, col) {
        
        if(this.state.winner)
            return
        
        console.log("row: " + row + " | col: " + col);
        
        // console.log(this.state.cells)
        
        // The slice() method is used to generate a shallow copy of the inner arrays of the 2-D cells array. 
        // These shallow copies are then used to build a new 2-D array named temp. 
        // The selected row and column of the new 2-D array is modified and then the cells state 
        // is updated to equal the temp 2-D array.
        var temp = [];
        
        for(let i = 0; i < 6; i++){
          temp.push(this.state.cells[i].slice());
        }
        
        var newRow = this.findAvailableRow(col);
        temp[newRow][col] = this.state.player? 1 : 2;
        
        // check for win
        this.setState({cells:temp, player: !this.state.player}, () => {
            if(this.checkVictory(newRow,col) > 0){
                console.log("win");
                this.setState({winner:this.state.player?2:1});
            }
        });
    }
    
    restart(){
        var cells = [];
        for(let i = 0; i < 6; i++ ){
          cells.push(new Array(7).fill(0));
        }
        this.setState({ player : false, cells : cells, winner:0})
    }
    
    render() {
        return (
            <div>
              <h1>{this.state.winner > 0 ?  this.state.winner == 1? "Player 1 Wins":"PLayer 2 Wins": this.state.player? "Player 1 Turn" : "Player 2 Turn"}</h1>
              <Board cells = {this.state.cells} handleClick = {this.handleClick}/>
              <button onClick = { () => this.restart()}>Restart</button>
            </div>
        )
    }
    
}

ReactDOM.render(<Game/>, document.getElementById('root'));