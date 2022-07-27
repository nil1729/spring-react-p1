import { Table, Spin, Avatar } from 'antd';
import React, { useState, useEffect } from 'react';

function Students() {
	const [loading, setLoading] = useState(true);
	const [studentList, setStudentList] = useState([]);

	const columns = [
		{
			title: '',
			dataIndex: 'studentAvatar',
			key: 'studentAvatar',
			render: (text) => <Avatar>{text}</Avatar>,
		},
		{
			title: 'Student Id',
			dataIndex: 'studentId',
			key: 'studentId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'First Name',
			dataIndex: 'firstName',
			key: 'firstName',
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
		},
		{
			title: 'Email Address',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			key: 'gender',
		},
	];

	useEffect(() => {
		fetch('/api/v1/students')
			.then((res) => res.json())
			.then((student_data) => {
				setStudentList(
					student_data.map((item, index) => {
						return {
							key: index,
							...item,
							studentAvatar: item.firstName.slice(0, 1) + item.lastName.slice(0, 1),
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
				<Table columns={columns} dataSource={studentList} />
			)}
		</div>
	);
}

export default Students;
