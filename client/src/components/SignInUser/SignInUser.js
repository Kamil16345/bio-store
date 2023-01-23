
export const SignInUser = () =>{

    // return (
    //     <>
    //                     <div>
    //                 <div className="form-group">
    //                     <label htmlFor="email">Email</label>
    //                     <input 
    //                         type="text"
    //                         className="form-control"
    //                         id="email"
    //                         required
    //                         value= {email}
    //                         onChange={onChangeEmail}
    //                         name="email"
    //                     />
    //                 </div>

    //                 <div className="form-group">
    //                     <label htmlFor="password">Password</label>
    //                     <input 
    //                         type="password"
    //                         className="form-control"
    //                         id="password"
    //                         required
    //                         value={password}
    //                         onChange={onChangePassword}
    //                         name="password"
    //                     />
    //                     <button onClick={()=>saveCustomer()} className="btn btn-success">
    //                         Sign In
    //                     </button>
    //                 </div>
    //             </div>
    //     </>
    // )
    // function onChangeEmail(event){
    //     setEmail(event.target.value)
    // }
    
    // function onChangePassword(event){
    //     setPassword(event.target.value)
    // }
    
    // function saveCustomer(){
    //     let data={
    //         id:id,
    //         email: email,
    //         password: password
    //     };

    //     AuthenticateDataService.getCustomer(data.email)
    //     .then(response => (
    //         auth.login(email),
    //         navigate(`/customerPanel/${email}`, {
    //             state: {
    //                 email:response.data.email, 
    //                 name:response.data.name,
    //                 id: response.data._id
    //             }
    //         }),
    //         localStorage.setItem("customerId", response.data._id)
    //     ))
    //     .catch(e=> {
    //         console.log(e)
    //     })
    // }
}