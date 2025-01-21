"use client";

import { useState, useEffect } from "react";

export default function AmanPage() {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "", bio: "" });
  const [editing, setEditing] = useState(null);

  // Fetch team data from the API
  const fetchTeamData = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Handle adding a new team member
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      const addedMember = await response.json();
      setTeam((prev) => [...prev, addedMember]);
      setNewMember({ name: "", role: "", bio: "" });
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  // Handle editing a team member
  const handleEditMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/team/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const updatedMember = await response.json();
      setTeam((prev) =>
        prev.map((member) =>
          member._id === updatedMember._id ? updatedMember : member
        )
      );
      setEditing(null);
    } catch (error) {
      console.error("Error editing team member:", error);
    }
  };

  // Handle deleting a team member
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/team/${id}`, { method: "DELETE" });
      setTeam((prev) => prev.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  return (
    <div>
      <h1>Team Members</h1>
      <form onSubmit={editing ? handleEditMember : handleAddMember}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editing ? editing.name : newMember.name}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, name: e.target.value })
              : setNewMember({ ...newMember, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={editing ? editing.role : newMember.role}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, role: e.target.value })
              : setNewMember({ ...newMember, role: e.target.value })
          }
          required
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={editing ? editing.bio : newMember.bio}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, bio: e.target.value })
              : setNewMember({ ...newMember, bio: e.target.value })
          }
          required
        ></textarea>
        <button type="submit">{editing ? "Update Member" : "Add Member"}</button>
      </form>
      <div>
        {team.map((member) => (
          <div key={member._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <p>{member.bio}</p>
            <button
              style={{ backgroundColor: "lightblue", marginRight: "5px" }}
              onClick={() => setEditing(member)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: "lightcoral" }}
              onClick={() => handleDelete(member._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

