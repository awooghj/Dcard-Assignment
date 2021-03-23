import React, { useEffect, useState, useCallback, useRef } from "react";
import { counties } from "../Counties";

export default function CountyScreen(props) {
  const county = counties.find(
    (county) => county === props.match.params.countyName
  );

  const [currentCounty, setCurrentCounty] = useState("");
  const [skip, setSkip] = useState(0);
  const [countySpotList, setCountySpotList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  if (currentCounty !== county) {
    setCurrentCounty(county);
    setCountySpotList([]);
    setSkip(0);
  }

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

  const getCountySpot = async (county, skip) => {
    const temp = await fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${county}?$top=30&$skip=${skip}&$format=JSON`
    ).then((res) => res.json());

    console.log(temp);

    setCountySpotList((prevSpots) => {
      return [...new Set([...prevSpots, ...temp])];
    });
    console.log(countySpotList.length);

    setHasMore(temp.length > 0);
  };
  useEffect(() => {
    getCountySpot(county, skip);
  }, [county, skip]);
  console.log(skip);

  return (
    <>
      <h1>{county}</h1>
      {countySpotList.map((spot, index) => {
        if (countySpotList.length === index + 1) {
          return (
            <div ref={lastSpotElementRef} key={index}>
              <h3>{spot.Name}</h3>
              {spot.Description ? spot.Description : spot.DescriptionDetail}
            </div>
          );
        } else {
          return (
            <div key={index}>
              <h3>{spot.Name}</h3>
              {spot.Description ? spot.Description : spot.DescriptionDetail}
            </div>
          );
        }
      })}
    </>
  );
}
