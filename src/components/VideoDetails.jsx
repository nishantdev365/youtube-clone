import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import ReactMarkdown from "react-markdown";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [showMore, setShowMore] = useState(false); // New state for show more
  const { id } = useParams();
  const { setLoading } = useContext(Context);

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
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
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
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
              </div>
            </div>
          </div>

          {/* -------Description------- */}

          <div className="flex flex-col mt-6 p-4 rounded-2xl bg-white/[0.15] hover:bg-white/[0.2]">
            <div className="text-white text-md font-semibold">
              <div className="">
                {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
              </div>
              <div
                className={`text-white/[0.7] text-sm mt-2 ${
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
            <div className="text-white text-md font-semibold">
              Comments
              {video?.comments ? (
                <div className="text-white/[0.7] text-sm mt-2">
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
                          <div className="text-white text-md font-semibold flex items-center">
                            {item?.author?.title}
                            {item?.author?.badges[0]?.type ===
                              "VERIFIED_CHANNEL" && (
                              <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )}
                          </div>
                          <div className="text-white/[0.7] text-sm">
                            {item?.author?.stats?.subscribersText}
                          </div>
                        </div>
                      </div>
                      <div className="text-white/[0.7] text-sm mt-2">
                        {item?.text}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white/[0.7] text-sm mt-2">
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


            


// import { useState, useEffect, useContext, useRef } from "react";
// import { useParams } from "react-router-dom";
// import ReactPlayer from "react-player/youtube";
// import { BsFillCheckCircleFill } from "react-icons/bs";
// import { AiOutlineLike } from "react-icons/ai";
// import { abbreviateNumber } from "js-abbreviation-number";
// import ReactMarkdown from "react-markdown";

// import { fetchDataFromApi } from "../utils/api";
// import { Context } from "../context/contextApi";
// import SuggestionVideoCard from "./SuggestionVideoCard";
// import InfiniteScroll from "react-infinite-scroll-component";

// const VideoDetails = () => {
//   const [video, setVideo] = useState();
//   const [relatedVideos, setRelatedVideos] = useState({ contents: [] });
//   const [showMore, setShowMore] = useState(false); // New state for show more
//   const { id } = useParams();
//   const { setLoading } = useContext(Context);
//   const [page, setPage] = useState(1);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     document.getElementById("root").classList.add("custom-h");
//     fetchVideoDetails();
//     fetchRelatedVideos();

//     // Add scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       // Cleanup: Remove scroll event listener
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [id]);

//   useEffect(() => {
//     // Update related videos when the page changes
//     if (page > 1) {
//       fetchRelatedVideos();
//     }
//   }, [page]);

//   const fetchVideoDetails = () => {
//     setLoading(true);
//     fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
//       console.log(res);
//       setVideo(res);
//       setLoading(false);
//     });
//   };

//   const fetchRelatedVideos = () => {
//     setLoading(true);
//     fetchDataFromApi(`video/related-contents/?id=${id}&page=${page}&limit=10`).then(
//       (res) => {
//         console.log(res);
//         setRelatedVideos((prevRelatedVideos) => {
//           return {
//             ...res,
//             contents: [...prevRelatedVideos.contents, ...res.contents],
//           };
//         });
//         setLoading(false);
//       }
//     );
//   };

//   const handleShowMore = () => {
//     setShowMore(true);
//   };

//   const handleShowLess = () => {
//     setShowMore(false);
//   };

//   const loadMoreRelatedVideos = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (
//       container.scrollTop + container.clientHeight >= container.scrollHeight
//     ) {
//       loadMoreRelatedVideos();
//     }
//   };
//   return (
//     <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
//       <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
//         <div ref={containerRef} className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
//           <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
//             <ReactPlayer
//               url={`https://www.youtube.com/watch?v=${id}`}
//               controls
//               width="100%"
//               height="100%"
//               style={{ backgroundColor: "#000000" }}
//               playing={true}
//             />
//           </div>
//           <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
//             {video?.title}
//           </div>
//           <div className="flex justify-between flex-col md:flex-row mt-4">
//             <div className="flex">
//               <div className="flex items-start">
//                 <div className="flex h-11 w-11 rounded-full overflow-hidden">
//                   <img
//                     className="h-full w-full object-cover"
//                     src={video?.author?.avatar[0]?.url}
//                     alt=""
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col ml-3">
//                 <div className="text-white text-md font-semibold flex items-center">
//                   {video?.author?.title}
//                   {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
//                     <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
//                   )}
//                 </div>
//                 <div className="text-white/[0.7] text-sm">
//                   {video?.author?.stats?.subscribersText}
//                 </div>
//               </div>
//             </div>
//             <div className="flex text-white mt-4 md:mt-0">
//               <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
//                 <AiOutlineLike className="text-xl text-white mr-2" />
//                 {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
//               </div>
//             </div>
//           </div>

//           {/* -------Description------- */}

//           <div className="flex flex-col mt-6 p-4 rounded-2xl bg-white/[0.15] hover:bg-white/[0.2]">
//             <div className="text-white text-md font-semibold">
//               <div className="">
//                 {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
//               </div>
//               <div
//                 className={`text-white/[0.7] text-sm mt-2 ${
//                   showMore ? "" : "line-clamp-4"
//                 }`}
//               >
//                 <ReactMarkdown>{video?.description}</ReactMarkdown>
//               </div>
//               {showMore ? (
//                 <button className=" mt-2" onClick={handleShowLess}>
//                   Show Less
//                 </button>
//               ) : (
//                 <button className=" mt-2" onClick={handleShowMore}>
//                   Show More
//                 </button>
//               )}
//             </div>
//           </div>

//                    {/* -------Comments------- */}

//           <div className="flex flex-col mt-6">
//             <div className="text-white text-md font-semibold">
//               Comments
//              {video?.comments ? (
//                 <div className="text-white/[0.7] text-sm mt-2">
//                   {video.comments.map((item, index) => (
//                     <div key={index} className="flex flex-col mt-4">
//                       <div className="flex">
//                         <div className="flex items-start">
//                           <div className="flex h-11 w-11 rounded-full overflow-hidden">
//                             <img
//                               className="h-full w-full object-cover"
//                               src={item?.author?.avatar[0]?.url}
//                               alt=""
//                             />
//                           </div>
//                         </div>
//                         <div className="flex flex-col ml-3">
//                           <div className="text-white text-md font-semibold flex items-center">
//                             {item?.author?.title}
//                             {item?.author?.badges[0]?.type ===
//                               "VERIFIED_CHANNEL" && (
//                               <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
//                             )}
//                           </div>
//                           <div className="text-white/[0.7] text-sm">
//                             {item?.author?.stats?.subscribersText}
//                             {/* </div> */}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-white/[0.7] text-sm mt-2">
//                         {item?.text}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-white/[0.7] text-sm mt-2">
//                   No comments available.
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">

//           {/* -------Infinite scroll Related Videos------- */}
//      <InfiniteScroll
//             dataLength={relatedVideos?.contents?.length || 0}
//             next={loadMoreRelatedVideos}
//             hasMore={page <= relatedVideos?.totalPages} // Check against page instead of currentPage
//             loader={<h4>Loading...</h4>}
//             scrollableTarget="root"
//           >
//             {relatedVideos?.contents?.map((item, index) => {
//               if (item?.type !== "video") return null;
//               return <SuggestionVideoCard key={index} video={item?.video} />;
//             })}
//           </InfiniteScroll>
//     </div>
        
//       </div>
//     </div>
//   );
// };

// export default VideoDetails;
            
