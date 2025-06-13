import type { User } from '../../models';
import styles from './UserProfile.module.css';
import type { PropsWithChildren } from 'react';

const UserProfileView = ({ user, children }: PropsWithChildren<{ user: User }>) => {
    return (
        <>
            <div>
                <h2 className={styles.name}>{user.name}</h2>
                <p className={styles.username}>@{user.username}</p>
            </div>
            <div className={styles.description}>
                <section className={styles.section}>
                    <h3>Contact Info</h3>
                    <p>Email: <a href={`mailto:${user.email}`} title={user.email}>{user.email}</a></p>
                    <p>Phone: <span>{user.phone}</span></p>
                    <p>Website: <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
                </section>
                <section className={styles.section}>
                    <h3>Address</h3>
                    <p>{user.address.suite}, {user.address.street}</p>
                    <p>{user.address.city}, {user.address.zipcode}</p>
                    <p>Geo: <span>{user.address.geo.lat}, {user.address.geo.lng}</span></p>
                </section>
                <section className={styles.section}>
                    <h3>Company</h3>
                    <p><strong>{user.company.name}</strong></p>
                    <p data-testid="catchPhrase">{user.company.catchPhrase}</p>
                    <p data-testid="companyBs">{user.company.bs}</p>
                </section>
            </div>
            {children}
        </>
    )
}

export default UserProfileView;