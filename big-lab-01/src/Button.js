import { useState } from "react";
import { Button } from "react-bootstrap";

function MyButton(props) {
      let [buttonLang, setButtonLang] = useState(props.lang);
      return <Button variant='primary' onClick={() => setButtonLang('en')}>Ciao!</Button>

}

export default MyButton;