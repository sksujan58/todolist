

function getdate(){
let date= new Date()
let currentDay=date.getDay()

let options={
    weekday:"long",
    day:"numeric",
    month:"long",

}

day=date.toLocaleDateString("en-US",options)
return day

}



function getday(){
    let date= new Date()
    
let option={
    weekday:"long",

}

day=date.toLocaleDateString("en-US",option)
return day

}



module.exports.getdate=getdate;
module.exports.getday=getday;