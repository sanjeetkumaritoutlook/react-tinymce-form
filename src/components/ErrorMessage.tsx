import React from "react";
//npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {Box, Typography} from "@mui/material";
const ErrorMessage = (props: { message: string }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height="100%">
      <InfoOutlinedIcon style={{fontSize: 100}}/>
      <Typography variant="h4">{props.message}</Typography>
    </Box>
  );
}

export default ErrorMessage;