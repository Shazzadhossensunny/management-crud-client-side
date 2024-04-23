import "./App.css";

import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'


function App() {
  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = (data1) =>{
    const {name, email} = data1
    fetch('http://localhost:5000/users',{
      method: "POST",
      headers:{
        'content-Type': 'application/json',
      },
      body: JSON.stringify(data1)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully add user",
        });

      }
    })

  }
  return (
    <>
      <h1 className="text-center text-5xl font-bold bg-green-300 p-3">
        User Management System
      </h1>
      <div className="container mx-auto">
        <Link to='/allUsers'>
        <button className="btn btn-link">All Users</button>
        </Link>
        <div className="text-center my-9">
          <h3 className="text-3xl font-bold">New User</h3>
          <p>Use the below form to create a new account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto space-y-5">
          <div>
            <p className="font-semibold mb-3">Name</p>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("name")}
            />
          </div>
          <div>
            <p className="font-semibold mb-3">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("email")}
            />
          </div>
          <div className="space-x-5">
            <span className="font-semibold mb-3">Gender</span>
            <label htmlFor="male">
              <input
              className="mr-2"
                type="radio"
                name="gender"
                value="male"
                id="male"
                {...register("Gender", { required: true })}
              />
              Male
            </label>
            <label htmlFor="female">
              <input className="mr-2" type="radio" name="gender" value="female" id="female" {...register("Gender", { required: true })} />
              Female
            </label>
          </div>
          <div className="space-x-5">
            <span className="font-semibold mb-3">Status</span>
            <label htmlFor="active">
              <input
              className="mr-2"
                type="radio"
                name="status"
                value="active"
                id="active"
                {...register("Status", { required: true })}
              />
              Active
            </label>
            <label htmlFor="inactive">
              <input className="mr-2" type="radio" name="status" value="inactive" id="inactive" {...register("Status", { required: true })}/>
              Inactive
            </label>
          </div>
          <button type="submit" className="btn btn-block bg-green-400">Save</button>
        </form>
      </div>
    </>
  );
}

export default App;
