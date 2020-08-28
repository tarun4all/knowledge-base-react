import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import CreateKB from './createKB';
import {
    useParams,
} from "react-router-dom";

function KnowledgeBase() {
    const [showKB, setShowKB] = useState(false);
    let {id} = useParams();

    console.log(id);
    useEffect(() => {
        if(id) {
            setShowKB(true);
        } else {
            setShowKB(false);
        }
    }, [id]);
  
    return (
        <div>
            {showKB ? <div>kb</div> : <CreateKB />}
        </div>
    );
}

export default KnowledgeBase;
