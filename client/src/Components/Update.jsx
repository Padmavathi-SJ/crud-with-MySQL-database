import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams(); // Get the student ID from the URL params
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dept: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the student details to pre-fill the form
    axios
      .get(`http://localhost:8081/student/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching student data:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/update/${id}`, formData)
      .then((res) => {
        console.log('Student updated:', res.data);
        navigate('/'); // Redirect to the home page
      })
      .catch((err) => {
        console.error('Error updating student:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default Update;
