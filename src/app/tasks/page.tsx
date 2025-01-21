
"use client";

import { useState, useEffect } from "react";
import TaskForm from "@/app/components/TaskForm";
import { Task } from "@/app/types";

const TaskManagerPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined); // Updated to match expected type
  const [members, setMembers] = useState<{ id: string; name: string }[]>([]); // To store team members

  useEffect(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);

    // Fetch team members from API
    const fetchMembers = async () => {
      const response = await fetch('/api/team'); // Your API endpoint
      const data = await response.json();
      setMembers(data); // Set the fetched data to state
    };

    fetchMembers();
  }, []);

  const handleAddTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (taskIndex: number) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskIndex: number) => {
    setTaskToEdit(tasks[taskIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Task Manager</h1>
        <TaskForm
          onSubmit={taskToEdit ? (task) => handleAddTask(task) : handleAddTask}
          taskToEdit={taskToEdit}
          members={members} // Pass members data to TaskForm
        />
        <ul className="mt-6 space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-100 hover:bg-gray-200 transition"
              >
                <div>
                  <h2 className="text-gray-800 text-xl font-semibold">
                    {/* Find the member by task.assignTo (id) */}
                    {members.find((member) => member.id === task.assignTo)?.name || "Unknown Member"}
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-600">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTask(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks found. Add your first task!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskManagerPage;

