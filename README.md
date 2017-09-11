# Microsoft: DEV281x Introduction to ReactJS
## Module 2 | State, Life Cycle, and Event Handlers

### Module 2 Connect 4

A component that represents a circle
A component that represents a grid cell
A component that represents a row of cells
A component that represents the game board
A section that displays the game messages
A section with a restart button

## Step 2: Creating the individual components
To start off lets create a component that represents the circle that will be put inside each grid cell. We can accomplish this by returning a <div> tag with some styling to make it into a circle.

## Step 3: Adding game state
The next step is to add state to the Game component. The state should keep track of everything the game needs to know to function.

The state should keep track of the following:

Which player's turn it is (true for black, false for red)
Which grid cell's have pieces and what color those pieces should be (0 for empty, 1 for black, 2 for red)
Which player has won ( 0 for no one, 1 for black, 2 for red)
The empty grid can be represented by a 2-D array. The 2-D array consists of an array that has 6 indexes that each have 7 indexes.

## Step 4: Passing State down
The next step is to pass down the cell states all the way down to the individual grid cells. We also need to pass down a click event handler down to the grid cells. Once this is accomplished, we will implement the basic functionality to change a cell circle's color when it is clicked.

## Step 5: Adding functionality to alternate player
The next step is to switch the player everytime a new piece is dropped. The pieces should also alternate colors based on the player that dropped them.
The message at the top will display which player's turn it is and the pieces dropped will have their color set based on the player that dropped them.

## Step 6: Adding functionality to force pieces to drop all the way down
The next step is to force pieces to drop all the way down until they are on top of another piece or on the bottom row.

To help us accomplish this, we will create a function called findAvailable(col) that will let us know which row a piece should be placed in when it is dropped in a specific column.

The findAvailableRow(col) method loops through the cells state attribute and checks all of the cells in a specified column. It starts at the bottom of the column and checks each grid cell to see if a piece has been placed there. If a grid cell is empty, the method will return the row of that cell. Otherwise, it will return -1.

## Step 7: Adding victory detection
The next step is to add a way to detect if a player has won.
The game should now display the winner of the game and stop the game if someone wins.

## Step 8: Adding reset functionality
The last step is to make the Restart button restart the game.
Create a method called restart() within the Game component. This method will reset the cells, winner and player state attributes.