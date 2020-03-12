const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PersonSchema = new schema({
    name : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    dp : {
        type : String,
        default : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fman_236832&psig=AOvVaw3OeQgibbW0WNf4vm-G85Gu&ust=1584082530247000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiC2LitlOgCFQAAAAAdAAAAABAX'
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = person = mongoose.model("myPerson",PersonSchema);