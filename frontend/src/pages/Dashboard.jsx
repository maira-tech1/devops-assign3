import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  
  // New States for Modules
  const [activeTab, setActiveTab] = useState("tasks");
  const [employees, setEmployees] = useState([
    { id: 1, name: "Ali Khan", role: "Software Engineer", dept: "Engineering" },
    { id: 2, name: "Ayesha Malik", role: "HR Manager", dept: "HR" },
    { id: 3, name: "Zainab Ahmed", role: "Product Manager", dept: "Product" }
  ]);
  const [inventory, setInventory] = useState([
    { id: 1, item: "MacBook Pro", stock: 15, status: "In Stock" },
    { id: 2, item: "Office Chairs", stock: 3, status: "Low Stock" },
    { id: 3, item: "Monitors", stock: 0, status: "Out of Stock" }
  ]);
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpRole, setNewEmpRole] = useState("");
  
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3000/api/tasks", {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:3000/api/tasks/stats", {
      headers: { Authorization: token },
    });
    setStats(res.data);
  };

  const addTask = async () => {
    if (!title) return alert("Enter task title");

    await axios.post(
      "http://localhost:3000/api/tasks",
      { title, deadline },
      { headers: { Authorization: token } }
    );

    setTitle("");
    setDeadline("");
    fetchTasks();
    fetchStats();
  };

  const completeTask = async (id) => {
    await axios.patch(
      `http://localhost:3000/api/tasks/${id}/complete`,
      {},
      { headers: { Authorization: token } }
    );
    fetchTasks();
    fetchStats();
  };

  const addEmployee = () => {
    if (!newEmpName) return alert("Enter employee name");
    setEmployees([...employees, { id: Date.now(), name: newEmpName, role: newEmpRole || "Staff", dept: "General" }]);
    setNewEmpName("");
    setNewEmpRole("");
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
      headers: { Authorization: token },
    });
    fetchTasks();
    fetchStats();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDeadline(task.deadline?.slice(0, 10));
  };

  const saveEdit = async (id) => {
    await axios.put(
      `http://localhost:3000/api/tasks/${id}/edit`,
      { title: editTitle, deadline: editDeadline },
      { headers: { Authorization: token } }
    );

    setEditId(null);
    fetchTasks();
    fetchStats();
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white/10 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center border-b border-white/20">
        <div className="flex items-center gap-2">
          <span className="text-2xl drop-shadow-md">⚡</span>
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
            Nexus ERP System
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/90 hover:text-white font-medium transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 shadow-sm"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        
        {/* Sidebar Modules (FYP Level Simulation) */}
        <div className="w-1/4 bg-white/95 backdrop-blur-md shadow-xl border border-white/50 rounded-xl p-4 flex flex-col gap-2 h-fit">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2 px-2">ERP Modules</h3>
          <div 
            onClick={() => setActiveTab('tasks')}
            className={`p-3 rounded-lg font-semibold cursor-pointer transition ${activeTab === 'tasks' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            📊 Task Management
          </div>
          <div 
            onClick={() => setActiveTab('employees')}
            className={`p-3 rounded-lg font-semibold cursor-pointer transition ${activeTab === 'employees' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            👥 Employee Directory
          </div>
          <div 
            onClick={() => setActiveTab('inventory')}
            className={`p-3 rounded-lg font-semibold cursor-pointer transition ${activeTab === 'inventory' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            📦 Inventory Control
          </div>
          <div 
            onClick={() => setActiveTab('projects')}
            className={`p-3 rounded-lg font-semibold cursor-pointer transition ${activeTab === 'projects' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            💼 Client Projects
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-3/4">
          
        {activeTab === 'tasks' && (
          <>
          {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-md shadow-xl border border-white/50 p-6 rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <h3 className="text-gray-500 font-bold text-sm tracking-wide uppercase mb-2 drop-shadow-sm">Total Tasks</h3>
            <p className="text-4xl font-extrabold text-indigo-800 drop-shadow-sm">{stats.total || 0}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md shadow-xl border border-white/50 p-6 rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <h3 className="text-gray-500 font-bold text-sm tracking-wide uppercase mb-2 drop-shadow-sm">Completed</h3>
            <p className="text-4xl font-extrabold text-emerald-500 drop-shadow-sm">{stats.completed || 0}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md shadow-xl border border-white/50 p-6 rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <h3 className="text-gray-500 font-bold text-sm tracking-wide uppercase mb-2 drop-shadow-sm">Pending</h3>
            <p className="text-4xl font-extrabold text-amber-500 drop-shadow-sm">{stats.pending || 0}</p>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="bg-white/95 backdrop-blur-md shadow-xl border border-white/50 p-6 rounded-xl mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4 drop-shadow-sm">Create New Task</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              id="taskTitle"
              placeholder="e.g., Setup CI/CD Pipeline..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 focus:bg-white text-gray-800 transition-colors shadow-inner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              id="taskDeadline"
              type="date"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 focus:bg-white text-gray-800 transition-colors shadow-inner"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <button
              id="addTaskBtn"
              onClick={addTask}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Active Tasks Grid */}
        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Active Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks
            .filter((task) => task.status !== "completed")
            .map((task) => (
            <div
              key={task._id}
              className="bg-white/95 backdrop-blur-md shadow-xl border border-white/50 p-6 rounded-xl flex flex-col hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              {editId === task._id ? (
                <div className="flex flex-col gap-3">
                  <input
                    id="editTitle"
                    className="p-3 border border-gray-300 rounded-lg text-gray-700 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <input
                    id="editDeadline"
                    type="date"
                    className="p-3 border border-gray-300 rounded-lg text-gray-700 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                  />

                  <div className="flex gap-2 justify-end mt-2">
                    <button
                      onClick={() => setEditId(null)}
                      className="text-gray-500 hover:text-gray-700 px-4 py-2 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      id="saveEditBtn"
                      onClick={() => saveEdit(task._id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium rounded-lg shadow-sm transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 break-words">{task.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority || 'Normal'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 mb-6 flex-1">
                    {task.deadline && (
                      <p className="flex items-center gap-1 mb-1">
                        ⏱ Deadline: {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    )}
                    <p className="capitalize text-amber-600 bg-amber-50 w-fit px-2 py-1 rounded inline-block mt-2">
                      In Progress
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
                    <button
                      id="completeBtn"
                      onClick={() => completeTask(task._id)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-3 py-2 rounded-lg transition-colors flex items-center justify-center shadow-sm"
                      title="Mark as Completed"
                    >
                      ✓ Complete
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        id="editBtn"
                        onClick={() => startEdit(task)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors"
                        title="Edit Task"
                      >
                        ✏️
                      </button>

                      <button
                        id="deleteBtn"
                        onClick={() => deleteTask(task._id)}
                        className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                        title="Delete Task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          
          {tasks.filter((task) => task.status !== "completed").length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-white/60 rounded-xl bg-white/40 backdrop-blur-md shadow-inner">
              <span className="text-4xl mb-4 block drop-shadow-md">🎉</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2 drop-shadow-sm">All caught up!</h3>
              <p className="text-gray-700 font-medium">You have no active tasks left to do on the dashboard.</p>
            </div>
          )}
        </div>
        </>)}

        {activeTab === 'employees' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Employee Directory</h2>
            <div className="bg-white/95 backdrop-blur-md shadow-xl border border-white/50 p-6 rounded-xl mb-8 flex gap-4">
              <input
                placeholder="Employee Name..."
                className="flex-1 p-3 border border-gray-300 rounded-lg shadow-inner bg-white/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors text-gray-800"
                value={newEmpName}
                onChange={(e) => setNewEmpName(e.target.value)}
              />
              <input
                placeholder="Role..."
                className="flex-1 p-3 border border-gray-300 rounded-lg shadow-inner bg-white/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors text-gray-800"
                value={newEmpRole}
                onChange={(e) => setNewEmpRole(e.target.value)}
              />
              <button onClick={addEmployee} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Add Employee</button>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/50 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50/80 border-b border-indigo-100 text-sm tracking-wide text-indigo-800 uppercase">
                    <th className="p-4 font-bold">Name</th>
                    <th className="p-4 font-bold">Role / Position</th>
                    <th className="p-4 font-bold">Department</th>
                    <th className="p-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id} className="border-b last:border-b-0 hover:bg-indigo-50/50 transition border-gray-200">
                      <td className="p-4 font-bold text-gray-800">{emp.name}</td>
                      <td className="p-4 text-gray-600 font-medium">{emp.role}</td>
                      <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm">{emp.dept}</span></td>
                      <td className="p-4">
                        <button onClick={() => deleteEmployee(emp.id)} className="text-red-500 hover:text-red-700 font-bold hover:underline transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Inventory Control System</h2>
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/50 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50/80 border-b border-indigo-100 text-sm tracking-wide text-indigo-800 uppercase">
                    <th className="p-4 font-bold">Item Name</th>
                    <th className="p-4 font-bold">Stock Quantity</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(inv => (
                    <tr key={inv.id} className="border-b last:border-b-0 hover:bg-indigo-50/50 transition border-gray-200">
                      <td className="p-4 font-bold text-gray-800">{inv.item}</td>
                      <td className="p-4 text-gray-600 font-medium">{inv.stock} Units</td>
                      <td className="p-4">
                        <span className={`px-3 py-1.5 rounded-md text-xs font-bold shadow-sm ${inv.stock > 10 ? 'bg-emerald-100 text-emerald-700' : inv.stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-2xl shadow-inner border-2 border-white/60 border-dashed">
            <span className="text-7xl mb-4 block drop-shadow-lg">🚧</span>
            <h2 className="text-3xl font-extrabold text-white drop-shadow-md">Client Projects Module</h2>
            <p className="text-white/90 font-medium mt-3 text-lg drop-shadow-sm">This module is currently under development for Phase 2.</p>
          </div>
        )}
        
        </div>
      </div>
    </div>
  );
}