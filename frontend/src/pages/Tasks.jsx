import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const statusOptions = ["Pending", "In Progress", "Completed", "On Hold"];

const Tasks = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const fetchProject = async () => {
    try {
      const res = await API.get("/project/get");
      const found = res.data.data.find((p) => p._id === projectId);
      setProject(found || null);
    } catch {
      setError("Failed to load project details.");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/task/${projectId}`);
      setTasks(res.data.data);
    } catch {
      setError("Failed to load tasks.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");

    try {
      if (editingId) {
        const res = await API.put(`/task/${editingId}`, form);
        setMsg(res.data.message);
      } else {
        const res = await API.post(`/task/create/${projectId}`, form);
        setMsg(res.data.message);
      }

      setForm({ title: "", description: "", status: "Pending" });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      setError(err?.response?.data?.message || "Error saving task");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/task/${id}`);
      fetchTasks();
    } catch {
      alert("Failed to delete task.");
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [projectId]);

  return (
    <div className="max-w-3xl mx-auto p-4 border my-4">
      {/* Header with back button and project title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {project?.title ? `Tasks for: ${project.title}` : "Loading project..."}
        </h2>
        <button
          onClick={() => navigate("/projects")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
        >
          ← Back
        </button>
      </div>

      {/* Error and message */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {msg && <p className="text-green-500 mb-2">{msg}</p>}

      {/* Task form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="border p-3  bg-green-100 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded">{task.status}</span>
            </div>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Created: {new Date(task.createdAt).toLocaleString()}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
