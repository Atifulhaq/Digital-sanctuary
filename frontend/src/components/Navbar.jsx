import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="font-bold">Digital Sanctuary</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {!isAuthenticated && <Link to="/auth">Login/Register</Link>}
        {isAuthenticated && (
          <>
            <Link to="/questionnaire">Questionnaire</Link>
            <Link to="/dashboard">Reports</Link>
            <button onClick={logout} className="px-2 py-1 bg-red-500 text-white rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
