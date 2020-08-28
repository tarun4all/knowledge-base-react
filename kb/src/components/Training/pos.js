import React, { useState, useRef } from 'react';
import 'antd/dist/antd.css';
import {
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import { Row, Col, Space, Button, Input, Tag, AutoComplete } from 'antd';
import CustomModal from '../common/customModal';

const {Option} = AutoComplete;
const OPTIONS = ["NOUN", "VERB", "ADJ"];

function POS() {
    const [modalOpen, setModalOpen] = useState(false);
    const [chips, setChips] = useState([]);
    const [options, setOptions] = useState(OPTIONS);
    const inputRef = useRef(null);

    function splitSen() {
      const {state:{value}} = inputRef.current;
      console.log(inputRef.current.state)
      const sentence = value;

      setChips(sentence.split(" "));
    }

    function search(value) {
      let _temp = OPTIONS.map(op => op.toLowerCase());
      value = value.toLowerCase();
      console.log(_temp.some(el => el.includes(value)));
      if(_temp.some(el => el.includes(value))) {
        _temp = _temp.filter(option => option.includes(value))
      } else {
        if(value) _temp = ["No result found"];
        else _temp = OPTIONS;
      }

      setOptions(_temp.map(op => op.toUpperCase()));
    }

    return (
        <div>
          <Button onClick={() => setModalOpen(true)}>Add POS</Button>
          <CustomModal show={modalOpen} onOk={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} title="Test">
            <div>
              <Input placeholder="Enter sentence" ref={inputRef} />
              <Button onClick={splitSen}>Split sentence</Button>
                
                {chips.map((word, idx) => 
                  <Row>
                    <Col span={8}>
                      <Tag color="processing" id={word}>{word}</Tag>
                    </Col>
                    <Col span={8}>
                      <AutoComplete style={{width: "100%"}} onSearch={search} placeholder="Select Entity">
                        {options.map((option, idx) => 
                          <Option key={idx} value={option}>{option}</Option>
                        )}
                      </AutoComplete>
                    </Col>
                  </Row>
                )}
            </div>
          </CustomModal>
        </div>
    );
}

export default POS;
