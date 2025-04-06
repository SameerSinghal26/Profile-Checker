import { useState } from "react";

const GitHubProfile = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async () => {
    if (!username) {
      alert("Please enter a GitHub username!");
      return;
    }
    
    setLoading(true);
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const user = await userResponse.json();

      if (user.message === "Not Found") {
        alert("User not found!");
        setLoading(false);
        return;
      }

      setUserData(user);

      // Fetch organizations
      const orgResponse = await fetch(user.organizations_url);
      const orgData = await orgResponse.json();
      setOrganizations(orgData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const fetchRepositories = async () => {
    if (!userData?.repos_url) return;

    try {
      const repoResponse = await fetch(userData.repos_url);
      const repoData = await repoResponse.json();
      setRepositories(repoData);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {repositories.length > 0 && (
  <div className="mt-6 flex justify-center">
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
      <h3 className="text-lg font-bold text-white border-b border-gray-600 pb-2 text-center">
        Repositories
      </h3>
      
      {/* Pagination State */}
      <div className="space-y-3 mt-4">
        {repositories.slice(startIndex, startIndex + 5).map((repo) => (
          <div
            key={repo.id}
            className="flex justify-between items-center bg-gray-700 p-2 rounded-md shadow-sm"
          >
            {/* Repo Name & Created Date */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-white font-medium">{repo.name}</span>
              <span className="text-gray-400">[ {repo.created_at.slice(0, 10)} ]</span>
            </div>

            {/* GitHub Link with Icon */}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
                alt="GitHub" 
                className="w-4 h-4"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {repositories.length > 5 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setStartIndex((prev) => Math.max(prev - 5, 0))}
            disabled={startIndex === 0}
            className="bg-gray-600 px-3 py-1 rounded-md text-white disabled:opacity-50"
          >
            Previous
          </button>
          
          <button
            onClick={() => setStartIndex((prev) => Math.min(prev + 5, repositories.length - 5))}
            disabled={startIndex + 5 >= repositories.length}
            className="bg-gray-600 px-3 py-1 rounded-md text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default GitHubProfile;
