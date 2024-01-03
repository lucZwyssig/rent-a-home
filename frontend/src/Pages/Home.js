import { Container, Row, Col } from "react-bootstrap";
import Header from "../Components/Header";
import "../Css/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
function Home(){
    //colors: #49A39A
    const backendURL = "http://localhost:3001"
    const [rooms, setRooms] = useState([]);

    async function getRooms(){
        try{
            const response = await axios.get(`${backendURL}/api/rooms`);
            setRooms(response.data);
        } catch(error){
            console.log(error);
        };
    };

    useEffect(() => {
        getRooms();
    }, [])
    return(
        <Container fluid>
            <Header/>

            <Row className="HomepageBackground">
                <Col className="HomepageBackgroundLeft col-12 col-sm-7">
                </Col>
                <Col className="HomepageBackgroundRight col-12 col-sm-5">
                    wefhjrjif
                    wjui
                    wegjuijeiugjuerj
                    wejguierjuegijerigj 
                </Col>
            </Row>
            <Row className="HomepageRooms">
                <h1>
                    Our rooms
                </h1>
                {rooms.map((room, index) => {
                    return(
                        <div key={index}>
                            room
                        </div>
                    );
                })}
            </Row>
            <Row>
                Footer
            </Row>
        </Container>
    );
}; export default Home;