import React from 'react'
import '../styles/registerStyle.css'
import {Form , Input, message}  from 'antd';
import {useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alerteSlice';
import {Link, useNavigate} from 'react-router-dom';
import axios  from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  //findih handler
  const onFinishHandler = async(values) => {
    try{
      dispatch(showLoading());
      const res = await  axios.post('/api/v1/user/login', values);
      window.location.reload();
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success('Login Successfully');
        navigate("/");
      }else{
        message.error(res.data.message)
      }

    }catch(error){
         dispatch(hideLoading());
      console.log(error);
      message.error('Something Went Wrong');
    }
  };
  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish ={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Login Form</h3>
       
        <Form.Item label='Email' name='email'>
          <Input type='email' required/>
        </Form.Item>
        <Form.Item label='Passowrd' name='password'>
          <Input type='pasword' required/>
        </Form.Item>
        <Link to='/register' className='m-2'>Not a user register here</Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
    </>
  )
}

export default Login;
