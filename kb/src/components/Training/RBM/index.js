import React, { useState, useEffect } from 'react'; 

import { Button } from 'antd'; 

import ModalContent from './modal'; 


function RBM() {
    const [modalOpen, setModalOpen] = useState(false);

    const onSubmit = (data) => {
        console.log("RULE BASED SUBMIT", data)
        setModalOpen(false)
    }

    return (<div>
        <Button onClick={() => setModalOpen(true)}>Add RBM</Button>
        <ModalContent onSubmit={onSubmit} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>)
}


export default RBM; 