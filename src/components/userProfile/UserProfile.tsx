import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './UserProfile.module.css';
import type { User } from '../../models';
import { updateUser } from '../../store/reducers/usersSlice';
import { useAppDispatch } from '../../hooks';

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.object({
        street: Yup.string().required('Street is required'),
        suite: Yup.string().required('Suite is required'),
        city: Yup.string().required('City is required'),
        zipcode: Yup.string(),
        geo: Yup.object({
            lat: Yup.string(),
            lng: Yup.string(),
        }),
    }),
    phone: Yup.string(),
    website: Yup.string(),
    company: Yup.object({
        name: Yup.string(),
        catchPhrase: Yup.string(),
        bs: Yup.string(),
    }),
});

const UserProfile = ({ user }: { user: User }) => {
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
                    <h2 className={styles.name}>{user.name}</h2>
                    <p className={styles.username}>@{user.username}</p>

                    <div className={styles.section}>
                        <h3>Contact Info</h3>
                        <p>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
                        <p>Phone: {user.phone}</p>
                        <p>Website: <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
                    </div>

                    <div className={styles.section}>
                        <h3>Address</h3>
                        <p>{user.address.suite}, {user.address.street}</p>
                        <p>{user.address.city}, {user.address.zipcode}</p>
                        <p>Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
                    </div>

                    <div className={styles.section}>
                        <h3>Company</h3>
                        <p><strong>{user.company.name}</strong></p>
                        <p>{user.company.catchPhrase}</p>
                        <p>{user.company.bs}</p>
                    </div>

                    <button onClick={handleEdit} className={styles.button}>
                        Edit Profile
                    </button>
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

                            <label htmlFor='website'>Website</label>
                            <Field name="website" />

                            <h3>Address</h3>
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

                            <h3>Company</h3>
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
