import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2, FiUserCheck, FiUserX } from "react-icons/fi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/users");
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/admin/users/${id}/role`,
        { role }
      );
      if (res.data.success) {
        Swal.fire("Success", "Role updated", "success");
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleEdit = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit User",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${user.name || ""}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email || ""}">
        <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${user.phone || ""}">
        <input id="swal-address" class="swal2-input" placeholder="Address" value="${user.address || ""}">
        <input id="swal-picture" class="swal2-input" placeholder="Picture URL" value="${user.picture || ""}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          email: document.getElementById("swal-email").value,
          phone: document.getElementById("swal-phone").value,
          address: document.getElementById("swal-address").value,
          picture: document.getElementById("swal-picture").value,
        };
      },
      showCancelButton: true,
    });

    if (formValues) {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/admin/users/${user._id}`,
          formValues
        );
        if (res.data.success) {
          Swal.fire("Updated!", "User updated successfully", "success");
          fetchUsers();
        }
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Failed to update user", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/admin/users/${id}`
        );
        if (res.data.success) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers();
        }
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded text-[#000]">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Picture</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">
                {u.picture ? (
                  <img
                    src={u.picture}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role || "user"}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center gap-2 justify-center">
                  {u.role === "admin" ? (
                    <button
                      onClick={() => handleRoleChange(u._id, "user")}
                      className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      <FiUserX size={16} /> User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(u._id, "admin")}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      <FiUserCheck size={16} /> Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-[#20c997] hover:bg-[#17a589] text-white px-3 py-1 rounded cursor-pointer"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1 rounded cursor-pointer"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
