import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CkEditorInput = ({value, onChange}) => {
    return (
        <div className="ckeditor"> {/* Changed class to className */}
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
            
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(event, data)
                }}
            />
        </div>
    )
}

export default CkEditorInput;
