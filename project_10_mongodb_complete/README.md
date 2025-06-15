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
    **Example:**
    ```javascript
    // Return all the Hyundai cars and only show Maker, Model, and Fuel Type details.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, maker: 1, model: 1, fuel_type: 1}}]) 
    ```
- **$sort:** This aggregation stage groups sorts all documents in the specified sort order.<br/>
    **Example:**
    ```javascript
    // Return all the Hyundai cars and only show Maker, Model, and Fuel Type details and sort the data based on the model.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, maker: 1, model: 1, fuel_type: 1}}, {$sort: {model: 1}}])

    // same query but the data is sorted in descending order (only chnage: model: -1).
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, maker: 1, model: 1, fuel_type: 1}}, {$sort: {model: -1}}])
    ```
- **$sortByCount:** This aggregation groups documents based on a specified field or expression, counts the number of documents in each group, and then sorts the results by the count in descending order.<br/>
    **Example:**
    ```javascript
    // Group the cars by maker and then sort based on the count (number of cars).
    db.cars.aggregate([{$sortByCount: "$maker"}]) 
    ```
- **$unwind:** The **operator** breaks down an array field into multiple documents, where each document contains one element from the original array.<br/>
    **Example:**
    ```javascript
    // We have multiple owners for each car, now if we want to work on each owner then we can use unwind.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$unwind: "$owners"}])
    ```
- **$out:** This aggregation stage writes the returned documents from the aggregation pipeline to a new collection. The `$out` stage must be the **last** stage of the aggregation pipeline.<br/>
    **Example:**
    ```javascript
    // After aggregation, store the result in an another collection "hyundai_cars"
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, car_name: {$concat: ["$maker", " ", "$model"]}}}, {$out: "hyundai_cars"}])
    ```
- **$addFields/$set:** This aggregation stage adds new fields to documents.<br/>
    **Example:**
    ```javascript
    // This will add the new field "price_in_lakhs"
    db.cars.aggregate([{$project: {_id: 0, model: 1, price: 1}}, {$addFields: {price_in_lakhs: {$round: [{$divide: ["$price", 100000]}, 1]}}}])
    ```


### String Operators (Commonly Used)

- **$concat:** This operator is mainly used within the `$project` stage of an aggregation pipeline to combine multiple strings or expressions.<br/>
    **Example:**
    ```javascript
    // List down all the cars and print the name as Maker + Model i.e., Hyundai Creta
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, CarName: {$concat: ["$maker", " ", "$model"]}}}])
    ```
- **toUpper:** This operartor converts a string to uppercase within an aggregation pipeline.<br/>
    **Example:**
    ```javascript
    // converts model field to uppercase.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, model: {$toUpper: "$model"}}}])

    // List down all the cars and print the name as Maker + Model i.e., Hyundai Creta in uppercase. 
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, CarName: {$toUpper: {$concat: ["$maker", " ", "$model"]}}}}])
    ```
- **toLower:** This operartor converts a string to lowercase within an aggregation pipeline.<br/>
    **Example:**
    ```javascript
    // converts model field to lowercase.
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, model: {$toLower: "$model"}}}])

    // List down all the cars and print the name as Maker + Model i.e., Hyundai Creta in lowercase. 
    db.cars.aggregate([{$match: {maker: "Hyundai"}}, {$project: {_id: 0, CarName: {$toLower: {$concat: ["$maker", " ", "$model"]}}}}])
    ```
- **regexMatch:** Performs a regular expression (regex) pattern matching and returns true or false.<br/>
    **Example:**
    ```javascript
    // Add a flag is_diesel = true/false for each car.
    db.cars.aggregate([{$project: {model: 1, _id: 0, is_diesel: {$regexMatch: {input: "$fuel_type", regex: "Die"}}}}])
    ```


### Arithmetic Operators (Commonly Used)

- **$add:** It is used to **add** numbers together or **concatenate** numbers and dates in the aggregation pipeline.<br/>
    **Example:**
    ```javascript
    // Print all the model of the cars and price with a hike of 55000.
    db.cars.aggregate([{$project: {_id: 0, model: 1, new_price: {$add: ["$price", 55000]}}}])
    ```
- **$subtract:** This operator is used to subtract two numbers and return the difference in the numbers or subtract two dates and return the difference in milliseconds.<br/>
    **Example:**
    ```javascript
    // Print all the model of the cars and price with a cut of 55000.
    db.cars.aggregate([{$project: {_id: 0, model: 1, new_price: {$subtract: ["$price", 55000]}}}])
    ```
- **$divide:** This operator is used to perform division between two numbers. It divides one number by another and returns the result.<br/>
    **Example:**
    ```javascript
    // This will divide the price field by 100000.
    db.cars.aggregate([{$project: {_id: 0, model: 1, price: 1}}, {$addFields: {price_in_lakhs: {$round: [{$divide: ["$price", 100000]}, 1]}}}])
    ```
