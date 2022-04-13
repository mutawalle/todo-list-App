import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Company from './Company';
import Email from "./Email";
import Password from "./Password";
import User from './User';
import { useNavigate } from 'react-router';
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [serviceGroup, setServiceGroup] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [channels, setChannels] = useState([])
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [cutomSebelum, setCutomSebelum] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(fullName !== "" && companyName !== "" && email !== "" && serviceGroup !== "" && serviceType !== "" && channels.length !== 0 && password !== "" && retypePassword === password && isVerified) {
      document.querySelector("input[type='submit']").disabled = false
      document.querySelector("input[type='submit']").style.backgroundColor = "#041b37"
    }else{
      document.querySelector("input[type='submit']").disabled = true
      document.querySelector("input[type='submit']").style.backgroundColor = "lightblue"
    }
  })

  const handleChannels =  (e) => {
    if(e.target.checked){
      let x = [...channels]
      x.push(e.target.value)
      setChannels(x)
    }else{
      let x = [...channels]
      x = x.filter(item => item !== e.target.value)
      setChannels(x)
    }
  }

  const handleCustom = (e) => {
    if(cutomSebelum===""){
      setCutomSebelum(e.target.value)
      let x = [...channels]
      x.push(e.target.value)
      setChannels(x)
    }else{
      let x = [...channels]
      x = x.filter(item => item !== cutomSebelum)
      setCutomSebelum(e.target.value)
      x.push(e.target.value)
      setChannels(x)
    }
  }

  const handleFocus = (e) => {
    let x = e.target.previousSibling
    x.querySelectorAll("path")[0].style.fill = "#041b37"
    if(x.querySelectorAll("path")[1]){
      x.querySelectorAll("path")[1].style.fill = "#041b37"
    }
  }

  const handleBlur = (e) => {
    let x = e.target.previousSibling
    x.querySelectorAll("path")[0].style.fill = "lightblue"
    if(x.querySelectorAll("path")[1]){
      x.querySelectorAll("path")[1].style.fill = "lightblue"
    }
  }

  const handleCaptcha = (e) => {
    setIsVerified(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/user', {
      "fullName": fullName,
      "companyName": companyName,
      "email": email,
      "serviceGroup": serviceGroup,
      "serviceType": serviceType,
      "channels": channels,
      "password": password
    }).then(res => {
      navigate('/', { state: { email: email, password: password } })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="containerAuth">
        <div className="bagianKiriAuth">
          <img src={require("../Images/vektor.jpg")} /><br/>
          <a href='https://www.freepik.com/vectors/social-media-network' style={{fontSize: '12px'}}>Social media network vector created by storyset - www.freepik.com</a>
        </div>
        <div className="bagianKananAuth">
          <h1>Welcome</h1>
          <form className="formAuth">
            <div className="inputForm">
              <label htmlFor="fullName">
                <User/>
              </label>
              <input type="text" name="fullName" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
            </div>
            <div className="inputForm">
              <label htmlFor="companyName">
                <Company/>
              </label>
              <input type="text" name="companyName" placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
            </div>
            <div className="inputForm">
              <label htmlFor="email">
                <Email/>
              </label>
              <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}  onFocus={handleFocus} onBlur={handleBlur}/>
            </div>
            <h2>Service Group</h2>
            <div className="inputForm">
              <input type="radio" id="shared" name="serviceGroup" value="Shared" onChange={(e) => { document.getElementById("transactional").disabled = true; setServiceGroup(e.target.value)}}/>
              <label htmlFor="shared">Shared</label>
              <input type="radio" id="dedicated" name="serviceGroup" value="Dedicated" onChange={(e) => { document.getElementById("transactional").disabled = false; setServiceGroup(e.target.value)}}/>
              <label htmlFor="dedicated">Dedicated</label>
              <input type="radio" id="onprem" name="serviceGroup" value="OnPrem" onChange={(e) => { document.getElementById("transactional").disabled = false; setServiceGroup(e.target.value)}}/>
              <label htmlFor="onprem">OnPrem</label>
            </div>
            <h2>Service Type</h2>
            <div className="inputForm">
              <input type="radio" id="faq" name="serviceType" value="FAQ" onChange={(e) => setServiceType(e.target.value)} />
              <label htmlFor="faq">FAQ</label>
              <input type="radio" id="transactional" name="serviceType" value="Transactional" onChange={(e) => setServiceType(e.target.value)}/>
              <label htmlFor="transactional">Transactional</label>
            </div>
            <h2>Channels</h2>
            <div className="inputForm" style={{fontSize: '14px'}}>
              <input type="checkbox" id="whatsapp" name="channels" value="Whatsapp" onChange={handleChannels}/>
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="checkbox" id="telegram" name="channels" value="Telegram" onChange={handleChannels}/>
              <label htmlFor="telegram">Telegram</label>
              <input type="checkbox" id="slack" name="channels" value="Slack" onChange={handleChannels}/>
              <label htmlFor="slack">Slack</label>
              <input type="checkbox" id="coster" name="channels" value="Coster" onChange={handleChannels}/>
              <label htmlFor="coster">Coster</label>
              <input type="checkbox" id="custom" name="channels" value="custom" onChange={() => document.querySelector(".customInput").classList.toggle("hilang")}/>
              <label htmlFor="custom">Custom</label>
            </div>
            <div className="inputForm customInput hilang">
              <input type="text" name="channels" placeholder="Custom" onChange={handleCustom}/>
            </div>
            <div className="inputForm">
              <label htmlFor="password">
                <Password/>
              </label>
              <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  onFocus={handleFocus} onBlur={handleBlur}/>
            </div>
            <div className="inputForm">
              <label htmlFor="retypePassword">
                <Password/>
              </label>
              <input type="password" name="retypePassword" placeholder="Retype Password" onChange={(e) => setRetypePassword(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
            </div>
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptcha}
            />
            <input className="submitAuth" type="submit" value="Register" onClick={handleSubmit}/>
          </form>
            <a href='/login' style={{fontSize: "12px", marginTop: '5px'}}>Login</a>
        </div>
      </div>
      <style jsx>{`
        .containerAuth {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          text-align: center;
          font-family: 'Fredoka One', cursive;
          color: #041b37;
        }
        .bagianKiriAuth {
          flex: 1;
        }
        .bagianKiriAuth img {
          width: 80%;
        }
        .bagianKananAuth {
          flex: 1;
        }
        .logoAuth img {
          width: 100px;
          heigth: 100px;
          border-radius: 50%;
        }
        .formAuth {
          width: 450px;
          margin: auto;
          display: flex;
          flex-direction: column;
        }
        .inputForm {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 20px;
        }
        .inputForm input {
          width: 85%;
          height: 30px;
          box-sizing: border-box;
          border: none;
          border-bottom: 1px solid lightblue;
        }
        .inputForm input:focus {
          outline: none;
          border-bottom: 3px solid #00bcd4;
        }
        .inputForm input::placeholder {
          color: grey;
          font-family: 'Fredoka One', cursive;
        }
        .inputForm input:focus::placeholder {
          color: white;
        }
        .inputForm label {
          width: 15%;
        }
        .inputForm label svg {
          width: 30px;
          height: 30px;
        }
        div.customInput input{
          width: 100%;
        }
        .submitAuth {
          width: 100px;
          height: 40px;
          margin: auto;
          border: none;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Fredoka One', cursive;
          letter-spacing: 1px;
        }
        .hilang {
          display: none;
        }
      `}</style>
    </>
  );
}
