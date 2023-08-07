module.exports = `import React, { useState } from "react";
import { Title, Label, Input, Btn, Form, Flex, ErrorMsg, MainDiv } from "./style";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {API_URL} from '../../../shared/apiEndPointURL';
import { options } from "../../../auth-config";
import { useNavigate } from "react-router-dom";

/* interface for Forgot Password form input */ 
type UserData = {
    email?: string;
}

/* regex for email  validation */
let emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

/* this is forgot password  callback function for forgot password form  */ 
const ForgotPassword = () => {

  /* this is for routing */
  const history = useNavigate();

  /* useState for set the form input fields */ 
    const [input, setInput] = useState<UserData | null>(null);

    /* form state for form validation n form submission  */ 
    const { register, handleSubmit, formState: { errors } } = useForm<UserData>();

  /* async function for form validations n api*/  
      const ForgotPasswordHandler = async (data: UserData,e:any) => {
        e.target.reset()
        try {
          let res = await fetch(\`\${API_URL.forgotPassword}\`, {
            method: "POST",
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({
              email: data.email,
            }),
          });
          let resJson = await res.json();
          if (res.ok) {
            setInput(input);
            toast.success(resJson.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            if (options.cognito) {
              history("/reset-password", { state: { email: data.email } });
            }
          } else {
            toast.error(resJson.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }

    /* forgot Password  return back function*/ 
    return (
        <>
            <div style={Flex} >
            <ToastContainer />
                <h2 style={Title}>Forgot Password</h2>
                <form style={Form} onSubmit={handleSubmit(ForgotPasswordHandler)}>
                <div style={MainDiv}>
                  <label style={Label}>Email</label>
                  <input
                    style={Input}
                    type="email"
                    defaultValue=""
                    placeholder="Enter your email"
                    value={input?.email}
                    {...register("email", { required: true, pattern: emailRegex })}
                  />
                    {
                      (errors.email && errors.email.type === "required" && (<span style={ErrorMsg}>Email is required</span>)) ||
                      (errors.email && errors.email.type === "pattern" && (<span style={ErrorMsg}>Enter valid email address</span>))
                    }
                </div>
                    <button style={Btn}>Forgot Password</button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
`