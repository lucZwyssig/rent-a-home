import { Container, Row, Col } from "react-bootstrap";
import Header from "../Components/Header";
import "../Css/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
function Home(){
    //colors: #49A39A
    //link for colors: https://mycolor.space/?hex=%23B6C6C5&sub=1
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

            <Row className="Background">
                <Col className="BackgroundLeft col-12 col-sm-7">
                </Col>
                <Col className="BackgroundRight col-12 col-sm-5">
                    <h3>
                        Luxury, in Dübendorf
                    </h3>
                    <p>Stay at the Rent-a-Home location in Dübendorf and enjoy our three top of the line, luxurious rooms that offer quick and easy access
                        to several of Switzerlands most renoun hiking trai
                    </p>
                </Col>
            </Row>
            <Row className="Rooms">
                <div className="RoomsHeader">
                <h1>
                    Our rooms
                </h1>
                </div>
                
                {rooms.map((room, index) => {
                    return(
                        <Col key={index} className="col-12 col-sm-6 RoomCol">
                            <div className="RoomDiv">
                            <div>
                                <h2>
                                    {room.name}
                                </h2>
                                <p>{room.description}</p>
                                <a href={`/room/${room.roomId}`}>To Room</a>
                            </div>
                            <img src={require(`../Images/${room.image}`)}></img>
                            </div>
                            
                        </Col>
                        
                    );
                })}
            </Row>
            <Row>
                Footer
            </Row>
        </Container>
    );
}; export default Home;