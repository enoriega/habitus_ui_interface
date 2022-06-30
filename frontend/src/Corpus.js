import {useDrag} from "react-dnd";

function Sentence({text}) {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'sentence',
        item: { text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return <li ref={dragRef}>{text} {isDragging && '😱'}</li>
}

export default function Corpus({sentences}) {

    let items = sentences.map((s, ix) => <Sentence key={ix} text={s} />)
    return (

            <ol style={{
                // height: "50%",
                // overflow: "scroll"
            }}>
                {items}
            </ol>

    )
}