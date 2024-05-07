import express from "express";

const app = express();

app.get("/", (req, res) => {
res.send("Done one!")
})

app.listen(8080, () => {
    console.log("Server is on port 8080!")
})