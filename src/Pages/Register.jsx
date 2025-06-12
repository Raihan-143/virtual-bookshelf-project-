import React, { use } from 'react';
import { Link } from 'react-router';
import registerLottie from '../assets/lottie/register.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
    const {createUser}=use(AuthContext);
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        //create user
        createUser(email,password)
        .then(res=>{
            console.log(res.user)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{width:'300px'}} animationData={registerLottie} loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                <button className="btn btn-neutral bg-indigo-700 border-none mt-4">Register</button>
                                 <p className="px-6 text-sm text-center dark:text-gray-600">Already have an account?
                                    <Link to='/login' className='underline'>Login now!</Link>
                                </p>
                            </fieldset>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;