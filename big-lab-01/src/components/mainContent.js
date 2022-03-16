import { ListGroup, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { database } from "./database";
import { PrintLine } from "./printLine";
import { MySidebar, FilterTitle } from "./sidebar";
import ActivityForm from "./activityForm";
import dayjs from 'dayjs';
import '../App.css';


function ListLine(props) {
    switch (props.filterState) {
        case "all":
            return (<PrintLine db={props.db} deleteActivity={props.deleteActivity} prevFilter={props.filterState} />);

        case "important":
            return (<PrintLine db={props.db.filter((line) => line.important === true)} deleteActivity={props.deleteActivity} prevFilter={props.filterState} />);

        case "private":
            return (<PrintLine db={props.db.filter((line) => line.private === true)} deleteActivity={props.deleteActivity} prevFilter={props.filterState} />);

        case "today":
            return (<PrintLine db={props.db.filter((line) => line.date && line.date === dayjs().format("YYYY-MM-DD"))} deleteActivity={props.deleteActivity} prevFilter={props.filterState} />);

        case "next7days":
            return (<PrintLine db={props.db.filter((line) => line.date && dayjs(line.date).isBefore(dayjs().add(7, 'day')) && dayjs(line.date).isAfter(dayjs()))} deleteActivity={props.deleteActivity} prevFilter={props.filterState} />);

        default:
            return (<PrintLine db={props.db} deleteActivity={props.deleteActivity}></PrintLine>);
    }
}


function CheckActivity(props) {
    const location = useLocation();

    if (location.state !== undefined && props.action !== undefined) {

        return (
            <ActivityForm action={props.action} setActivities={props.setActivities} setActID={props.setActID} actID={props.actID} />);

    } else {
        return "";
    }
}

function MyMain(props) {

    const [activities, setActivities] = useState([...database]);

    const deleteActivity = (id) => {
        setActivities((act) => act.filter(at => at.id !== id))
    }

    const [actID, setActID] = useState(activities.length + 1);

    return (
        <>
            <MySidebar act={props.filterState} open={props.open} />
            <main className="col-sm-8 col-12 below-nav">
                <FilterTitle title={props.filterState} />
                <ListGroup variant="flush">
                    <ListLine db={activities} filterState={props.filterState} deleteActivity={deleteActivity} />
                </ListGroup>
            </main>

            <Link to={{
                pathname: `/list/${props.filterState}/add`,
                state: { prevFilter: props.filterState, show: true, id: actID, description: '', important: false, private: false, date: dayjs() },
            }}>
                <Button variant="success" className="fixed-right-bottom">+</Button>
            </Link>

            <CheckActivity action={props.action} setActivities={setActivities} setActID={setActID} actID={actID} />
        </>
    );
}

export { MyMain };