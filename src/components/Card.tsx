import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
  styled,
} from "@mui/material";

interface IJobCardProps {
  companyName: string;
  roleTitle: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  minExp: number;
  aboutCompany: string;
  currencyCode: string;
}

export const StyledCard = styled(Card)(({ theme }) => ({
  color: "black",
  borderRadius: "20px",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
  ":hover": {},
}));

export const JobCard = (props: IJobCardProps) => {
  const getSalary = () => {
    if (props?.minSalary && props?.maxSalary) {
      return `${props?.minSalary}${props?.currencyCode} - ${props?.maxSalary}${props?.currencyCode}`;
    }
    return (props?.minSalary || props?.maxSalary) + "" + props?.currencyCode;
  };

  return (
    <StyledCard variant="outlined">
      <CardContent sx={{ paddingBottom: "0px" }}>
        <Typography component="h3" color="GrayText">
          {props?.companyName || ""}
        </Typography>
        <Typography component="h2">{props?.roleTitle || ""}</Typography>
        <Typography variant="caption">{props?.location || ""}</Typography>
        <Typography color="GrayText" fontSize="12px">
          Estimated Salary: {getSalary()}
        </Typography>
        <Typography component="h1" variant="body1">About Company:</Typography>
        <Typography component="article">About us</Typography>
        <Typography
          variant="body2"
          component="body"
          maxHeight="100px"
          overflow="hidden"
          sx={{
            maskImage:
              "linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
          }}
        >
          {props?.aboutCompany || ""}
        </Typography>
        <Link
          textAlign="center"
          width="100%"
          display="block"
          position="relative"
          top="-10px"
          variant="caption"
        >
          View More
        </Link>
        <div style={{ visibility: props?.minExp ? "visible" : "hidden" }}>
          <Typography variant="body2" color="GrayText">
            Minimum Experience
          </Typography>
          <Typography variant="caption">{props?.minExp || ""} Years</Typography>
        </div>
      </CardContent>
      <CardActions sx={{ paddingTop: "0px", paddingBottom: "20px" }}>
        <Button variant="contained" fullWidth color="success" size="small">
          Easy Apply
        </Button>
      </CardActions>
    </StyledCard>
  );
};
