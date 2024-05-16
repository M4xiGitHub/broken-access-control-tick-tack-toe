# Messages

## ServerMessages

### opponentDisconnected

    Description: Informs a client that the opponent had a disconnect
    Triggered: When a client disconnects and has a open game
    Payload: None

### gameAllreadyFull

    Description: Informs a client that he can not join a game as it is allready full
    Triggered: When a client sends a joinGame message but the game is allready full
    Payload: None

### startGame

    Description: Informs a client that the game starts
    Triggered: When a client joins a game that allready has a other player
    Payload: bool -- is the player beginning

### gameNotFound

    Description: Informs a client that the game, that he tried to play a turn on doesn't exist
    Triggered: When a client tries to play a turn on a game that not exists
    Payload: None

### turnNotAllowed

    Description: Informs a client that the turn he tried to play is illegal
    Triggered: When a client tries to play a illegal turn
    Payload: number -- idx of the field the player tried to play

### opponentPlayedTurn

    Description: Informs a client that the other player played a turn
    Triggered: When a client plays a turn
    Payload: number -- idx of the field the other player played

### gameDraw

    Description: Informs a client that the game draw
    Triggered: When a client plays a turn and the game finished
    Payload: None

### gameWon

    Description: Informs a client that he won the game
    Triggered: When a client plays a turn and the game finished
    Payload: None

### gameLost

    Description: Informs a client that he lost the game
    Triggered: When a client plays a turn and the game finished
    Payload: None

## ClientMessage

### joinGame

    Description: Request to join a game
    Responses: gameAllreadyFull, startGame
    Payload: {uuid: any, userId: number} -- any string, number, etc that could identify a game and the user identifier

### playTurn

    Description: Play a turn on a game
    Responses: gameNotFound, turnNotAllowed, gameDraw, gameWon
    Payload: {game: any, turn: number} -- the game to play on and the turn to play
