import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function CreateUser() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roles: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          roles: [...prevState.roles, value],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          roles: prevState.roles.filter((role) => role !== value),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Check if any required fields are empty
    if (!formData.name || !formData.email || formData.roles.length === 0) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        // Send form data to your server
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/create-user`, formData);
  
        if (response.data.flag) {
            console.log(response.data.msg);
            navigate('/users',{replace: true});
        } else {
            alert(response.data.msg)
        } 
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Roles:</label>
          <div className="mt-1">
            <div>
              <input
                type="checkbox"
                id="author"
                name="roles"
                value="1"
                checked={formData.roles.includes("1")}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="admin" className="text-gray-700">
                Author
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="editor"
                name="roles"
                value="2"
                checked={formData.roles.includes("2")}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="admin" className="text-gray-700">
                Editor
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="subscriber"
                name="roles"
                value="3"
                checked={formData.roles.includes("3")}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="user" className="text-gray-700">
                Subscriber
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="admin"
                name="roles"
                value="4"
                checked={formData.roles.includes("4")}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="guest" className="text-gray-700">
                Administrator
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
