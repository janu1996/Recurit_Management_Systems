import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [salary, setSalary] = useState("All");
  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(true);

  // Get jobs
  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    try {
      const response = await api.get("/jobs");

      setJobs(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  // Delete job
  async function deleteJob(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login to continue.");
      return;
    }

    try {
      await api.delete(`/jobs/${id}`);

      setJobs(
        jobs.filter((job) => job.id !== id)
      );

      toast.success("Job deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete job.");
    }
  }

  // Dynamic categories
  const categories = [
    ...new Set(
      jobs
        .map((job) => job.category)
        .filter(Boolean)
    )
  ];

  // Dynamic salaries
  const salaries = [
    ...new Set(
      jobs
        .map((job) => job.salary)
        .filter(Boolean)
    )
  ];

  // Search + Category + Salary
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      job.title
        .toLowerCase()
        .includes(searchText) ||
      job.company
        .toLowerCase()
        .includes(searchText) ||
      job.location
        .toLowerCase()
        .includes(searchText);

    const categoryMatch =
      category === "All" ||
      job.category === category;

    const salaryMatch =
      salary === "All" ||
      job.salary === salary;

    return (
      searchMatch &&
      categoryMatch &&
      salaryMatch
    );
  });

  // Create a copy before sorting
  let finalJobs = [...filteredJobs];

  // Rating high to low
  if (sort === "high") {
    finalJobs.sort(
      (a, b) =>
        Number(b.rating) - Number(a.rating)
    );
  }

  // Rating low to high
  if (sort === "low") {
    finalJobs.sort(
      (a, b) =>
        Number(a.rating) - Number(b.rating)
    );
  }

  return (
    <main>

      {/* Page Heading */}
      <div className="page-heading">

        <p>
          CAREER OPPORTUNITIES
        </p>

        <h1>
          Explore Available Jobs
        </h1>

        <p>
          Discover opportunities and find a role
          that matches your skills.
        </p>

      </div>

      {/* Add Job Button */}
      <Link
        to="/add-job"
        className="add-btn"
      >
        + Add New Job
      </Link>

      {/* Search + Filters */}
      <div className="job-filters">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by job title, company or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Salary */}
        <select
          value={salary}
          onChange={(e) =>
            setSalary(e.target.value)
          }
        >
          <option value="All">
            All Salaries
          </option>

          {salaries.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Rating */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort Rating
          </option>

          <option value="high">
            High To Low
          </option>

          <option value="low">
            Low To High
          </option>
        </select>

      </div>

      {/* Loading */}
      {loading ? (

        <div className="loading">
          <h2>
            Loading Jobs...
          </h2>

          <p>
            Please wait while we fetch available jobs.
          </p>
        </div>

      ) : (

        <div className="jobs-grid">

          {finalJobs.length > 0 ? (

            finalJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={deleteJob}
              />
            ))

          ) : (

            <div className="no-jobs">

              <h2>
                No Jobs Found
              </h2>

              <p>
                Try changing your search,
                category or salary filter.
              </p>

            </div>

          )}

        </div>

      )}

    </main>
  );
}

export default Jobs;