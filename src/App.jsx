
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import ChannelDetails from "./components/Channel/ChannelDetails";


const App = () => {
    return (
        <AppContext>
            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Feed />} />
                        <Route
                            path="/searchResult/:searchQuery"
                            element={<SearchResult />}
                        />
                        <Route path="/video/:id" element={<VideoDetails />} />
                        <Route path="/channel/:channelId" element={<ChannelDetails />} />
                        
                        {/* <Route path="/channeldetails/:id" exact element={<ChannelDetails />} /> */}
                       
                    </Routes>
                </div>
            </BrowserRouter>
        </AppContext>
    );
};

export default App;
