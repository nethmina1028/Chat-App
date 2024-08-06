const mongoose = require('mongoose')

async function connectDB(){
    
    //connect to db
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('DB connected'))
 .catch((err)=>console.log('database not connected',err));
      
}

module.exports = connectDB