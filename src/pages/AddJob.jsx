import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddJob() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    experience: "",
    salary: "",
    category: "",
    image: "",
    description: ""
  });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.post("/jobs", formData);

      navigate("/jobs");

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <main>

      <div className="form-container">

        <p className="form-label">
          RECRUITMENT MANAGEMENT
        </p>

        <h2>Add New Job</h2>

        <p className="form-description">
          Create a new job opportunity for candidates.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Job Location"
            value={formData.location}
            onChange={handleChange}
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">
              Select Job Type
            </option>

            <option value="Full Time">
              Full Time
            </option>

            <option value="Part Time">
              Part Time
            </option>

            <option value="Internship">
              Internship
            </option>
          </select>

          <input
            type="text"
            name="experience"
            placeholder="Experience e.g. 0-2 Years"
            value={formData.experience}
            onChange={handleChange}
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary e.g. ₹4-6 LPA"
            value={formData.salary}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category e.g. Development"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="submit-btn"
          >
            Add Job
          </button>

        </form>

      </div>

    </main>

  );
}

export default AddJob;