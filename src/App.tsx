import { useEffect, useState } from "react";
import "./App.css";
import { JobCard } from "./components/Card";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import SelectDropDown from "./components/SelectDropdown";
import { DropDowns, RolesOption } from "./consts";

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
      <Box display="flex">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-select">Roles</InputLabel>
          <Select defaultValue="" id="grouped-select" label="Grouping">
            {RolesOption?.map((category) => (
              <>
                <ListSubheader>{category?.group?.toUpperCase()}</ListSubheader>
                {category?.options?.map((option) => (
                  <MenuItem value={option?.value}>{option.label}</MenuItem>
                ))}
              </>
            ))}
          </Select>
        </FormControl>
        {DropDowns?.map((value) => (
          <SelectDropDown
            key={value?.key}
            label={value?.label}
            options={value?.options}
          />
        ))}
      </Box>
      <Grid container spacing={6}>
        {jobDetails?.length > 0 &&
          jobDetails?.map((value: IJobDetails) => (
            <Grid item xs={12} sm={6} lg={4}>
              <JobCard
                companyName="Company Name"
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
      </Grid>
    </div>
  );
}

export default App;
