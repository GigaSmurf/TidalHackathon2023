// components/Slideshow.js
import React, { useState } from 'react';
import '../styles/Slideshow.css';

const questions = [
    { id: 'sex', question: "What's the student's sex?", options: ['F', 'M'] },
    { id: 'age', question: "What's the student's age?", type: 'number' },
    { id: 'address', question: "Student's home address type:", options: ['U', 'R'] },
    { id: 'famsize', question: "Family size:", options: ['LE3', 'GT3'] },
    { id: 'Pstatus', question: "Parent's cohabitation status:", options: ['T', 'A'] },
    { id: 'Medu', question: "Mother's education level:", options: ['0', '1', '2', '3', '4'] },
    { id: 'Fedu', question: "Father's education level:", options: ['0', '1', '2', '3', '4'] },
    { id: 'Mjob', question: "Mother's job:", options: ['teacher', 'health', 'services', 'at_home', 'other'] },
    { id: 'Fjob', question: "Father's job:", options: ['teacher', 'health', 'services', 'at_home', 'other'] },
    { id: 'reason', question: "Reason to choose this school:", options: ['home', 'reputation', 'course', 'other'] },
    { id: 'guardian', question: "Student's guardian:", options: ['mother', 'father', 'other'] },
    { id: 'traveltime', question: "Home to school travel time:", options: ['1', '2', '3', '4'] },
    { id: 'studytime', question: "Weekly study time:", options: ['1', '2', '3', '4'] },
    { id: 'failures', question: "Number of past class failures:", options: ['0', '1', '2', '3', '4'] },
    { id: 'schoolsup', question: "Extra educational support:", options: ['yes', 'no'] },
    { id: 'famsup', question: "Family educational support:", options: ['yes', 'no'] },
    { id: 'paid', question: "Extra paid classes within the course subject:", options: ['yes', 'no'] },
    { id: 'activities', question: "Extra-curricular activities:", options: ['yes', 'no'] },
    { id: 'nursery', question: "Attended nursery school:", options: ['yes', 'no'] },
    { id: 'higher', question: "Wants to take higher education:", options: ['yes', 'no'] },
    { id: 'internet', question: "Internet access at home:", options: ['yes', 'no'] },
    { id: 'romantic', question: "In a romantic relationship:", options: ['yes', 'no'] },
    { id: 'famrel', question: "Quality of family relationships:", options: ['1', '2', '3', '4', '5'] },
    { id: 'freetime', question: "Free time after school:", options: ['1', '2', '3', '4', '5'] },
    { id: 'goout', question: "Going out with friends:", options: ['1', '2', '3', '4', '5'] },
    { id: 'Dalc', question: "Workday alcohol consumption:", options: ['1', '2', '3', '4', '5'] },
    { id: 'Walc', question: "Weekend alcohol consumption:", options: ['1', '2', '3', '4', '5'] },
    { id: 'health', question: "Current health status:", options: ['1', '2', '3', '4', '5'] },
    { id: 'absences', question: "Number of school absences:", type: 'number' }
];


const getRandomGradient = () => {
    const gradients = [
        'linear-gradient(to right, #ff7e5f, #feb47b)',
        'linear-gradient(to right, #6dd5ed, #2193b0)',
        'linear-gradient(to right, #c2e59c, #64b3f4)',
        'linear-gradient(to right, #ff758c, #ff7eb3)',
        'linear-gradient(to right, #f7971e, #ffd200)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

const Slideshow = ({ onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [gradient, setGradient] = useState(getRandomGradient());

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setGradient(getRandomGradient());
        }
    };

    const handleFinish = () => {
        onFinish(answers);
    };

    const handleOptionClick = (option) => {
        setAnswers({ ...answers, [questions[currentQuestionIndex].id]: option });
        if (currentQuestionIndex === questions.length - 1) {
            handleFinish();
        } else {
            handleNext();
        }
    };

    const handleChange = (e) => {
        const { id } = currentQuestion;
        const value = e.target.value;
        // Check if the current question type is 'number' and parse the value
        const parsedValue = currentQuestion.type === 'number' ? parseFloat(value) : value;
        setAnswers({ ...answers, [id]: parsedValue });
    };

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="slideshow-container" style={{ background: gradient }}>
            <h2 className="slideshow-question">{currentQuestion.question}</h2>

            <div className="slideshow-options">
                {currentQuestion.options ? (
                    currentQuestion.options.map((option) => (
                        <button key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </button>
                    ))
                ) : (
                    <input
                        className="slideshow-input"
                        type={currentQuestion.type || 'text'}
                        value={answers[currentQuestion.id] || ''}
                        onChange={handleChange}
                        onBlur={isLastQuestion ? handleFinish : handleNext}
                    />
                )}
            </div>

            {!isLastQuestion && (
                <button className="slideshow-next-btn" onClick={handleNext}>Next</button>
            )}
            {isLastQuestion && (
                <button className="slideshow-next-btn" onClick={handleFinish}>Finish</button>
            )}
        </div>
    );
};

export default Slideshow;
