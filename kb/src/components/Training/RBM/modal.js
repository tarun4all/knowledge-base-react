import React, { useState, useEffect } from 'react';
import { Select, Button, Typograpy, Input, Checkbox, Typography } from 'antd';
import CustomModal from '../../common/customModal';
import RULE_CONFIGS from './config';
import Rule from './rule'; 
import styles from './styles';
const { Text, Title } = Typography;

const { Option } = Select;
const { Search } = Input;

function RBMModal(props) {
    const [rules, setRules] = useState([])
    const [checkedList, setCheckedList] = useState([])
    const [op, setOp] = useState(null)

    const { isOpen, onClose, onSubmit } = props;


    const addNewRule = () => {
        const newRule = {
            id: `rule-${rules.length}`,
            type: "ORTH",
            value: "",
        }
        setRules([...rules, newRule])
    }

    const addOperator = (val = "!") => {
        const operator = {
            id: `op`,
            type: "OP",
            value: val,
        }
        setOp(operator)
    }

    const updateRule = (ruleId, type, value) => {
        console.log("updating value", ruleId, type, value)
        const rule = rules.find(({ id }) => id === ruleId)
        
        console.log("RULE", rule)
        rule.type = type; 
        rule.value = value; 

        setRules([...rules])
    }

    const deleteRule = (ruleId) => {
        const newRules = rules.filter(({ id }) => id !== ruleId)
        setRules(newRules)
    }

    return (<CustomModal show={isOpen} onOk={() => onSubmit([...rules, op])} onCancel={onClose} title="Rule Based Training">
        {rules.length > 0 && rules.map(rule => (<Rule {...rule} onDelete={deleteRule} onChange={updateRule} />))}
        
        <Button type="primary" onClick={addNewRule}>Add</Button>

        {!op ? <Button type="secondary" onClick={addOperator}>Add Operator</Button> : (
            <Rule {...op} onDelete={(id) => setOp(null)} onChange={(_, __, value) => {
                addOperator(value)
            }} />
        )}
    </CustomModal>)
}

export default RBMModal; 