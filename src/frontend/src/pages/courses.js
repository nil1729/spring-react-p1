import { Breadcrumb, Layout, Col, Row } from 'antd';
import React from 'react';
import CourseList from '../components/courses/course-list';
const { Content } = Layout;

function CoursePage() {
	return (
		<>
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
							<Breadcrumb.Item>Courses</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
				</Row>

				<div
					className='site-layout-background'
					style={{
						padding: 24,
						minHeight: 360,
					}}
				>
					<CourseList />
				</div>
			</Content>
		</>
	);
}

export default CoursePage;
