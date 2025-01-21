export async function GET(request) {
  const team = [
    { id: 1, name: 'Aman Sharma', role: 'Frontend Developer', bio: 'Specializes in React and Next.js.' },
    { id: 2, name: 'Rahul Verma', role: 'Backend Developer', bio: 'Expert in Node.js and MongoDB.' },
    { id: 3, name: 'Priya Singh', role: 'UI/UX Designer', bio: 'Focuses on creating user-friendly designs.' },
    { id: 4, name: 'Rohit Mehra', role: 'DevOps Engineer', bio: 'Experienced in cloud infrastructure and CI/CD pipelines.' },
  ];
  return new Response(JSON.stringify(team), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

