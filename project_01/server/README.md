## package.json me `"type": "module"`
Agar hum `"type": "module"` use krte hain to hum `"import"` use kr skte hain instead of `"require"`.

## HTTP Methods

- **Create:** `POST`
- **Read:** `GET`
- **Update:** `PUT`
- **Delete:** `DELETE`
- **Minor Update:** `PATCH`

## 2 Types of Headers

1. **Client ka header:** Client kya kya metadata bhej rha hai  
2. **Server ka header:** Server kya kya metadata bhej rha hai  

## Common HTTP Status Codes

- `200`: OK  
- `201`: Created  
- `400`: Bad Request  
- `401`: Unauthorized  
- `500`: Internal Server Error  

🔗 **[Reference for all status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)**

---

## JWT (JavaScript Web Token)

- Ye authorization ke kaam aata hai.  
- Agar humne login kiya aur humne token ki expiry date `1 day` rkhi hai to user `1 din` me kabhi bhi aa skta hai apne dashboard me without logging in (session expire nhi hoga).  
- Token generate hone ke baad agar user ko koi feature/service use krni hai (e.g. `createTodo`, `updateTodo`), to server pehle verify/authenticate karega ki user logged in hai ya nhi, then access dega.

### Access Tokens
- Passwordless login ke liye useful hain.
- Shared resources (files, data, etc.) ko access krne ke liye secure hote hain.

### Refresh Tokens
- Refresh tokens session ko smoothly maintain krne me madad krte hain without compromising security.
- Agar long-term access chahiye ho to Refresh Tokens zaroori hote hain.
- **Skip Refresh Tokens:** Jab long-term access ki zarurat na ho.

---

## CORS Error (Cross-Origin Resource Sharing)

- Jab client side se request bhejte hain server ko, to server ko ye maloom hona chahiye ki request kaha se aa rahi hai.
- Bole to **client ka URL maloom hona chaiye.**
- Jabb server ko ye maloon nahi hota hai ki request kaha se aa rhi hai to wo CORS fek deta hai.

---

## Docker

Jab hum apna code likhte hain, uske sath libraries, dependencies, aur configurations bhi hoti hain. Jab hum ise kisi aur system pe chalana chahte hain, to ye sab properly setup karna padta hai, warna **"It works on my machine"** wali problem aa jati hai.  

### 🚀 Docker Kya Hai?
- Docker ek tool hai jo humare poore code, dependencies, aur configurations ko ek **container** me pack kar deta hai.
- Matlab hum apni application **kisi bhi system pe bina kisi tension ke chala sakte hain** (Windows, Mac, Linux).
- Virtual Machine (VM) ki tarah lagta hai, **par lightweight aur fast hota hai.**

### 🎯 Docker Ke Benefits

1. **"Works on My Machine" Problem Khatam** – Code same tarike se har jagah chalega.  
2. **Fast & Lightweight** – VM ki tarah pura OS load nhi hota.  
3. **Easy Deployment** – Ek container me bundle karke kahin bhi deploy kar sakte hain.  
4. **Isolation** – Alag-alag projects ke alag-alag environments maintain ho sakte hain.  
5. **Scalability** – Multiple instances ko easily manage kar sakte hain.  
6. **Dependency Conflicts Se Chutkara** – Docker ke andar **sab kuch fixed** rehta hai.

### 🔧 Docker Kaise Kaam Karta Hai?

Docker me 3 main cheezein hoti hain:

1. **Docker Image 📸** – Ek blueprint hota hai jisme application code + dependencies hoti hain.  
2. **Docker Container 📦** – Ye ek running instance hai kisi Docker Image ka.  
3. **Dockerfile 📜** – Ek recipe hoti hai jo batati hai ki container kaise build hoga.  

### 🎯 Docker Use Karne Ke Baad Kya Hoga?

✅ **Same environment** har jagah – Windows, Mac, Linux!  
✅ Naye developer ko sirf `docker run` chalani hogi – **No setup required!**  
✅ Backend server pe bhi bina kisi setup ke deploy ho jayega – **AWS, DigitalOcean, etc.**

### Dockerfile & .dockerignore

`Dockerfile` ek script jaisi hoti hai jo Docker ko batati hai ki humara container kaise banega. `Dockerfile` ek **text file** hoti hai jisme step-by-step instructions likhi hoti hain jo Docker ko batati hain ki **container kaise create** karna hai. Jab hum `docker build` command chalate hain, to ye `Dockerfile` ko read karke ek **Docker image** banata hai.

`.gitignore` jaisi ek `dockerignore` file bhi hoti hai jo unnecessary files ko ignore karti hai. Isliye `node_modules` ya `.env` ko copy hone se bachane ke liye `.dockerignore` file banao aur isme likho:

**.dockerignore:**
```javascript
node_modules
.git
.env
```

### Dockerfile Ka Detailed Breakdown

**Dockerfile:**
```javascript
# Step 1: Use Node.js 20.14.0 with Alpine for lightweight container
FROM node:20.14.0-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Step 4: Copy all source code
COPY . .

# Step 5: Expose the port and start the app
EXPOSE 3000
CMD ["node", "server.js"]
```

### 👉 Line by Line Explanation:

1. **`FROM node:20.14.0-alpine`**:
    - `FROM` ek base image select karta hai jisme humari app chalegi.
    - `node:20.14.0-alpine` ka matlab hai ki **Node.js** ka version `20.14.0` aur **Alpine Linux** version use kar rahe hain.
    - **Alpine** kyon? Kyunki ye image chhoti (~20MB) hoti hai aur fast load hoti hai.
    - Agar **full Ubuntu/Debian version** chahiye (zyada dependencies ke liye), to `FROM node:20.14.0` likh sakte hain.
    - Agar latest **Node.js** chahiye, to `FROM node:latest` likh sakte hain.

2. **`WORKDIR /app`**:
    - 

docker compose up --build
docker ps
docker ps -a
docker images
docker stop <container_id>
docker rm <container_id>
docker image rm <image_name>


### Redis
https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/docker/
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

docker exec -it <redis_container_id> bash
example: docker exec -it f1690100a396 bash






