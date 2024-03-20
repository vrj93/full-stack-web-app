import React, { useEffect, useState } from "react";
import axios from "axios";

function GetUser() {
  const [filterRole, setFilterRole] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    fetchFilteredUsers();
  }, [filterRole]);

  const fetchFilteredUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-user?role=${filterRole}`
      );
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
    }
  };

  console.log(filteredUsers);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="mb-4">
        <label htmlFor="roleFilter" className="mr-2">
          Filter by Role:
        </label>
        <select
          id="roleFilter"
          value={filterRole}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="1">Author</option>
          <option value="2">Editor</option>
          <option value="3">Subscriber</option>
          <option value="4">Administrator</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 bg-gray-100 border border-gray-200">Name</th>
            <th className="p-2 bg-gray-100 border border-gray-200">Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border border-gray-200">{user.name}</td>
              <td className="p-2 border border-gray-200">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetUser;
