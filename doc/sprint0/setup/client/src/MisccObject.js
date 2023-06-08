import { useState, useEffect } from "react";
import Axios from "axios";

const EmbeddedObject = ({name}) => {
    return (
        <h3>* {name}</h3>
    );
}
 
const MisccObject = ({_id, name, embd, delFunc, updateEmbedFunc}) => {

    const [embeddedElements, setEmbeddedElements] = useState(embd);

    const addEmbed = (_id) => {
        Axios.post("http://localhost:5000/objects/update/"+_id)
            .then(res => {
                setEmbeddedElements(res.data.embed);
                updateEmbedFunc(embeddedElements);
            })
    }

    return (
        <div>
            <h1>{name}</h1>
            <p>{_id}</p>
            <button onClick={delFunc}>delete object</button>
            <button onClick={() => addEmbed(_id)}>add embed</button>
            {embeddedElements.map(eObj => {
                <EmbeddedObject name={eObj.name} />
            })}
        </div>
    );
}
 
export default MisccObject;