const postBooking = async (req, res) => {
    try{
        const {roomForeignKey, startDate, endDate} = req.body;
    const customerForeignKey = req.verifiedToken.userId;

    if(!roomForeignKey || ! startDate || !endDate || !customerForeignKey){
        return res.sendStatus(400);
    }
    const connection = req.app.get("mysqlConnection");
    const postBookingQuery = "INSERT INTO bookings (customerFKID, roomFKID, start_date, end_date) VALUES (?, ?, ?, ?)";
    const postBookingValues = [customerForeignKey, roomForeignKey, startDate, endDate];

    connection.query(postBookingQuery, postBookingValues, async (error, results) => {
        if(error){
            if(error.errno && error.errno === 1062){
                return res.sendStatus(409);
            }
            console.log(error);
            return res.sendStatus(500);
        } 
        res.json(results).status(200);
    });
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
    
};

module.exports = {
    postBooking
}