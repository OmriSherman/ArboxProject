const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');
const membershipController = require('./controllers/membershipController.js');
const userController = require('./controllers/userController.js');
const membershipsBL = require('./models/membershipsBL');
const userBL = require('./models/usersBL');
const app = express();
require("./configs/database")
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json());
app.use('/memberships', membershipController);
app.use('/users', userController);
const excelToJson = require('convert-excel-to-json');
var last_id;

async function fetchData() {
let resp = await axios.get('http://localhost:8000/users')
let data = resp.data.length;
return data;
}
async function insertJimalaya() {
last_id = await fetchData();
const jimalayaData = excelToJson({
    sourceFile: './InputFiles/jimalaya.xlsx',
    sheets:[{
        name: 'Sheet1',
    header:{
        rows:1 
    },

    columnToKey: {
        A: 'first_name',
        B: 'last_name',
        C: 'email',
        D: 'phone',
        E: 'membership_start',
        F: 'membership_end',
        G: 'membership_name'
    }
    }]
});
for (let i = 0; i < jimalayaData.Sheet1.length; i++) {
    var userObj = {
        _id: last_id + 1 + i,
        first_name: jimalayaData.Sheet1[i].first_name,
        last_name: jimalayaData.Sheet1[i].last_name,
        phone: jimalayaData.Sheet1[i].phone,
        email: jimalayaData.Sheet1[i].email,
        joined: jimalayaData.Sheet1[i].membership_start,
        club_id: 2400,
    }
    var memberhshipObj = {
        user_id: last_id + 1 + i,
        mem_start: jimalayaData.Sheet1[i].membership_start,
        mem_end: jimalayaData.Sheet1[i].membership_end,
        membership_name: jimalayaData.Sheet1[i].membership_name,
    }
    userBL.addUser(userObj);
    membershipsBL.addMembership(memberhshipObj);
    
}
}
insertJimalaya();

//Initializing the DB with the data from the ar_db file.
//Code is disabled because the code should only run once.

//function initDB() {
// const usersSheetData = excelToJson({
//     sourceFile: './InputFiles/ar_db.xlsx',
//     sheets:[{
//         name: 'users',
//     header:{
//         rows:1 
//     },

//     columnToKey: {
//         A: '_id',
//         B: 'first_name',
//         C: 'last_name',
//         D: 'phone',
//         E: 'email',
//         F: 'joined',
//         G: 'club_id'
//     }
//     }]
// });
// const membershipsSheetData = excelToJson({
// sourceFile: './InputFiles/ar_db.xlsx',
//     sheets:[{
//         name: 'memberships',
//     header:{
//         rows:1 
//     },

//     columnToKey: {
//         B: 'user_id',
//         C: 'mem_start',
//         D: 'mem_end',
//         E: 'membership_name',
//     }
//     }]
// });

// for (let i = 0; i < usersSheetData.users.length; i++) {
//     userBL.addUser(usersSheetData.users[i])
// }
// for (let i = 0; i < membershipsSheetData.memberships.length; i++) {
//     membershipsBL.addMembership(membershipsSheetData.memberships[i])
//     console.log(membershipsSheetData.memberships[i]);
// }
// }


app.listen(8000,()=>{
    console.log("server is up")});






