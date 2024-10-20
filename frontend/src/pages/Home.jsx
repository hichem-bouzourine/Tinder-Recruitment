// src/pages/Home.js
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
    return (
        <div className="bg-gray-50">
            <Navbar />
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-around">
                <div className="text-center md:text-left max-w-lg flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Find Your Ideal Finance <span className="text-blue-600">Internship</span> Today
                    </h1>
                    <p className="text-gray-600 mt-4">
                        Explore curated opportunities and insights from the finance industry.
                    </p>
                    <Link to="/offers" className="mt-6 inline-block w-fit bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                        Get Started
                    </Link>
                </div>
                <div className="mt-8 md:mt-0">
                    <img src="src/assets/computer.png" alt="Internship Illustration" className="w-full max-w-sm" />
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Find Your Perfect Finance Internship
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Who is this platform suitable for?
                    </p>
                    <div className="mt-12 flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
                        <FeatureCard title="Students and Graduates" description="Explore finance internships tailored to your career goals." />
                        <FeatureCard title="Finance Companies" description="Find top talent for your finance teams and streamline the hiring process." />
                        <FeatureCard title="Universities and Colleges" description="Partner with us to help your students connect with the best internship opportunities." />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ title, description }) {
    return (
        <div className="bg-gray-50 p-8 rounded shadow hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600">{title}</h3>
            <p className="text-gray-600 mt-4">{description}</p>
        </div>
    );
}

export default Home;
