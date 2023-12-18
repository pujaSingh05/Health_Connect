import React from "react";
import '../styles/registerStyle.css'
import {Form , Input, message}  from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import {useDispatch} from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alerteSlice';
 
const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //findih handler
  const onFinishHandler = async (values) => {
   try{
    dispatch(showLoading());
    const res = await axios.post('/api/v1/user/register', values);
       dispatch(hideLoading());
    if(res.data.success){
      message.success('Register Succesfully!')
      navigate('/login');
    }else{
      message.error(res.data.message);
    }
    
   }catch(error){
       dispatch(hideLoading());
    console.log(error)
    message.error('Something Went Wrong');
   }
  };
  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish ={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Register Form</h3>
        <Form.Item label="Name" name='name'>
          <Input type='text' required/>
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <Input type='email' required/>
        </Form.Item>
        <Form.Item label='Passowrd' name='password'>
          <Input type='pasword' required/>
        </Form.Item>
        <Link to='/login' className='m-2'>already user login here</Link>
        <button className='btn btn-primary'>Register</button>
      </Form>
    </div>
      
    </>
  );
};

export default Register;
