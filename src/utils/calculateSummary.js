export const calculateSummary = (subjectData) => {
    const attempted = subjectData?.total - subjectData?.unanswered;
    const failed = subjectData?.total - subjectData?.correct;
    return { attempted, failed };
};