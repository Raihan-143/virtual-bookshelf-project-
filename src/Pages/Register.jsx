import React, { use } from 'react';
import { Link } from 'react-router';
import registerLottie from '../assets/lottie/register.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../contexts/AuthContext';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, updateUserProfile } = use(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        // Password Validation
        if (!/(?=.*[A-Z])/.test(password)) {
            Swal.fire("Error!", "Password must contain at least one uppercase letter.", "error");
            return;
        }
        if (!/(?=.*[a-z])/.test(password)) {
            Swal.fire("Error!", "Password must contain at least one lowercase letter.", "error");
            return;
        }
        if (password.length < 6) {
            Swal.fire("Error!", "Password must be at least 6 characters long.", "error");
            return;
        }

        // Create user
        createUser(email, password)
            .then(res => {
                // Update profile with Name & PhotoURL
                updateUserProfile(name, photoURL)
                    .then(() => {
                        Swal.fire("Success!", "Registration completed successfully!", "success");
                        form.reset();
                    })
                    .catch(err => {
                        Swal.fire("Error!", err.message, "error");
                    });
            })
            .catch(error => {
                Swal.fire("Error!", error.message, "error");
            });
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '300px' }} animationData={registerLottie} loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name='name' className="input" placeholder="Name" required />
                                
                                <label className="label">Photo URL</label>
                                <input type="text" name='photoURL' className="input" placeholder="Photo URL" required />

                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" required />
                                
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" required />

                                <button className="btn btn-neutral bg-indigo-700 border-none mt-4">Register</button>
                                
                                <p className="px-6 text-sm text-center dark:text-gray-600 mt-2">
                                    Already have an account? 
                                    <Link to='/login' className='underline'> Login now!</Link>
                                </p>
                            </fieldset>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
