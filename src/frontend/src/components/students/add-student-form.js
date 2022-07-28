import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';

const AddStudentForm = ({ visible, onCreate, onCancel, addingNewStudent }) => {
	const [form] = Form.useForm();

	async function validateForm() {
		try {
			const values = await form.validateFields();
			if (await onCreate(values)) {
				form.resetFields();
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<Modal
			visible={visible}
			title='Add New Student'
			okText='Register'
			cancelText='Cancel'
			onCancel={() => {
				form.resetFields();
				onCancel();
			}}
			cancelButtonProps={{ disabled: addingNewStudent }}
			onOk={validateForm}
			confirmLoading={addingNewStudent}
		>
			<Form
				form={form}
				layout='vertical'
				name='form_in_modal'
				initialValues={{
					gender: 'MALE',
				}}
				disabled={addingNewStudent}
			>
				<Form.Item
					label='First Name'
					name='firstName'
					rules={[
						{
							required: true,
							message: 'Please input first name of the student',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Last Name'
					name='lastName'
					rules={[
						{
							required: true,
							message: 'Please input last name of the student',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Email Address'
					name='email'
					rules={[
						{
							required: true,
							message: 'Please input email address of the student',
						},
						{
							pattern:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Email address is not valid',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name='gender' className='collection-create-form_last-form-item'>
					<Radio.Group>
						<Radio value='MALE'>Male</Radio>
						<Radio value='FEMALE'>Female</Radio>
					</Radio.Group>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddStudentForm;
