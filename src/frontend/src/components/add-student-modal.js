import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import AddStudentForm from './add-student-form';

const AddStudentModal = ({
	modalVisibilityState,
	changeModalVisibilityState,
	openNotificationWithIcon,
}) => {
	const [addingNewStudent, setAddingNewStudent] = useState(false);

	async function onCreate(values) {
		setAddingNewStudent(true);

		const response = await fetch('/api/v1/students', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});
		const responseBody = await response.json();

		if (response.ok) {
			setAddingNewStudent(false);
			changeModalVisibilityState(false);
			openNotificationWithIcon('success', responseBody.message);
			return true;
		} else {
			openNotificationWithIcon('error', responseBody.httpStatus, responseBody.message);
		}

		setAddingNewStudent(false);
	}

	return (
		<div>
			<AddStudentForm
				visible={modalVisibilityState}
				onCreate={onCreate}
				onCancel={() => {
					changeModalVisibilityState(false);
				}}
				addingNewStudent={addingNewStudent}
			/>
		</div>
	);
};

export default AddStudentModal;
