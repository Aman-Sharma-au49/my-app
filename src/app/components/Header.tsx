
import Link from 'next/link';

const Header: React.FC = () => {
return (
  <header className="bg-indigo-700 text-white p-6 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="text-lg hover:text-indigo-400 transition-all duration-300">Home</Link>
          </li>
          <li>
            <Link href="/tasks" className="text-lg hover:text-indigo-400 transition-all duration-300">Task Management</Link>
          </li>
        </ul>
      </nav>
    <h1 className="text-3xl font-extrabold tracking-tight">Team Dashboard</h1>

      </div>
  </header>
);

};
export default Header;
