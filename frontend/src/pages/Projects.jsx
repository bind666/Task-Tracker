/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await API.get("/project/get");
      setProjects(res.data.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch projects");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await API.post("/project/create", { title });
      setMessage(res.data.message);
      setTitle("");
      fetchProjects();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/project/${id}`);
      fetchProjects();
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setEditTitle(project.title);
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/project/${id}`, { title: editTitle });
      setEditId(null);
      setEditTitle("");
      fetchProjects();
    } catch (err) {
      alert("Failed to update project");
    }
  };

  const handleProjectClick = (projectId) => {
    if (editId) return; // don't allow navigation while editing
    navigate(`/tasks/${projectId}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Projects</h2>

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        {message && <p className="text-green-500 mb-3 text-center">{message}</p>}

        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={projects.length >= 4}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Create
          </button>
        </form>

        {projects.length >= 4 && (
          <p className="text-orange-600 text-sm mb-2 text-center">
            ⚠️ You can only create up to 4 projects.
          </p>
        )}

        {projects.length > 0 && (
          <p className="text-sm text-blue-700 mb-4 text-center font-medium">
            📌 Click on a project card to view and add tasks.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="relative group bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200"
            >
              {editId === project._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border rounded focus:outline-none"
                  />
                  <button
                    onClick={() => handleUpdate(project._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setEditTitle("");
                    }}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div onClick={() => handleProjectClick(project._id)} className="cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    📁 {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 italic">
                    Created on:{" "}
                    <span className="text-gray-700 font-medium">
                      {new Date(project.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              )}

              {editId !== project._id && (
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-yellow-500 hover:text-yellow-600 text-sm"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
