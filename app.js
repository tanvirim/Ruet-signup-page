const express = require('express')
const bodyParser = require('body-parser')
const request = require("request")
const https = require("https")
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"))


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
  })






app.post('/', (req, res) => {
    
  const fName = req.body.firstname ;
  const lName = req.body.lastname ;
  const email = req.body.email ;
  
  const data ={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME:lName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data) ;

  const url = 'https://us9.api.mailchimp.com/3.0/lists/4881d9802' ;
  
  const option ={
    method:"POST",
    auth: "tanvirmitul:a0aeb2d1534644a6929ad26334ece244-us9"
  }

  const request = https.request(url,option,(response)=>{
    response.on("data", (data)=>{
      console.log(JSON.parse(data));


      if(response.statusCode===200){
        res.sendFile(`${__dirname}/success.html`)
      }else{
        res.sendFile(`${__dirname}/failure.html`)
      }

    })

  })

  request.write(jsonData);
  request.end() ;


})


app.post("/failure.html",(req,res)=>{
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



//api keys
//a0aeb2d1534644a6929ad26334ece244-us9


//list id
//4881d9802d 