import { Container, Row } from "react-bootstrap";
import Calender from "../Components/Calender";
export default function Room(){
    return(
        <Container fluid>
            <Row>
                <Calender/>
            </Row>
        </Container>
    )
}