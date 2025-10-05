# Chatbot Project

This repo contains a chatbot with:
- `Chatbot-frontend`: React-based UI
- `Chatbot-backend`: FastAPI server

To run locally:
1. Start backend: `uvicorn main:app --reload`
2. Start frontend: `npm start`

Absolutely! Here’s a clean, step-by-step **deployment documentation** for your FastAPI server on EC2, reflecting exactly what you did **without HTTPS**, including the Elastic IP setup.

---

# FastAPI Deployment on AWS EC2 (Step-by-Step)

## **Prerequisites**

* AWS account with EC2 access
* Ubuntu EC2 instance
* FastAPI backend code (main.py, requirements.txt)
* React frontend hosted on S3 (optional for API connection)

---

## **Step 1 — Launch EC2 Instance**

1. Log in to the AWS Management Console → EC2 → Launch Instance.
2. Choose **Ubuntu** AMI (Amazon Linux also works).
3. Select instance type (e.g., `t2.micro` for free tier).
4. Configure **Security Group**:

   * Allow **SSH** (port 22) from your IP
   * Allow **HTTP** (port 80) from anywhere (0.0.0.0/0)
5. Launch instance with a new or existing key pair (`.pem` file).

---

## **Step 2 — Connect to EC2 via SSH**

Open terminal and navigate to the folder containing your `.pem` file. Then run:

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>
```

* Replace `ubuntu` with your username if using a different AMI.
* This connects you to your EC2 instance.

---

## **Step 3 — Install Dependencies**

Update packages and install Python, pip, Nginx, git:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-venv python3-pip nginx git
```

---

## **Step 4 — Set Up the FastAPI App**

1. Navigate to your backend folder or clone your repo:

```bash
mkdir -p ~/Chatbot-Deploy/Chatbot-backend
cd ~/Chatbot-Deploy/Chatbot-backend
# Option A: Clone from GitHub
git clone https://github.com/youruser/your-repo.git .
# Option B: Upload from local machine via scp
```

2. Create and activate virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Test your app manually:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

* Open browser: `http://<EC2-PUBLIC-IP>:8000/docs`
* Confirm the app works and `/chat` endpoint responds.

---

## **Step 5 — Create a systemd Service**

1. Stop manual Uvicorn (Ctrl + C).
2. Create service file:

```bash
sudo nano /etc/systemd/system/fastapi.service
```

Paste:

```ini
[Unit]
Description=FastAPI Uvicorn Service
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/Chatbot-Deploy/Chatbot-backend
Environment="PATH=/home/ubuntu/Chatbot-Deploy/Chatbot-backend/venv/bin"
ExecStart=/home/ubuntu/Chatbot-Deploy/Chatbot-backend/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000

[Install]
WantedBy=multi-user.target
```

3. Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable fastapi
sudo systemctl start fastapi
sudo systemctl status fastapi
```

---

## **Step 6 — Configure Nginx as Reverse Proxy**

1. Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/fastapi
```

Paste:

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

2. Disable default Nginx config:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

3. Enable your config and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/fastapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. Test in browser:

```
http://<EC2-PUBLIC-IP>/docs
```

✅ You should see FastAPI Swagger UI.

---

## **Step 7 — Enable Elastic IP (Static IP)**

1. Go to **AWS Console → EC2 → Elastic IPs → Allocate Elastic IP**.
2. Allocate a new IP.
3. Select the EIP → **Actions → Associate Elastic IP** → select your EC2 instance.
4. Update your frontend React app to use the Elastic IP instead of the dynamic public IP:

```js
const response = await fetch("http://<ELASTIC-IP>/chat", { ... });
```

* Rebuild and redeploy React to S3 once.
* Now the frontend will always point to the correct backend, even if EC2 restarts.

---

## ✅ Summary

* FastAPI backend running via **systemd service**
* Nginx serving backend on port 80
* EC2 accessible via **Elastic IP** (static IP)
* React frontend on S3 communicates with backend via Elastic IP
* CORS enabled in FastAPI for frontend access

---





