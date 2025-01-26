/* eslint-disable react/prop-types */
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShieldQuestionIcon } from "lucide-react"
import { CSVFormat, JSONFormat } from "./PracticeExam/questionFormat"

function FormatDesc({ format, handleSetFormat }) {
    return (
        <div className='fixed bottom-4 right-4'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type='button'
                    >
                        <ShieldQuestionIcon />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='px-4 mr-14 '>
                    <DropdownMenuLabel className="p-0 font-normal">
                        Format
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className='grid grid-cols-2'>
                        <button
                            type='button'
                            onClick={() => handleSetFormat('csv')}
                            className='font-poppins text-sm font-600'
                        >
                            CSV
                            {format === 'csv' && <div className='bg-[#608BC1] h-[1px] w-full'></div>}
                        </button>
                        <button
                            type='button'
                            onClick={() => handleSetFormat('json')}
                            className='font-poppins text-sm font-600'
                        >
                            JSON
                            {format === 'json' && <div className='bg-[#608BC1] h-[1px] w-full'></div>}
                        </button>
                    </div>
                    {
                        format === 'json' ? (
                            <div className="max-w-[30rem] mx-auto">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sample Dataset</h2>
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">JSON Format</h3>
                                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-auto">
                                        <pre className="text-sm font-mono max-w-[30rem] ">
                                            {`${JSONFormat()}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-[30rem] mx-auto">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sample Dataset</h2>
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">CSV Format</h3>
                                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-auto">
                                        <pre className="text-sm font-mono max-w-[30rem] max-h-[40vh] overflow-scroll">
                                            {`${CSVFormat()}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default FormatDesc
