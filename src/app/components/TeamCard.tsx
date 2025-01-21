import React from 'react';
import { TeamMember } from '@/app/types';

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-amber-500 p-4 rounded-lg shadow-xl mb-6 w-[90%]"> {/* Adjust width here */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Name */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">{member.name}</h1>
        {/* Role */}
        <h2 className="text-lg font-semibold text-gray-700 text-center mt-2">{member.role}</h2>
        {/* Bio */}
        <p className="text-sm text-gray-600 mt-4 text-center italic">{member.bio}</p>
      </div>
    </div>
  );
};

export default TeamCard;

