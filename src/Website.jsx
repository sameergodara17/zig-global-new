
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

function Header(){
  const navigate = useNavigate();
  const scrollTo = (id)=>{
    navigate("/");
    setTimeout(()=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});},120);
  };
  return(
    <>
      <div className="fixed top-0 w-full bg-black text-white text-center py-2 text-sm z-50">
        Limited Free Consultation Slots Available
      </div>
      <header className="fixed top-8 w-full flex justify-between items-center px-10 py-5 border-b bg-white z-50">
        <Link to="/" className="text-2xl font-bold">Zig Global</Link>
        <nav className="hidden md:flex gap-8 font-medium">
          <Link to="/">Home</Link>
          <button onClick={()=>scrollTo("services")}>Services</button>
          <button onClick={()=>scrollTo("calculator")}>Calculator</button>
          <Link to="/blogs">Blogs</Link>
        </nav>
      </header>
    </>
  )
}

function Home(){
  const [estimate,setEstimate]=useState({});
  return(
    <div className="min-h-screen pt-40 bg-gray-50 text-gray-900">

      <SEO title="UAE Company Formation | Zig Global"
      description="Start your UAE business with Zig Global. Company formation, visas, banking and compliance support."/>

      <section className="text-center py-32 px-6">
        <motion.h2 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
        className="text-5xl md:text-7xl font-bold mb-8">
        UAE Company Formation Experts
        </motion.h2>

        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-600">
        We help entrepreneurs launch companies in UAE freezones.
        </p>
      </section>

      <section id="services" className="py-24 text-center">
        <h3 className="text-4xl font-bold mb-14">Everything You Need To Launch</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {["Company Formation","Visas","Bank Account","Accounting","Office Space","Consulting"].map(s=>(
          <div key={s} className="bg-white p-10 rounded-2xl shadow">
          <h4 className="text-xl font-semibold">{s}</h4>
          </div>
        ))}
        </div>
      </section>

      <section id="calculator" className="py-24 text-center">
      <h3 className="text-4xl font-bold mb-10">Setup Cost Calculator</h3>

      <select onChange={e=>setEstimate({...estimate,visas:Number(e.target.value)})}
      className="border p-3 rounded-xl">
        <option value="0">0 Visas</option>
        <option value="1">1 Visa</option>
        <option value="2">2 Visas</option>
      </select>

      <div className="mt-10 text-3xl font-bold">
        {estimate.visas?`Estimated AED ${5000+estimate.visas*3000}`:"Select values"}
      </div>
      </section>
    </div>
  )
}

const blogs={
"uae-company-guide":{title:"UAE Company Formation Guide",content:"Complete guide to starting business in UAE."},
"freezone-benefits":{title:"Freezone Benefits",content:"Why freezones are best for founders."},
"uae-tax":{title:"UAE Tax Guide",content:"Corporate tax explained."}
}

function BlogList(){
return(
<div className="pt-40 p-10 max-w-4xl mx-auto">
<h1 className="text-5xl font-bold mb-10">Blogs</h1>
{Object.entries(blogs).map(([slug,b])=>(
<Link key={slug} to={`/blogs/${slug}`} className="block p-6 mb-4 bg-white shadow rounded-xl">
{b.title}
</Link>
))}
</div>
)}

function BlogPage(){
const {slug}=useParams();
const blog=blogs[slug];
if(!blog) return <div className="pt-40 p-10">Not Found</div>;
return(
<div className="pt-40 p-10 max-w-3xl mx-auto">
<h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
<p>{blog.content}</p>
</div>
)}

export default function Website(){
return(
<Router>
<Header/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/blogs" element={<BlogList/>}/>
<Route path="/blogs/:slug" element={<BlogPage/>}/>
</Routes>
</Router>
)}
