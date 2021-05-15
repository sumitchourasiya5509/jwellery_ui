import React from 'react'
import {useState} from 'react'
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


function Bills() {
    const location = useLocation();
    console.log(location)
   
    const [goldPrice, setgoldPrice] = useState("")
    const [weight, setweight] = useState("")
   const [discount, setdiscount] = useState(2)
   const [totalprice, settotalprice] = useState(0)

    function goldPriceHandler(e){
        setgoldPrice({goldPrice : e.target.value})
    }

    function weightHandler(e){
        setweight({weight : e.target.value})
    }

    function discountHandler(e){
        setdiscount({discount : e.target.value})
    }

    const handleSubmit = () => {
     let model = {
        "GoldPrice": parseFloat(goldPrice.goldPrice !== "" ? goldPrice.goldPrice : 0.0 ),
        "Discount": parseFloat(discount.discount !== "" ? discount.discount : 0.0 ),
        "Weight":  parseFloat(weight.weight !== "" ? weight.weight : 0.0 ),
        "TotalPrice": 0
    }
       let url = `https://localhost:44306/api/bills/GetBill/`
       return fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
        }).then(response => response.json())
            .then(bill =>{
               settotalprice(bill.totalPrice)
       })}

       return (
        <form style={formStyle} onSubmit={handleSubmit} >
            <div className="row">
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col float-right">
                    <h5>Welcome {location.state.user.userName}</h5>
                </div>
            </div>
             <div className="row">
              <div className="col-4"><label style={labelStyle} >gold price (per Gram): </label></div>
              <div className="col"><input type="text" style={inputStyle} onChange={(e)=> goldPriceHandler(e)}/></div>
            </div>
            <div className="row">
              <div className="col-4"><label style={labelStyle} >weight(grams): </label></div>
              <div className="col"><input  type="text" style={inputStyle} onChange={(e)=> weightHandler(e)}/></div>
            </div>
            <div className="row">
              <div className="col-4"><label style={labelStyle} >discount: </label></div>
              <div className="col"><input type="text" style={inputStyle} onChange={(e)=> discountHandler(e)} disabled={location.state.user.userType === "Regular"} value={discount}/></div>
            </div>
            <div className="row">
              <div className="col-4"><label style={labelStyle} >Total Price: </label></div>
              <div className="col"><input type="text" style={inputStyle} value={totalprice}/></div>
            </div>
       
          <div className="row">
              <div className="col"><button style={submitStyle} type="button" onClick={handleSubmit}>Calculate</button></div>
              <div className="col"> <button style={submitStyle} type="button">Print Screen</button></div>
              <div className="col"><button style={submitStyle} type="button">Print to file</button></div>
              <div className="col"><button style={submitStyle} type="button">Print to Paper</button></div>
          </div>
        </form>
      );
}

export default Bills
