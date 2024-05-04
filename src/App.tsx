import "./App.css";
import FilterHeader from "./components/FilterHeader";
import ShowJobDetails from "./components/ShowJobDetails";

export interface IJobDetails {
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
  return (
    <div className="App">
      <FilterHeader />
      <ShowJobDetails />
    </div>
  );
}

export default App;
