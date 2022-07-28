import { Table, Spin, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { sendGetRequest } from '../../utils/fetch';

function CourseList() {
	const [loading, setLoading] = useState(true);
	const [courseList, setCourseList] = useState([]);

	const columns = [
		{
			title: 'Course Id',
			dataIndex: 'courseId',
			key: 'courseId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Course Name',
			dataIndex: 'courseName',
			key: 'courseName',
		},
		{
			title: 'Department',
			dataIndex: 'department',
			key: 'department',
		},
		{
			title: 'Teacher Name',
			dataIndex: 'teacherName',
			key: 'teacherName',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			render: (text) => (
				<>
					<Tooltip title={text}>
						<span>{String(text).length > 50 ? String(text).substring(0, 50) + '....' : text}</span>
					</Tooltip>
				</>
			),
		},
	];

	useEffect(() => {
		sendGetRequest('api/v1/courses')
			.then((res) => res.json())
			.then((student_data) => {
				setCourseList(
					student_data.map((item, index) => {
						return {
							key: index,
							...item,
						};
					})
				);
				setLoading(false);
			});
	}, []);

	return (
		<div>
			{loading ? (
				<div className='loader' style={{ textAlign: 'center' }}>
					<Spin size='large' />
				</div>
			) : (
				<Table columns={columns} dataSource={courseList} />
			)}
		</div>
	);
}

export default CourseList;
