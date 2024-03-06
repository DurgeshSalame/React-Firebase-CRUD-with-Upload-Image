// import { useState, useEffect } from "react"
// // import axios from 'axios'




// function Senddata() {

//     const[user, setUser]=useState("")
//     const [data, setdata] = useState({
//         Cname: "",
//         Yname: "",
//         Yemail: "",
//         Yaddress: "",
//         Ymsg: ""
//     })
//     let name, value
//     function Changed(event) {
//         name = event.target.name
//         value = event.target.value
//         setdata({ ...data, [name]: value })
//     }
//     async function Send(val) {
//         val.preventDefault()
//         const { Cname, Yname, Yemail, Yaddress, Ymsg } = data
//         const response = await fetch("https://feedback-9e26f-default-rtdb.firebaseio.com/feedback.json",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     Company_name: Cname,
//                     Your_name: Yname,
//                     Email_name: Yemail,
//                     Address_name: Yaddress,
//                     Your_msg: Ymsg
//                 })
//             })
//             const response2 = await fetch("https://feedback-9e26f-default-rtdb.firebaseio.com/feedback.json",
//             {
//                 method: "GET",

               
//             })
//             setUser(data)
//         if (response) {
//             alert("data send")
//             setdata({
//                 Cname: " ",
//                 Yname: " ",
//                 Yemail: " ",
//                 Yaddress: " ",
//                 Ymsg: " "
//             })
//         }
//     }

//     return (
//         <>
//             <form action="POST">
//                 <input type="text" placeholder="Company Name" name="Cname" value={data.Cname} onChange={Changed} />
//                 <input type="text" placeholder="Your name" name="Yname" value={data.Yname} onChange={Changed} />
//                 <input type="email" placeholder="Your Email" name="Yemail" value={data.Yemail} onChange={Changed} />
//                 <input type="text" placeholder="Your Address" name="Yaddress" value={data.Yaddress} onChange={Changed} />
//                 <input type="text" placeholder="Your Massge" name="Ymsg" value={data.Ymsg} onChange={Changed} />
//                 {JSON.stringify(user)}
//                 <button onClick={Send}>Send Data</button>
//             </form>
//             <div>
//                 {user.map((e)=>{
//                     <p>
//                         {e.Cname}{e.Yname}{e.Yemail}{e.Yaddress}{e.Ymsg}
//                     </p>
//                 })}
//             </div>
//         </>
//     )
// }
// export default Senddata


// export function Getdata() {

//     return (
//         <>
//             <h1></h1>
//     <div class="card" style={{width: "18rem"}}>
//   <img src="..." class="card-img-top" alt="..."/>
//   <div class="card-body">
    
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
//         </>
//     )
// }

import { useState, useEffect } from 'react'


export function Senddata() {
  const [form, setForm] = useState()
  const [users, setUsers] = useState([])
  const [image, setImage] = useState("")


  // when use form state hook
  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://feedback-9e26f-default-rtdb.firebaseio.com/feedback.json", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    console.log(data);
  }

  // when use users state hook

  async function getuser() {
    const response = await fetch("https://feedback-9e26f-default-rtdb.firebaseio.com/feedback.json", {
      method: "GET"
    })
    const data = await response.json()
    setUsers(data);
    // console.log(data);
console.log(data); 
}

  useEffect(() => {
    getuser()
  }, [])





  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className='form'>
          <h1>Data Send & Recieved <br /> react to node and MangoDB </h1>
          <input type='file'></input><br />
          <input type="text" name='Company_Name' placeholder="Company Name" onChange={handleForm} /><br />
          <input type="text" name='Adddress' placeholder="Adddress" onChange={handleForm} /><br />
          <input type="text" name='City' placeholder="City" onChange={handleForm} /><br />
          <input type="text" name='State' placeholder="State" onChange={handleForm} />
          <p>{JSON.stringify(form)}</p>
          <button type="submit" onClick={handleSubmit} >submit</button>
        </div >
        <div className='map'>
          {/* {users.map((user) => (
            <p>
                
              <p>Company Name: {user.Company_Name} <br /> Adddress: {user.Adddress} <br /> City: {user.City} <br /> State: {user.State} </p>
            </p>
          ))} */}
          {/* <h1>{data}</h1> */}
        </div>

      </form>
    </>
  );
}


