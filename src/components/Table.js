import React, {useRef} from "react";
import Row from "./Row";
import {useDropzone} from "react-dropzone";
import {useDrop} from "react-dnd";
import {type} from "../constant";


const Table = ({table, moveRow, deleteRow}) => {
    const dropZone = useRef(null);

    const {getRootProps} = useDropzone();

    const [,drop] = useDrop({
        accept: type,
        drop(item){
            console.log("I am here");
            if (dropZone.current) {
                deleteRow(item.index);
            }
        }
    });

    drop(dropZone);

    return (
        <div ref={dropZone} className='data' {...getRootProps()}>
            <table className='table'>
                <thead>
                <tr>
                    <th>DocType</th>
                    <th>CompanyID</th>
                    <th>Date</th>
                    <th>DocID</th>
                    <th>Sign</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {table.map((item, index) => <Row key={item.docID}
                                                 info={item}
                                                 index={index}
                                                 moveRow={moveRow}
                    />)}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

