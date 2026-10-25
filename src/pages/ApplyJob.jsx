import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    qualification: "",
    college: "",
    graduationYear: "",
    skills: "",
    experience: "",
    currentLocation: "",
    noticePeriod: "",
    linkedin: "",
    github: "",
    resume: "",
    coverLetter: ""
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  /* =============================== */
  /* HANDLE INPUT CHANGE */
  /* =============================== */

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  /* =============================== */
  /* HANDLE RESUME */
  /* =============================== */

  function handleResumeChange(e) {
    const file = e.target.files[0];

    if (file) {
      setResumeFile(file);

      setFormData({
        ...formData,
        resume: file.name
      });
    }
  }

  /* =============================== */
  /* SUBMIT APPLICATION */
  /* =============================== */

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to apply.");

      navigate("/login");

      return;
    }

    setSubmitting(true);

    try {
      await api.post("/applications", {
        jobId: id,

        /* User Information */

        applicantId: user.id,

        applicantName:
          formData.fullName,

        applicantEmail:
          formData.email,

        /* Personal Information */

        fullName:
          formData.fullName,

        email:
          formData.email,

        phone:
          formData.phone,

        dateOfBirth:
          formData.dateOfBirth,

        gender:
          formData.gender,

        /* Education */

        qualification:
          formData.qualification,

        college:
          formData.college,

        graduationYear:
          formData.graduationYear,

        /* Professional Information */

        skills:
          formData.skills,

        experience:
          formData.experience,

        currentLocation:
          formData.currentLocation,

        noticePeriod:
          formData.noticePeriod,

        /* Professional Profiles */

        linkedin:
          formData.linkedin,

        github:
          formData.github,

        /* Resume */

        resume:
          formData.resume,

        /* Cover Letter */

        coverLetter:
          formData.coverLetter,

        /* Application Status */

        status: "Applied",

        /* Application Date */

        appliedDate:
          new Date().toISOString()
      });

      toast.success(
        "Your application submitted successfully!"
      );

      /* Go to My Applications */

      setTimeout(() => {
        navigate("/my-applications");
      }, 1500);

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to submit application."
      );

    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="apply-page">

      <div className="apply-container">

        {/* =============================== */}
        {/* HEADER */}
        {/* =============================== */}

        <div className="apply-header">

          <p className="form-label">
            RECRUITPRO
          </p>

          <h1>
            Job Application
          </h1>

          <p>
            Complete your profile and submit
            your application.
          </p>

        </div>


        {/* =============================== */}
        {/* APPLICATION FORM */}
        {/* =============================== */}

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >

          {/* =============================== */}
          {/* PERSONAL INFORMATION */}
          {/* =============================== */}

          <div className="form-section-title">

            <h2>
              Personal Information
            </h2>

            <p>
              Enter your basic personal details.
            </p>

          </div>


          {/* FULL NAME */}

          <div className="form-group">

            <label>
              Full Name *
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PHONE */}

          <div className="form-group">

            <label>
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>


          {/* DATE OF BIRTH */}

          <div className="form-group">

            <label>
              Date of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

          </div>


          {/* GENDER */}

          <div className="form-group">

            <label>
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

              <option value="Prefer not to say">
                Prefer not to say
              </option>

            </select>

          </div>


          {/* =============================== */}
          {/* EDUCATION */}
          {/* =============================== */}

          <div className="form-section-title">

            <h2>
              Education
            </h2>

            <p>
              Provide your educational details.
            </p>

          </div>


          {/* QUALIFICATION */}

          <div className="form-group">

            <label>
              Highest Qualification *
            </label>

            <input
              type="text"
              name="qualification"
              placeholder="Example: B.Tech CSE"
              value={formData.qualification}
              onChange={handleChange}
              required
            />

          </div>


          {/* COLLEGE */}

          <div className="form-group">

            <label>
              College / University
            </label>

            <input
              type="text"
              name="college"
              placeholder="Enter your college or university"
              value={formData.college}
              onChange={handleChange}
            />

          </div>


          {/* GRADUATION YEAR */}

          <div className="form-group">

            <label>
              Graduation Year
            </label>

            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
            >

              <option value="">
                Select Graduation Year
              </option>

              <option value="2026">
                2026
              </option>

              <option value="2025">
                2025
              </option>

              <option value="2024">
                2024
              </option>

              <option value="2023">
                2023
              </option>

              <option value="2022">
                2022
              </option>

              <option value="2021">
                2021
              </option>

              <option value="2020">
                2020
              </option>

            </select>

          </div>


          {/* =============================== */}
          {/* PROFESSIONAL INFORMATION */}
          {/* =============================== */}

          <div className="form-section-title">

            <h2>
              Professional Information
            </h2>

            <p>
              Tell the recruiter about your
              professional background.
            </p>

          </div>


          {/* SKILLS */}

          <div className="form-group">

            <label>
              Skills *
            </label>

            <input
              type="text"
              name="skills"
              placeholder="Example: React, JavaScript, Python, SQL"
              value={formData.skills}
              onChange={handleChange}
              required
            />

          </div>


          {/* EXPERIENCE */}

          <div className="form-group">

            <label>
              Experience *
            </label>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Experience
              </option>

              <option value="Fresher">
                Fresher
              </option>

              <option value="0-1 Years">
                0-1 Years
              </option>

              <option value="1-3 Years">
                1-3 Years
              </option>

              <option value="3-5 Years">
                3-5 Years
              </option>

              <option value="5+ Years">
                5+ Years
              </option>

            </select>

          </div>


          {/* CURRENT LOCATION */}

          <div className="form-group">

            <label>
              Current Location
            </label>

            <input
              type="text"
              name="currentLocation"
              placeholder="Example: Visakhapatnam"
              value={formData.currentLocation}
              onChange={handleChange}
            />

          </div>


          {/* NOTICE PERIOD */}

          <div className="form-group">

            <label>
              Notice Period
            </label>

            <select
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleChange}
            >

              <option value="">
                Select Notice Period
              </option>

              <option value="Immediate">
                Immediate
              </option>

              <option value="15 Days">
                15 Days
              </option>

              <option value="30 Days">
                30 Days
              </option>

              <option value="60 Days">
                60 Days
              </option>

              <option value="90 Days">
                90 Days
              </option>

            </select>

          </div>


          {/* =============================== */}
          {/* PROFESSIONAL PROFILES */}
          {/* =============================== */}

          <div className="form-section-title">

            <h2>
              Professional Profiles
            </h2>

            <p>
              Add your LinkedIn and GitHub profiles.
            </p>

          </div>


          {/* LINKEDIN */}

          <div className="form-group">

            <label>
              LinkedIn Profile
            </label>

            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/your-profile"
              value={formData.linkedin}
              onChange={handleChange}
            />

          </div>


          {/* GITHUB */}

          <div className="form-group">

            <label>
              GitHub Profile
            </label>

            <input
              type="url"
              name="github"
              placeholder="https://github.com/your-profile"
              value={formData.github}
              onChange={handleChange}
            />

          </div>


          {/* =============================== */}
          {/* RESUME & COVER LETTER */}
          {/* =============================== */}

          <div className="form-section-title">

            <h2>
              Resume & Cover Letter
            </h2>

            <p>
              Upload your resume and introduce
              yourself to the recruiter.
            </p>

          </div>


          {/* RESUME */}

          <div className="form-group">

            <label>
              Resume *
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              required
            />

            {resumeFile && (
              <p className="selected-file">
                Selected: {resumeFile.name}
              </p>
            )}

          </div>


          {/* COVER LETTER */}

          <div className="form-group">

            <label>
              Cover Letter
            </label>

            <textarea
              name="coverLetter"
              placeholder="Write a short cover letter..."
              rows="6"
              value={formData.coverLetter}
              onChange={handleChange}
            />

          </div>


          {/* =============================== */}
          {/* SUBMIT BUTTON */}
          {/* =============================== */}

          <button
            type="submit"
            className="submit-application-btn"
            disabled={submitting}
          >

            {submitting
              ? "Submitting..."
              : "Submit Application"}

          </button>

        </form>

      </div>

    </main>
  );
}

export default ApplyJob;