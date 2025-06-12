import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchTodos, selectTodos, toggleTodo } from "../../store/reducers/todosSlice";
import type { RadioChangeEvent } from "antd/es/radio";
import Radio from "antd/es/radio";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Checkbox from "antd/es/checkbox";
import styles from './Todos.module.css';
import Table, { type ColumnType } from "antd/es/table";

type DataType = {
    key: React.Key;
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

const Todos = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectTodos);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [filter, setFilter] = useState(1);
    const [input, setInput] = useState('');

    const columns: ColumnType<DataType>[] = [
        {
            title: 'UserID',
            dataIndex: 'userId',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: DataType, b: DataType) => a.userId - b.userId,
            width: '20%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: DataType, b: DataType) => {
                const nameA = a.title.toLocaleLowerCase();
                const nameB = b.title.toLocaleLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            },
            onFilter: (value: string, record: { title: string }) => record.title.startsWith(value as string),
            width: '60%',
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: DataType, b: DataType) => {
                const nameA = a.completed;
                const nameB = b.completed;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            },
            filters: [
                {
                    text: 'Completed',
                    value: true,
                },
                {
                    text: 'Not completed',
                    value: false,
                },
            ],
            onFilter: (value: boolean, record: DataType) => record.completed === value,
            filterSearch: true,
            width: '20%',
            render: (value: boolean, record: DataType) =>
                <Checkbox checked={value} onClick={() => {
                    dispatch(toggleTodo({ id: record.id, completed: !record.completed }));
                }} />

        },
    ];

    const mapItemsToColData = useCallback((): DataType[] => {
        return todos.map(item => {
            return {
                key: item.id,
                id: item.id,
                userId: item.userId,
                title: item.title,
                completed: item.completed
            }
        })
    }, [todos])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleFilterChange = (e: RadioChangeEvent) => {
        setFilter(e.target.value);
    }

    const handleSearch = () => {
        switch (filter) {
            case 1: {
                setDataSource(() => dataSource.filter(item => String(item.userId) === input))
                return;
            }
            case 2: {
                setDataSource(() => dataSource.filter(item => item.title.includes(input)))
                return;
            }
        }
    }

    const handleReset = () => {
        setInput('');
        setDataSource(mapItemsToColData());
    }

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])

    useEffect(() => {
        const data = mapItemsToColData();
        setDataSource(data);
    }, [todos, mapItemsToColData])

    return (<>
        <Space style={{ marginBottom: '2rem' }}>
            <Input value={input} placeholder="Filter by" className={styles.todosSearchField} onChange={handleInputChange} onKeyUp={(e) => {
                if (e.key === 'Enter') handleSearch();
            }} />
            <Radio.Group
                value={filter}
                onChange={handleFilterChange}
                options={[
                    { value: 1, label: 'userId' },
                    { value: 2, label: 'title' },
                ]}
            />
            <button type="button" className="button" onClick={handleSearch}>Search</button>
            <button type="button" className="button" onClick={handleReset}>Reset</button>
        </Space>
        <Table columns={columns} dataSource={dataSource} />
    </>)
}

export default Todos;