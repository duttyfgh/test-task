import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Accounts from "./pages/Acounts"
import Campaigns from "./pages/Campaigns"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      
      <div className="pt-[100px]">
        <Routes>
          <Route path="/" element={<Accounts />} />
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/campaigns/:id" element={<Campaigns/>}/>
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  )
}

export default App