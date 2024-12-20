import { useState, useEffect } from 'react';
import '../../App.css';

const App = () => {
    const [targetColor, setTargetColor] = useState('');
    const [score, setScore] = useState(0);
    const [colorGrid, setColorGrid] = useState([]);

    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const startGame = () => {
        const newTargetColor = generateRandomColor();
        setTargetColor(newTargetColor);

        const targetIndex = Math.floor(Math.random() * 16);
        const grid = Array.from({ length: 16 }, (_, i) =>
            i === targetIndex ? newTargetColor : generateRandomColor()
        );
        setColorGrid(grid);
    };

    const handleColorClick = (color) => {
        if (color === targetColor) {
            setScore(score + 1);
            startGame();
        } else {
            alert('Wrong color! Try again.');
        }
    };

    useEffect(() => {
        startGame();
    }, []);

    return (
        <div className="container">
            <h1>Color Match Game</h1>
            <div className="score-section">
                <p>Score: <span>{score}</span></p>
            </div>
            <div className="target-color-section">
                <p>Target Color:</p>
                <div className="color-box" style={{ backgroundColor: targetColor }}></div>
            </div>
            <div className="grid-section">
                <div className="grid">
                    {colorGrid.map((color, index) => (
                        <div
                            key={index}
                            className="color-cell"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorClick(color)}
                        ></div>
                    ))}
                </div>
            </div>
            <button onClick={startGame}>Start New Game</button>
        </div>
    );
};

export default App;
