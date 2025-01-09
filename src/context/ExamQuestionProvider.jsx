/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

const ExamQuestionContext = createContext({});

export const ExamQuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState({})

    return (
        <ExamQuestionContext.Provider
            value={{
                questions, setQuestions,
            }}
        >
            {children}
        </ExamQuestionContext.Provider>
    )
}

export default ExamQuestionContext