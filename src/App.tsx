import { createContext, useState } from "react";
import "./App.css";
import FilterHeader from "./components/FilterHeader";
import ShowJobDetails from "./components/ShowJobDetails";

export interface IJobDetails {
  companyName?: string;
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

export const FiltersContext = createContext<any>({});

function App() {
  const [filters, setFilters] = useState([]);

  return (
    <div className="App">
      <FiltersContext.Provider
        value={{
          filters,
          setFilters,
        }}
      >
        <FilterHeader />
        <ShowJobDetails />
      </FiltersContext.Provider>
    </div>
  );
}

export default App;
