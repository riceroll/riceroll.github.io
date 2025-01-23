// UI interaction handler for the Chess Position Analyzer
function analyzePosition() {
    const fenInput = document.getElementById('fenInput').value;
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    const outputDiv = document.getElementById('output');

    // Reset display
    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    outputDiv.textContent = '';

    try {
        const analyzer = new ChessPatternAnalyzer();
        const analysis = analyzer.analyze(fenInput);

        // Format output
        let output = '<h3>Tactical Analysis</h3>';

        // Hanging Pieces
        if (analysis.hanging.length > 0) {
            output += '<br><strong>Hanging/Poorly Defended Pieces:</strong><br>';
            analysis.hanging.forEach(data => {
                output += `• ${formatHangingPiece(data)}<br>`;
            });
        }

        // Forks
        if (analysis.forks.length > 0) {
            output += '<br><strong>Forks:</strong><br>';
            analysis.forks.forEach(data => {
                output += `• ${formatFork(data)}<br>`;
            });
        }

        // Pins
        if (analysis.pins.length > 0) {
            output += '<br><strong>Pins:</strong><br>';
            analysis.pins.forEach(data => {
                output += `• ${formatPin(data)}<br>`;
            });
        }

        // Skewers
        if (analysis.skewers.length > 0) {
            output += '<br><strong>Skewers:</strong><br>';
            analysis.skewers.forEach(data => {
                output += `• ${formatSkewer(data)}<br>`;
            });
        }

        if (output === '<h3>Tactical Analysis</h3>') {
            output += '<br>No tactical patterns found.';
        }

        outputDiv.innerHTML = output;
        loadingDiv.style.display = 'none';
        outputDiv.style.display = 'block';

    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.style.display = 'block';
        loadingDiv.style.display = 'none';
        outputDiv.style.display = 'none';
    }
}

// Helper functions to format different tactical patterns
function formatHangingPiece(data) {
    const pieceType = data.piece.toUpperCase();
    let text = `${pieceType} on ${data.square} can be captured`;
    if (data.type === 'poorlyDefended') {
        text += ` (poorly defended, loss of ${data.value} points)`;
    }
    text += ` by ${data.attackers[0].piece.toUpperCase()} from ${data.attackers[0].square}`;
    return text;
}

function formatFork(data) {
    return `${data.forker.piece.toUpperCase()} on ${data.forker.square} attacking ${data.targets.map(t => 
        `${t.piece.toUpperCase()} on ${t.square}`).join(' and ')}`;
}

function formatPin(data) {
    return `${data.pinned.piece.toUpperCase()} on ${data.pinned.square} pinned by ${data.pinner.piece.toUpperCase()} 
        from ${data.pinner.square} against ${data.pinnedTo.piece.toUpperCase()} on ${data.pinnedTo.square}`;
}

function formatSkewer(data) {
    return `${data.skewerer.piece.toUpperCase()} on ${data.skewerer.square} skewering ${data.primary.piece.toUpperCase()} 
        on ${data.primary.square} and ${data.secondary.piece.toUpperCase()} on ${data.secondary.square}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to analyze button
    const analyzeButton = document.getElementById('analyzeButton');
    if (analyzeButton) {
        analyzeButton.addEventListener('click', analyzePosition);
    }

    // Add event listener for ctrl+enter in textarea
    const fenInput = document.getElementById('fenInput');
    if (fenInput) {
        fenInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                analyzePosition();
            }
        });
    }
});