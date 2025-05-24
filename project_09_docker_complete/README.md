## Docker

Jab hum apna code likhte hain, uske sath libraries, dependencies, aur configurations bhi hoti hain. Jab hum ise kisi aur system pe chalana chahte hain, to ye sab properly setup karna padta hai, warna **"It works on my machine"** wali problem aa jati hai.

---

### Docker Kya Hai? 🚀
- Docker ek tool hai jo humare poore code, dependencies, aur configurations ko ek **container** me pack kar deta hai.
- Matlab hum apni application **kisi bhi system pe bina kisi tension ke chala sakte hain** (Windows, Mac, Linux).
- Virtual Machine (VM) ki tarah lagta hai, **par lightweight aur fast hota hai.**

---

### Docker Ke Benefits 🎯

1. **"Works on My Machine" Problem Khatam** – Code same tarike se har jagah chalega.  
2. **Fast & Lightweight** – VM ki tarah pura OS load nhi hota.  
3. **Easy Deployment** – Ek container me bundle karke kahin bhi deploy kar sakte hain.  
4. **Isolation** – Alag-alag projects ke alag-alag environments maintain ho sakte hain.  
5. **Scalability** – Multiple instances ko easily manage kar sakte hain.  
6. **Dependency Conflicts Se Chutkara** – Docker ke andar **sab kuch fixed** rehta hai.

---

### Docker Kaise Kaam Karta Hai? 🔧

Docker me 3 main cheezein hoti hain:

1. **Docker Image 📸** – Ek blueprint hota hai jisme application code + dependencies hoti hain. Docker ki agar koi image run krte hain to wo sabse pehle local pe check karega agar wo image local machine me nahi mili to **Docker Hub** se pull hogi image.
2. **Docker Container 📦** – Ye ek running instance hai kisi Docker Image ka. Is container ko alag alag device me run kr skte hain image ke through.  
3. **Dockerfile 📜** – Ek recipe jaise hoti hai jo batati hai ki container kaise build hoga. Dockerfile image ko create karta hai.

* Jaise operating system ko run krne ke liye hume ek laptop ya desktop machine chahiye hoti hai waise hi docker image ko run krne ke liye hume docker container chaiye hota hai.
* **Docker Hub:** Jaise node ke packages ke liye npm hota hai waise hi docker hub ek collection hai images ka jaha se images pull hoti hain container me run hone ke liye.

---

### Docker Use Karne Ke Baad Kya Hoga? 🎯

✅ **Same environment** har jagah – Windows, Mac, Linux!  
✅ Naye developer ko sirf `docker run` chalani hogi – **No setup required!**  
✅ Backend server pe bhi bina kisi setup ke deploy ho jayega – **AWS, DigitalOcean, etc.**

---

### Docker Installation ⚙️

