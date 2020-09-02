import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import {
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import { Row, Col, Space, Button, Input, Tag, AutoComplete } from 'antd';
import ModalContent from './modal'; 

function NER() {
    const [modalOpen, setModalOpen] = useState(false);
   
    const onSubmit = (data) => {
        console.log("SUBMITTING DATA", data)
        setModalOpen(false)
    }

    return (
        <div>
          <Button onClick={() => setModalOpen(true)}>Add NER</Button>
              <ModalContent onSubmit={onSubmit} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default NER;
