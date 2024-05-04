import * as React from "react";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { FiltersContext } from "../App";

interface ISelectDropDownProps {
  options: {
    value: string;
    label: string;
  }[];
  label: string;
  key: string;
}

export default function SelectDropDown({
  options,
  label,
  key,
}: ISelectDropDownProps) {
  const [selectedValue, setSetSelectedValue] = React.useState<string[]>([]);

  const { filters, setFilters } = useContext(FiltersContext);

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const {
      target: { value },
    } = event;
    setFilters([
      ...filters,
      { key: key, value: typeof value === "string" ? value.split(",") : value },
    ]);
    setSetSelectedValue(typeof value === "string" ? value.split(",") : value);
  };

  const getLabel = (value: string) => {
    return options.find((option) => option.value === value)?.label;
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`select-label-${label}`}
          multiple
          value={selectedValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getLabel(value)} />
              ))}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem key={option?.label} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
