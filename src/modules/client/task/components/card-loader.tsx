import React from "react";

const CardLoader = React.memo(() => {
  return (
    <div className=" flex flex-col gap-2 animate-pulse p-4 rounded-lg border border-gray-300 shadow-sm bg-white relative min-h-[166px] max-h-[166px]">
      <div className="w-[80%] h-[28px] bg-slate-700 rounded-sm" />
      <div className="w-[80%] h-[24px] bg-slate-700 rounded-sm" />
      <div className="w-[30%] h-[16px] bg-slate-700 rounded-sm" />
      <div className="w-[30%] h-[16px] bg-slate-700 rounded-sm" />
      <div className="w-[30%] h-[20px] bg-slate-700 rounded-sm" />
      <div className="absolute bottom-4 right-4 w-[62px] h-[38px] bg-slate-700 rounded-md" />
    </div>
  );
});

CardLoader.displayName = "CardLoader";
export default CardLoader;
