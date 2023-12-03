const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
<<<<<<< HEAD
    
})
=======
  company: {
    type: String, 
    required: [true, 'please provide company'], 
    maxlength: 50, 
  },
  position: {
    type: String, 
    required: [true, 'please provide position'], 
    maxlength: 200,

  } , 
  status: {
    type: String, 
    enum: ["interview", "declined", "pending"], 
    default: "pending"
  }, 
  createdBy: {
    type: mongoose.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'please provide user']
  }
}, {timestamps: true})
>>>>>>> 6b709c3 (handling validation mongoose and cast errors for the api)

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;