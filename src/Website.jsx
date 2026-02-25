
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

function Home() {
  const [estimate, setEstimate] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const calendly = "https://calendly.com/sg-zigglobal/30min";

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    await fetch("https://formsubmit.co/ajax/sg@zigglobal.com", { method:"POST", body:data });
    setSubmitted(true);
    e.target.reset();
  }

  return (
    <div className="min-h-screen pt-40 bg-[#f4f7fb] text-[#0B1F3A]">
      <SEO title="UAE Company Formation Services | Zig Global"
           description="Start your UAE business with Zig Global." />

      <section className="text-center py-32 px-6">
        <motion.h2 initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }}
          className="text-5xl md:text-7xl font-bold mb-8">
          UAE Company Formation Experts
        </motion.h2>

        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-600">
          We help entrepreneurs register companies in Dubai, Sharjah and all UAE freezones.
        </p>

        <a href={calendly} target="_blank" rel="noopener noreferrer"
          className="rounded-full px-10 py-4 bg-[#0B1F3A] text-white text-lg font-semibold">
          Book Free Consultation
        </a>
      </section>

      <section id="services" className="py-24">
        <h3 className="text-4xl font-bold text-center mb-14">Everything You Need To Launch</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {["Company Formation","Visa Processing","Corporate Bank Account","Accounting & VAT","Office Space","Business Consulting"].map(service => (
            <div key={service} className="bg-white rounded-2xl p-10 text-center shadow">
              <h4 className="text-xl font-semibold">{service}</h4>
            </div>
          ))}
        </div>
      </section>

      <section id="calculator" className="py-24 bg-white text-center">
        <h3 className="text-4xl font-bold mb-10">UAE Company Setup Cost Calculator</h3>

        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10">
          <div className="grid md:grid-cols-2 gap-6 text-left">

            <select onChange={e=>setEstimate(p=>({...p,type:e.target.value}))} className="border p-3 rounded-xl">
              <option value="freelancer">Freelancer</option>
              <option value="startup">Startup</option>
              <option value="trading">Trading</option>
              <option value="consultancy">Consultancy</option>
            </select>

            <select onChange={e=>setEstimate(p=>({...p,visas:Number(e.target.value)}))} className="border p-3 rounded-xl">
              <option value="0">0 visas</option>
              <option value="1">1 visa</option>
              <option value="2">2 visas</option>
            </select>

          </div>

          <button onClick={()=>{
            let price=5500;
            if(estimate.type==="startup")price+=2000;
            if(estimate.type==="trading")price+=4000;
            if(estimate.type==="consultancy")price+=2500;
            price+=(estimate.visas||0)*3000;
            setEstimate(p=>({...p,result:price}));
          }}
          className="mt-10 bg-[#0B1F3A] text-white px-10 py-4 rounded-full font-semibold">
            Calculate Estimate
          </button>

          {estimate.result && (
            <div className="mt-10 text-3xl font-bold text-[#0FA958]">
              AED {estimate.result.toLocaleString()}
            </div>
          )}
        </div>
      </section>

      <section className="py-24">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid gap-6 px-6">
            <input name="name" placeholder="Full Name" required className="border p-4 rounded-xl"/>
            <input name="email" placeholder="Email" required className="border p-4 rounded-xl"/>

            <div className="grid grid-cols-3 gap-3">
              <input name="code" placeholder="Code" required className="border p-4 rounded-xl"/>
              <input name="phone" placeholder="Mobile Number" required className="border p-4 rounded-xl col-span-2"/>
            </div>

            <button className="rounded-full py-4 bg-[#0FA958] text-white text-lg font-semibold">
              Submit Inquiry
            </button>
          </form>
        ) : <div className="text-center text-2xl text-green-600">✓ We will contact you shortly.</div>}
      </section>
    </div>
  );
}

const blogs = {
  "uae-company-formation-guide":{
    title:"Complete UAE Company Formation Guide",
    image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    content:"Starting a business in UAE is highly beneficial due to tax advantages and global credibility."
  },
  "freezone-vs-mainland":{
    title:"Freezone vs Mainland UAE",
    image:"https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    content:"Choosing between freezone and mainland depends on target market and expansion plans."
  }
};

function BlogList(){
  return(
    <div className="pt-40 p-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-10">Business Setup Guides</h1>
      {Object.entries(blogs).map(([slug,b])=>(
        <Link key={slug} to={`/blogs/${slug}`} className="block p-6 mb-4 bg-white shadow rounded-xl">
          {b.title}
        </Link>
      ))}
    </div>
  )
}

function BlogPage(){
  const {slug}=useParams();
  const blog=blogs[slug];
  if(!blog) return <div className="p-10 pt-40">Not Found</div>;

  return(
    <div className="pt-40 p-10 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold mb-6">{blog.title}</h1>
      <img src={blog.image} className="w-full rounded-2xl mb-8"/>
      <div className="text-lg whitespace-pre-line">{blog.content}</div>
    </div>
  )
}

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
  )
}
