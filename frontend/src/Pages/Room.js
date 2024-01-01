import { Container, Row } from "react-bootstrap";
import Calender from "../Components/Calender";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Room(){
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
    return(
        <Container fluid>
            <Row>
                <Calender room={room} backendURL={backendURL} roomForeignKey={roomName}/>
            </Row>
        </Container>
    );
}