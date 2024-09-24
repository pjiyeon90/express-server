const express = require('express');
const todos = express.Router()
const { MongoClient } = require('mongodb');

const dbName = 'todos';
const url = 'mongodb+srv://parkwlfod:EALzqyrWQZRjZEMM@cluster0.q1xf9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

let collection;
async function connect(){
    await client.connect();
    // console.log('Connected successfully to server');
    const db = client.db(dbName);
    collection = db.collection('data');
    return;
}
//client.close()로 끊고 다시 가고 하면 느려져서 모든 close없애기
todos.get('/', async function (req, res) {
    await connect();
     // const collection = await connect(); DB 접근
    const findResult = await collection.find({}).toArray();  //DB 작업
    //client.close(); DB 끊기 , 값이 findResult에 담겨있기 때문에 DB 끊어도 값 안사라짐
     res.send( findResult )
})
todos.get('/:id',async function (req, res) {
    let id = req.params;
    // const collection = await connect();  
    const findResult = await collection.find(id).toArray(); 
    // client.close();
    res.send(findResult)
})

todos.post('/',async function (req, res) {
    await collection.insertOne(req.body);
    // const collection = await connect();
    //                    await collection.insertOne(req.body);
    // const findResult = await collection.find({}).toArray();                
    // client.close();
    // res.send('req.body');
    res.send('done');
})

//(req, res) 첫번쨰 인자인 req에는 값을 , res는 값을 보내고
todos.put('/', async function (req, res) {
    await collection.updateOne({id:req.body.id},{$set:req.body});
    // const collection = await connect();
    //                    await collection.updateOne({id:req.body.id},{$set:req.body});
    // const findResult = await collection.find({}).toArray();
    // client.close();

    res.send('done');
})

todos.delete('/',async function (req, res) {
  //  let {id} = req.query; req.body가 아니라 req.query는 ?뒤에가 잡힘 -> {id:1}
    await collection.deleteOne(req.query);
    // const collection = await connect();
    //                    await collection.deleteOne(req.query);
    // const findResult = await collection.find({}).toArray();
    // client.close();

    res.send('done');
})

module.exports = todos;
