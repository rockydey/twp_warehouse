import React from 'react';
import './Signup.css';
import { useForm } from "react-hook-form";
import { Link, useNavigate  } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updatedError] = useUpdateProfile(auth);

    const navigate = useNavigate();

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        navigate('/');
    };

    let signUpError;
    if (error || updatedError) {
        signUpError = <p className='text-red-500'>{error?.message || updatedError?.message}</p>
    }

    return (
        <div className='w-2/6 border-2 mx-auto my-[64px] rounded-lg p-10'>
            <h1 className='text-3xl font-extrabold mb-5'>Create an account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Your Username"
                        className="input input-bordered w-full"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Username is required."
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required."
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Provide valid email address."
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
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
                            },
                            minLength: {
                                value: 8,
                                message: "Password should be minimum 8 character."
                            }
                        })}
                    />
                    <label className="label">
                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password?.message}</span>}
                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password?.message}</span>}
                    </label>
                </div>
                {signUpError}
                <input className='btn w-full text-white hover:bg-none rounded-none outline-0 btn-secondary mt-3' type="submit" value='Get Started' />
            </form>
            <p className='text-center mt-2'>Already have an account? <Link to='/login' className='text-secondary underline'>Login Now</Link></p>
        </div>
    );
};

export default Signup;