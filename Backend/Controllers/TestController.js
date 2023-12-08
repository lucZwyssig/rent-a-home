const test = (req, res) => {
    const connection = req.app.get("mysqlConnection");
    const query = "SELECT * FROM customers";

    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error executing the query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("Query results:", results);
            res.json(results);
        };
    });
};

module.exports = {
    test
};