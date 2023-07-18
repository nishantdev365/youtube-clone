import { useContext, useEffect } from "react";

import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import MobileNav from "./MobileNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* LeftNav visible on laptop screens */}
      <div className="lg:block hidden">
        <LeftNav />
      </div>

      {/* Mobilenav visible on mobile and tablet screens */}
      <div className="lg:hidden block">
        <MobileNav />
      </div>

      <div className="grow w-full lg:w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            searchResults.map((item) => {
              if (item.type !== "video") return false;
              return (
                <VideoCard
                  key={item?.video?.videoId}
                  video={item?.video}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
