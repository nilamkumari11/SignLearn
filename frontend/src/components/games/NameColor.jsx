import { useState, useEffect } from "react";
import "./App.css";

const NameTheColor = () => {
    const colors = [
        "gray", "white", "red", "purple", "green", "lime", "olive", "yellow",
        "blue", "aqua", "orange", "pink", "skyblue", "turquoise"
    ];

    const [textColor, setTextColor] = useState("");
    const [text, setText] = useState("");
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [finalScore, setFinalScore] = useState(null);
    const [buttons, setButtons] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);

    const clockSound = new Audio("./assets/sounds/clock.mp3");
    const correctSound = new Audio("./assets/sounds/correct.mp3");
    const wrongSound = new Audio("./assets/sounds/wrong.mp3");

    const generateRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const handleButtonClick = (selectedColor) => {
        if (selectedColor === textColor) {
            correctSound.play();
            setScore(score + 1);
        } else {
            wrongSound.play();
        }

        if (count >= 10) {
            setIsGameOver(true);
            setFinalScore(score + (selectedColor === textColor ? 1 : 0));
            return;
        }

        playRound();
    };

    const playRound = () => {
        clockSound.play();
        setText(generateRandomColor());
        const newTextColor = generateRandomColor();
        setTextColor(newTextColor);

        const isFirstButtonCorrect = Math.random() < 0.5;
        const newButtons = isFirstButtonCorrect
            ? [newTextColor, text]
            : [text, newTextColor];

        setButtons(newButtons);
        setCount(count + 1);
    };

    useEffect(() => {
        playRound();
    }, []);

    return (
        <div className="container">
            <h1>Name The Color</h1>

            {!isGameOver ? (
                <div className="game">
                    <h3>Score: {score}/{count}</h3>
                    <div className="color">
                        <h1 className="text" style={{ color: textColor }}>{text}</h1>
                    </div>
                    <div className="buttons">
                        {buttons.map((buttonColor, index) => (
                            <button
                                key={index}
                                className="button"
                                onClick={() => handleButtonClick(buttonColor)}
                            >
                                {buttonColor}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div id="score">
                    <h2>Your final score is: {finalScore}</h2>
                </div>
            )}
        </div>
    );
};

export default NameTheColor;
