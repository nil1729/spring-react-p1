import { UserAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Col, Row, Button } from 'antd';
import React, { useState } from 'react';
import StudentList from '../components/students/student-list';
import AddStudentModal from '../components/students/add-student-modal';

const { Content } = Layout;

function StudentPage({ openNotificationWithIcon }) {
	const [modalVisibilityState, setModalVisibilityState] = useState(false);

	function changeModalVisibilityState(visibilityState) {
		setModalVisibilityState(visibilityState);
	}

	return (
		<>
			<AddStudentModal
				modalVisibilityState={modalVisibilityState}
				changeModalVisibilityState={changeModalVisibilityState}
				openNotificationWithIcon={openNotificationWithIcon}
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

					<Col span={2} offset={12}>
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
					<StudentList />
				</div>
			</Content>
		</>
	);
}

export default StudentPage;
