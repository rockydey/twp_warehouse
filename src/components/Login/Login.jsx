import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);

    const navigate = useNavigate();

    const handleResetEmail = async () => {
        await sendPasswordResetEmail(email);
        toast.success("Reset email sent!");
    };

    const onSubmit = data => {
        setEmail(data.email);
        signInWithEmailAndPassword(data.email, data.password);
        navigate('/');
    };

    let logInError;
    if (error || resetError) {
        logInError = <p className='text-red-500'>{error?.message || resetError?.message}</p>
    }
    return (
        <div className='w-2/6 border-2 mx-auto my-[102px] rounded-lg p-10'>
            <h1 className='text-3xl font-extrabold mb-5'>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered bottom-1 w-full "
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required."
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Your Password"
                        className="input input-bordered w-full"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required."
                            }
                        })}
                    />
                    <label className="label">
                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password?.message}</span>}
                    </label>
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <input type="checkbox" name="checkbox" id="" />
                        <label htmlFor="checkbox" className='font-semibold ml-1'>Remember Me</label>
                    </div>
                    <p onClick={handleResetEmail} className='cursor-pointer text-sm text-secondary underline font-semibold'>Forget Your Password?</p>
                </div>
                {logInError}
                <input className='btn w-full text-white rounded-none outline-0 btn-secondary mt-3' type="submit" value='Login' />
            </form>
            <p className='text-center mt-2'>Don't have an account? <Link to='/signup' className='text-secondary underline'>Create an account</Link></p>
        </div>
    );
};

export default Login;