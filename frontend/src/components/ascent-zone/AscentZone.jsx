"use client";
import { Card, LabelRanking, SkeletonCard } from "./Card";

const AscentZone = ({ data, dataLoaded, currentPage }) => {
  const firstThree = data.slice(0, 3);
  const nextTwo = data.slice(3, 5);
  const remainingData = data.slice(5);

  const hasUserWithPoints = data.some((user) => user.totalPoints > 0);

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      {dataLoaded && <SkeletonCard count={3} />}
      {!dataLoaded &&
        firstThree.map((item) => (
          <Card key={item.id} data={item} dataLoaded={dataLoaded} />
        ))}

      {hasUserWithPoints && currentPage === 1 && (
        <LabelRanking>ZONA DE ASCENSO</LabelRanking>
      )}

      {dataLoaded && <SkeletonCard count={2} />}
      {!dataLoaded &&
        nextTwo.map((item) => (
          <Card key={item.id} data={item} dataLoaded={dataLoaded} />
        ))}

      {hasUserWithPoints && currentPage === 1 && (
        <LabelRanking>ZONA DE DESCENSO</LabelRanking>
      )}

      {dataLoaded && <SkeletonCard count={5} />}
      {!dataLoaded &&
        remainingData.map((item) => (
          <Card key={item.id} data={item} dataLoaded={dataLoaded} />
        ))}
    </div>
  );
};

export default AscentZone;
