import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    dept: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send POST request to backend
    axios
      .post('http://localhost:8081/create', formData)
      .then((res) => {
        alert('Student added successfully');
        navigate('/');
        setFormData({ id: '', name: '', email: '', password: '', dept: '' }); // Reset form
      })
      .catch((err) => {
        console.error('Error adding student:', err);
        alert('Failed to add student');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add New Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dept" className="form-label">
            Department
          </label>
          <input
            type="text"
            className="form-control"
            id="dept"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default Create;
