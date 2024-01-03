const getRoomsBookings = async (req, res) => {
    const connection = req.app.get("mysqlConnection");

    const getRoomsQuery = "SELECT rooms.roomId, rooms.name, rooms.description, bookings.bookingId, CONVERT_TZ(bookings.start_date, '+00:00', '+00:00') as start_date, CONVERT_TZ(bookings.end_date, '+00:00', '+00:00') as end_date FROM rooms LEFT JOIN bookings ON rooms.roomId = bookings.roomFKID;";

    connection.query(getRoomsQuery, async (error, results) => {
        if (error) {
            console.log("error with query", error);
            res.sendStatus(500);
        } else {
            res.json(results);
        };
    });
};

const getRooms = async (req, res) => {
    const connection = req.app.get("mysqlConnection");
    const getRoomsQuery = "SELECT * FROM rooms";

    connection.query(getRoomsQuery, async (error, results) => {
        if(error){
            console.log("error with query", error);
            res.sendStatus(500);
        } else{
            res.json(results);
        }
    })
}

const getSingleRoom = async (req, res) => {
    const roomId = req.params.id;
    if(!roomId){
        return res.sendStatus(403);
    };

    const connection = req.app.get("mysqlConnection");
    const getSingleRoomQuery = "SELECT rooms.roomId, rooms.name, rooms.description, rooms.price, bookings.bookingId, CONVERT_TZ(bookings.start_date, '+00:00', '+00:00') as start_date, CONVERT_TZ(bookings.end_date, '+00:00', '+00:00') as end_date FROM rooms LEFT JOIN bookings ON rooms.roomId = bookings.roomFKID WHERE rooms.roomId = ?;";
    connection.query(getSingleRoomQuery, roomId, async (error, results) => {
        if(error){
            console.log("error with query", error);
            res.sendStatus(500);
        } else {
            res.json(results);
        };
    });
};

module.exports = {
    getRooms,
    getRoomsBookings,
    getSingleRoom
};
