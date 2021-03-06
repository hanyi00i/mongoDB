const { MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.te4xf.mongodb.net/Sandbox?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(async err => {
    if (err) {
        console.log(err.message)
        return
    }
console.log('Connected to MongoDB\n');

//1_Comparison Operators
let result1 = await client.db('github').collection('student').find(
    {name:{$ne:'Peter'}
}).toArray()
console.log(result1)

// let result1 = await client.db('github').collection('student').find(
//     {duration:{$gt:300}
// }).toArray()
// console.log(result1)

// let result1 = await client.db('github').collection('student').find(
//     {comments:{$in:['boy']}
// }).toArray()
// console.log(result1)

//2_Logical Query Operators
let result2 = await client.db('github').collection('student').find(
    {$and:[
        {duration:{$eq:150}},
        {duration:{$lte:600}}]
}).toArray()
console.log(result2)

// let result2 = await client.db('github').collection('student').find(
//     {duration:{$not:{$lt:700}}
// }).toArray()
// console.log(result2)

//3_Field Update Operators
let result3 = await client.db('github').collection('student').updateOne(
    {name:'Peter'},
    {$inc:{age:2}
})
console.log(result3)

// let result3 = await client.db('github').collection('student').updateOne(
//     {name:'Peter'},
//     {$max:{age:18}
// })
// console.log(result3)

//4_Array Update Operators
let result4 = await client.db('github').collection('student').updateMany(
    {name:{$in:['Peter','John']}},
    {$push:{comments:'hello'}}
)
console.log(result4)


//Insert
console.time('insert used time')
let result = await client.db('github').collection('student').insertOne({
    name:'Olivia',
    age: 18,
    location: 'Sarawak',
    isActive: true,
    comments: ['hash','no','car'],
    duration: [25, 550]
})
console.timeEnd('insert used time')
console.log('Inserted document', result)
console.log('completed CREATE\n')

//UPDATE
// console.time('update used time')
// let result = await client.db('github').collection('student').updateMany(
//     { name: 'Mark'},
//     { $set: {location: 'Kedah'} },
//     { upsert: true}s
// )
// console.timeEnd('update used time')
// console.log('Updated document', result)
// console.log('completed UPDATE\n')

//DELETE
// console.time('delete used time')
// let result = await client.db('github').collection('student').deleteMany(
//     { isActive: true}
// )
// console.timeEnd('delete used time')
// console.log('Deleted document', result)
// console.log('completed DELETE\n')

});