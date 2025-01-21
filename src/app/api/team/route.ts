import { NextResponse } from "next/server";

const teamData = [
  {
    id: '1',
    name: 'Aman Sharma',
    role: 'Project Manager',
    bio: 'Experienced Project Manager with a track record of successful project delivery and team leadership.'
  },
  {
    id: '2',
    name: 'Kavita Joshi',
    role: 'Data Analyst',
    bio: 'Detail-oriented Data Analyst specializing in data visualization and insights generation.'
  },
  {
    id: '3',
    name: 'Anuj Kumar',
    role: 'Cybersecurity Expert',
    bio: 'Dedicated professional focused on protecting organizations from security breaches and cyber threats.'
  },
  {
    id: '4',
    name: 'Rahul Ahlawat',
    role: 'AI Specialist',
    bio: 'Innovative AI Specialist driving machine learning and artificial intelligence advancements.'
  },
  {
    id: '5',
    name: 'Arun Mehta',
    role: 'Cloud Architect',
    bio: 'Experienced Cloud Architect designing and implementing scalable cloud solutions.'
  }
];

export async function GET() {
  return NextResponse.json(teamData);
}
