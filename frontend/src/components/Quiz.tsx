import React, { useEffect, useState } from 'react';

interface QuizQuestion {
    question: string;
    options: string[];
}

interface AnswerResponse {
    correct: boolean;
}

const Quiz: React.FC = () => {
    const [question, setQuestion] = useState<QuizQuestion | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/quiz')
            .then((res) => res.json())
            .then((data) => setQuestion(data));
    }, []);

    const handleSubmit = () => {
        if (question && selectedOption !== null) {
            fetch('/api/check-answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: question.question,
                    option: selectedOption,
                }),
            })
                .then((res) => res.json())
                .then((data: AnswerResponse) =>
                    setResult(data.correct ? 'Correto!' : 'Incorreto.')
                );
        }
    };

    if (!question) return <div>Carregando pergunta...</div>;

    return (
        <div>
            <h2>{question.question}</h2>
            {question.options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    style={{
                        backgroundColor:
                            selectedOption === idx ? 'lightblue' : '',
                    }}
                >
                    {opt}
                </button>
            ))}
            <button onClick={handleSubmit}>Enviar Resposta</button>
            {result && <p>{result}</p>}
        </div>
    );
};

export default Quiz;
