export const CSVFormat = () => {
    return (
        `
Question,OptionA,OptionB,OptionC,OptionD,Answer,Description,QuestionType
What is 2+2?,3,4,,,B,The correct answer is 4,true-false
Capital of France?,Paris,London,Berlin,Tokyo,A,The correct answer is Paris,multi-choice
Largest planet in our Solar System?,Earth,Mars,Jupiter,Saturn,C,The correct answer is Jupiter,true-false
What is the boiling point of water in Celsius?,90,100,110,120,B,The correct answer is 100,multi-choice
    `
    )
}

export const JSONFormat = () => {
    return (
        `
[
    {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Paris"
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Mars", "Venus", "Jupiter", "Saturn"],
        "answer": "Mars"
    }
]
    `
    )
}