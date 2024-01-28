require('dotenv').config();
const express = require('express');
const app = express();

// import the getCityInfo and getJobs functions from util.js
const {getCityInfo, getJobs} = require('./util.js');
 
// Statically serve the public folder
app.use(express.static("public"));

// TODO: declare the GET route /api/city/:city
app.get('/api/city/:city', async (req, res) => {
    const {city} = req.params;

    try {        
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.

const [cityInfo, jobs] = await Promise.all([
    getCityInfo(city),
    getJobs(city)
]);

// If no city info or jobs are found,
// the endpoint should return a 404 status
if (!cityInfo && !jobs) {
    // nothing found
    return res.status(404).json({ error: "Not found"});
    
} else {
    // successful
    return res.status(200).json({ cityInfo, jobs});
} 
} catch (error) {
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function
console.error(error);
return res.status(500).json({ error: "internal server error"});
}
});

module.exports = app
