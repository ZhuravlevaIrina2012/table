import React from "react";
import {useDropzone} from "react-dropzone";

const UploadFile = ({onDrop, accept}) => {

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept
    });

    return (
        <div {...getRootProps()}>
            <input className='dropzone-input' name='file' type='file' {...getInputProps()}/>
            <div className='text-center'>
                {isDragActive ? (
                    <p className='dropzone-content'>Release to drop the files here</p>
                ) : (
                    <p className="dropzone-content">
                        Drag&drop some files here, or click to select files
                    </p>
                )}
            </div>
        </div>
    );
};

export default UploadFile;