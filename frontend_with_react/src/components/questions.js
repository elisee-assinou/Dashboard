import React, { useState, useEffect } from 'react';

function TriviaQuestion() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);



    const fetchData =  async () =>{
        setLoading(true);
        setError(null);

        // Construire l'URL de l'API Open Trivia Database
        const apiUrl = 'https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple';

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('La requête a échoué');
                }
                return response.json();
            })
            .then((data) => {
                // Extraire la question, les options de réponse et la réponse correcte
                const questionData = data.results[0];
                setQuestion(questionData.question);
                setOptions([...questionData.incorrect_answers, questionData.correct_answer]);
                setCorrectAnswer(questionData.correct_answer);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

    }
    useEffect(() => {
        fetchData(); // Charge un nouveau conseil au chargement initial
    
        const intervalId = setInterval(() => {
          fetchData(); // Charge un nouveau conseil toutes les 30 secondes
        }, 30000);
    
        return () => {
          clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
        };
      }, []);

    const handleAnswerSubmit = () => {
        if (userAnswer === correctAnswer) {
            setShowMessage(true);
            setIsCorrect(true);
        } else {
            setShowMessage(true);
            setIsCorrect(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Question de Culture Générale</h2>

            {loading && <div className="mt-4 text-gray-600">Chargement en cours...</div>}
            {error && <div className="mt-4 text-red-600">Erreur : {error.message}</div>}

            {question && (
                <div className="mt-4">
                    <p className="mb-4">{question}</p>
                    <ul className="list-disc ml-6">
                        {options.map((option, index) => (
                            <li key={index}>
                                <input
                                    type="radio"
                                    id={`option-${index}`}
                                    name="answer"
                                    value={option}
                                    checked={userAnswer === option}
                                    onChange={() => setUserAnswer(option)}
                                />
                                <label htmlFor={`option-${index}`}>{option}</label>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleAnswerSubmit}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Soumettre
                    </button>
                    {showMessage && (
                        <div className={`mt-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect
                                ? 'Bravo ! Vous avez choisi la réponse correcte.'
                                : 'Désolé, votre réponse est incorrecte. La réponse correcte est : ' + correctAnswer
                            }
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TriviaQuestion;
