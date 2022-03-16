import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import dayjs from 'dayjs';

function ActivityForm(props) {

    const location = useLocation();

    const [description, setDescription] = useState(location.state.description);
    const [important, setImportant] = useState(location.state.important);
    const [privateS, setPrivate] = useState(location.state.private);
    const [date, setDate] = useState(dayjs(location.state.date).isValid() ? dayjs(location.state.date).format('YYYY-MM-DD') : '');   ///dayjs(location.state.date).format('YYYY-MM-DD')
    const [error, setError] = useState('');


    const [submitted, setSubmitted] = useState(false);

    const updateActivity = (activity) => {
        props.setActivities(oldActivities => {
            return oldActivities.map(a => {
                if (a.id === activity.id) {
                    console.log(props.actID);
                    return { id: activity.id, description: activity.description, important: activity.important, private: activity.private, date: activity.date };
                } else
                    return a;
            });
        });
    }

    const addActivity = (data) => {
        props.setActivities(oldData => [...oldData, data]);
    }

    const [show, setShow] = useState(location.state.show);
    const handleClose = () => setShow(false)

    const [validated, setValidated] = useState(false);

    var act;

    const handleSumbit = (event) => {

        if (event.currentTarget.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }

        if (event.currentTarget.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(false);

            if (props.action === "add") {
                props.setActID(props.actID + 1);

                act = { id: props.actID, description: description, important: important, private: privateS, date: date };
                addActivity(act);
            } else {
                act = { id: location.state.id, description: description, important: important, private: privateS, date: date };
                updateActivity(act);
            }
            setSubmitted(true);
            handleClose();
        }
    }

    return (
        <> {submitted ? <Redirect to={`/list/${location.state.prevFilter}`} /> :
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.action === 'add' ? 'Add a new task' : 'Update task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert> : false}
                    <Form noValidate validated={validated} onSubmit={handleSumbit} >
                        <Form.Group controlId='Description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control required type="text" placeholder="Task description.." value={description} onChange={ev => setDescription(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a description.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='selectedPrivate'>
                            <Form.Check type="switch" label="Private" defaultChecked={privateS} onChange={() => setPrivate(!privateS)}>
                            </Form.Check>
                        </Form.Group>

                        <Form.Group controlId='selectedImportant'>
                            <Form.Check type="switch" label="Important" defaultChecked={important} onChange={() => setImportant(!important)}>
                            </Form.Check>
                        </Form.Group>

                        <Form.Group controlId='selectedDate'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type='date' value={date} onChange={ev => dayjs(ev.target.value).isValid() ? setDate(dayjs(ev.target.value).format('YYYY-MM-DD')) : setDate('')} />
                        </Form.Group>

                        <Modal.Footer>
                            <Link to={`/list/${location.state.prevFilter}`}>
                                <Button variant="secondary">Close</Button>
                            </Link>
                            <Button variant="success" type="submit">{props.action === 'add' ? 'Add task' : 'Update    task'}</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        }
        </>
    )
}

export default ActivityForm;