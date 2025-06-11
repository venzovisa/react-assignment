import React, { useState } from 'react';
import { MailOutlined, DashboardTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: (<Link to="/">Home</Link>),
        key: 'home',
        icon: <MailOutlined />,
    },
    {
        key: 'tasks',
        label: (<Link to="/tasks">Tasks</Link>),
        icon: <DashboardTwoTone />,
    },
];

const Navigation: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ marginBottom: '1rem' }} />;
};

export default Navigation;