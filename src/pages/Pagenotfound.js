import React from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
  return (
    <Layout>
      <div className=''>
        <h1>404</h1>
        <h2>Oops! Page Not Found </h2>
        <Link to={'/'}>Go Back</Link>
        </div>
    </Layout>
  );
}

export default Pagenotfound