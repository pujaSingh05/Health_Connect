import React from 'react'
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className='row contactus'>
        <div className='col-mid-6'>
          <img src='/images/contactus.avif'
          alt="contactus"
          style={{width : "100%"}}/>
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>Contact us</h1>
          <p className='text-justify mt-2'>
          Any query and information about product feel free to call anytime we 24X7 available
          </p>
          <p className='mt-3'>
            <BiMailSend/> : www.help@shopnow.app
          </p>
          <p>
          <p className='mt-3'>
            <BiPhoneCall/> : 012-3456798
          </p>
          </p>
          <p>
          <p className='mt-3'>
            <BiSupport/> : 1800-0000-0000 (toll free)
          </p>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
