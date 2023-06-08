import { useState, useEffect } from "react";
import Axios from "axios";

const EmbeddedObject = ({name}) => {
    return (
        <h3>* {name}</h3>
    );
}
 
const MisccObject = ({id, name, embd}) => {

    const [embeddedElements, setEmbeddedElements] = useState(embd);

    const addEmbed = (id) => {
        Axios.post("http://localhost:5000/objects/"+id)
            .then(res => {
                setEmbeddedElements(res.data.embed)
            })
    }

    return (
        <div>
            <h1>{name}</h1>
            <button onClick={() => addEmbed(id)}>add</button>
            {embeddedElements.map(eObj => {
                <EmbeddedObject name={eObj.name} />
            })}
        </div>
    );
}
 
export default MisccObject;