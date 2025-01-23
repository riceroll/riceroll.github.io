class ChessPatternAnalyzer {
    constructor() {
        this.board = null;
        this.pieceValues = {
            p: 1, n: 3, b: 3, r: 5, q: 9, k: Infinity
        };
    }

    analyze(fen) {
        this.board = new Chess(fen);
        return {
            hanging: this.findHangingPieces(),
            forks: this.findForks(),
            pins: this.findPins(),
            skewers: this.findSkewers()
        };
    }

    findHangingPieces() {
        const hangingPieces = [];
        
        // Iterate through all squares
        for (let square of this._getAllSquares()) {
            const piece = this.board.get(square);
            if (!piece) continue;  // Skip empty squares
            
            // Find attackers and defenders
            const attackers = this._getAttackers(square, this._getOppositeColor(piece.color));
            const defenders = this._getAttackers(square, piece.color);
            
            // Basic hanging piece: attacked and undefended
            if (attackers.length > 0 && defenders.length === 0) {
                // Exclude hanging pawns if they're too far advanced, as they might be sacrificial
                if (piece.type === 'p' && (square[1] === '7' || square[1] === '2')) {
                    continue;
                }
                
                // Add to list of hanging pieces
                hangingPieces.push({
                    piece: piece.type,
                    square: square,
                    attackers: attackers,
                    value: this.pieceValues[piece.type]
                });
                continue;
            }
            
            // More sophisticated evaluation: piece is inadequately defended
            if (attackers.length > 0 && defenders.length > 0) {
                // Get lowest value attacker (smart capture)
                const smallestAttacker = attackers.reduce((min, att) => 
                    this.pieceValues[att.piece.type] < this.pieceValues[min.piece.type] ? att : min
                );
                
                // Get the piece value that would be lost in the exchange
                const exchangeValue = this.pieceValues[piece.type] - this.pieceValues[smallestAttacker.piece.type];
                
                // If exchange is clearly losing by more than a minor piece value
                if (exchangeValue >= 2) {
                    hangingPieces.push({
                        piece: piece.type,
                        square: square,
                        attackers: [smallestAttacker], // Only include relevant attacker
                        value: exchangeValue,
                        type: 'poorlyDefended'
                    });
                }
            }
        }
        
        // Sort by value, highest value hanging pieces first
        return hangingPieces.sort((a, b) => b.value - a.value);
    }

    findForks() {
        return []; // Placeholder for fork detection
    }
    
    findPins() {
        return []; // Placeholder for pin detection
    }
    
    findSkewers() {
        return []; // Placeholder for skewer detection
    }

    _getAllSquares() {
        const squares = [];
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
        
        for (let file of files) {
            for (let rank of ranks) {
                squares.push(file + rank);
            }
        }
        return squares;
     }
     
     _getAttackers(targetSquare, attackerColor) {
        const attackers = [];
        
        // Check every square for potential attackers
        for (let square of this._getAllSquares()) {
            const piece = this.board.get(square);
            
            // Skip empty squares and pieces of wrong color
            if (!piece || piece.color !== attackerColor) continue;
            
            // Use chess.js's built-in move validation to check if attack is possible
            const moves = this.board.moves({
                square: square,
                verbose: true
            });
            
            // If any legal move from this piece captures on our target square
            if (moves.some(move => move.to === targetSquare)) {
                attackers.push({
                    piece: piece.type,
                    square: square
                });
            }
        }
        
        return attackers;
     }
     
     _getOppositeColor(color) {
        return color === 'w' ? 'b' : 'w';
     }

     



}

window.ChessPatternAnalyzer = ChessPatternAnalyzer;