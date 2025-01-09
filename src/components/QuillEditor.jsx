/* eslint-disable react/prop-types */
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
    return (
        <div>
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={{
                    toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link'],
                        [{ align: [] }],
                        ['blockquote'],
                    ],
                }}
            />
        </div>
    );
};

export default QuillEditor;
