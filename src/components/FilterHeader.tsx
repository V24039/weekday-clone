import { Box, FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material'
import React from 'react'
import { DropDowns, RolesOption } from '../consts'
import SelectDropDown from './SelectDropdown'

const FilterHeader = () => {
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
  )
}

export default FilterHeader