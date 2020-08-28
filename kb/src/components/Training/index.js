import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import { Tabs, Button, Table, Tag, Space } from 'antd';
import {trainingTab} from "../../config/commonConstants";
import NER from './ner';
import POS from "./pos";

const { TabPane } = Tabs;
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

const operations = <Button type="primary">Start Training</Button>;

function Training() {
    const [activeTab, setActiveTab] = useState();
    const history = useHistory();
    const match = useRouteMatch();
    let {tab} = useParams();

    useEffect(() => {
        if(tab) {
            setActiveTab(trainingTab[tab]);
        } else setActiveTab("1");
    }, [tab]);

    function handleTabChange(key) {
        const tab = Object.keys(trainingTab).find((k) => trainingTab[k] == key);
        history.push(`${match.path.replace(":tab", tab)}`)
    }

    return (
        <div>
            <Tabs activeKey={activeTab} onChange={handleTabChange} tabBarExtraContent={operations}>
                <TabPane tab="POS Training" key="1">
                    <div style={{textAlign: "center"}}>
                        <h1>POS Training</h1>
                        <POS />
                        <Table columns={columns} dataSource={data} />
                    </div>
                </TabPane>
                <TabPane tab="Rule Based Training" key="2">
                    <div style={{textAlign: "center"}}>
                        <h1>Rule Based Training</h1>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </TabPane>
                <TabPane tab="NER Training" key="3">
                    <div style={{textAlign: "center"}}>
                        <h1>NER Training</h1>
                        <NER />
                        <Table columns={columns} dataSource={data} />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Training;
