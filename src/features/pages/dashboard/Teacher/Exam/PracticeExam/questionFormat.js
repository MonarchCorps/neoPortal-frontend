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
    "question": "What is 2+2?",
    "qOpt": [
      { "id": "A", "text": "3" },
      { "id": "B", "text": "4" }
    ],
    "answer": { "text": "B", "desc": "Correct answer is 4" },
    "qType": "multi-choice"
  },
  {
    "question": "What is the capital of France?",
    "qOpt": [
      { "id": "A", "text": "Paris" },
      { "id": "B", "text": "London" }
    ],
    "answer": { "text": "A", "desc": "Correct answer is Paris" },
    "qType": "multi-choice"
  }
]

    `
    )
}