import { useState, useEffect } from "react";

const clues = [
  { question: "Find the year the first man landed on the moon.", answer: "1969" },
  { question: "Search and name the capital city of Australia.", answer: "Canberra" },
  { question: "What is the tallest mountain in the world?", answer: "Mount Everest" }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (userAnswer.trim().toLowerCase() === clues[current].answer.toLowerCase()) {
      setScore(score + 1);
    }
    if (current + 1 < clues.length) {
      setCurrent(current + 1);
      setUserAnswer("");
      setTimeLeft(30);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Web Hunt Game</h1>
      {gameOver ? (
        <div>
          <h2>Game Over!</h2>
          <p>Your score: {score} / {clues.length}</p>
        </div>
      ) : (
        <div>
          <p><strong>Clue {current + 1}:</strong> {clues[current].question}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer"
            style={{ padding: '0.5rem', margin: '1rem 0', width: '60%' }}
          />
          <div>
            <p>Time left: {timeLeft}s</p>
            <button onClick={handleNext} style={{ padding: '0.5rem 1rem' }}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}