import { v4 as uuidv4 } from "uuid"

export const handleAddQuestion = (qType, setQuestions) => {
    setQuestions(prev => ([
        ...prev,
        {
            question: '',
            key: uuidv4(),
            qOpt: [
                { key: uuidv4(), id: 'A', text: '' },
                { key: uuidv4(), id: 'B', text: '' },
            ],
            answer: {
                text: '',
                desc: ''
            },
            qType: qType
        }
    ]))

}

export const handleRemoveQuestion = (id, questionKey, questions, setQuestions) => {
    const updatedQuestions = questions.filter(_ => _.key !== questionKey)
    setQuestions(updatedQuestions)
}

export const handleAddOption = (id, questions, setQuestions) => {
    const updatedQuestions = questions.map((question, index) => {
        if (index === id) {
            const lastOption = question.qOpt[question.qOpt.length - 1];
            const lastLetter = lastOption ? lastOption.id : 'A';
            const nextLetter = String.fromCharCode(lastLetter.charCodeAt(0) + 1);

            return {
                ...question,
                qOpt: [
                    ...question.qOpt,
                    { key: uuidv4(), id: nextLetter, text: '' }
                ]
            };
        }
        return question;
    });

    setQuestions(updatedQuestions);
}

export const handleRemoveOption = (qId, optionKey, questions, setQuestions) => {
    const updatedQuestions = questions.map((question, index) => {
        if (index === qId) {
            const optToRemove = question.qOpt.find(opt => opt.key === optionKey)
            if (question.answer.text === optToRemove.id) {
                question.answer.text = ''
            }

            const updatedOpt = question.qOpt.filter(opt => opt.key !== optionKey);
            const reIndexedOpt = updatedOpt.map((opt, idx) => ({
                ...opt,
                id: String.fromCharCode(65 + idx)
            }));

            return {
                ...question,
                qOpt: reIndexedOpt
            };
        }
        return question;
    });

    setQuestions(updatedQuestions);
};

export const handleSetOption = (qId, optionKey, value, setQuestions) => {
    setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        const option = updatedQuestions[qId].qOpt.find((opt) => opt.key === optionKey);
        if (option) {
            option.text = value;
        }
        return updatedQuestions;
    });
}

export const handleSetQuestion = (qId, value, setQuestions) => {
    setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[qId].question = value;
        return updatedQuestions;
    });
}

export const handleSetAnswer = (qId, value, questions, setQuestions) => {
    const updatedQuestions = questions.map(({ answer, ...question }, index) => {
        if (index === qId) {
            return {
                ...question,
                answer: {
                    ...answer,
                    text: value
                }
            }
        }
        return { ...question, answer };
    })

    setQuestions(updatedQuestions);
}

export const handleSetAnswerDesc = (qId, value, setQuestions) => {
    setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[qId].answer.desc = value
        return updatedQuestions
    })
}

export const handleValueChange = (setOpenItems, openValues) => {
    setOpenItems(openValues);
}