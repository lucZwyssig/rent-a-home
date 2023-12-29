import { Container, Row } from "react-bootstrap";
import Calender from "../Components/Calender";
function Home(){
    return(
        <Container fluid>
            <Row>
                <Calender/>
            </Row>
        </Container>
    );
}; export default Home;