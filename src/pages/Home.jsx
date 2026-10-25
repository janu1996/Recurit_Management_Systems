import { Link } from "react-router-dom";

function Home() {
  return (
    <main>

      {/* Section 1 - Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">SMART RECRUITMENT PLATFORM</p>

          <h1>
            Find the Right Talent.
            <br />
            Build the Right Future.
          </h1>

          <p>
            Connect talented candidates with companies and discover
            opportunities that match your skills and career goals.
          </p>

          <div className="hero-buttons">
            <Link
  to="/jobs"
  className="primary-button"
>
  Explore Jobs
</Link>

            <Link
  to="/register"
  className="secondary-button"
>
  Get Started
</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-icon">💼</div>
          <h3>Find Your Next Opportunity</h3>
          <p>
            Explore jobs from different companies and take the next
            step in your career.
          </p>
        </div>
      </section>

      {/* Section 2 - Features */}
      <section className="features-section">
        <div className="section-heading">
          <p>OUR PLATFORM</p>
          <h2>Everything You Need for Recruitment</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Find Jobs</h3>
            <p>
              Search and explore job opportunities based on your
              skills and interests.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Find Talent</h3>
            <p>
              Recruiters can discover candidates and manage
              recruitment activities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Easy Applications</h3>
            <p>
              Apply for suitable jobs and keep track of your
              application status.
            </p>
          </div>

        </div>
      </section>

      {/* Section 3 - How It Works */}
      <section className="how-section">
        <div className="section-heading">
          <p>SIMPLE PROCESS</p>
          <h2>How Recruitment Works</h2>
        </div>

        <div className="steps-grid">

          <div className="step-card">
            <span>01</span>
            <h3>Create Account</h3>
            <p>
              Register as a candidate or recruiter.
            </p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Explore Opportunities</h3>
            <p>
              Browse available jobs and find suitable candidates.
            </p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Apply or Recruit</h3>
            <p>
              Candidates apply and recruiters manage applications.
            </p>
          </div>

        </div>
      </section>

      {/* Section 4 - Why Choose Us */}
      <section className="why-section">
        <div>
          <p className="hero-small">WHY RECRUITPRO?</p>

          <h2>
            Making Recruitment
            <br />
            Simple & Organized
          </h2>
        </div>

        <div className="why-content">
          <p>
            Our recruitment management system brings job seekers
            and recruiters together in one organized platform.
          </p>

          <div className="why-points">
            <div>✓ Easy Job Discovery</div>
            <div>✓ Organized Applications</div>
            <div>✓ Simple Recruitment Management</div>
            <div>✓ User-Friendly Experience</div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;