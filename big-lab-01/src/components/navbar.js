import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';

//import { MySidebar } from "./sidebar";
//import { useLocation } from 'react-router-dom';

function MyNavbar(props) {


  return (
    <>
      <Navbar bg="success" variant="dark" expand="sm" >

        <Navbar.Toggle
          onClick={() => props.setOpen(!props.open)}
          aria-controls="left-sidebar"
          aria-expanded={props.open}
        ></Navbar.Toggle>

        <Navbar.Brand>
          <img
            alt=""
            src="/media/double_check.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          ToDo Manager</Navbar.Brand>

        <Form inline className="mx-auto d-none d-sm-block">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>

        <Nav className="ml-md-auto">
          <Nav.Item>
            <Nav.Link href="#">
              <img
                alt=""
                src="/media/profile_img.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}

export default MyNavbar;