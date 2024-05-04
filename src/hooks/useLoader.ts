import { useEffect, useState } from "react";
import { IJobDetails } from "../App";

const useFetchLandDetails = (offset: number) => {
  const [jobDetails, setJobDetails] = useState<Array<IJobDetails>>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setErrors] = useState<string>("");
  const [currentOffset, setCurrentOffset] = useState<number>(0);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchJobDetails = async (offset: number) => {
    const body = JSON.stringify({
      limit: 10,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    setLoading(true);
    const data = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    ).catch((error) => setErrors(error));

    const responseJson = data && (await data.json());

    setJobDetails((prev) =>
      offset === 0 ? responseJson?.jdList : [...prev, ...responseJson?.jdList]
    );

    if (jobDetails?.length === responseJson?.totalCount) {
      setHasNextPage(false);
    }
    setCurrentOffset(offset);
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchJobDetails(0);
    }
  }, []);

  return {
    jobDetails,
    hasNextPage,
    isLoading,
    error,
    currentOffset,
    fetchJobDetails,
  };
};

export default useFetchLandDetails;
