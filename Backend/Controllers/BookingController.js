const postBooking = async (req, res) => {
    try {
        const { roomForeignKey, startDate, endDate } = req.body;
        const customerForeignKey = req.verifiedToken.userId;
        const connection = req.app.get("mysqlConnection");

        if (!roomForeignKey || !startDate || !endDate || !customerForeignKey || new Date(startDate) > new Date(endDate)) {
            return res.sendStatus(400);
        }

        

        const checkBookingQuery = "SELECT * FROM bookings WHERE roomFKID = ? AND ? < end_date AND ? > start_date"; 
        const checkBookingValues = [roomForeignKey, startDate, endDate];

        connection.query(checkBookingQuery, checkBookingValues, async (error, results) => {
            if (error) {
                console.log(error);
                return res.sendStatus(500);
            }

            if (results.length > 0) {
                return res.sendStatus(409);
            } else {
                
                const postBookingQuery = "INSERT INTO bookings (customerFKID, roomFKID, start_date, end_date) VALUES (?, ?, ?, ?)";
                const postBookingValues = [customerForeignKey, roomForeignKey, startDate, endDate];

                connection.query(postBookingQuery, postBookingValues, async (insertError, insertResults) => {
                    if (insertError) {
                        if (insertError.errno && insertError.errno === 1062) {
                            return res.sendStatus(409);
                        }
                        console.log(insertError);
                        return res.sendStatus(500);
                    }
                    res.json(insertResults).status(200);
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const getBookings = async (req, res) => {    
    const customerForeignKey = req.verifiedToken.userId;
    const connection = req.app.get("mysqlConnection");

    if(!customerForeignKey){
        return res.sendStatus(400);
    };

    const getBookingsQuery = "SELECT * FROM bookings where customerFKID = ?";
    const getBookingsValues = [customerForeignKey];
    connection.query(getBookingsQuery, getBookingsValues, async (error, results) => {
        if(error){
            console.log(error);
            return res.sendStatus(500);
        };
        res.json(results).status(200);
    });
};

module.exports = {
    postBooking,
    getBookings
};
