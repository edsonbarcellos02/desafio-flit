import app from './src/app.js';
import express from "express";
import path from "path";

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT || 8033, ()=>{
    console.log(`Server running ${process.env.PORT}`);
});