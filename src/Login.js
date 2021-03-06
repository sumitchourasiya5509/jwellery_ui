import React from 'react';
import { useHistory } from "react-router-dom";


const appStyle = {
    height: '250px',
    display: 'flex'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '400px',
    display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%', 
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const Field = React.forwardRef(({label, type}, ref) => {
    return (
          <div>
              <div className="col-4">
              <label style={labelStyle} >{label}</label>
               </div>
              <div className="col">
              <input ref={ref} type={type} style={inputStyle} required/>
              </div>
          </div>
      
    );
});

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
          
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div className="row">
            <div className="col"></div>
            <div className="col"> <button style={submitStyle} type="submit">Submit</button></div>
            <div className="col"></div>
         
        </div>
      </form>
    );
};

// Usage example:

function Login(){
    const history = useHistory();
   console.log(history);
    const handleSubmit = data => {
             return fetch(`https://localhost:5001/api/users/Login?userName=${data.username}&password=${data.password}`)
            .then(response => response.json())
            .then(user =>{
                if(user.userName != null)
                {
                    history.push({
                        pathname: '/Bills',
                        search: '?query=abc',
                        state: { user: user }
                      })
                    //history.push("/Bills",user);
                }
            })}
    return (
        
      <div style={appStyle}>
        <Form onSubmit={handleSubmit} />
      </div>
    );
};

export default Login;	