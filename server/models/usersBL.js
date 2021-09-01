const User = require('./userSchema');

const getAllUsers = () => {
    return new Promise((resolve, reject)=> {
        User.find({}, (err,data)=> {
            if(err) {
                reject(err);
            }
            else resolve(data);
        })
    })
}

const getUser = (memId) => {
    return new Promise((resolve, reject)=> {
        User.findById((memId), (err,data)=> {
            if(err) {
                reject(err);
            }
            else resolve(data);
        })
    })
}

const addUser = (newUser) => {
    return new Promise((resolve, reject)=> {
        var user = new User({
            id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            phone: newUser.phone,
            email: newUser.email,
            joined_at: newUser.joined,
            club_id: newUser.club_id,
        })
        console.log(user);
        user.save((err)=>{
            if(err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}

module.exports = {getAllUsers, getUser, addUser};