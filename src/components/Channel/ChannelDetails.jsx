import { abbreviateNumber } from "js-abbreviation-number";
import LeftNav from "../LeftNav"
import MobileNav from "../MobileNav";
import { useParams } from 'react-router-dom'
// import { Context } from "../../context/contextApi";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect, useState } from "react";


const ChannelDetails = () => {
  const [channel, setChannel] = useState({}); 
  const { channelId } = useParams();
  // const { setLoading } = useContext(Context);

  useEffect(() => {
    fetchDataFromApi(`channels?part=snippet&id=${channelId}`).then((res) => {
      setChannel(res);
    });
  }, [channelId]);

  // const fetchVideoDetails = () => {
  //   setLoading(true);
  //   fetchDataFromApi(`channel?part=snippet&id=${channelId}`).then((res) => {
  //     console.log(res);
  //     setChannels(res.data.items[0]); // Update channels state with the first item in the 'items' array
  //     setLoading(false);
  //   });
  // };

  console.log(channel.snippet)
  
  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen bg-white dark:bg-black overflow-hidden">
        <div className="lg:block hidden">
          <LeftNav />
        </div>

        {/* Mobilenav visible on mobile and tablet screens */}
        <div className="lg:hidden block">
          <MobileNav />
        </div>
        <div className="w-full h-auto">
          <div className="bg-cover bg-no-repeat bg-center h-[16vw] w-full border-4">
            <img
         src={channel?.brandingSettings?.image?.bannerExternalUrl}
              alt="banner"
            />
          </div>

          <div className="flex items-center mt-10">
            <div className="flex h-24 w-24 rounded-full overflow-hidden border-4 border-white">
              <img
                className="h-full w-full object-cover"
                src={channel?.avatar[0]?.url}
                alt="Channel Avatar"
              />
            </div>
            <div className="flex flex-col ml-3">
              <span className="text-white text-2xl font-bold">
              {channel?.title}
              </span>
              <span className="text-white text-[14px] font-semibold mt-2">
              {abbreviateNumber(channel?.stats?.subscribersText, 2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelDetails;
