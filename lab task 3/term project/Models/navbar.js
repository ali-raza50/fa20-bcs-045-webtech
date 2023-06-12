var mongoose=require("mongoose")

var navbarSchema=mongoose.Schema({
    
    imgUrl: String,
    links: [
        {
            label: String,
            url:String
        }
    ]   
})
const navbar=mongoose.model("Navbar",navbarSchema)
module.exports=navbar