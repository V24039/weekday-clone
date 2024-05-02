import { useEffect, useState } from "react";
import "./App.css";
import { JobCard } from "./components/Card";
import { Grid } from "@mui/material";

interface IJobDetails {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
}

function App() {
  const [jobDetails, setJobDetails] = useState<any>();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: 10,
    offset: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  useEffect(() => {
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setJobDetails(result.jdList))
      .catch((error) => console.error(error));
  }, []);

  if (jobDetails?.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div className="App">
      <Grid container spacing={2}>
        {jobDetails?.length > 0 &&
          jobDetails?.map((value: IJobDetails) => (
            <Grid item xs={4}>
              <JobCard
                companyName="Company Name"
                roleTitle={value.jobRole}
                location={value.location}
                minSalary={value.minJdSalary}
                maxSalary={value.maxJdSalary}
                minExp={value.minExp}
                aboutCompany={value.jobDetailsFromCompany}
                postedDays={10}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default App;
