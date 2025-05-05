# GraphQL

let's say humare paas ek client and server (nodejs server) hai. Uss server me kuchh endpoints bane huye hain, now suppose user ko kuchh resource get karna hai. To user ek get request banayega, for eg. GET /todos. To abb server saare todos return kar dega.

Ek todo ka basic structure agar hum dekhte hain to usme- todoId, userId, title, isCompleted, ye sabb hota hai.

jabb humne GET request banayi to server saare todos bhej raha hai will all fields. Abb yaha problem ye hai ki agar hume ye sabb nahi chahiye and sirf title chahiye to kya karenge. front end se to baki fields ignore kr denge aur title show kr denge, lekin fetch to sabb hua naa. Ye bina mtlab bandwidth use kar rha hai.

Yaha graph ql kehta hai ki bhai ye problem mai solve kr dunga. Client pehle se bata dega ki use kya data chahiye. To user ko agar sirf title chahiye to wo ek graphql request bana ke server pe bhejega aur server se in return sirf title aayega.

Query: Agar hume apne graphql ke server se kuchh fetch krna hai to use query kehte hain.
Mutation: Agar hume apne graphql ke server ko kuchh dena hai to use mutation kehte hain.


## Install graph ql snd setup apollo server
npm i @apollo/server graphql


for dummy data i have used- https://jsonplaceholder.typicode.com/todos

NOTE: req.body is not set; this probably means you forgot to set up the `json` middleware before the Apollo Server middleware.
you might get this error. To resolve this check the version of express installed. Apollo Server Express expects Express 4.x, but I had Express 5.x installed. This caused a dependency conflict and broke the request handling. To fix it, I first uninstalled the current version of Express using npm uninstall express, then installed a compatible version with npm install express@4.18.2.