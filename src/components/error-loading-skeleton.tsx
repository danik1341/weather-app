import React from "react";
import { BiSolidError } from "react-icons/bi";

export function Error() {
  return (
    <div className="flex flex-col items-center py-10 space-y-5">
      <BiSolidError className="w-20 h-20" />
      <h1 className="text-2xl italic font-bold text-center">
        An Error Accord. Please Try Again Later or Check Your Internet
        Connection
      </h1>
      <h2 className="text-lg text-center font-semiboldbold">
        You might have entered the wrong name for a city or it does not exsist
        in our database...
      </h2>
    </div>
  );
}

export function Loading() {
  return (
    <div className="flex flex-col items-center py-10 space-y-5">
      <h1 className="text-3xl italic font-bold">Data is loading....</h1>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
