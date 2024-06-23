const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const bcrypt = require('bcrypt');
const nodemail=require("nodemailer")

const app=express();
app.use(express.json());
app.use(cors());
// app.use(express.static(process.env.STATIC_DIR))
const db=mysql.createConnection(
    {
        user:'ubbkdelw2hweqro6',
        host:'bhm17czq9qjsghpp7jsh-mysql.services.clever-cloud.com',
        password:'5QYwV4D2dg7a8oPbrhq2',
        database:'bhm17czq9qjsghpp7jsh',
    }
)

db.connect((err)=>{
    if(!err){
        console.log("Connected to database!");
    }else{
        console.log("Not Connected to database!");
    }
})




app.post("/payment-mail",(req,res)=>{
    const UserName =req.body.UserName
    const userMail = req.body.Email
    const HotelName =req.body.HotelName
    const Amount=req.body.totalAmount
    try{
        const transporter=nodemail.createTransport({
            service:'gmail',
            auth:{
                user:"ahmeddastagir4@gmail.com",
                pass:"xzdp bzgc fyfe ntqb"
            }
        })
        
        const mailOptions = {
            from: 'ahmeddastagir4@gmail.com',
            // to: `${userMail}`,
            to:'dastagir2k@gmail.com',
            subject: `Successfully booked Table in ${HotelName}`,
            text: `Name : ${UserName}
                   Total Amount Paid : ${Amount}
                   Thank You for booking`
          };
        
        
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email senttt: ' + info.response);
            }
          });
    }catch(err){
        res.status(500).send("error email in server")
    }
})
  
app.post("/signup", async (req, res) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    let Password = req.body.Password; // Change const to let
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      Password = hashedPassword;
  
      // Check if email already exists in the database
      db.query("SELECT * FROM Users WHERE Email = ?", [Email], (err, result) => {
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
        db.query(
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
      db.query('SELECT * FROM Users WHERE Email = ?', [Email], async (err, result) => {
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
        //   console.log(user.UserId);
          const match = await bcrypt.compare(Password, user.Password);
          if (match) {
              console.log("User logged in");
              res.status(200).json({ 
                  role: 'admin',
                  user: {
                      UserId:user.UserId,
                      FirstName: user.FirstName,
                      LastName: user.LastName,
                      Email: user.Email
                      // Add any other user details you want to pass
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


app.post('/add-hotel',(req,res)=>{
    const Name=req.body.Name;
    const Location=req.body.Location;
    const Rating=req.body.Rating;
    const Accomodation=req.body.Accomodation;
    const OpenTime=req.body.OpenTime;
    const CloseTime=req.body.CloseTime;
    const Category=req.body.category;
    const ImageUrl=req.body.ImageUrl;
    db.query(
        "insert into hotel(Name,Location,Rating,Accomodation,OpenTime,CloseTime,category,ImageUrl) values(?,?,?,?,?,?,?,?)",
        [Name,Location,Rating,Accomodation,OpenTime,CloseTime,Category,ImageUrl],
        (err,result)=>{
            if(err){
                console.log("Error while inserting data",err);
                res.status(500).send("error inserting")
            }else{
                console.log("Successfully inserted Data");
                res.status(200).send("Success inserted")
            }
        }
    )
})


app.post("/add-hotelOrder",(req,res)=>{
    const userid=req.body.UserId;
    const hotelname=req.body.hotelname;
    const totalperson=req.body.totalPerson;
    const totalamount=req.body.totalAmount;
    db.query("insert into UserBookings(user_id,hotelname,totalperson,amount) values(?,?,?,?)",[userid,hotelname,totalperson,totalamount],(err,result)=>{
        if(err){
            res.status(500).send("Error while inserting userbooking order");
        }else{
            res.status(200).send("Suscess inserted userbooking data");
            console.log("Suscess inserted userbooking data");
        }
    })
})

app.get("/userOrder",(req,res)=>{
    db.query("select * from UserBookings",(err,result)=>{
        if(err){
            console.log("error while displaying");
            res.status(500).send("error while display")
        }else{
            res.json(result);
        }
    })
})

app.get("/UserOrders", (req, res) => {
    const id = req.query.userId;
    db.query("select * from UserBookings where user_id=?", [id], (err, result) => {
        if (err) {
            console.log("Error while finding id", err);
            res.status(500).send("Error while finding id", err);
            return;
        }
        res.json(result);
    });
});


app.get('/hotels',(req,res)=>{
    db.query("select * from hotel",(err,result)=>{
        if(err){
            console.log("error while displaying");
            res.status(500).send("error while display")
        }else{
            res.json(result);
        }
    })
})


app.get("/hotels/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query("select * from hotel where HotelId=?",id,(err,result)=>{
        if(err){
            console.log("error while finding id",err);
            res.status(500).send("error while finding id",err)
            return;
        }
       
          return res.json(result)
    })
  });

app.listen(3030,()=>{
    console.log("server is runing");
})
