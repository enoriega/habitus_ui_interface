import './App.css';
import Corpus from './Corpus.js'
import Grid from  "./Grid"
import {useEffect, useState} from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App({apiUrl}) {
    const [corpus, setCorpus] = useState([]);
    const [gridRows, setGridRows] = useState({})

    useEffect(() => {
        fetch(`${apiUrl}/data/`)
            .then( response => response.json())
            .then( data => {
                setCorpus(data.sentences);
                setGridRows(data.grid);
            });
    }, [])

  return (
      <DndProvider backend={HTML5Backend}>
    <div className="App" style={{
        display: "flex",
        flexDirection: "row"
    }}>
        <Grid data={gridRows} apiUrl={apiUrl} />
      <Corpus sentences={corpus} />
    </div>
          </DndProvider>
  );
}

export default App;
