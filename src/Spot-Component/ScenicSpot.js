import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function ScenicSpot() {
  const [skip, setSkip] = useState(0);
  const [scenicSpotList, setScenicSpotList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
  const lastSpotElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prevPageNumber) => prevPageNumber + 30);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const getAllScenicSpot = async (skip) => {
    const temp = await fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$skip=${skip}&$format=JSON
      `
    ).then((res) => res.json());
    setScenicSpotList((prevSpots) => {
      return [...new Set([...prevSpots, ...temp])];
    });
    console.log(scenicSpotList.length);

    setHasMore(temp.length > 0);
  };

  useEffect(() => {
    getAllScenicSpot(skip);
  }, [skip]);

  return (
    <>
      {scenicSpotList.map((spot, index) => {
        if (scenicSpotList.length === index + 1) {
          return (
            <div ref={lastSpotElementRef} key={index}>
              <h3>{spot.Name}</h3>
              {spot.Description}
            </div>
          );
        } else {
          return (
            <div key={index}>
              <h3>{spot.Name}</h3>
              {spot.Description}
            </div>
          );
        }
      })}
    </>
  );
}
