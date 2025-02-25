import { useRef } from "react";
import { Link, Route } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import {Toaster , toast } from 'react-hot-toast'
import axios from "axios";

const UserAuthForm = ({ type }) => {

    const authForm = useRef();

    const userAuthThroughServer = (serverRoute , formData) => {

        console.log('http://localhost:3000' + serverRoute , formData)

       axios.post('http://localhost:3000' + serverRoute , formData)
       .then(({ data }) => {
        console.log(data);
       })
       .catch(({ response}) => {
        toast.error(response.data.error)
       })

    }
    
    const handleSubmit = (e) => {

        e.preventDefault()


        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        //formdata
        let form = new FormData(authForm.current);
        let formData = {};

        for(let [key, value] of form.entries()){
            formData[key] = value;
        }


        //form validation
        let {fullname,email,password} = formData;

       
            if(fullname.length < 3){
            return toast.error("Full name must be at least 3 letters long" )
             }
        
    
        if(!email.length){
            return toast.error("Enter Email")
        }
    
        if(!emailRegex.test(email)){
            return toast.error("Email is invalid")
        }
    
        if(!passwordRegex.test(password)){
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
        }

        

        userAuthThroughServer(serverRoute , formData)
    }

    return(
        <AnimationWrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center">
           <Toaster />
            <form ref={authForm} className="w-[80%] max-w-[400]">
                <h1 className="text-4xl font-gelasio capitaliza text-center mb-24">
                    {type == "sign-in" ? "Welcome back" : "Join us Today"}
                </h1>
                {
                    type != "sign-in" ? 
                    <InputBox 
                        name="fullname"
                        type="text"
                        placeholder={"Full Name"}
                       icon="fi-rr-user"
                    />
                    : ""
                }
                   <InputBox 
                        name="email"
                        type="email"
                        placeholder={"Email"}
                       icon="fi-rr-at"
                    />
                    <InputBox 
                        name="password"
                        type="password"
                        placeholder={"Password"}
                       icon="fi-rr-key"
                    />

                    <button className="btn-dark center mt-14"
                    type="submit"
                    onClick={handleSubmit}
                    >    

                        {type.replace("-"," ") }
                    </button>
                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black" />
                        <p>or</p>
                        <hr className="w-1/2 border-black" />
                    </div>

                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                        <img src={googleIcon} className="w-5" />
                        continue with google
                    </button>
                    {
                        type == "sign-in" ?
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Don't have an acconnt ?
                            <Link to="/signup" className="underline text-black text-xl ml-1">
                                Join us Today
                            </Link>
                        </p>
                        : 
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Already a member ?
                            <Link to="/signin"  className="underline text-black text-xl ml-1">
                            Sign in here.
                            </Link>
                        </p>
                     
                    }
            </form>
        </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm;