import React, { useRef, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';
import { AppStateContext } from "../../store/AppStateProvider";
import {
    useRouteMatch,
    useHistory,
} from "react-router-dom";

const {TextArea} = Input;

function CreateKB() {
    const { SetMessage, SetError, SetLoader } = React.useContext(AppStateContext);
    const inputEl = useRef(null);
    let match = useRouteMatch();
    let history = useHistory();
  
    function onFinish(e) {
        const text = inputEl.current?.state?.value;

        if(text) {
            console.log(text);
            //process api
        } else {
            SetError("Validation Error", "Please Enter Text");
        }
    }

    return (
        <div>
            <TextArea ref={inputEl} placeholder="Please enter text" />
            <Button onClick={onFinish} type="primary">Create KB</Button>
        </div>
    );
}

export default CreateKB;
