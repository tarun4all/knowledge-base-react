import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Input, Space, Button } from 'antd';
import { AppStateContext } from "../../store/AppStateProvider";
import CustomModal from './customModal';

const sampleAttributes = [{name: "comment", placeholder: "Please enter a comment", notNull: true, type: 'input', label: "Enter description"},
{name: "description", placeholder: "Please enter desc", notNull: false, type: 'textarea', label: "Enter description"}];

function TestGlobal() {
    const { SetMessage, SetError, SetLoader } = React.useContext(AppStateContext);
    const [showModal, setShowModal] = React.useState(false);
  
    function SendButtonMessage() {
      SetLoader(true);
    }

    function getPayload(payload) {
      console.log(payload);
      setShowModal(false);
    }
  
    return (
      <div style={{textAlign: "center"}}>
        <Space>
          <Button onClick={SendButtonMessage}>Loader</Button>
          <Button onClick={() => SetMessage("Done", "Loggedin succesfully")}>Show success message</Button>
          <Button onClick={() => SetError("Error occures", "Api failed")}>Show error message</Button>
          <Button onClick={() => setShowModal(true)}>Show Modal</Button>

          <CustomModal attributes={sampleAttributes} show={showModal} onOk={getPayload} onCancel={setShowModal} title="Test">
            <div>
              <input />
            </div>
          </CustomModal>
        </Space>
      </div>
    );
}

export default TestGlobal;
