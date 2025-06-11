## What is MongoDB ?

It is a **NoSQL** database that stores data in flexible, **JSON-like documents**, making it easy to scale and handle large volumes of unstructured data.


### MongoDB Structure

MongoDB stores data in **collections** and **documents**.
- A **collection** is a **group of MongoDB documents**. Bole to, **collection** ek **container** hota hai **(table ke jaise)** jo documents store krta hai.
- A **document** is a set of **key-value** pairs. Matlab ki **document** ek **JSON like record** hota hai jo **collection ke ander** hota hai **(just like row)**.
- A **field** is a **key-value** pair jo **document** ke ander hoti hai **(like a column)**.

Jaise **SQL** me **relations/tables** hoti hain waise hi **MongoDB** me **collections** hote hain and har **table** me **rows** hoti hain waise hi **collection** me **documents** hote hain.<br/>
**Example:**
```javascript
{
    "id": 1,
    "name": "Unnat",
    "email": "unnat@abcd.com",
    "address": {
        "house_no": "123 B",
        "street": "street 123",
        "city": "delhi"
    },
    "hobbies": ["reading", "animes"]
}
```


### SQL vs NoSQL

1. **Scalability - Kaise Grow Hota Hai Database? 🔁**
    - **NoSQL:** Designed to **scale horizontally** by adding more servers, distributing the load across multiple nodes. **Example:** Zada servers jod do (cluster bana do).
    - **SQL:** Typically **scales vertically** by adding more resources to a single server, which has limits and can be costly. Horizontal scaling (sharding) is more complex and less efficient. **Example:** Ek server ki RAM badha do.

        **Simple Analogy:**
        - **SQL:** Hum ek badi shop chala rahe hain. Customers badh gaye, to hum shop ko bada karenge (renovation, furniture, staff — costly).
        - **NoSQL:** Hum chhoti chhoti multiple shops khol rahe hain alag alag areas me (load divide ho gaya) — easy, fast & scalable.

2. **Schema Flexibility - Data Structure Kitna Rigid Hai? 📐**
    - **NoSQL:** **Schema-less** design allows for easy storage of diverse and rapidly changing data without needing to alter the schema.
    - **SQL:** Requires a **predefined schema**. Altering the schema (e.g., adding new columns) can be complex and time consuming, especially with large datasets.
        
        **Real-Life Example:**
        - **SQL:**
            ```javascript
            CREATE TABLE users (
                name VARCHAR(255),
                age INT
            );
            ```
            Ab agar hum email field add karna chahte hain, to `ALTER` karna padega poori table ko.
        - **NoSQL (MongoDB):**
            ```javascript
            db.users.insertOne({name: "Amit", age: 25})
            db.users.insertOne({name: "Neha", email: "neha@email.com"})
            ```
            Neha ke document me `email` hai, Amit ke me nahi — koi issue nahi.
        
        **Use Case:** Jab data structure bar-bar change hota ho (like social media apps – new features, optional fields), MongoDB best hai.


3. **Performance - Kitna Fast Hai Read/Write?⚡**
    - **NoSQL:** Optimized for high speed read/write operations, making it ideal for real-time data processing and analytics.
    - **SQL:** Though performant, it can suffer from slower read/write operations when dealing with very large volumes of data due to ACID transaction overhead and complex joins.

        **Real-Life Example:**
        - **SQL:**
            - Ek `orders` table hai aur ek `customers` table.
            - Har order ke customer ka data lana ho to `JOIN` lagega.
            ```javascript
            SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id;
            ```
            Ye complex aur heavy operation ho sakta hai large data par.
        - **MongoDB (NoSQL):**
            - Hum order document ke andar hi customer ka info embed kar dete hain.
            ```javascript
            {
                "order_id": 101,
                "item": "Laptop",
                "customer": {
                    "name": "Ravi",
                    "email": "ravi@email.com"
                }
            }
            ```
            No join needed, fast retrieval.

4. **Handling Unstructured Data - Jab Data Random Ho 📂**
    - **NoSQL:** Efficiently handles unstructured data or semi-structured data, which is common in real-time analytics (e.g., varied user activity types).
    - **SQL:** Best suited for structured data. Handling unstructured data requires complex transformations or additional systems (e.g., storing JSON data in columns).

    **Real-Life Example:**<br/>
    Imagine ek **Social Media App** hai. Har user kuch bhi kar sakta hai – post, comment, like, story, tag location, upload GIF, etc.
    - **SQL:**
        - Har type ke action ke liye alag table banana padta hai.
        - `posts`, `comments`, `likes`, `reels`, etc.
        - Inka relation maintain karna mushkil hai bohot.
    - **MongoDB:**
        - Hum easily ek hi activity collection bana sakta hain.
        - Har document apna format rakh sakta hai — super flexible.
        ```javascript
        {
            "type": "post",
            "content": "Hello World",
            "user": "Rahul"
        }
        ```
        
        ```javascript
        {
            "type": "like",
            "post_id": "abc123",
            "user": "Neha"
        }
        ```