- **$multiply:** This operator is used to multiply two or more numeric values or expressions together. It returns the result of multiplying all provided values and can be used in the aggregation pipeline for advanced data manipulation and transformation.<br/>
    **Example:**
    ```javascript
    // Print all the model of the cars and price by multuplying it by 2.
    db.cars.aggregate([{$project: {_id: 0, model: 1, new_price: {$multiply: ["$price", 2]}}}])
    ```
- **$round:** This operator rounds a number to a whole integer or to a specified decimal place.<br/>
    **Example:**
    ```javascript
    // This will round the price_in_lakhs field upto 1 decimal place.
    db.cars.aggregate([{$project: {_id: 0, model: 1, price: 1}}, {$addFields: {price_in_lakhs: {$round: [{$divide: ["$price", 100000]}, 1]}}}])
    ```
- **$abs:** This operator is used to find the absolute value of the specified number.<br/>
    **Example:**
    ```javascript
    // Subtract the price from 100 and return the absolute value (intentionally 100 se subtract kiya price ko taaki abs ka use pata chale).
    db.cars.aggregate([{$project: {_id: 0, price: {$abs: {$subtract: [100, "$price"]}}}}])
    ```
- **$ceil:** It performs mathematical rounding of a number to the smallest integer greater than or equal to that number.<br/>


**Calculate total service cost of each Hyundai car**<br/>
```javascript
db.cars.aggregate([
    { $match: { maker: "Hyundai" } },
    { $set: { total_service_cost: { $sum: "$service_history.cost" } } },
    { $project: { _id: 0, maker: 1, model: 1, total_service_cost: 1 } }
])
```

### Conditions in MongoDB

- **$cond:** It evaluates a boolean expression to return one of the two specified return expressions. It acts like a ternary operator in programming languages. It allows you to conditionally execute different expressions based on a boolean condition.<br/>
    **Example:**
    ```javascript
    // Check if a car's fuel_type is "petrol" and categorize the cars into "petrol car" and "non-petrol car".
    db.cars.aggregate([
        { $project: {
            _id: 0,
            maker: 1,
            model: 1,
            fuel_category: {
                $cond: {
                    if: { $eq: ["$fuel_type", "Petrol"] },
                        then: "Petrol Car",
                    else: "Non-Petrol Car"
                }
            } 
        }}
    ]) 
    ```
- **$switch:** It executes the first branch it finds which evaluates to true . If none of the branches evaluates to true, `$switch` executes the default option.<br/>
    **Example:**
    ```javascript
    // Categorize the price of the cars into 3 categories: Budget, Midrange, Premium.
    db.cars.aggregate([
        { $project:
            {
                _id: 0,
                maker: 1,
                model: 1,
                price: 1,
                price_category: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$price", 500000] },
                                then: "Budget"
                            },
                            { case: { $and: [{$gte: ["$price", 500000]}, {$lt: ["$price", 1000000]}] },
                                then: "Midrange"
                            },
                            { case: {$gte: ["$price", 1000000]},
                                then: "Premium"
                            }                            
                        ],
                        default: "Unknown"
                    }
                }
            }
        }
    ])
    ```


### Variables in MongoDB

- **System Generated Variables:** Ye aise variables hote hain jo MongoDB hume khud provide karta hai. Inhe hum directly use kar skte hain kuchh specific ya special information use krne ke liye.<br/>
    **Example:**
    ```javascript
    // print the current date
    db.cars.aggregate([{$project: {_id: 0, model: 1, date: "$$NOW"}}])
    ```
- **User Defined Variables:** These variables allows us to store values and reuse them within the same pipeline, making the pipeline more readable and efficient in certain scenarios.<br/>
    **Example:**
    ```javascript
    // all the examples above in which addFields or set is being is used are an example of userdefined datatypes
    db.cars.aggregate([{$project: {_id: 0, model: 1, price: 1}}, {$addFields: {price_in_lakhs: {$round: [{$divide: ["$price", 100000]}, 1]}}}])
    
    // example for integer variable
    checkPrice=1500000
    db.cars.find({price: checkPrice})

    // example for object variable
    hyundai={maker: "Hyundai"}
    db.cars.find(hyundai)
    ```


### Data Modeling

MongoDB is a NoSQL database, it doesn't enforce strict schema relationships like foreign key in relational database.<br/>
We can still model relationships between documents in MongoDB using a few approaches.

The 2 main types of relationships are:
1. **Embedded Documents (Denormalization):** Isme, same document/collection me hi dusre documents embed kr dete hain. Jaise **cars** collection me car ka data to tha hi lekin usme **owners** and **service_history** bhi embed kr diya.<br/>
    **Example:**
    ```javascript
    {
        _id: ObjectId('6842c862224f9329d66c4bd2'),
        maker: 'Hyundai',
        model: 'Creta',
        fuel_type: 'Diesel',
        transmission: 'Manual',
        engine: { type: 'Naturally Aspirated', cc: 1493, torque: '250 Nm' },
        features: [
            'Sunroof',
            'Leather Seats',
            'Wireless Charging',
            'Ventilated Seats',
            'Bluetooth'
        ],
        sunroof: true,
        airbags: 6,
        price: 1500000,
        owners: [
            { name: 'Raju', purchase_date: '2021-03-15', location: 'Mumbai' },
            { name: 'Shyam', purchase_date: '2023-01-10', location: 'Delhi' }
        ],
        service_history: [
            { date: '2022-04-10', service_type: 'Oil Change', cost: 5000 },
            {
            date: '2023-07-18',
            service_type: 'Brake Replacement',
            cost: 12000
            }
        ]
    }
    ```
