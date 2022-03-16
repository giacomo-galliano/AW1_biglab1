import { ListGroup, Form, Col } from 'react-bootstrap';
import { iconEdit, iconDelete, iconPrivate } from './icons'
import { Link, useLocation } from 'react-router-dom';

function RowControls(props) {
    const location = useLocation();

    return <>
        <Link to={{
            pathname: location.pathname + "/update",
            state: { prevFilter: props.prevFilter, show: true, id: props.id, description: props.description, important: props.important, private: props.private, date: props.date }
        }}>{iconEdit}
        </Link>
        {" "}
        <span className="space-between-icons" onClick={() => { props.deleteActivity(props.id) }}>{iconDelete}
        </span>

    </>
}

function PrintLine(props) {
    return <>
        {props.db.map(listItem => (
            <ListGroup.Item key={listItem.id} className="d-flex w-100 justify-content-between">
                <Col md={4}>
                    <Form.Check label={listItem.description} id={"check-t" + listItem.id} className={listItem.important ? 'important' : ''} />
                </Col>
                <Col md={2} align="center">
                    {listItem.private ? iconPrivate : ''}
                </Col>
                <Col md={4} align="center">
                    <small>{listItem.date ? listItem.date : ''}</small>
                </Col>
                <Col md={2}>
                    <RowControls description={listItem.description} important={listItem.important} id={listItem.id}
                        private={listItem.private} date={listItem.date ? listItem.date.toString() : ''}
                        deleteActivity={props.deleteActivity} prevFilter={props.prevFilter} />
                </Col>
            </ListGroup.Item>
        ))}
    </>
}

export { PrintLine };
