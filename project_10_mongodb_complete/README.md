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

1. **Scalability:**
    - **NoSQL:** Designed to scale horizontally by adding more servers, distributing the load across multiple nodes.
    - **SQL:** Typically scales vertically by adding more resources to a single server, which has limits and can be costly. Horizontal scaling (sharding) is more complex and less efficient.

2. **Schema Flexibility:**
    - **NoSQL:** Schema-less design allows for easy storage of diverse and rapidly changing data without needing to alter the schema.
    - **SQL:** Requires a predefined schema. Altering the schema (e.g., adding new columns) can be complex and time consuming, especially with large datasets.

3. **Performance:**
    - **NoSQL:** Optimized for high speed read/write operations, making it ideal for real-time data processing and analytics.
    - **SQL:** Though performant, it can suffer from slower read/write operations when dealing with very large volumes of data due to ACID transaction overhead and complex joins.

4. **Handling Unstructured Data:**
    - **NoSQL:** Efficiently handles unstructured data or semi-structured data, which is common in real-time analytics (e.g., varied user activity types).
    - **SQL:** Best suited for structured data. Handling unstructured data requires complex transformations or additional systems (e.g., storing JSON data in columns).


### MongoDB Installation