1. Visit [https://www.docker.com/get-started/](https://www.docker.com/get-started/) and install docker for your OS.
2. Open terminal and check if it is installed or not.
`docker --version`

---

### Docker Commands ⌨️

- `docker --help`: Ye help section hai. Iske through hum docker ke saare commands ke baare me jaan skte hain.
- `docker <command_name> --help`: Ye hume kisi particular command ke baare me sabb information deta hai. Example: `docker ps --help`.
- `docker ps`: Ye hume running containers show krta hai.
- `docker ps -a`: Ye hume saare running and non-running containers ki list deta hai.
- `docker container ps -a`: Ye bhi hume saare running and non-running containers ki list deta hai.
- `docker images -a`: Ye docker images ki list deta hai.
- `docker image rm <image_name>`: Ye image delete krta hai. Example: `docker image rm ubuntu`. Image tabhi remove hogi jabb koi container use use nahi kr raha hoga wrna error aayegi. Iske liye pehle container remove krna hoga. We can also use `docker rmi <image_name>` to remove image.
- `docker rm <container_id>`: Ye container ko delete krta hai.
- `docker pull <image_name>`: Ye image download krta hai docker hub se. Example: `docker pull ubuntu`.
- `docker run -it <image_name>`: Create and run a new container from an image. Example: `docker run -it ubuntu`. **-it** ka mtlab hota hai interactive tty. Jaise hi hum koi image pull karenge to docker immediately hume uss image ke terminal pe le jayega taaki hum instantly usko use kar sake.
- `docker container rm <container_id>`: Ye container delete krta hai. Example: `docker container rm 52b1e898519f`.
- `docker container stop <container id>`: Ye container stop krta hai. Example: `docker container stop 9e8be9aa68df`.
- `docker run --name <custom_container_name> -it <image_name>`: Assign a name to the container. Example: `docker run --name alpine_container -it alpine`.
- `docker build -t my_express_app .`: Builds the docker image from docker file.
- `docker build -t expressapp-optimized -f ./Docker_Files/Dockerfile.optimized .`: Builds the docker image from different Docker file located in different folder.
- `docker run -t -p 3000:8000 my_express_app`: Maps the system port (8000) to docker port (3000).
- `docker run -it -p 3000:8000 -p 3001:8000 -p 3002:8000 my_express_app`: Maps the system port (8000) with multiple docker ports (3000, 3001, 3002).
- `docker run -it -P my_express_app`: Maps the exposed port automatically with random docker port. **NOTE:** Use `-P` **(uppercase)**.
- `docker push your_username/my_express_app`: Upload an image to a registry. **NOTE:** Login before pushing the image using `docker login` command.
- `docker stop container_id`: Stop one or more running containers.
- `docker network`: Manage networks.
- `docker network ls`: Show list of networks with their name, driver and scope.
- `docker network inspect <network_name>`: Display detailed information on one or more networks. **Example:** `docker network inspect bridge`.
- `docker exec container_1_name ping ip_of_container_2`: It connects one container with another. **Example:** `docker exec busybox_container ping 172.17.0.2`.
- `docker network create <custom_network_name>`: Creates a custom network. **Example:** `docker network create aashrish`.
- `docker run -itd --network=custom_network --rm --name=container_name container_image_name`: Connect a container with a custom network.<br/>
    **Example:** `docker run -itd --network=aashrish --rm --name=alpine_container alpine`.
- `docker compose up -d`: Create and start containers.
- `docker compose down`: Stop and remove containers, networks.

---

### Creating Custom Images 🖼️

Custom docker image create krne ke liye hume dockerfile create karni hoti hai.

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

# Step 3: Copy package files
COPY package.json package-lock.json ./
# Or
# COPY package*.json ./

Step 4: Install dependencies
RUN npm install
# Or
# RUN npm install --production

# Step 5: Copy all source code
COPY . .

# Step 6: Expose the port and start the app
EXPOSE 3000
CMD ["node", "server.js"]
```

### 👉 Line by Line Explanation:

1. **`FROM node:20.14.0-alpine`**:
    - `FROM` ek base image select karta hai jisme humari app chalegi.
    - `node:20.14.0-alpine` ka matlab hai ki **Node.js** ka version `20.14.0` aur **Alpine Linux** version use kar rahe hain.
    - **Alpine** kyu? Kyunki ye image chhoti (~20MB) hoti hai aur fast load hoti hai.
    - Agar **full Ubuntu/Debian version** chahiye (zyada dependencies ke liye), to `FROM node:20.14.0` likh sakte hain.
    - Agar latest **Node.js** chahiye, to `FROM node:latest` likh sakte hain.

2. **`WORKDIR /app`**:
    - `WORKDIR` batata hai ki container ke andar ki **working directory** kya hogi, bole to ye line container ke andar **working directory** set karti hai.
    - `/app` ka matlab hai ki hum sabhi files `/app` folder ke andar rakhenge. Matlab ab jo bhi hum **COPY** ya **RUN** karenge, wo `/app` directory ke andar hoga.
    - Ye `cd /app` jaisa kaam karta hai, taaki agli commands isi folder ke andar execute ho.
    - Agar ye nahi likhenge, to by default sab `/` **root directory** me jayega, jo achhi practice nahi hai.

3. **`COPY package.json package-lock.json ./`**
    - Ye command `package.json` aur `package-lock.json` ko host machine (humare local system) se container ke `/app` folder me copy karti hai.
    - `package.json` aur `package-lock.json` ko **pehle copy kar rahe hain** taaki `npm install` efficient rahe. Matlab agar code me change ho par `package.json` same ho, to `npm install` dubara na chale.
    - Docker **layer caching** use karta hai, to agar `package.json` same hai to dependencies dubara **install nahi hongi**.
    - `./` ka matlab hai ki ye files `/app` **directory** me copy ho rahi hain (kyunki humne `WORKDIR /app` set kiya hai).

4. **`RUN npm install`**:
    - Ye command `npm install` chalati hai taaki dependencies **install** ho jayein.
    - **RUN** command Docker image build time pe chalta hai.
    - `npm install --production` ka matlab hota hai ki sirf production dependencies install hongi, development dependencies nahi.
    - Agar dev dependencies bhi chahiye ho to sirf `npm install` likh sakta hai.
    - Ye step **caching optimize karta hai**, taaki har baar build karne pe `npm install` dubara na chale.

5. **`COPY . .`**:
    - Yaha hum baki ka sara code, bole to sabhi source code files **(server.js, routes, configs, etc.)** ko container ke andar copy kar rahe hain.
    - `COPY . .` ka matlab hai **current folder (.)** ke sabhi files aur folders ko container ke **/app** folder me copy karo.
    - Pehle `package.json` copy karke `npm install` chalane ka reason ye hai ki agar code change ho, to bhi dependencies dubara install na ho, sirf naye files copy ho. Agar hum pehle code copy kar dete aur phir `npm install` karte, to Docker ko har baar `npm install` chalana padta. Is tarike se Docker caching ka use karta hai aur agar `package.json` nahi badla, to dependencies dubara install nahi hoti, jo build ko fast banata hai.
    - Agar hum pehle `COPY . .` likhte, to Docker har baar cache tod deta aur `npm install` baar-baar chalta.

6. **`EXPOSE 3000`**:
    - Ye Docker ko batata hai ki **container kaunsa port use karega**. Matlab ki container ka application **3000** port pe chalega.
    - Ye **optional** hai, lekin achhi practice hai taaki pata chale ki container kis port pe sun raha hai.
    - Iska matlab hai ki agar hum container ko bahar se access karna chahta hai, to uska port map karna padega:<br/>
    `docker run -t -p 3000:8000 my_express_app`<br/>
    Upr ke command me **8000** ko humne application ke code as a port use kiya hai lekin use **3000** se map kiya hai ki container **3000** port pe chalega taki application ko bahar se access kr payein. In other words, **3000:8000** ka matlab hai container ke **3000** port ko system ke **8000** port se map kar rahe hain, bole to localhost:3000 pe apna app access kar sakti hai.

7. **`CMD ["node", "server.js"]`**:
    - `CMD` batata hai ki container start hone ke baad kaunsi command run hogi.
    - Ye command container ke start hone pe `server.js` ko **Node.js** se run karegi.

Once the **Dockerfile** is created run `docker build -t <custom_image_name> .` <br/>
**Example:** `docker build -t my_express_app .`

**NOTE:** Docker image me **dev dependencies** ka koi kaam nhi hota, kyu ki docker image sirf production wali dependencies daalte hain. 

---

### Multi-Stage Build

Multi-stage build Docker ka ek powerful feature hai jo docker image ka size chhota karta hai, build process secure aur efficient banata hai, aur unnecessary files ko final image me le jaane se rokta hai, bole to ye image optimization ke kaam aata hai. Agar codebase bohot heavy hai to utni hi heavy image banegi, isliye image optimization bohot zaruri hai.

Multi-stage build ka matlab hai, Dockerfile me **multiple** `FROM` **blocks** use karke pehle build karna, aur phir sirf zaroori files ko final image me copy karna.

```javascript
FROM node:20-alpine3.20 AS base

WORKDIR /app

# Builder stage
FROM base AS builder

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM base AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 8000

CMD [ "node", "/dist/index.js" ]
```

---

### Docker Networking

Jo bhi docker **containers** hote hain wo **isolated** hote hain bole to containers aapas me **communicate** nahi kar skte. Agar ek container chahe ki wo dusre container se kuchh data le kr use kr le to wo nahi kar skta hai kyu ki wo isolated hain. And isliye **docker networking** kaam me aati hai.

**Docker networking** ka matlab hai — Docker containers ke beech me ya bahar ke world se **kaise baat hoti hai (communication hota hai)**.

Docker network ek **virtual bridge** hota hai jo containers ko ek dusre se securely connect karta hai.<br/>
- Ek ghar me **alag-alag rooms (containers)** hote hain, par **ek corridor (network)** ke through **connected** hote hain.
- **Room A (backend)** agar **Room B (database)** se baat kare, **to corridor (network)** ke bina nahi karega.


### Types of Docker Networks 🧠

| Type        | Kab Use Karte Hain                                  | Default? |
| ----------- | --------------------------------------------------- | -------- |
| **bridge**  | Local containers ke beech secure connection ke liye | Yes      |
| **host**    | Container host system ka IP use karta hai           | No       |
| **none**    | No network — isolation ke liye                      | No       |
| **overlay** | Swarm clusters me multi-host networking ke liye     | No       |
| **macvlan** | Container ko ek unique MAC & IP dene ke liye        | No       |

**NOTE:** **Bridge** is the most commonly used network.

Jabb bhi hum koi container run karte hain to wo particular container ek network se connect ho jata hai (default bridge). Container run karne ke baad hum `docker network inspect bridge` command se check kar skte hain.

Jabb 2 ya 2 se zada containers same network se connected ho to wo ek dusre se easily communicate kar skte hain. 

---

### Docker Volume 💿

**Docker volume** ek aisi jagah hoti hai jahan humara container data permanently store karta hai, even if container **delete** ho jaye tab bhi data safe rehta hai.

- Let's say, humne ek **ubuntu** ka container run kiya and usme ek file create ki.
- Agar abb hum container destroy karenge to uske saath uska sara data bhi chala jaayega.
- Matlab har baar container **delete = data gone** 😱
- Iska seedha solution hai **Docker Volume**.
- Isse humara data safe rahega, even if container delete ho jaye.

**Example:** <br/>
```javascript
docker run -itd ubuntu
docker volume
docker volume create your_volume_name
docker run -it --rm -v your_volume_name:/data_path_inside_container ubuntu
Example: docker run -it --rm -v my_volume:/home ubuntu
cd home
cd ubuntu
cat >> abcd.txt
enter your text


Now go to the mishra folder inside ubuntu directory and create some file-
cat >> myfile.txt
Enter your content
```

The above command will create a file in our system and if we delete the ubuntu container, the data will persist in our system because we have binded the volume using `-v` flag. Check the **volumes** section in **docker desktop**

---

### Docker Compose 🧠

Abhi tak hum har container `docker run` command use kar ke chala rahe the. Is tarah agar 1000 containers hain to 1000 times hume ye command chalani padegi, jo ki impossible hai, kyu ki real world me isse bhi zada containers ho skte hain. To isliye hum **docker compose** use krte hain.

**Docker Compose** ek tool hai jisse hum **multiple containers ko ek hi config file (YAML)** me define karke ek command se chala sakta hain.

**Without Docker Compose:**
- `docker run` likh likh ke har container start karo. **Example:** `docker run -itd -p 3000:8000 image1` and so on for multiple images.
- Port, volumes, environment, links sab handle karo manually.
- **Time waste + error prone**

**With Docker Compose:**
- Ek `docker-compose.yml` file banao.
- Saari services likh do (jaise app, database, redis, etc.).
- Bas `docker compose up -d` likh do sab kuch set ho jaata hai.

**docker-compose.yml file**
```javascript
version: '3.8'

services:
  nginx:
    image: nginx:latest
    container_name: nginx_container
    ports:
      - "8080:5002"
    volumes:
      - nginx_data:/user/asus/desktop
    networks:
      - my_network
    environment:
      - NGINX_PORT=80
  
  alpine:
    image: alpine:latest
    container_name: alpine_container
    ports:
      - "3000:8000"
    volumes:
      - alpine_data:/user/asus/desktop
    networks:
      - my_network
    environment:
      - ALPINE_PORT=30
    
volumes:
  nginx_data:
  alpine_data:

networks:
  my_network:
    driver: bridge
```

`docker compose up -d`: create and start containers
`docker compose down`: Stop and remove containers, networks

---