const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get tasks
router.get('/', async (req, res) => {
    const tasks = await loadTasksCollection();
    res.send(await tasks.find({}).toArray());
});

// Add task
router.post('/', async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.insertOne({
        task: req.body.text,
        dateCreated: new Date()
    });
    res.status(201).send();
})


//Delete task
router.delete('/:id', async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect("mongodb+srv://Daly:1234@daly.v9u9b.gcp.mongodb.net/Daly?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db("Daly").collection("mytasks");
}
module.exports = router;