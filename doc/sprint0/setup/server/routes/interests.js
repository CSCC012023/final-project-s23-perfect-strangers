const router = require('express').Router();
let InterestModel = require('../models/interestModel');

// const interestSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: 2
//     },
//     interestList: {
//         type: [String],
//         required: true,
//     },
// });

// Get all userIntersts documents
router.route("/userInterests").get(async (req, res) => {
    const userInterestDocs = await InterestModel.find();
    res.send(userInterestDocs)
});


// Get userInterest document of one user
router.route("/userInterests/:username").get(async (req, res) => {
    const userInterestDoc = await InterestModel.find({
        username: req.params.username
    })

    // console.log(userInterestDoc[0].interestList)
    res.send(userInterestDoc)
});


// Post a userInterest
router.route("/userInterests").post(async (req, res) => {
    const interestList = req.body.interestList;
    const username = req.body.username;

    const newInterestDoc = new InterestModel({
        interestList: interestList, 
        username: username,
    });

    const currentDatabaseInterests = await InterestModel.find({
        username: username
    })

    if (currentDatabaseInterests.length === 0){
        await newInterestDoc.save()
        res.send(newInterestDoc)
    }
    else{
        // res.status(400);
        // res.send({error: "Interest already exists in database"});
        console.log("Interest already exists in database");
    }
});



// Delete the userInterest document of a particular user
router.route("/userInterests/:username").delete(async (req, res) => {
	try {
		await InterestModel.deleteOne({ username: req.params.username })
		res.status(204).send()
	} catch {
		// res.status(404)
		// res.send({ error: "Post doesn't exist!" })
        console.log("This user interest document does not exist")
	}
})
module.exports = router;