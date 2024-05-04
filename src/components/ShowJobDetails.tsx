import { Grid } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { FiltersContext, IJobDetails } from "../App";
import useLoader from "../hooks/useLoader";
import { JobCard } from "./Card";
import { useContext } from "react";

const ShowJobDetails = () => {
  const { filters } = useContext(FiltersContext);

  const {
    jobDetails,
    hasNextPage,
    isLoading,
    error,
    currentOffset,
    fetchJobDetails,
  } = useLoader(0);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () => fetchJobDetails(currentOffset + 1),
    disabled: !!error,
  });

  if (jobDetails?.length === 0) {
    return <div>loading</div>;
  }

  const filterdJobs = () => {
    if (filters.length !== 0) {
      const filtered: IJobDetails[] = [];

      filters?.forEach((element: any) => {
        if (element.key === "jobRole") {
          filtered?.push(
            ...jobDetails?.filter((value) => value?.jobRole === element?.value)
          );
        }
      });
      return filtered;
    }
    return jobDetails;
  };

  return (
    <Grid container spacing={6}>
      {jobDetails?.length > 0 &&
        filterdJobs()?.map((value: IJobDetails) => (
          <Grid item xs={12} sm={6} lg={4}>
            <JobCard
              jdUid={value?.jdUid}
              companyName={value.companyName || "Company Name"}
              roleTitle={value.jobRole}
              location={value.location}
              minSalary={value.minJdSalary}
              maxSalary={value.maxJdSalary}
              minExp={value.minExp}
              aboutCompany={value.jobDetailsFromCompany}
              currencyCode={value.salaryCurrencyCode}
            />
          </Grid>
        ))}
      {hasNextPage && <div ref={sentryRef}>Loading</div>}
    </Grid>
  );
};

export default ShowJobDetails;
