import userModel from '../models/userModel.js';
import { comparePassword, hashpassword } from '../helper/authhelper.js';
import JWT from'jsonwebtoken';

 const RegisterController = async  (req, res) => {
    try{
        const {name, email,password, phone, address } = req.body;
        //validation
        if(!name){
            return res.send({error:'Name is required'})
        }
        if(!email){
            return res.send({error:'Email is required'})
        }
        if (!phone) {
            return res.send({ message: "Phone no. is required" });
          }
        if(!password){
            return res.send({error:'Password is required'})
        }
        if(!address){
            return res.send({error:'Address is required'})
        }

        //check user
        const existingUser = await userModel.findOne({email});
               //existing user 
               if(existingUser){
                return res.status(200).send({
                    success: true,
                    message:' user already exists, please login'
                });
               };

               //resgister user 
               const hashedPassword = await hashpassword(password);

               //save 
               const user = await new userModel({name, email, phone, address, password: hashedPassword}).save();

               res.status(201).send({
                success:true,
                messgae:"User registered successfully",
                user,
               })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            messgae:'Error in registration',
            error,
        });
    }

};

//Post Login
const LoginController = async (req,res) => {
    try{
        const {email, password} = req.body;

        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        };

        //check user
        const user = await userModel.findOne({email});
        if(!isUser){
            return res.status(404).send({
                success: false, 
                message: 'Email is not registered'
            });
        }

        const match = await comparePassword(password, user.password);

        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            });
        };

        //token
        const token =  await JWT.sign({_id: user.id}, process.env.JWT_SECRET , {expiresIn: '7d',
    });

    res.status(200).send({
        success: true,
        message: 'login Successfully',
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone ,
            address: user.address,
            role: user.role,
        },
        token,
    });
    }catch(error){
        console.lol(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }

};


//forgotpasswordController

const forgotPasswordController = async (req, res) => {
    try{
    const { email , answer, newPassword} = req.body;
    if(!email){
        res.status(200).send({
            message:'Email is required',
        });
    };

    if(!answer){
        res.status(200).send({
            message:'answer is required',
        });
    };
    if(!newPassword){
        res.status(200).send({
            message:'New password is required',
        });
    };

    //check
    const user = await userModel.findOne({email , answer});

    //validation
    if(!user){
        return res.status(400).send({
            success:false,
            message:'Wrong email and answer'
        });
    };

    const hased = await hashpassword(newPassword);
    await userModel.findByIdAndDelete(user._id, { password, hased});
    res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    };
  };

//test  get method
const TestController =async (req, res) => {
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
    };

export default {RegisterController, LoginController, TestController, forgotPasswordController};