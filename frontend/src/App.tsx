import React from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import 'antd/dist/reset.css';
import './index.css';

const App: React.FC = () => {
    const getCSSVariable = (variable: string) =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();

    return (
        <ConfigProvider
            locale={enUS}
            theme={{
                token: {
                    colorPrimary: getCSSVariable('--color-primary'),
                    colorBgBase: getCSSVariable('--color-background'),
                    colorPrimaryText: getCSSVariable('--color-text'),
                },
            }}
        >
            <div></div>
        </ConfigProvider>
    );
};

export default App;
