
'use client';

import React, { useEffect, useState } from 'react';
import TeamCard from '@/app/components/TeamCard';
import { TeamMember } from '@/app/types';

const HomePage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('All');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/team');
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="my-8 flex items-center space-x-10 justify-center">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-10 md:grid-cols-7 gap-6 mt-6">
        {filteredMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

