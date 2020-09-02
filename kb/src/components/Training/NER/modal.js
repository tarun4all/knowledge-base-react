import React, { useState, useEffect } from 'react'; 
import { Select, Button, Typography, Input, Checkbox } from 'antd';
import CustomModal from '../../common/customModal'; 
import styles from './styles'; 
const { Text, Title } = Typography;
const { Option } = Select;
const { Search } = Input;



const DEFAULT_TYPES = [
    "ORG",
    "PERSON",
    "PLACE",
    "THING",
    "ANIMAL",
]

function NERModal(props) {
    const [sentence, setSentence] = useState("Ola Cabs has shitty service in delhi");
    const [mergeSets, setMergeSets] = useState([])
    const [words, setWords] = useState([]);
    const [types, setTypes] = useState(DEFAULT_TYPES)
    const [search, setSearch] = useState("")
    const [checkedList, setCheckedList] = useState([])
    // const inputField = createRef(); 
    const { isOpen, onClose, onSubmit } = props; 

    useEffect(() => {
        const wrds = sentence.split(' ');
        mergeSets.forEach(set => {
            const merged = set.map(idx => wrds[idx]).join(' ')
            wrds.splice(set[0], set.length, merged)
        })

        let current = 0;
        const newWords = wrds.map((word, idx) => {
            const from = current;
            const to = from + word.length;
            const type = "";
            current = to + 1;
            return { word, from, to, type, id: `${idx}-${word}` }
        })
        setWords(newWords)

        return (() => {
            console.log("Unmounted: Save Data ??")
        })
    }, [sentence, setWords, mergeSets])


    const updateSentence = (value) => {
        setSentence(value)
        setMergeSets([])
        setCheckedList([])
    }

    const changeType = (id, value) => {
        const wrds = [...words];
        const word = wrds.find(wrd => wrd.id === id)
        word.type = value;
        setWords(wrds)
    }

    const onSearch = (keyCode, wordId) => {
        if (keyCode === 13) {
            const searchType = search.toUpperCase();
            if (types.includes(searchType)) {
                return
            } else {
                const newTypes = [...types, searchType]
                setTypes(newTypes)
                changeType(wordId, searchType)
            }
        }
    }

    const checkWord = (id) => {
        if (checkedList.includes(id)) {
            const newList = checkedList.filter(wid => wid !== id)
            setCheckedList(newList)
        } else {
            setCheckedList([...checkedList, id])
        }
    }

    const mergeCheckedList = () => {
        const newMerge = checkedList.map(wordId => {
            const word = words.find(word => word.id === wordId)
            const idx = words.indexOf(word)
            return idx
        })
        setMergeSets([...mergeSets, newMerge.sort()])
        setCheckedList([])
    }

    const submitData = () => {
        const data = { sentence, entities: words.filter(({ type }) => type !== "").map(word => ([word.from, word.to, word.type])) }
        onSubmit(data);
    }

    if (!isOpen) {
        return null; 
    }
    
    return (<CustomModal show={isOpen} onOk={submitData} onCancel={onClose} title="NER Training">
        <div style={styles.wrapper}>
            <Text strong mark >{sentence}</Text>
            <Search style={styles.inputText} placeholder="Enter Sentence Here" onSearch={updateSentence} enterButton="Done" />
            {words.length > 0 && words.map(word => (<div style={styles.wordRow} key={word.id}>
                <div style={styles.word}>
                    <Checkbox checked={checkedList.includes(word.id)} onChange={() => checkWord(word.id)}></Checkbox>
                    <div style={{ marginLeft: '8px'}}>
                        <Text strong>{word.word}</Text>{word.type.length > 0 ? <Text code>{word.type}</Text> : null}
                    </div>
                </div>
                <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder={"Select a Type"}
                    optionFilterProp={"children"}
                    onChange={value => changeType(word.id, value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                    onSearch={value => setSearch(value)}
                    onInputKeyDown={event => onSearch(event.keyCode, word.id)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {types.map(type => (<Option key={type} value={type}>{`${type[0]}${type.slice(1, type.length).toLowerCase()}`}</Option>))}
                </Select>
            </div>

            ))}
            <div>
            {checkedList.length > 1 ? <Button type="danger" onClick={mergeCheckedList}>Merge</Button> : null}
            </div>
        </div>
    </CustomModal>)
}


export default NERModal; 