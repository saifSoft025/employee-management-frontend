import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function EmployeeForm({
  fetchEmployees,
  editingEmployee,
  setEditingEmployee,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEmployee) {
        await axios.put(
          `${API_URL}/employees/${editingEmployee.id}`,
          formData
        );

        setEditingEmployee(null);
      } else {
        await axios.post(
          `${API_URL}/api/employees`,
          formData
        );
      }

      setFormData({
        name: "",
        email: "",
        designation: "",
        salary: "",
      });

      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={formData.designation}
        onChange={handleChange}
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
      />

      <button type="submit">
        {editingEmployee ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default EmployeeForm;