import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {type} from "../constant";

const Row = ({info, index, moveRow}) => {
    const ref = useRef(null);

    const [,drop] = useDrop({
        accept: type,
        hover(item, monitor){
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex){
                return;
            }
            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        item: {type, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <tr ref={ref}
            style={{opacity: isDragging ? 0 : 1}}
        >
            <td>{info.docType}</td>
            <td>{info.companyID}</td>
            <td>{info.date.substr(0, 10)}</td>
            <td>{info.docID}</td>
            <td>{info.sign}</td>
            <td>{info.amount}</td>
        </tr>
    );
}

export default Row;