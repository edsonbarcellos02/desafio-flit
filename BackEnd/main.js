import app from './src/app.js';

app.listen(process.env.PORT || 8033, ()=>{
    console.log(`Server running ${process.env.PORT}`);
});