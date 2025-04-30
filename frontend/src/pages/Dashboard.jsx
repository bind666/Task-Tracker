import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to Your Dashboard
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Manage your projects, tasks, and profile with ease.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/projects"
            className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg text-center font-semibold shadow transition"
          >
            Projects
          </Link>

          <Link
            to="/tasks"
            onClick={(e) => {
              e.preventDefault();
              alert("Select a project first to view tasks.");
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg text-center font-semibold shadow transition"
          >
            Tasks
          </Link>

          <Link
            to="/profile"
            className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg text-center font-semibold shadow transition"
          >
            Profile
          </Link>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
