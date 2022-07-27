import 'antd/dist/antd.css';
import './App.css';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Col, Row, Button, notification } from 'antd';
import React, { useState } from 'react';
import Students from './pages/students';
import AddStudentModal from './components/add-student-modal';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [getItem('Students', 'subject_1', <UserOutlined />)];

const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [modalVisibilityState, setModalVisibilityState] = useState(false);

	function changeModalVisibilityState(visibilityState) {
		setModalVisibilityState(visibilityState);
	}

	const openNotificationWithIcon = (type, message, description) => {
		notification[type]({
			message: message,
			description: description,
		});
	};

	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<AddStudentModal
				modalVisibilityState={modalVisibilityState}
				changeModalVisibilityState={changeModalVisibilityState}
				openNotificationWithIcon={openNotificationWithIcon}
			/>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className='logo' />
				<Menu theme='dark' defaultSelectedKeys={['subject_1']} mode='inline' items={items} />
			</Sider>
			<Layout className='site-layout'>
				<Header
					className='site-layout-background'
					style={{
						padding: 0,
					}}
				/>
				<Content
					style={{
						margin: '0 16px',
					}}
				>
					<Row
						style={{
							margin: '16px 0',
						}}
					>
						<Col span={8}>
							<Breadcrumb>
								<Breadcrumb.Item>Admin Portal</Breadcrumb.Item>
								<Breadcrumb.Item>Students</Breadcrumb.Item>
							</Breadcrumb>
						</Col>

						<Col span={2} offset={14}>
							<Button
								type='primary'
								shape='round'
								icon={<UserAddOutlined />}
								onClick={() => {
									changeModalVisibilityState(true);
								}}
							>
								Add Student
							</Button>
						</Col>
					</Row>

					<div
						className='site-layout-background'
						style={{
							padding: 24,
							minHeight: 360,
						}}
					>
						<Students />
					</div>
				</Content>
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
};

export default App;
