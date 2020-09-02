import React, { Fragment } from 'react';
import { Checkbox, Tag, Typography } from 'antd';
const { Text } = Typography;

const config = {
    LOWER: {
        type: "text",
        modifier: str => str.toLowerCase(),
        default: "text",
        render: value => (<Text mark>{value}</Text>)
    },

    ORTH: {
        type: "text",
        default: "text",
        render: value => (<Text mark>{value}</Text>)
    },

    TEXT: {
        type: "rule",
        options: [{ value: "REGEX", label: "Regular Expression" }],
        default: { type: "REGEX", value: "*" },
        render: value => (<Text>{`{ ${value.type}: ${value.value} }`}</Text>)
    },

    REGEX: {
        type: "regex",
        default: "*"
    },

    LENGTH: {
        type: "rule",
        options: [
            { value: "==", label: "Equal To" },
            { value: ">", label: "Greater Than" },
            { value: ">=", label: "Greater Than OR Equal To" },
            { value: "<", label: "Lesser Than" },
            { value: "<=", label: "Lesser Than OR Equal To" },
        ],
        default: { type: "==", value: 10 },
        render: value => (<Text>{`{ ${value.type}: ${value.value} }`}</Text>)
    },

    "==": {
        type: "number",
        default: 10,
    },

    ">": {
        type: "number",
        default: 10,
    },

    ">=": {
        type: "number",
        default: 10,
    },

    "<": {
        type: "number",
        default: 10,
    },

    "<=": {
        type: "number",
        default: 10,
    },



    IS_ALPHA: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    IS_ASCII: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    IS_DIGIT: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },

    IS_LOWER: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    IS_UPPER: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    IS_TITLE: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },

    IS_PUNCT: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    IS_SPACE: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    IS_STOP: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },

    LIKE_NUM: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    LIKE_URL: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },
    LIKE_EMAIL: { type: "bool", default: true, render: (checked) => <Text mark>{checked ? "TRUE" : "FALSE"}</Text> },


    POS: {
        type: "select",
        options: [
            { value: "NOUN", label: "Noun" },
            { value: "VERB", label: "Verb" },
            { value: "PRONOUN", label: "Pronoun" },
        ],
        modifier: str => str.toUpperCase(),
        default: "NOUN",
        render: value => <Text mark>{value}</Text>
    },

    TAG: {
        type: "select", modifier: str => str.toUpperCase(),
        default: "NN",
        options: [
            { value: "NN", label: "Noun, singular or mass" },
            { value: "JJ", label: "Adjective" },
            { value: "PRP", label: "Preposition" },
            { value: "RB", label: "Adverb" },
        ],
        render: value => <Text mark>{value}</Text>
    },
    DEP: { type: "text", default: "DD", render: value => <Text mark>{value}</Text> },

    LEMMA: {
        type: "rule", options: [
            { value: "IN", label: "In" },
            { value: "NOT_IN", label: "Not-in" }
        ], default: { type: "IN", value: [] },
        render: value => (<Fragment>
            <Text mark>
                {`${value.type}: `}
            </Text>
            {value.value.map((val, idx) => <Tag key={`${val}-${idx}`} closable>{val}</Tag>)}
        </Fragment>)
    },

    IN: { type: "textList", modifier: values => values.map(str => `${str}`.toLowerCase()), default: [] },
    NOT_IN: { type: "textList", modifier: values => values.map(str => `${str}`.toLowerCase()), default: [] },

    SHAPE: { type: "text", default: "string" },

    ENT_TYPE: { type: "text", default: "xx" },

    OP: {
        type: "select",
        options: [
            { value: "!", label: "Negate" },
            { value: "?", label: "Optional" },
            { value: "+", label: "Atleast ONE Match" },
            { value: "*", label: "ZERO Or More Matches" }
        ],
        default: "!",
        render: (value) => <Text mark>{value}</Text>
    }

}


export const TYPES = [
    "LOWER", "ORTH", "TEXT",
    "LENGTH", "LEMMA",
    "IS_ALPHA", "IS_DIGIT", "IS_ASCII", "IS_LOWER", "IS_UPPER", "IS_PUNCT", "IS_SPACE", "IS_STOP", "LIKE_NUM", "LIKE_URL", "LIKE_EMAIL",
    "POS", "TAG", "DEP",
    "SHAPE", "ENT_TYPE"
]

export default config; 