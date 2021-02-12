import './App.css';
import UploadFile from "./components/UploadFile";
import Table from "./components/Table";
import React, {useCallback, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";

const App = () => {
    const [table, setTable] = useState([]);
    const [file, setFile] = useState(null);
    const [load, setLoad] = useState(false);
    const [amount, setAmount] = useState(0);

    const onDrop = useCallback(acceptedFiles => {
        const fileName = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", fileName);
        fetch('http://localhost:8080/data', {
            method: "Post",
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('' + response.status);
                }
            })
            .then(data => {
                const total = data.reduce((res, item) => res + item.amount, 0);
                setFile(fileName.path);
                setLoad(true);
                setTable(data);
                setAmount(total);
            })
            .catch(e => console.log(e.message));
    }, []);

    const deleteRow = index => {
        console.log(index);
        const newAmount = amount - table[index].amount;
        setTable(update(table, {$splice: [[index, 1]]}));
        setAmount(newAmount);
    }

    const moveRow = (dragIndex, hoverIndex) => {
        const draggedRow = table[dragIndex];
        setTable(update(table, {$splice: [[dragIndex, 1], [hoverIndex, 0, draggedRow]]}));
    }

    return (
        <main className='app'>
            {load ? <h2 className='dropzone-content'>File <span className='fileName'>{file}</span> is loaded</h2> :
                <UploadFile onDrop={onDrop} accept={"text/plain"}/>}
            <DndProvider backend={HTML5Backend}>
                <Table table={table} moveRow={moveRow} deleteRow={deleteRow}/>
                {load ? <h2>Total amount: {amount}</h2> : <div/>}
            </DndProvider>
        </main>
    );
}

export default App;
