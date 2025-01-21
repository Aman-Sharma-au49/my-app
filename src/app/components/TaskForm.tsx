"use client";

import { useState, useEffect } from "react";
import { Task } from "@/app/types";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  taskToEdit?: Task;
  members: { id: string; name: string }[]; 
}

const TaskForm = ({ onSubmit, taskToEdit, members }: TaskFormProps) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Completed">(taskToEdit?.status || "To Do");
  const [assignTo, setAssignTo] = useState(taskToEdit?.assignTo || ""); 

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setAssignTo(taskToEdit.assignTo); 
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && assignTo) {
      onSubmit({ title, description, status, assignTo });
      setTitle("");
      setDescription("");
      setAssignTo("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-gradient-to-br from-purple-600 to-pink-500 p-8 rounded-3xl shadow-xl max-w-lg mx-auto"
    >
      <div className="relative mb-8">
        <label htmlFor="title" className="absolute text-xl font-semibold text-white top-[-12px] left-2 px-2 bg-gradient-to-r from-blue-400 to-teal-300">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-5 rounded-xl border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 text-lg"
          required
        />
      </div>

      <div className="relative mb-8">
        <label htmlFor="description" className="absolute text-xl font-semibold text-white top-[-12px] left-2 px-2 bg-gradient-to-r from-blue-400 to-teal-300">
          Task Description
        </label>
        <textarea
          id="description"
          placeholder="Describe the task in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-5 rounded-xl border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 text-lg"
          required
        ></textarea>
      </div>

      <div className="relative mb-8">
        <label htmlFor="assignTo" className="absolute text-xl font-semibold text-white top-[-12px] left-2 px-2 bg-gradient-to-r from-blue-400 to-teal-300">
          Assign Task To
        </label>
        <select
          id="assignTo"
          value={assignTo}
          onChange={(e) => setAssignTo(e.target.value)}
          className="w-full p-5 rounded-xl border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 text-lg"
          required
        >
          <option value="">Select Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>

      <div className="relative mb-8">
        <label htmlFor="status" className="absolute text-xl font-semibold text-white top-[-12px] left-2 px-2 bg-gradient-to-r from-blue-400 to-teal-300">
          Task Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as "To Do" | "In Progress" | "Completed")}
          className="w-full p-5 rounded-xl border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 text-lg"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full p-4 bg-gradient-to-r from-blue-600 to-teal-400 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition duration-300"
      >
        {taskToEdit ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;

