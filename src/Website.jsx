import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

function SEO({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
  return null;
}

function Header() {
  const navigate = useNavigate();
  const calendly = "https://calendly.com/sg-zigglobal/30min";
  const scrollTo = (id) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <>
      <div className="fixed top-0 w-full bg-[#0B1F3A] text-white text-center py-2 text-sm z-50">
        Limited Free Consultation Slots Available This Week
      </div>

      <header className="fixed top-8 w-full flex justify-between items-center px-10 py-5 border-b bg-white z-50">
        <Link to="/" className="text-2xl font-bold">Zig Global</Link>

        <nav className="hidden md:flex gap-8 font-medium">
          <Link to="/">Home</Link>
          <button onClick={() => scrollTo("services")}>Services</button>
          <button onClick={() => scrollTo("calculator")}>Calculator</button>
          <Link to="/blogs">Blogs</Link>
        </nav>

        <a href={calendly} target="_blank" rel="noopener noreferrer"
           className="rounded-full px-6 py-2 bg-[#0B1F3A] text-white font-semibold">
          Book Call
        </a>
      </header>
    </>
  );
}

function Home(){
return(
<div className="pt-40 text-center">
<h1 className="text-5xl font-bold">Zig Global Website</h1>
<p className="mt-6">Your production site is ready.</p>
</div>
)}

export default function Website(){
return(
<Router>
<>
<Header/>
<Routes>
<Route path="/" element={<Home/>}/>
</Routes>
</>
</Router>
)}