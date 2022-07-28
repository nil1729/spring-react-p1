import { UserOutlined, BookOutlined } from '@ant-design/icons';
import { Layout, Menu, notification } from 'antd';
import React, { useState } from 'react';
import StudentPage from './pages/students';
import CoursePage from './pages/courses';
import { Route, Switch, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Sider } = Layout;

function App() {
	const history = useHistory();

	const [collapsed, setCollapsed] = useState(false);
	const [items] = useState([
		getItem('Students', 'subject_1', <UserOutlined />, function () {
			history.push('/');
		}),
		getItem('Courses', 'subject_2', <BookOutlined />, function () {
			history.push('/courses');
		}),
	]);

	function getItem(label, key, icon, onClick) {
		return {
			key,
			icon,
			label,
			onClick,
		};
	}

	function openNotificationWithIcon(type, message, description) {
		notification[type]({
			message: message,
			description: description,
		});
	}

	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className='my_logo' />
				<Menu theme='dark' defaultSelectedKeys={['subject_1']} mode='inline' items={items} />
			</Sider>
			<Layout className='site-layout'>
				<Header
					className='site-layout-background'
					style={{
						padding: 0,
					}}
				/>
				<Switch>
					<Route path={'/'} exact>
						<StudentPage openNotificationWithIcon={openNotificationWithIcon} />
					</Route>
					<Route path={'/courses'} exact>
						<CoursePage />
					</Route>
				</Switch>
				<Footer
					style={{
						textAlign: 'center',
					}}
				>
					Student Management Admin Portal
				</Footer>
			</Layout>
		</Layout>
	);
}

export default App;
