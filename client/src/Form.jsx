import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";

const defaultTheme = createTheme();

export default function Form() {
  const [countries, setCountries] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = data.get("country");
    axios
      .get(`http://localhost:4000/country/${info}`, {
        headers: {
          "X-Auth-Token": process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then((res) => setCountries(res.data));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {countries ? (
          <>
            {countries.map((country, index) => (
              <div key={index}>
                <Typography paragraph>
                  {country.country}
                  <br></br>
                  {country.metrics.map((el, secondIndex) => (
                    <>
                      <Typography variant="subtitle1" key={secondIndex}>
                        {el.name}
                      </Typography>
                      {Object.entries(el.results).map(([key, value]) => (
                        <>
                          <Typography variant="subtitle1">{key}</Typography>
                          {key === "data" ? (
                            Object.entries(el.results.data).map(
                              ([secondKey, secondValue]) => (
                                <Typography variant="subtitle1">
                                  {secondKey} {secondValue}
                                </Typography>
                              )
                            )
                          ) : (
                            <Typography variant="subtitle1">{value}</Typography>
                          )}
                        </>
                      ))}
                    </>
                  ))}
                </Typography>
              </div>
            ))}
          </>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Request a country
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="country"
                label="Country"
                type="text"
                id="country"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit request
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
