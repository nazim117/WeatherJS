import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://api.open-meteo.com/v1/ecmwf?latitude=51.4231&longitude=5.4623&hourly=temperature_2m,wind_speed_10m");
    res.render("index.ejs", {data: result});
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.post("/", async (req, res) => {
    try {
    console.log(req.body);
  
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
  
    const response = await axios.get(`https://api.open-meteo.com/v1/ecmwf?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m`);
    const result = response.data;
    console.log(result);

    res.render("index.ejs", { data: result });
  }
  catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: "No forecast that match your criteria.",
      });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});