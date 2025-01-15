/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getYears } from '@/utils/getYears'
import useScrollTop from '@/hooks/useScrollTop'
import ShareButton from '../ShareButton'

function SubHeadingSection({ questions, setFilteredData }) {
    const { scrollTop } = useScrollTop()

    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = () => {
        const examType = searchParams.get('examType') || 'all';
        const examYear = searchParams.get('examYear') || 'all';
        const questionType = searchParams.get('questionType') || 'all';

        const updatedData = questions?.filter(data =>
            (examType === 'all' || data.examType === examType) &&
            (examYear === 'all' || data.examYear === examYear) &&
            (questionType === 'all' || data.questionType === questionType)
        );

        setFilteredData(updatedData);
    };

    const handleChange = (e, filter) => {
        const { value } = e.target;
        searchParams.set(filter, value);
        searchParams.set('pageIndex', 1);
        setSearchParams(searchParams);
    };

    const resetFilters = () => {
        searchParams.delete('examType');
        searchParams.delete('examYear');
        searchParams.delete('questionType');
        searchParams.delete('pageIndex');
        setSearchParams(searchParams);
    };

    useEffect(() => {
        handleFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, questions]);

    return (
        <>
            <form className="bg-[#f3f2f2] py-3 px-5 grid grid-cols-3 cimd:grid-cols-2 esm:grid-cols-1 gap-4 shadow border border-solid border-slate-50">
                <div className="flex flex-col gap-1">
                    <label htmlFor="examType" className="font-roboto font-500">
                        Select exam Type:
                    </label>
                    <select
                        name="examType"
                        id="examType"
                        className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                        onChange={(e) => handleChange(e, 'examType')}
                        value={searchParams.get('examType') || 'all'}
                    >
                        <option value="all">All</option>
                        <option value="jamb">JAMB</option>
                        <option value="waec">WAEC</option>
                        <option value="neco">NECO</option>
                        <option value="postUtme">Post Utme</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="examYear" className="font-roboto font-500">
                        Select exam Year:
                    </label>
                    <select
                        name="examYear"
                        id="examYear"
                        className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                        onChange={(e) => handleChange(e, 'examYear')}
                        value={searchParams.get('examYear') || 'all'}
                    >
                        <option value="all">All</option>
                        {getYears().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="questionType" className="font-roboto font-500">
                        Select Question Type:
                    </label>
                    <select
                        name="questionType"
                        id="questionType"
                        className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                        onChange={(e) => handleChange(e, 'questionType')}
                        value={searchParams.get('questionType') || 'all'}
                    >
                        <option value="all">All</option>
                        <option value="objective">Objective</option>
                        <option value="trueOrFalse">True or False</option>
                    </select>
                </div>

                <div className="col-span-full my-2 usm:flex usm:flex-col usm:gap-2">
                    <Link
                        to="/classroom"
                        onClick={scrollTop}
                        className="border-2 border-solid border-[#1F509A] text-[#1F509A] shadow-sm p-3 rounded-md transition-all duration-300 hover:bg-[#1F509A] hover:text-[#eee] usm:text-center"
                    >
                        Change Subject
                    </Link>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="ml-2 usm:ml-0 border-2 border-solid border-[#1F509A] text-[#1F509A] shadow-sm p-2 rounded-md transition-all duration-300 hover:bg-[#1F509A] hover:text-[#eee]"
                    >
                        Reset Selections
                    </button>
                </div>
            </form>

            <div className="flex items-center utsm:flex-col mt-6 mb-3 gap-3">
                <p className="font-800">Share:</p>
                <ShareButton url={window.location} />
            </div>
        </>
    );
}

export default SubHeadingSection;
