import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, currentRole) => {
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";

      await api.put(`/admin/users/${id}/role`, {
        role: newRole,
      });

      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const toggleBlock = async (id) => {
    try {
      await api.put(`/admin/users/${id}/block`);
      toast.success("User status updated");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>

      <div className="bg-white rounded-xl shadow border">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.email}</td>

                <td className="p-3 capitalize">
                  {user.role}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Blocked"}
                  </span>
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => changeRole(user._id, user.role)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Toggle Role
                  </button>

                  <button
                    onClick={() => toggleBlock(user._id)}
                    className={`px-3 py-1 rounded text-white ${
                      user.isActive
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {user.isActive ? "Block" : "Unblock"}
                  </button>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
