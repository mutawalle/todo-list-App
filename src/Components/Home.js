import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router'
import Task from './Task'
import IconUser from './IconUser'

export default function Home() {
  const [email, setEmail] = useState("")
  const [tugasBaru, setTugasBaru] = useState("")
  const [task, setTask] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleTask =  (e) => {
    let x = [...task]
    setTask(x.filter( item => item !== e))
  }

  const hasilTask = task.map((item, index) => <Task key={index} tugas={item} handel={handleTask}/>) 

  const handleMunculTambah = () => {
    document.querySelector('.penambah').classList.toggle('hilang')
  }

  const tambahTask = (e) => {
    e.preventDefault()
    if(tugasBaru !== ""){
      let x = [...task]
      x.push(tugasBaru)
      setTask(x)
      document.querySelector('.penambah input').value = ""
      document.querySelector('.penambah').classList.toggle('hilang')
      setTugasBaru("")
    }
  }

  const handleTugasBaru = (e) => {
    setTugasBaru(e.target.value)
  }

  useEffect( () => {
    if(location.state !== null){
      setEmail(location.state.email)
    }
  }, [])

  return (
    <>
      <div className='home'>
        <div style={{backgroundColor: 'white', width: '500px', padding: '1rem', borderRadius: '20px'}}>
          {email === "" ? 
            <>
              <h1>Silakan Login</h1><br/>
              <a href='/login'>Login</a>  
            </>
            :
            <>
              <h1>Selamat Datang</h1>
              <IconUser nama="Andi" email={email}/>
              <p>{email}</p>
              <div>
                <h2>Tugas Anda hari ini</h2>
                <div>
                  {
                    hasilTask
                  }
                </div>
                <img className='icon-plus' style={{marginTop: '1rem', transition: '.2s'}} src={require('../Images/plus.png')} alt="cat" width="64px" height="64px" onClick={handleMunculTambah}/>
              </div>
              <div className='penambah hilang' style={{borderRadius: '20px', transition: '.5s'}}>
                <h2>Tambahkan Tugas</h2>
                <input type="text" placeholder="Tugas Baru" onChange={handleTugasBaru}/>
                <span style={{width: '80px', display: 'block', margin: '0.5rem auto', backgroundColor: 'lightgreen', padding: '5px', borderRadius: '5px', cursor: 'pointer'}} onClick={tambahTask}>
                  Tambah
                </span>
              </div>
            </>
          }
        </div>
      </div>
      <style jsx>{`
          body {
            margin: 0;
          }

          .home {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url(${require('../Images/bgPat.png')});
          }
          
          .home div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-family: 'Fredoka One', cursive;
          }
          
          h1 {
            color: #041b37;
          }

          .icon-plus {
            cursor: pointer;
            border-radius: 50%;
            box-shadow: 4px 4px 6px -1px rgba(0,0,0,0.58)
          }

          .icon-plus:hover {
            transform: scale(1.1);
          }

          .icon-plus:active {
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.58)
          }
          .penambah {
            border: 5px solid #041b37;
            position: absolute;
            background-color: #f5f5f5;
            top: 35%;
            left: 35%;
            width: 400px;
            height: 250px;
          }
          .penambah input {
            width: 85%;
            height: 30px;
            box-sizing: border-box;
            border: none;
            border-bottom: 1px solid lightblue;
          }
          .penambah input:focus {
            outline: none;
            border-bottom: 3px solid #00bcd4;
          }
          .penambah input::placeholder {
            color: grey;
            font-family: 'Fredoka One', cursive;
          }
          .penambah input:focus::placeholder {
            color: white;
          }
          div.hilang {
            width: 0;
            height: 0;
            display: none;
          }
      `}</style>
    </>
  )
}
