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

