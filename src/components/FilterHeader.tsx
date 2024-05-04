import { useContext, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DropDowns, RolesOption } from "../consts";
import SelectDropDown from "./SelectDropdown";
import { FiltersContext } from "../App";

const FilterHeader = () => {
  const [selectedValue, setSetSelectedValue] = useState<string[]>([]);

  const { filters, setFilters } = useContext(FiltersContext);

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const {
      target: { value },
    } = event;
    setFilters([
      ...filters,
      {
        key: "jobRole",
        value: typeof value === "string" ? value.split(",") : value,
      },
    ]);
    setSetSelectedValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
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
  );
};

export default FilterHeader;
