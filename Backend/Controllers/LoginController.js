const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    const payload = { userId };
    return jwt.sign(payload, process.env.JWT);
};

const register = async (req, res) => {
    const connection = req.app.get("mysqlConnection");
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.sendStatus(400);
        }

        const checkUsernameQuery = "SELECT COUNT(*) as count FROM customers WHERE username = ?";
        const checkUsernameValues = [username];

        connection.query(checkUsernameQuery, checkUsernameValues, async (checkError, checkResults) => {
            if (checkError) {
                console.log(checkError);
                return res.sendStatus(500);
            }

            if (checkResults[0].count > 0) {
                return res.status(409).json({ "message": "username already exists" });
            }
            const hashedPassword = await argon2.hash(password);
            const insertQuery = "INSERT INTO customers (username, password) VALUES (?, ?)";
            const insertValues = [username, hashedPassword];

            connection.query(insertQuery, insertValues, (insertError, insertResults) => {
                if (insertError) {
                    console.log(insertError);
                    return res.sendStatus(500);
                }

                const userId = insertResults.insertId;
                const token = createToken(userId);
                res.json({token}).status(201);
            });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};


const login = async (req, res) => {
    const connection = req.app.get("mysqlConnection");
    const { username, password } = req.body;
    if (!username || !password) {
        return res.sendStatus(400);
    };
    const query = "SELECT password FROM customers WHERE username = ?";
    const values = [username];

    connection.query(query, values, async (error, results) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        };
        if (results.length === 0) {
            return res.sendStatus(401);
        };
        const storedPassword = results[0].password;
        const passwordMatch = await argon2.verify(storedPassword, password);

        if (!passwordMatch) {
            return res.sendStatus(401);
        };

        const userId = results[0].customerId;
        const token = createToken(userId);
        

        res.json({token}).status(200);
    });
}

const verify = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        try {
            const decodedToken = jwt.verify(bearerToken, process.env.JWT);
            req.verifiedToken = decodedToken;
            next();
        } catch (error) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
};


module.exports = {
    register,
    login,
    verify
}