import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';
import config from 'config.js';
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

    return (
        <>
            <h1 className="text-center pb-3">Make the Earth green again!</h1>
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
            <EntriesTable data={entries} />
            <div className="text-center">by zschopper</div>
        </>

    )
}

const EntriesTable = (props) => {
    return (
        props.data.length === 0 ? <div className="lead text-center text-lg"><strong>There is no data</strong>, <span className="text-muted">why don't you add some?</span></div> : <Table striped>
            <thead><tr>
                <th>Id</th>
                <th>Activity</th>
                <th>Class</th>
                <th>Points</th>
                <th>Status</th>
            </tr></thead>
            <tbody>
                {props.data.map((entry, i) => (
                    <tr>
                        <td>{entry.id}</td>
                        <td>{entry.activity.name}</td>
                        <td>{entry.class}</td>
                        <td>{entry.activity.points}</td>
                        <td>{entry.status}</td>
                    </tr>
                ))}
                <tr></tr>
            </tbody>
        </Table>
    )
}
export default Show;