const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// const { url } = require("inspector");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const LastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: LastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/Lists/5f035e7d9c";

    const options = {
        method: "POST",
        auth: "jagruti05:ae3106e4bf97c9f1aca223f70dfd3173f-us21"
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html")
            }
            else{
                res.sendFile(__dirname + "/failure.html")
            }
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(req, res){
    console.log('Server is running on port 3000');
})


// API Key: e3106e4bf97c9f1aca223f70dfd3173f-us21
//audience id: 5f035e7d9c