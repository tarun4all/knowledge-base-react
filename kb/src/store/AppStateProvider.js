import React, { useEffect } from "react";
import { Spin, notification } from 'antd';
import "./context.css";

export const AppStateContext = React.createContext(null);

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description
    });
};

export default function AppStateProvider({ children }) {
  const [loader, SetLoader] = React.useState(false);

  const successMessage = (title, msg) => {
    openNotificationWithIcon('success', title, msg);
  }

  const errorMessage = (title, msg) => {
    openNotificationWithIcon('error', title, msg);
  }

  useEffect(() => {
    if (loader) setTimeout(() => {SetLoader(false)}, 5000);
  }, [loader]);

  const state = {
    SetMessage: successMessage,
    SetError: errorMessage,
    SetLoader: SetLoader,
  };

  return (
    <AppStateContext.Provider value={state}>
        <Spin className="overlay" tip="Loading..." spinning={loader}></Spin>
      {children}
    </AppStateContext.Provider>
  );
}