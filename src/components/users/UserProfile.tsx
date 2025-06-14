import { useState, type PropsWithChildren } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './UserProfile.module.css';
import type { User } from '../../models';
import { updateUser } from '../../store/reducers/usersSlice';
import { useAppDispatch } from '../../hooks/hooks';
import Button from 'antd/es/button';
import { Col, Row } from 'antd/es/grid';
import Divider from 'antd/es/divider';
import { systemMessages } from '../../utils/utils';
import UserProfileView from './UserProfileView';

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').max(100, systemMessages.MAX_LENGTH),
    email: Yup.string().email('Invalid email').required('Email is required').max(100, systemMessages.MAX_LENGTH),
    address: Yup.object({
        street: Yup.string().required('Street is required').max(100, systemMessages.MAX_LENGTH),
        suite: Yup.string().required('Suite is required').max(100, systemMessages.MAX_LENGTH),
        city: Yup.string().required('City is required').max(100, systemMessages.MAX_LENGTH),
        zipcode: Yup.string().max(100),
        geo: Yup.object({
            lat: Yup.string().max(100),
            lng: Yup.string().max(100),
        }),
    }),
    phone: Yup.string().max(30, systemMessages.MAX_LENGTH),
    website: Yup.string().max(100),
    company: Yup.object({
        name: Yup.string().max(100),
        catchPhrase: Yup.string().max(100),
        bs: Yup.string().max(100),
    }),
});

const UserProfile = ({ user, children }: PropsWithChildren<{ user: User }>) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [userDataSnapshot, setUserDataSnapshot] = useState(user);

    const handleSubmit = (values: User) => {
        setIsEditing(false);
        dispatch(updateUser(values));
    };

    const handleEdit = () => {
        setUserDataSnapshot(user);
        setIsEditing(true);
    }

    return (
        <div className={styles.card}>
            {!isEditing ? (
                <>
                    <UserProfileView user={user}>
                        <Row justify="end" align="middle" gutter={{ xs: 4 }} className={styles.section}>
                            <Col span={5}>
                                <Button type='primary' onClick={handleEdit}>
                                    Edit Profile
                                </Button>
                            </Col>
                            {children}
                        </Row>
                    </UserProfileView>
                </>
            ) : (
                <Formik
                    initialValues={user}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ resetForm }) => (
                        <Form className={styles.form}>
                            <h2>Edit Profile</h2>

                            <label htmlFor='name'>Name</label>
                            <Field name="name" />
                            <label htmlFor='username'>Username</label>
                            <Field name="username" />
                            <ErrorMessage name="username" component="div" className={styles.error} />

                            <label htmlFor='email'>Email</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="div" className={styles.error} />

                            <label htmlFor='phone'>Phone</label>
                            <Field name="phone" />
                            <ErrorMessage name="phone" component="div" className={styles.error} />

                            <label htmlFor='website'>Website</label>
                            <Field name="website" />
                            <ErrorMessage name="website" component="div" className={styles.error} />

                            <Divider orientation="left">Address</Divider>
                            <label htmlFor='address.street'>Street</label>
                            <Field name="address.street" />
                            <ErrorMessage name="address.street" component="div" className={styles.error} />

                            <label htmlFor='address.suite'>Suite</label>
                            <Field name="address.suite" />
                            <ErrorMessage name="address.suite" component="div" className={styles.error} />

                            <label htmlFor='address.city'>City</label>
                            <Field name="address.city" />
                            <ErrorMessage name="address.city" component="div" className={styles.error} />

                            <label htmlFor='address.zipcode'>Zipcode</label>
                            <Field name="address.zipcode" />

                            <label htmlFor='address.geo.lat'>Geo Latitude</label>
                            <Field name="address.geo.lat" />
                            <label htmlFor='address.geo.lng'>Geo Longitude</label>
                            <Field name="address.geo.lng" />

                            <Divider orientation="left">Company</Divider>
                            <label htmlFor='company.name'>Company Name</label>
                            <Field name="company.name" />

                            <label htmlFor='company.catchPhrase'>Catch Phrase</label>
                            <Field name="company.catchPhrase" />

                            <label htmlFor='company.bs'>Business Slogan</label>
                            <Field name="company.bs" />

                            <div className={styles.actions}>
                                <button type="submit" className={styles.button}>Save</button>
                                <button type="button" onClick={() => resetForm({ values: userDataSnapshot })} className={styles.button}>Revert</button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className={styles.cancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default UserProfile;
