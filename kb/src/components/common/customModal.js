import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../App.css';
import { Input, Button, Modal } from 'antd';

const { TextArea } = Input;

function handleAttribute(element, handleChange) {
    let component = '';

    switch(element.type) {
      case 'input': component = {comp: <Input placeholder={element.placeholder} allowClear onChange={(e) => handleChange(e, element.name)} />, label: element.label}; break;
      case 'textarea': component = {comp: <TextArea placeholder={element.placeholder} allowClear onChange={(e) => handleChange(e, element.name)} />, label: element.label}; break;
    }

    return component;
}

function CustomModal(props) {
    const [version, setVersion] = useState(0);
    const [inputs, setInputs] = useState([]);
    const [payload, setPayload] = useState({});

    function handleChange(event, name) {
      try {
        //to make it remove from event pool
        event.persist();
        const { target: { value } } = event, _payload = payload;

        _payload[name] = value;
        setPayload({..._payload});
      } catch(e) {}
    }

    useEffect(() => {
      const {attributes} = props;

      if(attributes) {
        const _tempInputs = attributes.map((element) => {
          return handleAttribute(element, handleChange)
        });
  
        setInputs(_tempInputs);
      }
    }, [version]);

    console.log(props);
    return (
      <>
        <Modal
          title={props.title ? props.title : 'Modal'}
          visible={props.show}
          onOk={() => props.onOk(false)}
          onCancel={() => props.onCancel(false)}
        >
          {!props.children ? inputs.map(el =>
            <div className="paddingDivModal"><span>{el.label}</span>{el.comp}</div>
          ) : props.children}
          
        </Modal>
      </>
    );
}

export default CustomModal;
