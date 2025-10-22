# Deployment Guide

This guide covers various deployment options for the Sales Opportunity Tracker application.

## Table of Contents

1. [GitHub Pages](#github-pages)
2. [Vercel](#vercel)
3. [Netlify](#netlify)
4. [Heroku](#heroku)
5. [AWS S3 + CloudFront](#aws-s3--cloudfront)
6. [Docker](#docker)

## Prerequisites

- Your code pushed to GitHub
- Application tested locally and working
- Production build tested locally (`npm run build`)

---

## GitHub Pages

**Best for**: Simple static hosting, free option

### Setup Steps

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://YOUR-USERNAME.github.io/sales-opportunity-tracker",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

4. Configure GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Your app will be live at the homepage URL

### Pros
- Free
- Easy setup
- Integrated with GitHub

### Cons
- Static hosting only (no backend)
- Custom domain requires additional setup

---

## Vercel

**Best for**: Instant deployments, best developer experience

### Setup Steps

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts:
   - Link to existing project or create new
   - Configure project settings
   - Deploy

### Alternative: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect React and deploy

### Pros
- Automatic deployments on git push
- Preview deployments for PRs
- Free tier available
- Fast global CDN
- Custom domains easy to set up

### Cons
- Requires Vercel account

### Configuration

Create `vercel.json` in root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app"
}
```

---

## Netlify

**Best for**: Easy continuous deployment, great free tier

### Setup Steps

#### Option 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Initialize:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

#### Option 2: GitHub Integration

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Deploy

### Pros
- Automatic deployments
- Deploy previews
- Free SSL certificates
- Form handling
- Serverless functions support

### Cons
- Build minutes limited on free tier

### Configuration

Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Heroku

**Best for**: When you need backend functionality later

### Setup Steps

1. Install Heroku CLI:
   - Download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

2. Login:
```bash
heroku login
```

3. Create app:
```bash
heroku create sales-opportunity-tracker
```

4. Add buildpack:
```bash
heroku buildpacks:set heroku/nodejs
```

5. Create `Procfile` in root:
```
web: npm start
```

6. Update `package.json`:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "heroku-postbuild": "npm run build"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

7. Deploy:
```bash
git push heroku main
```

### Pros
- Easy to add backend later
- Database support
- Add-ons ecosystem

### Cons
- Free tier has limitations
- App sleeps after 30 minutes of inactivity
- Slower than static hosting

---

## AWS S3 + CloudFront

**Best for**: Enterprise deployments, fine-grained control

### Setup Steps

1. Build the app:
```bash
npm run build
```

2. Create S3 bucket:
   - Go to AWS Console → S3
   - Create bucket with unique name
   - Disable "Block all public access"
   - Enable static website hosting

3. Upload build folder:
   - Upload all files from `build/` directory
   - Set permissions to public read

4. Set up CloudFront (optional but recommended):
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Set default root object to `index.html`
   - Enable HTTPS

5. Configure bucket policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

### Automated Deployment with AWS CLI

```bash
# Install AWS CLI
npm install -g aws-cli

# Configure
aws configure

# Sync build folder
npm run build
aws s3 sync build/ s3://YOUR-BUCKET-NAME --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR-DIST-ID --paths "/*"
```

### Pros
- Highly scalable
- Global CDN with CloudFront
- Fine-grained control
- Can integrate with other AWS services

### Cons
- More complex setup
- Costs can add up
- Requires AWS knowledge

---

## Docker

**Best for**: Consistent deployment across environments

### Dockerfile

Create `Dockerfile` in root:
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

### .dockerignore

Create `.dockerignore`:
```
node_modules
build
.git
.gitignore
README.md
```

### Build and Run

```bash
# Build image
docker build -t sales-opportunity-tracker .

# Run container
docker run -p 3000:80 sales-opportunity-tracker

# Push to Docker Hub
docker tag sales-opportunity-tracker YOUR-USERNAME/sales-opportunity-tracker
docker push YOUR-USERNAME/sales-opportunity-tracker
```

### Deploy to Cloud with Docker

Can be deployed to:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

---

## Environment Variables

For production deployments with different configurations:

1. Create `.env.production`:
```bash
REACT_APP_API_URL=https://api.yourapp.com
REACT_APP_VERSION=1.0.0
```

2. Access in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

3. Configure in deployment platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Heroku: Config Vars in Settings

---

## Post-Deployment Checklist

- [ ] Test all functionality on deployed site
- [ ] Verify all pages load correctly
- [ ] Check console for errors
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify SSL certificate (HTTPS)
- [ ] Set up custom domain if needed
- [ ] Configure monitoring/analytics
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Document deployment process for team

---

## Monitoring and Analytics

### Google Analytics

Add to `public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA-XXXXXXXXX');
</script>
```

### Error Tracking with Sentry

```bash
npm install @sentry/react
```

Add to `index.js`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR-SENTRY-DSN",
  environment: process.env.NODE_ENV,
});
```

---

## Troubleshooting

### Build Fails
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check Node version matches
- Review build logs for specific errors

### Blank Page After Deployment
- Check browser console for errors
- Verify `homepage` in package.json
- Check routing configuration
- Ensure all assets are loading

### 404 Errors on Refresh
- Configure server to redirect all routes to index.html
- See platform-specific redirect rules above

---

## Recommended Deployment

For most users: **Vercel** or **Netlify**
- Easy setup
- Automatic deployments
- Free tier
- Great developer experience

For enterprise: **AWS S3 + CloudFront**
- More control
- Better for large scale
- Integration with other services

---

## Need Help?

- Check deployment platform documentation
- Open an issue on GitHub
- Review the troubleshooting section

Happy deploying! 🚀
