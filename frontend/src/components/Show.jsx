import React, { useEffect, useState } from 'react';
import { H1, Form, Button, Table, Col, Row } from 'react-bootstrap';
import config from 'config.js';
import './Show.css';
import Axios from 'axios';

const Show = () => {
    const [activities, setActivities] = useState({});
    const [entries, setEntries] = useState([]);
    const [chosenClass, setChosenClass] = useState({});
    const [chosenActivity, setChosenActivity] = useState({});


    const classes = ['Class #1', 'Class #2', 'Class #3',];

    useEffect(() => {
        getActivities();
        getEntries();
    }, [])

    const getActivities = () => {
        const url = config.serverHost + '/activities'
        console.log(url);
        Axios.get(url)
            .then(response => {
                setActivities(response.data)
            })
            .catch(error => {
                console.warn(error)
            })
    }

    const getEntries = () => {
        Axios.get(config.serverHost + '/entries')
            .then(response => {
                setEntries(response.data)
            })
            .catch(error => {
                console.warn(error)
            })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const data = {
            'class': chosenClass,
            'activity_id': chosenActivity,
        }
        const url = config.serverHost + '/entries'
        Axios.post(url, data)
            .then(response => {
                getEntries();
            })
            .catch(error => {
                console.warn(error)
            })
    }

    const approve = (id) => {
        const data = {
            'entry_id': id,
        }
        const url = config.serverHost + '/entries/approve'
        Axios.post(url, data)
            .then(response => {
                getEntries();
            })
            .catch(error => {
                console.warn(error)
            })
    }

    return (
        <>
            <H1 className="text-center pb-3">Make the Earth green again!</H1>
            <Form onSubmit={formSubmit}>
                <Row >
                    <Col className="pb-3" md={5}>
                        <Form.Select value={chosenClass} onChange={(e) => setChosenClass(e.target.value)}>
                            {classes.map((cl, i) => <option key={i} value={cl}>{cl}</option>)}
                        </Form.Select>
                    </Col>

                    <Col className="pb-3" md={5}>
                        <Form.Select value={chosenActivity} onChange={(e) => setChosenActivity(e.target.value)}>
                            {Object.entries(activities).map(([key, activity]) => <option key={key} value={activity.id}>{activity.name}</option>)}
                        </Form.Select>
                    </Col>
                    <Col className="pb-3" md={2}>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
            <EntriesTable data={entries} approveEntry={approve} />
            <div className="text-center">by zschopper</div>
        </>

    )
}

const EntriesTable = (props) => {
    const [sortCol, setSortCol] = useState('')
    const [sortDir, setSortDir] = useState('asc')
    const [filter, setFilter] = useState('');

    const addSort = (col) => {
        if (sortCol === col) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
        } else {
            setSortCol(col)
            setSortDir('asc')
        }
    }

    const compareEntries = (a, b) => {
        switch (sortCol) {
            case 'id': return (a.id - b.id) * (sortDir === 'asc' ? 1 : -1);
            case 'activity': return a.activity.name.localeCompare(b.activity.name) * (sortDir === 'asc' ? 1 : -1);
            case 'class': return a.class.localeCompare(b.class) * (sortDir === 'asc' ? 1 : -1);
            case 'points': return (a.activity.points - b.activity.points) * (sortDir === 'asc' ? 1 : -1);
            case 'status': return a.status.localeCompare(b.status) * (sortDir === 'asc' ? 1 : -1);
            default:
                return 1;
        }
    }

    const filterEntries = (e) => {
        return e.activity.name.includes(filter);
    }

    console.log(sortCol, sortDir)

    return (
        props.data.length === 0 ? <div className="lead text-center text-lg"><strong>There is no data</strong>, <span className="text-muted">why don't you add some?</span></div> : <>
            <div className="filter">Search: <input className="form-control" type="text" value={filter} onChange={(e) => setFilter(e.target.value)} /></div>
            <Table striped>
                <thead><tr>
                    <th className={sortCol === 'id' ? `sort-${sortDir}` : ''} onClick={() => addSort('id')}>Id</th>
                    <th className={sortCol === 'activity' ? `sort-${sortDir}` : ''} onClick={() => addSort('activity')}>Activity</th>
                    <th className={sortCol === 'class' ? `sort-${sortDir}` : ''} onClick={() => addSort('class')}>Class</th>
                    <th className={sortCol === 'points' ? `sort-${sortDir}` : ''} onClick={() => addSort('points')}>Points</th>
                    <th className={sortCol === 'status' ? `sort-${sortDir}` : ''} onClick={() => addSort('status')}>Status</th>
                    <th>Actions</th>
                </tr></thead>
                <tbody>
                    {props.data.filter(item => filterEntries(item)).sort((a, b) => compareEntries(a, b)).map((entry, i) => (
                        <tr key={i}>
                            <td>{entry.id}</td>
                            <td>{entry.activity.name}</td>
                            <td>{entry.class}</td>
                            <td>{entry.activity.points}</td>
                            <td>{entry.status}</td>
                            <td>{entry.status === 'unapproved' && <Button onClick={() => props.approveEntry(entry.id)}>Approve</Button>}</td>
                        </tr>
                    ))}
                    <tr></tr>
                </tbody>
            </Table></>
    )
}

export default Show;