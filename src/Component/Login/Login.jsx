import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import SocialLogin from '../socialLogin/socialLogin';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state || '/';
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(result => {
        if (result.user) {
          toast.success('Login successful!');
          navigate(from);
        }
      })
      .catch(error => {
        toast.error('Invalid email or password. Please try again.'); // Display error message
      });
  };
  return (
    <div className="">
      <div className="hero min-h-screen bg-[url('https://i.ibb.co/wzLs0gK/data-security-threat.png')] rounded-3xl  w-full mb-20">
        <div className="hero-content flex-col lg:flex rounded-2xl w-3/4">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div
            className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            data-aos="flip-left"
          >
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register('email', { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  className="input input-bordered"
                  {...register('password', { required: true })}
                />
                <span
                  className="absolute top-[50px] left-36 lg:left-72"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </span>
                {errors.password && <span>This field is required</span>}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
              <p className="text-center">
                dont have an account{' '}
                <Link to="/register" className="text-[#6dd79f]">
                  Register
                </Link>{' '}
              </p>
            </form>
            <div className="mb-5">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
