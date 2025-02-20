
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'bhm17czq9qjsghpp7jsh-mysql.services.clever-cloud.com',
    user: 'ubbkdelw2hweqro6',
    password: '5QYwV4D2dg7a8oPbrhq2',
    database: 'bhm17czq9qjsghpp7jsh'
});

app.post("/payment-mail", (req, res) => {
    const UserName = req.body.UserName;
    const userMail = req.body.Email;
    const HotelName = req.body.HotelName;
    const Amount = req.body.totalAmount;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ahmeddastagir4@gmail.com",
                pass: "xzdp bzgc fyfe ntqb"
            }
        });

        const mailOptions = {
            from: 'ahmeddastagir4@gmail.com',
            to: 'dastagir2k@gmail.com', // For testing purposes, replace with `${userMail}`
            subject: `Successfully booked Table in ${HotelName}`,
            text: `Name : ${UserName}
                   Total Amount Paid : ${Amount}
                   Thank You for booking`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        res.status(500).send("Error sending email in server");
    }
});

app.post("/signup", async (req, res) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    let Password = req.body.Password; // Change const to let
    try {
        const hashedPassword = await bcrypt.hash(Password, 10);
        Password = hashedPassword;

        // Check if email already exists in the database
        pool.query("SELECT * FROM Users WHERE Email = ?", [Email], (err, result) => {
            if (err) {
                console.log("Error while checking duplicate email:", err);
                res.status(500).send("Error while checking duplicate email");
                return;
            }

            if (result.length > 0) {
                console.log("Email already exists");
                res.status(400).send("Email already exists");
                return;
            }

            // Insert the user data into the database
            pool.query(
                "INSERT INTO Users(FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)",
                [FirstName, LastName, Email, Password],
                (err, result) => {
                    if (err) {
                        console.log("Error while inserting data", err);
                        res.status(500).send("Error inserting data");
                    } else {
                        console.log("Successfully inserted data");
                        res.status(200).send("Data inserted successfully");
                    }
                }
            );
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).send("Error hashing password");
    }
});

app.post('/login', async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;

    try {
        pool.query('SELECT * FROM Users WHERE Email = ?', [Email], async (err, result) => {
            if (err) {
                console.log("Error while retrieving user:", err);
                res.status(500).send("Error while retrieving user");
                return;
            }

            if (result.length === 0) {
                console.log("User not found");
                res.status(400).send("User not found");
                return;
            }

            const user = result[0];
            const match = await bcrypt.compare(Password, user.Password);
            if (match) {
                console.log("User logged in");
                res.status(200).json({
                    role: 'admin',
                    user: {
                        UserId: user.UserId,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        Email: user.Email
                    }
                });
            } else {
                console.log("Incorrect password");
                res.status(400).send("Incorrect password");
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login");
    }
});

app.post('/add-hotel', (req, res) => {
    const { Name, Location, Rating, Accomodation, OpenTime, CloseTime, Category, ImageUrl } = req.body;
    pool.query(
        "INSERT INTO hotel(Name, Location, Rating, Accomodation, OpenTime, CloseTime, category, ImageUrl) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
        [Name, Location, Rating, Accomodation, OpenTime, CloseTime, Category, ImageUrl],
        (err, result) => {
            if (err) {
                console.log("Error while inserting data", err);
                res.status(500).send("Error inserting data");
            } else {
                console.log("Successfully inserted data");
                res.status(200).send("Successfully inserted data");
            }
        }
    );
});

app.post("/add-hotelOrder", (req, res) => {
    const { UserId, hotelname, totalPerson, totalAmount } = req.body;
    pool.query(
        "INSERT INTO UserBookings(user_id, hotelname, totalperson, amount) VALUES(?, ?, ?, ?)",
        [UserId, hotelname, totalPerson, totalAmount],
        (err, result) => {
            if (err) {
                res.status(500).send("Error while inserting user booking order");
            } else {
                res.status(200).send("Successfully inserted user booking data");
                console.log("Successfully inserted user booking data");
            }
        }
    );
});

app.get("/userOrder", (req, res) => {
    pool.query("SELECT * FROM UserBookings", (err, result) => {
        if (err) {
            console.log("Error while displaying", err);
            res.status(500).send("Error while displaying");
        } else {
            res.json(result);
        }
    });
});

app.get("/UserOrders", (req, res) => {
    const id = req.query.userId;
    pool.query("SELECT * FROM UserBookings WHERE user_id=?", [id], (err, result) => {
        if (err) {
            console.log("Error while finding id", err);
            res.status(500).send("Error while finding id");
            return;
        }
        res.json(result);
    });
});

app.get('/hotels', (req, res) => {
    pool.query("SELECT * FROM hotel", (err, result) => {
        if (err) {
            console.log("Error while displaying", err);
            res.status(500).send("Error while displaying");
        } else {
            res.json(result);
        }
    });
});

app.get("/hotels/:id", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM hotel WHERE HotelId=?", [id], (err, result) => {
        if (err) {
            console.log("Error while finding id", err);
            res.status(500).send("Error while finding id");
            return;
        }
        res.json(result);
    });
});

app.listen(3030, () => {
    console.log("Server is runninggg on port 3030");
});
