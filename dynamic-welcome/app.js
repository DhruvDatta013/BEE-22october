const express = require('express');
const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');

function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return 'Good morning';
    } else if (currentHour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}


app.get('/welcome', (req, res) => {
    const userName = 'Gourav ';  
    const greeting = getGreeting();
    res.render('welcome', { name: userName, greeting });
});


app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }    
    else{
        console.log(`Listening to port ${PORT}`)

    }
})