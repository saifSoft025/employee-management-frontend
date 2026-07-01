import { useEffect, useState } from "react";
import axios from "axios";

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
          `http://localhost:5000/api/employees/${editingEmployee.id}`,
          formData
        );

        setEditingEmployee(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/employees",
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
      console.log(error);
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