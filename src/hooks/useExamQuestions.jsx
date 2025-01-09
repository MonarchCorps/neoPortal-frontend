import { useContext } from 'react'
import ExamQuestionContext from '@/context/ExamQuestionProvider'

const useExamQuestions = () => {
    return useContext(ExamQuestionContext);
}

export default useExamQuestions;