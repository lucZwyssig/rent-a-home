const getRooms = async (req, res) => {
    const connection = req.app.get("mysqlConnection");
    const getRoomsQuery = "SELECT rooms.roomId, rooms.name, rooms.description, bookings.bookingId, bookings.start_date, bookings.end_date FROM  rooms LEFT JOIN bookings ON rooms.roomId = bookings.roomFKID;";
    connection.query(getRoomsQuery, (error, results) => {
        if(error){
            console.log("error executing error", error);
            res.sendStatus(500);
        } else {
            res.json(results);
        };
    });
};

module.exports = {
    getRooms
}