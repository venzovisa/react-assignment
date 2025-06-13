import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Card from 'antd/es/card/Card';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import { useAppDispatch } from '../../hooks/hooks';
import { updatePost } from '../../store/reducers/postsSlice';
import { systemMessages } from '../../utils/utils';
import type { Post } from '../../models';
import styles from './PostsForm.module.css';

const validationSchema = Yup.object({
    title: Yup.string().required('Required').max(255, systemMessages.MAX_LENGTH),
    body: Yup.string().required('Required').max(255, systemMessages.MAX_LENGTH),
});

const PostsForm = ({ initialData, handleDelete }: { initialData: Post, handleDelete: (id: number) => void }) => {
    const [originalData, setOriginalData] = useState(initialData);
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        setOriginalData(initialData);
        setEditMode(true);
    }

    const handleSubmit = (values: Post) => {
        dispatch(updatePost(values));
        setEditMode(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        handleDelete(initialData.id);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {
                isModalOpen ? <Modal open
                    title="Confirm removal?"
                    closable={true}
                    onOk={handleOk}
                    onCancel={handleCancel}
                ></Modal> : null
            }

            <div className={styles.card}>
                {!editMode ? <>
                    <Card title={initialData.title}>
                        <p>{initialData.body}</p>
                        <div className={styles.buttonRow}>
                            <Button onClick={handleEdit}>Edit</Button>
                            <Button onClick={showModal}>Delete</Button>
                        </div>
                    </Card>
                </> : <Formik Formik
                    initialValues={originalData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ resetForm }) => (
                        <Form className={styles.form}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor='title'>Title:</label>
                                <Field name="title" disabled={!editMode} />
                                <ErrorMessage name="title" component="div" className={styles.error} />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label htmlFor="name">Body:</label>
                                <Field name="body" as="textarea" disabled={!editMode} rows={4} className={styles.formField} />
                                <ErrorMessage name="body" component="div" className={styles.error} />
                            </div>

                            <div className={styles.buttonRow}>
                                {editMode ? (
                                    <>
                                        <Button htmlType='submit' type='primary'>Save</Button>
                                        <Button onClick={() => resetForm({ values: originalData })}>Revert</Button>
                                        <Button onClick={() => setEditMode(false)}>Cancel</Button>
                                    </>
                                ) : null}
                            </div>
                        </Form>
                    )}
                </Formik>}
            </div>
        </>
    );
};

export default PostsForm;
