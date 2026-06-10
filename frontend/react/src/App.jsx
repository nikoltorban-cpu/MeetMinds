import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/MainPage";
import Following from "./components/app/Following";
import Explore from "./components/app/Explore";
import Movies from "./components/app/Movies";
import Music from "./components/app/Music";
import Profile from "./components/app/Profile";
import About from "./components/app/About";
import Tracks from "./components/app/Tracks";
import Login from "./components/app/Login";
import Signup from "./components/app/Signup";
import Search from "./components/app/Search";
import UserProfile from "./components/app/UserProfile";
import Chat from "./components/chat/Chat";
import Messages from "./components/chat/Messages";
import Sports from "./components/app/Sports";
import OceanBackground from "./components/app/OceanBackground";
import Gaming from "./components/app/Gaming";
import Travel from "./components/app/Travel";
import Books from "./components/app/Books";
import Food from "./components/app/Food";
import Tech from "./components/app/Tech";
import Pets from "./components/app/Pets";

function App() {

  return (
    <BrowserRouter>
    <OceanBackground/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/following" element={<Following />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/music" element={<Music />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/sport" element={<Sports />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/books" element={<Books />} />
        <Route path="/food" element={<Food />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/pets" element={<Pets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
