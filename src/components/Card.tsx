import { Box, Card, CardContent, Typography, styled } from "@mui/material";

interface IJobCardProps {
  companyName: string;
  roleTitle: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  minExp: number;
  aboutCompany: string;
  postedDays: number;
}

export const StyledCard = styled(Card)(({ theme }) => ({
  color: "black",
  borderRadius: "20px",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
}));

export const JobCard = (props: IJobCardProps) => {
  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Box
          padding="6px"
          border="1px solid"
          borderColor="lightgray"
          boxShadow="rgba(6, 6, 6, 0.05) 0px 2px 6px 0px"
          borderRadius="20px"
          width="max-content"
        >
          <Typography variant="body1" fontSize="9px">Posted {props?.postedDays || ""} days ago</Typography>
        </Box>
        <Typography component="h3" color="GrayText">{props?.companyName || ""}</Typography>
        <Typography component="h2">{props?.roleTitle || ""}</Typography>
        <Typography variant="caption">{props?.location || ""}</Typography>
        <Typography component="h2" color="GrayText">Estimated Salary:{props?.minSalary || ""} - {props?.maxSalary || ""}</Typography>
        <Typography component="h1">About Company:</Typography>
        <Typography component="article">About us</Typography>
        <Typography>{props?.aboutCompany || ""}</Typography>
        <Typography variant="body2" color="GrayText">Minimum Experience</Typography>
        <Typography>{props?.minExp || ""} Years</Typography>
      </CardContent>
    </StyledCard>
  );
};
