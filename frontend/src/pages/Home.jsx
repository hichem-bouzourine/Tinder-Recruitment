import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaGraduationCap, FaBuilding, FaUniversity } from 'react-icons/fa'; // Import icons

function Home() {
    return (
        <div className="bg-gray-50">
            <Navbar />

            {/* Hero Section with image background */}
            <section 
                className="relative bg-blue-800 text-white py-32"
                style={{
                    backgroundImage: "url('src/assets/buildings.jpg')",  // Remplace par ton image si nécessaire
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",  // Pour obtenir l'effet de transparence bleu
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold leading-tight">
                        Find Your Ideal Finance <span className="text-white">Internship</span> Today
                    </h1>
                    <p className="text-lg mt-4 max-w-lg mx-auto">
                        Explore curated opportunities and insights from the finance industry.
                    </p>
                    <Link to="/offers" className="mt-6 inline-block bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition">
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section with icons */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Find Your Perfect Finance Internship
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-lg mx-auto">
                        Who is this platform suitable for?
                    </p>
                    <div className="mt-12 flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
                        <FeatureCard 
                            title="Students and Graduates" 
                            description="Explore finance internships tailored to your career goals."
                            icon={<FaGraduationCap className="w-10 h-10 text-blue-600" />} // Adding icon
                        />
                        <FeatureCard 
                            title="Finance Companies" 
                            description="Find top talent for your finance teams and streamline the hiring process."
                            icon={<FaBuilding className="w-10 h-10 text-blue-600" />} // Adding icon
                        />
                        <FeatureCard 
                            title="Universities and Colleges" 
                            description="Partner with us to help your students connect with the best internship opportunities."
                            icon={<FaUniversity className="w-10 h-10 text-blue-600" />} // Adding icon
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ title, description, icon }) {
    return (
        <div className="bg-white p-8 rounded shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
            <div className="mb-4">
                {icon} {/* Displaying the icon */}
            </div>
            <h3 className="text-2xl font-semibold text-blue-600">{title}</h3>
            <p className="text-gray-600 mt-4">{description}</p>
        </div>
    );
}

export default Home;
