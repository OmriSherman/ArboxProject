const Membership = require('./membershipSchema');

const getAllMemberships = () => {
    return new Promise((resolve, reject)=> {
        Membership.find({}, (err,data)=> {
            if(err) {
                reject(err);
            }
            else resolve(data);
        })
    })
}

const getMembership = (memId) => {
    return new Promise((resolve, reject)=> {
        Membership.findById((memId), (err,data)=> {
            if(err) {
                reject(err);
            }
            else resolve(data);
        })
    })
}

const addMembership = (newMem) => {
    return new Promise((resolve, reject)=> {
        var membership = new Membership({
            user_id: newMem.user_id,
            start_date: newMem.mem_start,
            end_date: newMem.mem_end,
            membership_type: newMem.membership_name,
        })
        membership.save((err)=>{
            if(err) {
                reject(err);
            } else {
                resolve(membership);
            }
        })
    })
}

module.exports = {getAllMemberships, getMembership, addMembership};