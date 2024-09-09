const express = require('express');
const todos = express.Router()
const { MongoClient } = require('mongodb');

const dbName = 'todos';
const url = 'mongodb+srv://minkyu:abcdef2397@minkyu.rlol7cf.mongodb.net/?retryWrites=true&w=majority&appName=minkyu';
const client = new MongoClient(url);

async function connect(){
    await client.connect();
    const db = client.db(dbName);

    return db.collection('data');
}

todos.get('/', async function (req, res) {
    const collection = await connect();   
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send( findResult )
})
todos.get('/:id', function (req, res) {
    let {id} = req.params;
    let d = dataParse.list.filter((obj)=>obj.id == id);

    res.send(d)
})

todos.post('/', async function (req, res) {
    const collection = await connect();   
                       await collection.insertOne(req.body);
    const findResult = await collection.find({}).toArray();
    client.close();
    res.send(findResult)
})


todos.put('/', async function (req, res) {
    const collection = await connect();   
                       await collection.updateOne({id:req.body.id},{$set:req.body});
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send(findResult)
})

todos.delete('/', async function (req, res) {

    const collection = await connect();   
                       await collection.deleteOne(req.query);
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send(findResult)
})

module.exports = todos;
