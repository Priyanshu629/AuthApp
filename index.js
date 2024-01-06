require('dotenv').config()
const express =require('express')
const cors=require('cors')
const bcrypt=require('bcrypt')
const fs=require('fs')
const path=require('path')

const app=express()

const port = process.env.PORT || PORT

app.use(express.static(path.join(__dirname, "./frontend/dist")))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"))
})
//using middlewares
app.use(express.json())
app.use(cors())

//making routes for resgistration and login
let array=[]


app.post('/register',(req,res)=>{

    let {username,email,password}=req.body
   
     
    if(!username || !email || !password){
        return res.status(422).json({msg:"All fields are required"})
    }
    let flag=0
    fs.readFile('data.txt',(err,data)=>{  
        // let user=JSON.parse(data)
       
           for (let i = 0; i < data.length; i++) {
            if(data[i].username===username){
                 flag=1
                 data=user[i]
                 break
            }
             
           }
          
        
        if(flag===1){
           return res.status(422).json('user already exist')
        }
        else{
        bcrypt.hash(password,10)
        .then((hashed)=>{
            let data = 
            {
                
                username:username,
                email:email,
                password:hashed
                
            }
            
                array.push(data)
                array.toString()
                const stringArray=JSON.stringify(array)
                fs.writeFile('data.txt',stringArray,(err,data)=>{
                    console.log(data)
                })
           
            
            return res.status(200).json("ok")
        })
        .catch((err)=> res.json(err))
    }


    })

    
    

})

app.post('/login',(req,res)=>{
    const {username,password}=req.body
   
    if(!username || !password){
        return res.status(422).json("All fields are required")
    }

    let data={}
    let flag=0
    fs.readFile('data.txt',(err,data)=>{  
    let user=JSON.parse(data)
   
       for (let i = 0; i < user.length; i++) {
        if(user[i].username===username){
             flag=1
             data=user[i]
             break
        }
         
       }
      
    
    if(flag===0){
       return res.status(422).json('user does not exist')
    }
    else{
       flag=0
    //    res.status(200).json('user  exist')
    bcrypt.compare(password,data.password,(err,check)=>{

        if(check){
            return res.status(200).json({msg:"success",email:data.email,username:data.username})
        }
        else{
            return res.status(422).json('Invalid username or password')
        }
    })
      
    }


   })

  

})





//listening to the port
app.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})