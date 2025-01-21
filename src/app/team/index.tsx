"use-client "
import { useEffect, useState } from 'react';
import TeamCard from '@/app/components/TeamCard';
import { TeamMember } from '@/app/types';

const HomePage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch('/api/team');
      const data = await response.json();
      setTeamMembers(data);
    };
    fetchTeam();
  }, []);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
        placeholder="Search by name or role"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
