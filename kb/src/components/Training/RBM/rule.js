import React, { Fragment, useState, useEffect } from 'react';
import { Select, Button, Input, Checkbox, Typography } from 'antd';
import styles from './styles';
import RULE_CONFIGS, { TYPES } from './config';
import { DeleteOutlined } from '@ant-design/icons'; 

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;


function Rule(props) {
    const [editMode, setEditMode] = useState(true)
    const { id, type, value, onChange, options = null, onDelete } = props;
    const config = RULE_CONFIGS[type] || null;

    const updateValue = (newValue) => {
        const modifier = config.modifier;
        if (!!modifier) {
            onChange(id, type, modifier(newValue));
        } else {
            onChange(id, type, newValue)
        }
        setEditMode(false)
    }

    const updateType = (newType) => {
        const defaultValue = RULE_CONFIGS[newType].default
        onChange(id, newType, defaultValue);
    }


    const _renderTypeSelector = () => {
        if (type == "OP") {
            return <Text>OP</Text>
        }
        return <Select
            showSearch
            style={{ width: 150 }}
            defaultValue={type}
            optionFilterProp={"children"}
            onChange={value => updateType(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {options ?
                options.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>)) :
                TYPES.map(type => (<Option key={type} value={type}>{type}</Option>))}
        </Select>
    }


    const enableEdit = () => setEditMode(true);

    const _renderEditRule = () => {
        switch (config.type) {
            case "text": {
                return <Search placeholder={value} onSearch={updateValue} enterButton="Done" />

            }
            case "number": {
                return <Search placeholder={value} onSearch={updateValue} enterButton="Done" />

            }

            case "bool": {
                return <Checkbox checked={value} onChange={({ target: { checked } }) => updateValue(checked)} />

            }

            case "select": {
                return <Select
                    showSearch
                    style={{ width: 100 }}
                    defaultValue={config.default}
                    optionFilterProp={"children"}
                    onChange={value => updateValue(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {config.options.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
                </Select>
            }

            case "rule": {
                return <Fragment>
                    <Rule id={"nil"} options={config.options} type={value.type} onChange={(_, subType, subValue) => {
                        onChange(id, type, { type: subType, value: subValue })
                        if (subType === value.type) {
                            setEditMode(false)
                        }
                    }} value={value.value} ></Rule>
                </Fragment>
            }

            case "regex": {
                return <Fragment>
                    <Search placeholder={value} onSearch={updateValue} enterButton="Done" />
                </Fragment>
            }

            case "textList": {
                return <Search placeholder={"string"} onSearch={(val) => {
                    const values = [...value, val]
                    updateValue(values)
                }} enterButton="Add" />
            }

        }
    }

    const _renderRule = () => {
        const renderValue = RULE_CONFIGS[type].render;
        if (renderValue) {
            return (<Fragment>
                <Text string>{type}</Text>
                {renderValue(value)}
                <Button onClick={enableEdit}>Edit</Button>
            </Fragment>)
        } else {
            return null;
        }
    }

    if (!config) {
        return null;
    }

    return (<div key={id}>
        {editMode ? (<div style={styles.wordRow}>
            {_renderTypeSelector()}
            {_renderEditRule()}
        </div>) : (<div style={styles.wordRow}>
            <Button onClick={() => onDelete(id)} shape="circle" icon={<DeleteOutlined />} />
            {_renderRule()}
        </div>)}
    </div>)
}

export default Rule; 