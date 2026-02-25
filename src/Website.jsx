import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
function Home(){return(<div className="min-h-screen pt-32 text-center">
<h1 className="text-5xl font-bold mb-6">UAE Company Formation Experts</h1>
<p className="mb-10">We help entrepreneurs launch companies in UAE.</p>
<a className="bg-black text-white px-6 py-3 rounded-full">Book Consultation</a>
</div>)}
function Blogs(){return(<div className="pt-32 text-center"><h1 className="text-4xl font-bold">Blogs</h1></div>)}
function Header(){return(<header className="fixed top-0 w-full bg-white border-b p-4 flex justify-between">
<Link to="/" className="font-bold">Zig Global</Link>
<nav className="flex gap-6"><Link to="/">Home</Link><Link to="/blogs">Blogs</Link></nav>
</header>)}
export default function Website(){return(<Router><Header/><Routes>
<Route path="/" element={<Home/>}/>
<Route path="/blogs" element={<Blogs/>}/>
</Routes></Router>)}