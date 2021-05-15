import React from 'react'
import { useLocation } from "react-router-dom";


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
    width: '500px',
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
      <div className="row">
          <div className="col-4"><label style={labelStyle} >{label}</label></div>
          <div className="col"><input ref={ref} type={type} style={inputStyle} /></div>
      </div>
    );
});

const Form = ({onSubmit}) => {
    const goldpriceRef = React.useRef();
    const weightgramRef = React.useRef();
    const totalpriceRef = React.useRef();
    const discountRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            GoldPrice: goldpriceRef.current.value,
            Weight: weightgramRef.current.value,
            Discount: discountRef.current.value,
            TotalPrice:totalpriceRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
         <Field ref={goldpriceRef} label="gold price (per Gram):" type="text" />
        <Field ref={weightgramRef} label="weight(grams):" type="password" />
        <Field ref={totalpriceRef} label="total price:" type="password" />
        <Field ref={discountRef} label="discount:" type="password" />
        <div className="row">
            <div className="col"><button style={submitStyle} type="submit">Calculate</button></div>
            <div className="col"> <button style={submitStyle} type="submit">Print Screen</button></div>
            <div className="col"><button style={submitStyle} type="submit">Print to file</button></div>
            <div className="col"><button style={submitStyle} type="submit">Print to Paper</button></div>
        </div>
      </form>
    );
};

function Bills() {
    const location = useLocation();
    console.log(location)

    const handleSubmit = data => {
        return fetch(`https://localhost:44306/api/users/Login?userName=${data.username}&password=${data.password}`)
       .then(response => response.json())
       .then(user =>{
          
       })}

    return (
        <div style={appStyle}>
        <Form onSubmit={handleSubmit} />
      </div>
    )
}

export default Bills
