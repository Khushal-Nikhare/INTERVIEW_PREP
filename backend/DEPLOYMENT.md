# Backend Deployment Instructions

## Prerequisites

Before deploying, ensure you have:
- Python backend code
- Firebase Admin SDK credentials
- Google AI API key
- Environment variables configured

## Option 1: Deploy to Railway

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login to Railway
```bash
railway login
```

### 3. Initialize Project
```bash
cd backend
railway init
```

### 4. Set Environment Variables
```bash
railway variables set GOOGLE_API_KEY=your_key
railway variables set FIREBASE_PROJECT_ID=your_project_id
railway variables set FIREBASE_PRIVATE_KEY_ID=your_key_id
railway variables set FIREBASE_PRIVATE_KEY="your_private_key"
railway variables set FIREBASE_CLIENT_EMAIL=your_email
railway variables set FIREBASE_CLIENT_ID=your_client_id
railway variables set HOST=0.0.0.0
railway variables set PORT=8000
railway variables set ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### 5. Deploy
```bash
railway up
```

### 6. Get Your URL
```bash
railway status
```

## Option 2: Deploy to Render

### 1. Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `backend` directory

### 2. Configure Service
- **Name**: interview-prep-backend
- **Environment**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 3. Add Environment Variables
Add all variables from `.env.example`

### 4. Deploy
Click "Create Web Service"

## Option 3: Deploy to Fly.io

### 1. Install Fly CLI
```bash
# macOS/Linux
curl -L https://fly.io/install.sh | sh

# Windows
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

### 2. Login
```bash
fly auth login
```

### 3. Launch App
```bash
cd backend
fly launch
```

### 4. Set Secrets
```bash
fly secrets set GOOGLE_API_KEY=your_key
fly secrets set FIREBASE_PROJECT_ID=your_project_id
# ... set all other secrets
```

### 5. Deploy
```bash
fly deploy
```

## Option 4: Docker Deployment

### 1. Build Docker Image
```bash
cd backend
docker build -t interview-prep-backend .
```

### 2. Run Container
```bash
docker run -d \
  -p 8000:8000 \
  --env-file .env \
  --name interview-backend \
  interview-prep-backend
```

### 3. Push to Registry (Optional)
```bash
# Docker Hub
docker tag interview-prep-backend username/interview-prep-backend
docker push username/interview-prep-backend

# Google Container Registry
docker tag interview-prep-backend gcr.io/project-id/interview-prep-backend
docker push gcr.io/project-id/interview-prep-backend
```

## Option 5: Deploy to Google Cloud Run

### 1. Build and Push
```bash
cd backend
gcloud builds submit --tag gcr.io/PROJECT_ID/interview-backend
```

### 2. Deploy
```bash
gcloud run deploy interview-backend \
  --image gcr.io/PROJECT_ID/interview-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_API_KEY=your_key,FIREBASE_PROJECT_ID=your_id
```

## Post-Deployment

### 1. Test Your Deployment
```bash
# Health check
curl https://your-backend-url.com/health

# API docs
# Visit https://your-backend-url.com/docs
```

### 2. Update Frontend
Update `.env.local` in your Next.js frontend:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### 3. Enable CORS
Ensure your backend allows your frontend domain:
```env
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.com
```

## Monitoring

### Add Logging
```python
# app/main.py
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Health Checks
Most platforms support automatic health checks on `/health` endpoint.

## Troubleshooting

### Port Issues
- Render: Use `$PORT` environment variable
- Railway: Automatically detects port
- Google Cloud Run: Use `PORT` environment variable

### Memory Issues
If getting memory errors, increase service memory:
- Railway: Settings → Memory
- Render: Upgrade plan
- Cloud Run: `--memory 1Gi`

### Slow AI Responses
- Increase timeout settings
- Use caching for repeated requests
- Consider async processing

## Security Checklist

- [ ] All environment variables are secrets (not in code)
- [ ] Firebase private key is properly escaped
- [ ] CORS is configured correctly
- [ ] API rate limiting is enabled (if applicable)
- [ ] HTTPS is enforced
- [ ] No debug mode in production
- [ ] Logs don't contain sensitive data

## Cost Optimization

1. **Free Tiers**:
   - Railway: 500 hours/month free
   - Render: Free tier available
   - Fly.io: 3 VMs free

2. **Optimize Requests**:
   - Cache AI responses
   - Use connection pooling
   - Implement request throttling

3. **Auto-scaling**:
   - Set min instances to 0 (when idle)
   - Scale based on traffic

## Support

If you encounter issues:
1. Check backend logs
2. Verify environment variables
3. Test API endpoints with `/docs`
4. Review deployment platform docs
