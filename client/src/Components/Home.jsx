import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log('Error fetching data:', err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        console.log('Student deleted:', res.data);
        setData(data.filter((student) => student.id !== id)); // Remove student from the list
      })
      .catch((err) => console.error('Error deleting student:', err));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Records</h1>
      <Link to='/create' className="text-center mb-4">Add + </Link>
      <table className="table table-striped table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dept</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.password}</td>
                <td>{student.dept}</td>
                <td>
                  <Link to={`/update/${student.id}`} className="btn btn-warning btn-sm mr-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
