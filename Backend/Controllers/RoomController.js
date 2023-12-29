const getRooms = async (req, res) => {
    const connection = req.app.get("mysqlConnection");

    const getRoomsQuery = "SELECT rooms.roomId, rooms.name, rooms.description, bookings.bookingId, CONVERT_TZ(bookings.start_date, '+00:00', '+00:00') as start_date, CONVERT_TZ(bookings.end_date, '+00:00', '+00:00') as end_date FROM rooms LEFT JOIN bookings ON rooms.roomId = bookings.roomFKID;";

    connection.query(getRoomsQuery, async (error, results) => {
        if (error) {
            console.log("Error executing query", error);
            res.sendStatus(500);
        } else {
            res.json(results);
        };
    });
};

module.exports = {
    getRooms
};