2. **Referenced Documents (Normalization):** Isme, separate collections hote hain. Agar hum **users** and **orders** collection ke example se dekhein to **users** collection sirf users ka hi data hai that's it and koi aur information nahi hai, similarly **orders** collection me sirf order ki details hain lekin isme ``user_id`` ke through dono collections connected hain.<br/>
    **Example:**
    ```javascript
    // users collection
    {
        "_id": "user1",
        "name": "Amit Sharma",
        "email": "amit.sharma@example.com",
        "phone": "+91-987654210",
        "address": "MG Road, Mumbai, Maharashtra"
    },
    {
        "_id": "user2",
        "name": "Priya Verma",
        "email": "priya.verma@example.com",
        "phone": "+91-987654211",
        "address": "Nehru Place, New Delhi, Delhi"
    }

    // orders collection
    {
        "_id": "order1",
        "user_id": "user1",
        "product": "Laptop",
        "amount": 50000,
        "order_date": "2024-08-01"
    },
    {
        "_id": "order2",
        "user_id": "user2",
        "product": "Mobile Phone",
        "amount": 15000,
        "order_date": "2024-08-05"
    }
    ```


### Types of Relationships

1. **One to One:** Agar hum user ke example se dekhein to ek user ka ek hi Aadhar Number hoga.
2. **One to Many:** Agar hum ek social media platform ki baat karein to, ek user multiple posts daal skta hai.
3. **Many to Many:** Agar hum students and courses ki baat karein to, ek course ko multiple students opt kr skte hain and ek student multiple courses opt kr skta hai.

### Join in MongoDB

In MongoDb, humare paas **relational database** ke jaise **left join**, **right join**, etc, nahi hote. Hum join `$lookup` ke through perform krte hain.

**$lookup:** In MongoDB, joins are typically simulated using the $lookup stage within an aggregation pipeline. This stage allows you to combine data from two or more collections based on a shared field.<br/>
**Example:**
```javascript
db.users.aggregate([
    {
        "$lookup": {
            "from": "orders",               // the target collection to join with
            "localField": "_id",            // the field from the "users" collection
            "foreignField": "user_id",      // the field from the "orders" collection
            "as": "orders"                  // the name of the new array field to add to the "users"
        }
    }
])
```


### Limitations of Embedded Documents

1. **Document Size Limit:** MongoDB imposes a maximum document size limit of **16 MB**. This means that the entire document, including all embedded documents, cannot exceed **16 MB** in size. This limit is generally large enough for most use cases, but it can become a concern if you have a lot of embedded data.

2. **Nesting Depth Limit:** MongoDB allows documents to be nested up to **100 levels deep**. However, deeply nested documents can become difficult to manage and may lead to performance issues, so it is generally advisable to keep the nesting as shallow as possible.


### Schema Validation in MongoDB

MongoDB me ek problem hai ki hum kaisa bhi data insert krwa skte hain kisi bhi document me even if it is meaningless. To iske liye hum schema validation use krte hain. Jabb hum collection banate hain tabb hum validation rules apply kr skte hain.<br/>
- MongoDB uses a JSON schema format to define the validation rules.
- It allows us to specify various constraints and rules for our documents, such as required files, field types, and value ranges.
**Example:**
```javascript
db.createCollection("users1", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "age"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                age: {
                    bsonType: "int",
                    minimum: 18,
                    description: "must be an integer and is required"
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
})
```
In the above example, hum logg apne according schema validation laga skte hain, unki properties set kr skte hain, custom error messages set kr skte hain.

**Validation Levels:**
- **strict:** The document must fully comply with the schema validation rules. If a document does not comply, it will not be inserted or updated in the collection.
- **moderate:** Only new documents and modified fields in existing documents are validated against the schema. This allows for partial validation and can be useful for legacy systems or gradual schema enforcement.

**Validation Actions:**
- **error:** If a document does not meet the schema validation criteria, MongoDB will throw an error and reject the insert or update operation.
- **warn:** MongoDB logs a warning message when a document does not meet the schema validation criteria, but still allows the insert or update operation.

**How can we update the existing collection to add validation ?**

```javascript
db.runCommand({
    collMod: "users",   // collMod is "collection modifier"
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "age"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                age: {
                    bsonType: "int",
                    minimum: 18,
                    description: "must be an integer and is required"
                }
            }
        }
    },
    validationLevel: "moderate",
    validationAction: "warn"
})
```


### Indexes in MongoDB

