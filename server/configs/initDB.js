const excelToJson = require('convert-excel-to-json');
const membershipBL = require('../models/membershipsBL');
const usersBL = require('../models/usersBL');


//Initializing the DB with the data from the ar_db file.
//Should only run once.

const usersSheetData = excelToJson({
    sourceFile: './ar_db.xlsx',
    sheets:[{
        name: 'users',
    header:{
        rows:1 
    },

    columnToKey: {
        A: '_id',
        B: 'first_name',
        C: 'last_name',
        D: 'phone',
        E: 'email',
        F: 'joined',
        G: 'club_id'
    }
    }]
});
const membershipsSheetData = excelToJson({
sourceFile: './ar_db.xlsx',
    sheets:[{
        name: 'memberships',
    header:{
        rows:1 
    },

    columnToKey: {
        B: 'userId',
        C: 'mem_start',
        D: 'mem_end',
        E: 'mem_type',
    }
    }]
});
console.log(usersSheetData);
console.log(membershipsSheetData);


module.exports = file1Data, file2Data;