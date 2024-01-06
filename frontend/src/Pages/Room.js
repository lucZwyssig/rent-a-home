import { Col, Container, Row } from "react-bootstrap";
import Calender from "../Components/Calender";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import "../Css/Room.css";
import { TfiGallery } from "react-icons/tfi";

export default function Room() {
    const { roomName } = useParams();
    const [room, setRoom] = useState([]);
    const backendURL = "http://localhost:3001";
    async function getRoom() {
        try {
            const response = await axios.get(`${backendURL}/api/rooms/${roomName}`);
            setRoom(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRoom();
    }, [roomName])
    return (
        <Container fluid>
            <Header />
            <Row className="ImageRow">
                <Col className="ImageColLeft col-12 col-sm-7">
                    <img src={require("../Images/test.jpg")} alt=""></img>                    
                    <button className="Tfi" onClick={() => console.log("pressed")}>
                        <TfiGallery />
                    </button>
                </Col>
                <Col className="ImageColRight col-12 col-sm-5 d-none d-sm-flex">
                    <img src={require("../Images/test.jpg")} alt=""></img>
                    <img src={require("../Images/test.jpg")} alt=""></img>
                </Col>

            </Row>
            <Row>
                <Calender room={room} backendURL={backendURL} roomForeignKey={roomName} />
            </Row>
        </Container>
    );
}