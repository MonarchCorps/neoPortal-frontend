import { v4 as uuidv4 } from "uuid"

export const handleAddQuestion = (qType, setExamDetails) => {
    setExamDetails(prev => ({
        ...prev,
        questionsData: [
            ...prev.questionsData,
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
        ]
    }))
}

export const handleRemoveQuestion = (questionKey, setExamDetails) => {
    setExamDetails(prev => ({
        ...prev,
        questionsData: prev.questionsData.filter(_ => _.key !== questionKey)
    }))
}

export const handleSetQuestion = (qId, value, setExamDetails) => {
    setExamDetails(prev => ({
        ...prev,
        questionsData: prev.questionsData.map((question, index) => {
            if (index === qId) {
                return {
                    ...question,
                    question: value
                }
            }
            return question
        })
    }))
}

export const handleSetAnswer = (qId, value, setExamDetails) => {
    setExamDetails(prev => (
        {
            ...prev,
            questionsData: prev?.questionsData?.map((question, i) => {
                if (i === qId) {
                    return {
                        ...question,
                        answer: {
                            ...question?.answer,
                            text: value
                        }
                    }
                }
                return question
            })
        }
    ))
}

export const handleRemoveOption = (qId, optionKey, setExamDetails) => {

    setExamDetails(prev => (
        {
            ...prev,
            questionsData: prev.questionsData.map((question, index) => {
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
                    }
                }
            })
        }
    ))
}

export const handleAddOption = (qId, setExamDetails) => {

    setExamDetails(prev => (
        {
            ...prev,
            questionsData: prev.questionsData.map((question, index) => {
                if (index === qId) {
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
            })
        }
    ))

}

export const handleSetOption = (qId, optionKey, value, setExamDetails) => {
    setExamDetails(prev => (
        {
            ...prev,
            questionsData: prev.questionsData.map((question, index) => {
                if (index === qId) {
                    const option = question.qOpt.find((opt) => opt.key === optionKey);
                    if (option) {
                        option.text = value;
                    }
                }
                return question;
            })
        }
    ))
}

export const handleSetAnswerDesc = (aId, value, setExamDetails) => {
    setExamDetails(prev => (
        {
            ...prev,
            questionsData: prev.questionsData.map((question, index) => {
                if (aId === index) {
                    return {
                        ...question,
                        answer: {
                            ...question.answer,
                            desc: value
                        }
                    }
                } else {
                    return question
                }
            })
        }
    ))
}

export const handleChange = (e, setExamDetails) => {
    const { name, value } = e.target
    setExamDetails(prev => ({ ...prev, [name]: value }))
}

export const handleValueChange = (setOpenItems, openValues) => {
    setOpenItems(openValues);
}