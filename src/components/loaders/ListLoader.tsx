import type { Properties } from "csstype";
import Skeleton from "antd/es/skeleton";
import styles from './ListLoader.module.css';

type ListLoaderProps = {
    length?: number;
    customStyles?: Properties<string | number, string & {}>;
}

const ListLoader = ({ length = 1, customStyles = {} }: ListLoaderProps) => {
    const array = new Array(length);
    return (
        <>{array.fill(0).map((_, idx: number) =>
            <div key={idx} className={styles.container} style={customStyles}>
                <Skeleton active />
            </div>
        )}</>
    )
}

export default ListLoader;