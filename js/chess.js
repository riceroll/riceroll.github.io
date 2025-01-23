// UI interaction handler for the Chess Tactical Pattern Analyzer
function analyzePGN() {
    const pgnInput = document.getElementById('pgnInput').value;
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    const analysisDiv = document.getElementById('analysis');
    const summaryDiv = document.getElementById('summary');
    const moveByMoveDiv = document.getElementById('moveByMove');

    // Reset display
    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    summaryDiv.innerHTML = '';
    moveByMoveDiv.innerHTML = '';

    try {
        const analyzer = new TacticalPatternAnalyzer();
        const analysis = analyzer.analyzePGN(pgnInput);

        if (analysis.error) {
            throw new Error(analysis.error);
        }

        // Display Summary
        let summaryHTML = `
            <h3>Analysis Summary</h3>
            <div class="pattern-count">
                <span>Hanging Pieces:</span>
                <span>${analysis.summary.hangingPieces}</span>
            </div>
            <div class="pattern-count">
                <span>Forks:</span>
                <span>${analysis.summary.forks}</span>
            </div>
            <div class="pattern-count">
                <span>Pins:</span>
                <span>${analysis.summary.pins}</span>
            </div>
            <div class="pattern-count">
                <span>Back Rank Weaknesses:</span>
                <span>${analysis.summary.backRankWeaknesses}</span>
            </div>
            <div class="pattern-count">
                <span>Discovered Attacks:</span>
                <span>${analysis.summary.discoveredAttacks}</span>
            </div>
            <div class="pattern-count">
                <span>Skewers:</span>
                <span>${analysis.summary.skewers}</span>
            </div>
        `;
        summaryDiv.innerHTML = summaryHTML;

        // Display Move-by-Move Analysis
        analysis.moves.forEach((move, index) => {
            const moveNumber = Math.floor(index / 2) + 1;
            const isWhite = index % 2 === 0;
            
            const tacticsFound = Object.entries(move.tactics)
                .filter(([_, opportunities]) => opportunities.length > 0)
                .map(([pattern, opportunities]) => {
                    const details = opportunities.map(opp => {
                        switch(pattern) {
                            case 'hangingPieces':
                                return `${opp.piece.type} on ${opp.square}`;
                            case 'forks':
                                return `${opp.piece} on ${opp.square} targeting ${opp.targets.map(t => t.square).join(', ')}`;
                            case 'pins':
                                return `Pin on ${opp.square}`;
                            case 'backRankWeakness':
                                return `Weak back rank for ${opp.color === 'w' ? 'White' : 'Black'}`;
                            default:
                                return pattern;
                        }
                    }).join('; ');
                    return `${pattern}: ${opportunities.length} (${details})`;
                })
                .join(', ');

            const moveHTML = `
                <div class="move-analysis">
                    <strong>${moveNumber}${isWhite ? '.' : '...'} ${move.move}</strong>
                    ${tacticsFound ? 
                        `<div class="tactics-found">Tactical opportunities: ${tacticsFound}</div>` 
                        : ''}
                </div>
            `;
            moveByMoveDiv.innerHTML += moveHTML;
        });

        loadingDiv.style.display = 'none';
        analysisDiv.style.display = 'block';

    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.style.display = 'block';
        loadingDiv.style.display = 'none';
        analysisDiv.style.display = 'none';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to analyze button if it exists
    const analyzeButton = document.querySelector('button[onclick="analyzePGN()"]');
    if (analyzeButton) {
        // Remove inline onclick handler
        analyzeButton.removeAttribute('onclick');
        // Add event listener
        analyzeButton.addEventListener('click', analyzePGN);
    }

    // Optional: Add event listener for ctrl+enter in textarea
    const pgnInput = document.getElementById('pgnInput');
    if (pgnInput) {
        pgnInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                analyzePGN();
            }
        });
    }
});