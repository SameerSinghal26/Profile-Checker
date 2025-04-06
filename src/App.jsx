import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LeetCode from "./components/LeetCode/LeetCode"
import GitHub from "./components/Github/Github"
import Sample from "./components/Sample/Sample"
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleReload = () => {
      navigate("/");
    };
    window.addEventListener("beforeunload", handleReload);
    return () => window.removeEventListener("beforeunload", handleReload);
  }, [navigate]);

  const handleNavigation = (platform) => {
    if (!username){
      return alert("Please enter a username!");
    }
    setLoading(true);
    navigate(`/${platform}/${username}`);
  };

  return (
    <>
      <div className="w-full flex justify-center my-5">
        <h1 className="text-2xl font-bold text-white">Profile Checker</h1>
      </div>
      <div className="flex justify-center items-center space-x-20 bg-gray-600 p-4 my-7-">
        <img
          src="./src/assets/to-do-icon.png"
          alt="LeetCode"
          className="w-16 h-16 object-cover rounded-lg"
          onClick={() => handleNavigation("leetcode")}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="Github"
          className="w-16 h-16 object-cover rounded-lg"
          onClick={() => handleNavigation("github")}
        />
        <img
          src="./src/assets/to-do-icon.png"
          alt="Codeforces"
          className="w-16 h-16 object-cover rounded-lg"
          onClick={() => handleNavigation("sample")}
        />
      </div>
      <div className="flex flex-col items-center gap-4 p-6">
        <input
          type="text"
          placeholder="Enter Username"
          defaultValue={""}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded-md"
        />   
      </div>
    </>
  );
}
export default App;
