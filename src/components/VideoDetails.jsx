import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import ReactMarkdown from "react-markdown";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";



const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [showMore, setShowMore] = useState(false); // New state for show more
  const { id } = useParams();
  const { setLoading } = useContext(Context);
  // const pageRoute = useNavigate()


  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-white dark:bg-black">
       <div className="lg:hidden block">
        <MobileNav />
      </div>
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-black dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
              <Link to={`/channel/${video?.snippet?.channelId}`}>
                <div className="flex h-11 w-11 rounded-full overflow-hidden cursor-pointer">
                {/* onClick={() => pageRoute(`/channel/${channels?.snippet?.channelId}`)} */}
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
                </Link>
              </div>
              <div className="flex flex-col ml-3">
             
                <div className="text-black dark:text-white text-md font-semibold flex items-center cursor-pointer">
               
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
              
                <div className="text-black/[0.7] dark:text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-black dark:text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-black/[0.15] dark:bg-white/[0.15] cursor-pointer">
                <AiOutlineLike className="text-xl text-black dark:text-white mr-2" />
                {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
              </div>
            </div>
          </div>

          {/* -------Description------- */}

          <div className="flex flex-col mt-6 p-4 rounded-2xl bg-black/[0.15] dark:bg-white/[0.15] dark:hover:bg-white/[0.15]">
            <div className="text-black dark:text-white text-md font-semibold">
              <div className="">
                {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
              </div>
              <div
                className={`text-black/[0.8] dark:text-white/[0.7] text-sm mt-2 ${
                  showMore ? "" : "line-clamp-4"
                }`}
              >
                <ReactMarkdown>{video?.description}</ReactMarkdown>
              </div>
              {showMore ? (
                <button className=" mt-2" onClick={handleShowLess}>
                  Show Less
                </button>
              ) : (
                <button className=" mt-2" onClick={handleShowMore}>
                  Show More
                </button>
              )}
            </div>
          </div>

          {/* -------Comments------- */}

          <div className="flex flex-col mt-6">
            <div className="text-black dark:text-white text-md font-semibold">
              Comments
              {video?.comments ? (
                <div className="text-black/[0.8] dark:text-white/[0.7] text-sm mt-2">
                  {video.comments.map((item, index) => (
                    <div key={index} className="flex flex-col mt-4">
                      <div className="flex">
                        <div className="flex items-start">
                          <div className="flex h-11 w-11 rounded-full overflow-hidden">
                            <img
                              className="h-full w-full object-cover"
                              src={item?.author?.avatar[0]?.url}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col ml-3">
                          <div className="text-black dark:text-white text-md font-semibold flex items-center">
                            {item?.author?.title}
                            {item?.author?.badges[0]?.type ===
                              "VERIFIED_CHANNEL" && (
                              <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )}
                          </div>
                          <div className="text-black/[0.8] dark:text-white/[0.7] text-sm">
                            {item?.author?.stats?.subscribersText}
                          </div>
                        </div>
                      </div>
                      <div className="text-black/[0.8] dark:text-white/[0.7] text-sm mt-2">
                        {item?.text}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-black/[0.8] dark:text-white/[0.7] text-sm mt-2">
                  No comments available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -------Related Videos------- */}

        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;


            

