import {useDrop} from "react-dnd";
import "./Corpus.css"



function GridCell({data, rowName, colName, apiUrl}){
    const gradientArray = ["#fafa6e","#c4ec74","#92dc7e","#64c987","#39b48e","#089f8f","#00898a","#08737f","#215d6e","#2a4858"];
    //   .getColors();

    let ix = Math.floor(data * 10)

    let cellStyle = {
        width: "5em",
        height: "3em",
        background: gradientArray[ix]
    }

    const [{ isOver }, dropRef] = useDrop({
        accept: 'sentence',
        drop: (item) => {
            fetch(`${apiUrl}/drag/${rowName}/${colName}/${item.text}`)
            .then( response => response.json())
            .then( data => {
                console.log(data)
            });
            console.log([rowName, colName, item]);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    return <td style={cellStyle} ref={dropRef}>{ isOver && "Drop"}</td>;
}

function GridRow({rowName, data, apiUrl}){

    let cells = Object.entries(data).map(([colName, v], ix) => <GridCell key={ix} data={v} rowName={rowName} colName={colName} apiUrl={apiUrl} />)

    return( <tr>
        <td><b>{rowName}</b></td>
        {cells}
    </tr>)
}

export default function Grid({data, apiUrl}){
    let gridRows = Object.entries(data).map(([name, cells], ix) => <GridRow key={ix} rowName={name} data={cells} apiUrl={apiUrl} />)
    // Get the col names from the first row
    // let rowNames = Object.keys(data)
    let rows = Object.values(data);
    let footer = null;
    if(rows.length > 0){
        let row = rows[0];
        let colNames = Object.keys(row);
        footer = colNames.map((f, ix) => <td key={ix}><b>{f}</b></td>);
    }


    return (
        <div>
            <table style={
                {
                    tableLayout: "fixed",
                    width: "60em",
                    textAlign: "center"
                }
            }>
                <tbody>
                {gridRows}
                {footer && <tr><td />{footer}</tr>}
                </tbody>
            </table>
        </div>
    )
}