### MongoDB Installation

- **MongoDB Compass:** [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **Mongo Shell:** [https://www.mongodb.com/try/download/shell](https://www.mongodb.com/try/download/shell)


### MongoDB Atlas

MongoDB me jo bhi data store hoga wo atlas ke through cloud me store hoga. Manage hum locally karenge lekin store cloud me hoga.


### Basic Queries in MongoDB

- `show dbs`: Databases ki list show karega. **NOTE:** Agar database me koi data nahi hai to wo database show nahi hoga ye command run karne ke baad.
- `show collections`: Database ke ander jo bhi collections honge unki list de dega. 
- `use db_name`: Ye database bana bhi dega and usi me switch bhi ho jayega. **Example:** `use school`.
- `db.students.insertOne({name: "raju", age: 26})`: `db` database ko refer kar raha hai, humare case me db ka naam **school** hai, `students` **collection** ko refer kar rha hai and `insertOne()` **function** hai to insert single data.
- `db.students.find()`: Collection se saara data find kar ke de dega.
- `db.createCollection("employees")`: Jo db selected hoga usme ye ek collection bana dega `employees` naam ka. **NOTE:** Ek database ke ander multiple collections ho sakte hain.
- `db.collection_name.drop()`: Ye command collection ko remove kr deti hai database se. **Example:** `db.branches.drop()`.
- `db.dropDatabase()`: Ye command database ko remove kr deti hai.

**NOTE:** use `mongosh` command in your terminal to run mongodb queries.


### Create, Read, Update & Delete (CRUD) Queries in MongoDB

We will be using `car_dealership` database here.

**Create:**
- `db.collection_name.insertOne()`: It will insert one record in a collection. **Example:** `db.cars.insertOne({..., ..., ...})`.
- `db.collection_name.insertMany()`: It will insert multiple records in a collection. **Example:** `db.cars.insertMany([{...}, {...}, {...}])`.

**Read:**
- `db.collection_name.find()`: It will display all the records in a collection. **Example:** `db.cars.find()`.
- `db.collection_name.findOne()`: It will display the first document in the collection. **Example:** `db.cars.findOne()`.
- `db.collection_name.findOne({...filter})`: It will return the document based on the given filter. **Example:** `db.cars.findOne({maker: "Tata"})`. This is called **Query Specification**.
- `db.collection_name.findOne({...filter}, {projection})`: **Example:** `db.cars.findOne({maker: "Tata"}, {_id: 0, model: 1})`. In this case, the method returns the document where the `maker` is **"Tata"**, but only the `model` field included in the result. This is called **Projection**. This can be done with `find()` method as well. **Example:** `db.cars.find({fuel_type: "Petrol"}, {_id: 0, maker: 1, model: 1})`. It will return an array as per the filter and projection.

**Update:**
- `db.collection_name.updateOne({...filter}, {$set: {..key-value}})`: **Example:** `db.cars.updateOne({model: "Nexon"}, {$set: {color: "red"}})`. This will add a new property/column `color` to a document where model is **"Nexon"**.
- `db.collection_name.updateOne({...filter}, {$unset: {..key-value}})`: **Example:** `db.cars.updateOne({model: "Nexon"}, {$unset: {color: ""}})`. This will remove the `color` property/column from the document where model is **"Nexon"**.
- `db.collection_name.updateOne({...filter}, {$push: {...key-value}})`: **Example:** `db.cars.updateOne({model: "Nexon"}, {$push: {features: "Heated Seats"}})`. This will push a new feature to an existing `features` array in a document. Agar hum existing `features` array se koi value nikalna chahte hain, bole to hatana chahte hain to `$pull` use karenge. **Example:** `db.cars.updateOne({model: "Nexon"}, {$pull: {features: "Heated Seats"}})`.
- `db.collection_name.updateMany({...filter}, {$set: {...key-value}})`: **Example:** `db.cars.updateMany({fuel_type: "Diesel"}, {$set: {alloys: "yes"}})`. This will update all the cars of `fuel_type` **"Diesel"** and a new property `alloys` to the matching documents.
- To add more than one value in an array we have to use `$each`. **Example:** `db.cars.updateOne({model: "Nexon"}, {$push: {features: {$each: ["wireless charging", "voice control"]}}})`. This will add 2 new values to the `features` array of `cars` document.
- `db.collection_name.updateMany({}, {$set: {...key-value}})`: **Example:** `db.cars.updateMany({}, {$set: {color: "White"}})`. This will add `color` property with value `white` to all the records/documents in a given collection.
- **`upsert`:** It is a combination of the operations `update` and `insert`. If no document matches the query criteria, MongoDB will insert a new document into the collection. **Example:** `db.cars.updateMany({model: "Venue"}, {$set: {maker: "Hyundai"}}, {upsert: true})`.

**Delete:**
- `db.collection_name.deleteOne({...filter})`: **Example:** `db.cars.deleteOne({fuel_type: "Petrol"})`. This will delete the single (first in the collection) document from a collection, based on the filter.
- `db.collection_name.deleteMany({...filter})`: **Example:** `db.cars.deleteMany({fuel_type: "Petrol"})`. This will delete all the documents in a collection which matches the filter.


### Datatypes in MongoDB

MongoDB uses **BSON (Binary JSON)** format to store documents. BSON includes all JSON datatypes and adds more. Choosing the correct datatype is essential for efficient storage and querying.

Below are the most commonly used MongoDB data types-

1. **String:** This is the most commonly used data type in MongoDB to store data, BSON strings are of UTF-8. **Example:** `name: "Unnat"`.
2. **Integer:** The integer data type is used to store an integer value. We can store integer data type in two forms **32-bit signed integer** and **64-bit signed integer**. These are used to store whole numbers, such as ages, counts, or any other numerical data that doesn't require decimal points. **Example:** `age: 30`.
3. **Double:** The **double** data type is used for storing **floating-point numbers (decimal values)**. It's commonly used for storing data that requires decimal precision, such as prices, percentages, or scores. **Example:** `percentage: 98.12`.
4. **Boolean:** The **boolean** data type stores one of two values: **true** or **false**. It's used for representing binary states, such as "active/inactive" or "pass/fail." **Example:** `isActive: true`.
5. **Array:** The **array** data type allows us to store multiple values in a single field. MongoDB arrays can contain values of the same or different data types, providing flexibility in how you store collections of related data. In MongoDB, the array is created using **square brackets([])**. **Example:** `skills: ["blockchain", "solidity", "javascript"]`.
6. **Object (Embedded Document):** Object data type stores embedded documents. Embedded documents are also known as **nested documents**. Embedded document or nested documents are those types of documents which contain a document inside another document. Embedded documents allow us to structure our data hierarchically, which is useful for representing more complex data models.<br/>
    **Example:**
    ```javascript
    {
        _id: ObjectId('683c3cdf2d174e83756c4bd0'),
        maker: 'Tata',
        model: 'Nexon',
        engine: { type: 'Turbocharged', cc: 1199, torque: '170 Nm' }    // embedded document
    }
    ```
7. **ObjectId:** Whenever we create a new document in the collection MongoDB automatically creates a unique **object id** for that document(if the document does not have it). There is an `_id` field in MongoDB for each document. The data which is stored in Id is of hexadecimal format and the length of the id is **12 bytes**. **Example:** `_id: ObjectId('683c3cdf2d174e83756c4bd0')`.
8. **Date:** It stores date. It is a 64-bit integer which represents the number of milliseconds. **Example:** `createdAt: ISODate("2023-08-21T14:23:00Z")`.
9. **Null:** The **null** data type stores a **null** value. This is useful when you want to represent the absence of data, such as an optional field that may not be set. **Example:** `middleName: null`.
10. **Timestamp:** In MongoDB, this data type is used to store a timestamp. It is useful when we modify our data to keep a record and the value of this data type is **64-bit**. The value of the timestamp data type is always unique. **Example:** `timestamp: Timestamp(1638306013, 1)`.
11. **Decimal:** This MongoDB data type store **128-bit decimal-based floating-point** value. **Example:** `salary: Decimal128("12345.67")`.


### Operators in MongoDB

**Conditional Operators:**
- **$eq (=):** Values are equal.
- **$ne (!=):** Values are not equal.
- **$gt (>):** Value is greater than another value. **Example:** `db.cars.find({"engine.cc": {$gt: 1400}})`.
- **$gte (>=):** Value is greater than or equal to another value.
- **$lt (<):** Value is less than another value.
- **$lte (<=):** Value is less than or equal to another value.
- **$in:** Value is matched within an array. **Example:** `db.cars.find({"engine.cc": {$in: [1498, 2179]}})`.
- **$nin:** Opposite of `$in`. It will return the values except those given in an array. **Example:** `db.cars.find({"engine.cc": {$nin: [1498, 2179]}})`.

**Logical Operators:**
- **$and:** Returns documents where both queries match.
    ```javascript
    // syntax
    db.collection.find({
        $and: [
            { condition 1... },
            { condition 2... },
            // additional conditions if needed
        ]
    })

    // example
    db.cars.find({
        $and: [
            { "fuel_type": "Diesel" },
            { "engine.type": "Turbocharged" },
            { "sunroof": true }
        ]
    })
    ```
- **$or:** Returns documents where either query matches.
    ```javascript
    // syntax
    db.collection.find({
        $or: [
            { condition 1... },
            { condition 2... },
            // additional conditions if needed
        ]
    })

    // example
    db.cars.find({
        $or: [
            { "fuel_type": "Diesel" },
            { "engine.type": "Turbocharged" }
        ]
    })
    ```
- **$nor:** Returns documents where both queries fail to match.
- **$not:** Returns documents where the query does not match.

**Element Operators:**
- **$exists:** It tells whether any particular field is there in the document or not. **Example:** `db.cars.find({fuel_type: {$exists: true}})`. It means, agar `fuel_type` field hai to hi records print karo, kyu ki humne `true` set kar rkha hai. Agar `false` hota to iska mtlb hota ki records tabhi print karo jabb `fuel_type` field na ho.
- **type:** Here we can filter the content based on **BSON** type like `string`, `bool`, etc. This can be useful to find the field with `null` values. **Example:** `db.cars.find({model: {$type: "string"}})`. It means, agar `model` field ka type `string` ho to hi record print karo.

**Array Operators:**
- **$size:** Return all documents that match specified array size. **Example:** `db.cars.find({features: {$size: 5}})`. It means, ki `cars` collection me wo sabb documents de do jiske `features` array ka size **5** ho.
- **$all:** Return all documents that matches the pattern (like, all users with hobbies of play and read). **Example:** `db.cars.find({features: {$all: ["Sunroof", "Bluetooth"]}})`. It means, `cars` collection ke wo sabb documents de do jiske `features` array me **Sunroof** and **Bluetooth** dono ho.


### Cursor Methods

- **Count:** Number of records de dega. **Example:** `db.cars.find().count()`. Isme filter bhi de skte hain. **Example:** `db.cars.find({fuel_type: "Petrol"}).count()`.
- **Sort:** Data ko sort kar ke dega in **ascending (1)** or **descending(-1)** order based on particular column, like `name`. **Example:** `db.cars.find({}, {_id: 0, model: 1}).sort({model: 1})`. Ye sirf `model` field ko project karega and records ko **alphabetical** order me sort kar dega.
- **Limit:** Agar bohot saare records me se sirf kuchh hi records dekhne hain, like starting ke **5** to `limit` use karenge. **Example:** `db.cars.find().limit(2)`. Ye starting ke **2** records dega.
- **Skip:** Ye provided number of records skip kar dega uske baad records print karega. **Example:** `db.cars.find().skip(2)`. Ye starting ke **2** records skip kar dega and baki ke records print kar dega.


### Aggregate Framework

Aggregation is a powerful framework for complex operations, like **filtering, grouping, sorting, reshaping and summarizing** data in a flexible way via **pipeline**.

Ye stages me kaam karta hai, like stage 1 me jo data hai usme kuchh operation kiye fir ussse jo refined data mila use stage 2 me bheja aur refine hone ke liye and so on. Isse hume exactly wahi data milta hai jo hume chahiye in a refined way.<br/>
**Example:**
```javascript
db.orders.aggregate([
    // stage 1: filter pizza order documents by pizza size
    { $match: { size: "medium" } },

    // stage 2: group remaining documents by pizza name and calculate total quantity
    { $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } } } 
])
```

### Most Commonly Used Stages in MongoDB Aggregation

- **$group:** This aggregation stage groups documents by the unique `_id` expression provided. "Don't confuse this `_id` expression with the `_id` **ObjectId** provided to each document".<br/>
    **Example:**
    ```javascript
    // 1. This will return the number of cars for each maker.
    db.cars.aggregate([
        {$group: {
            _id: "$maker",
            totalCars: {$sum: 1}
        }}
    ])

    // 2. This will return the number of cars for different fuel_type.
    db.cars.aggregate([{$group: {_id: "$fuel_type", totalCars: {$sum: 1}}}])

    // 3. This will return the number of cars and average price for each maker.
    db.cars.aggregate([{$group: {_id: "$maker", totalCars: {$sum: 1}, avgPrice: {$avg: "$price"}}}])
    ```
    The `$sum: 1` operation counts the number of documents in each group.

- **$match:** This aggregation stage behaves like a **find**. It will filter documents that match the query provided. Using `$match` early in the pipeline can improve performance since it limits the number of documents the next stages must process.<br/>
    **Example:**
    ```javascript
    // This will return Hyundai cars having engine of more than 1000 cc.
    db.cars.aggregate([{$match: {maker: "Hyundai", "engine.cc": {$gt: 1000}}}])
    ```
- **$count:** This aggregation stage counts the total amount of documents passed from the previous stage.<br/>
    **Example:**
    ```javascript
    // This will return the total number of Hyundai cars.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$count: "Total_cars"}])

    // This will return the number of cars of Hyundai brand based on fuel_type.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$group: {_id: "$fuel_type", TotalCars: {$sum: 1}}}])
    ```
- **$project:** This aggregation stage passes only the specified fields along to the next aggregation stage.<br/>
    ```javascript
    // Return all the Hyundai cars and only show Maker, Model, and Fuel Type details.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, maker: 1, model: 1, fuel_type: 1}}]) 
    ```
- **$sort:** This aggregation stage groups sorts all documents in the specified sort order.<br/>
    ```javascript
    // Return all the Hyundai cars and only show Maker, Model, and Fuel Type details and sort the data based on the model.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, maker: 1, model: 1, fuel_type: 1}}, {$sort: {model: 1}}])

    // same query but the data is sorted in descending order (only chnage: model: -1).
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, maker: 1, model: 1, fuel_type: 1}}, {$sort: {model: -1}}])
    ```
- **$sortByCount:** This aggregation groups documents based on a specified field or expression, counts the number of documents in each group, and then sorts the results by the count in descending order.<br/>
    ```javascript
    // Group the cars by maker and then sort based on the count (number of cars).
    db.cars.aggregate([{$sortByCount: "$maker"}]) 
    ```
- **$unwind:** The **operator** breaks down an array field into multiple documents, where each document contains one element from the original array.<br/>
    ```javascript
    // We have multiple owners for each car, now if we want to work on each owner then we can use unwind.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$unwind: "$owners"}])
    ```
- **$out:** This aggregation stage writes the returned documents from the aggregation pipeline to a new collection. The `$out` stage must be the **last** stage of the aggregation pipeline.<br/>
    ```javascript
    // After aggregation, store the result in an another collection "hyundai_cars"
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, car_name: {$concat: ["$maker", " ", "$model"]}}}, {$out: "hyundai_cars"}])
    ```


### String Operators (Commonly Used)

- **$concat:** This operator is mainly used within the `$project` stage of an aggregation pipeline to combine multiple strings or expressions.<br/>
    ```javascript
    // List down all the cars and print the name as Maker + Model i.e., Hyundai Creta
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, CarName: {$concat: ["$maker", " ", "$model"]}}}])
    ```
- **toUpper:** This operartor converts a string to uppercase within an aggregation pipeline.<br/>
    ```javascript
    // converts model field to uppercase.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, model: {$toUpper: "$model"}}}])

    // List down all the cars and print the name as Maker + Model i.e., Hyundai Creta in uppercase. 
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, CarName: {$toUpper: {$concat: ["$maker", " ", "$model"]}}}}])
    ```
- **toLower:** This operartor converts a string to lowercase within an aggregation pipeline.<br/>
    ```javascript
    // converts model field to lowercase.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, model: {$toLower: "$model"}}}])

    // List down all the cars and print the name as Maker + Model i.e., Hyundai Creta in lowercase. 
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, CarName: {$toLower: {$concat: ["$maker", " ", "$model"]}}}}])
    ```
- **regexMatch:** Performs a regular expression (regex) pattern matching and returns true or false.<br/>
    ```javascript
    // Add a flag is_diesel = true/false for each car.
    db.cars.aggregate([{$project: {model: 1, _id: 0, is_diesel: {$regexMatch: {input: "$fuel_type", regex: "Die"}}}}])
    ```

