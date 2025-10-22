# Quick Start - Push to GitHub in 5 Minutes

This is the fastest way to get your Sales Opportunity Tracker on GitHub.

## Steps

### 1. Create React App (2 minutes)
```bash
npx create-react-app sales-opportunity-tracker
cd sales-opportunity-tracker
```

### 2. Install Dependencies (1 minute)
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Replace Files (1 minute)

Copy these files from the outputs folder to your project:

**Root directory:**
- `.gitignore`
- `README.md`
- `LICENSE`
- `tailwind.config.js`
- `postcss.config.js`
- `SETUP_GUIDE.md`
- `CONTRIBUTING.md`
- `DEPLOYMENT.md`

**src/ directory:**
- `App.js`
- `App.css`
- `index.js`
- `index.css`
- `SalesTracker.jsx`
- `OpportunityForm.jsx`

**public/ directory:**
- `index.html`

### 4. Test Locally (30 seconds)
```bash
npm start
```
Login with: admin / password123

### 5. Push to GitHub (30 seconds)

```bash
git init
git add .
git commit -m "Initial commit: Sales Opportunity Tracker"
```

Then on GitHub:
1. Create new repository: `sales-opportunity-tracker`
2. Don't initialize with README
3. Copy the commands shown and run them:

```bash
git remote add origin https://github.com/YOUR-USERNAME/sales-opportunity-tracker.git
git branch -M main
git push -u origin main
```

**Done!** 🎉 Your code is now on GitHub!

## Next Steps

- Deploy to Vercel or Netlify (see DEPLOYMENT.md)
- Customize the README with your information
- Invite collaborators
- Set up GitHub Issues

## One-Line Deploy to Vercel

```bash
npm install -g vercel && vercel
```

## Need More Details?

See the full SETUP_GUIDE.md for detailed instructions.
