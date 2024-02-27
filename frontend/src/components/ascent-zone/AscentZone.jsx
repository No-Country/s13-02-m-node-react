"use client";
import { Card, LabelRanking, SkeletonCard } from "./Card";

const AscentZone = ({ data, dataLoaded }) => {
  const sortedData = [...data].sort((a, b) => b.totalPoints - a.totalPoints);
  const firstThree = sortedData.slice(0, 3);
  const nextTwo = sortedData.slice(3, 5);
  const remainingData = sortedData.slice(5);

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      {dataLoaded && <SkeletonCard count={3} />}
      {!dataLoaded &&
        firstThree.map((item, index) => (
          <Card key={index} data={item} dataLoaded={dataLoaded} />
        ))}
      {data.totalPoints < 0 && <LabelRanking>ZONA DE ASCENSO</LabelRanking>}

      {dataLoaded && <SkeletonCard count={2} />}
      {!dataLoaded &&
        nextTwo.map((item, index) => (
          <Card key={index} data={item} dataLoaded={dataLoaded} />
        ))}

      {data.totalPoints < 0 && <LabelRanking>ZONA DE DESCENSO</LabelRanking>}

      {dataLoaded && <SkeletonCard count={5} />}
      {!dataLoaded &&
        remainingData.map((item, index) => (
          <Card key={index} data={item} dataLoaded={dataLoaded} />
        ))}
    </div>
  );
};

export default AscentZone;
