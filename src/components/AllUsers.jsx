import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

export default function AllUsers() {
  const loadUser = useLoaderData();
  const [users, setUsers] = useState(loadUser);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
              const remaining = users.filter((user) => user._id !== id)
              setUsers(remaining)
            }
          });
      }
    });
  };
  return (
    <div>
      <h1 className="text-center text-5xl font-bold bg-green-300 p-3">
        User Management System
      </h1>
      <div className="container mx-auto">
        <Link to="/">
          <button className="btn btn-link">New Users</button>
        </Link>
        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.Gender}</td>
                  <td>{user.Status}</td>
                  <td className="space-x-2">
                    <Link to={`/updateUser/${user._id}`}>
                    <button className="btn bg-amber-200">Edit</button>
                    </Link>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn bg-red-300"
                    >
                      {" "}
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
