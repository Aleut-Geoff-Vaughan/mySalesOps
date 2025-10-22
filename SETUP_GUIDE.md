# Setup Guide for Sales Opportunity Tracker

This guide will walk you through setting up the Sales Opportunity Tracker application on your local machine and preparing it for GitHub.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- A **GitHub account** - [Sign up here](https://github.com/)

## Step 1: Create a New React Application

1. Open your terminal or command prompt
2. Navigate to where you want to create your project:
   ```bash
   cd ~/Documents  # or wherever you want
   ```

3. Create a new React app:
   ```bash
   npx create-react-app sales-opportunity-tracker
   cd sales-opportunity-tracker
   ```

## Step 2: Install Required Dependencies

Install Tailwind CSS and other dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npx tailwindcss init -p
```

## Step 3: Add the Application Files

Replace or add these files in your project:

### In the `src/` directory:

1. **Replace** `src/App.js` with the provided `App.js`
2. **Replace** `src/index.js` with the provided `index.js`
3. **Replace** `src/index.css` with the provided `index.css`
4. **Replace** `src/App.css` with the provided `App.css`
5. **Add** `src/SalesTracker.jsx` (the main component)
6. **Add** `src/OpportunityForm.jsx` (the form component)

### In the root directory:

1. **Replace** `tailwind.config.js` with the provided file
2. **Replace** `postcss.config.js` with the provided file
3. **Add/Replace** `.gitignore` with the provided file
4. **Add** `README.md` with the provided file
5. **Add** `LICENSE` with the provided file

## Step 4: Verify Your Directory Structure

Your project should look like this:

```
sales-opportunity-tracker/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── SalesTracker.jsx
│   └── OpportunityForm.jsx
├── .gitignore
├── LICENSE
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── SETUP_GUIDE.md
```

## Step 5: Test the Application Locally

1. Start the development server:
   ```bash
   npm start
   ```

2. Your browser should automatically open to `http://localhost:3000`

3. Test the application with the demo credentials:
   - Username: `admin`, Password: `password123`
   - Username: `sales`, Password: `sales123`
   - Username: `viewer`, Password: `viewer123`

4. If everything works, stop the server with `Ctrl+C`

## Step 6: Initialize Git Repository

1. Initialize a new Git repository:
   ```bash
   git init
   ```

2. Add all files to Git:
   ```bash
   git add .
   ```

3. Create your first commit:
   ```bash
   git commit -m "Initial commit: Sales Opportunity Tracker"
   ```

## Step 7: Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and log in
2. Click the "+" icon in the top right and select "New repository"
3. Fill in the repository details:
   - **Repository name**: `sales-opportunity-tracker`
   - **Description**: "A comprehensive React-based sales opportunity management system for government contracting"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

## Step 8: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR-USERNAME/sales-opportunity-tracker.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 9: Verify on GitHub

1. Go to your repository on GitHub
2. You should see all your files
3. The README.md should be displayed on the repository homepage

## Optional: GitHub Pages Deployment

To deploy your app to GitHub Pages:

1. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add these scripts to your `package.json`:
   ```json
   "homepage": "https://YOUR-USERNAME.github.io/sales-opportunity-tracker",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     // ... existing scripts
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Go to your repository settings on GitHub
5. Navigate to "Pages" section
6. Your app will be live at the URL shown

## Troubleshooting

### Port 3000 is already in use
```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
# On Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Tailwind styles not showing
- Ensure `tailwind.config.js` has the correct content paths
- Restart the development server
- Clear browser cache

### Git push fails
- Verify you're using the correct repository URL
- Check if you have permission to push to the repository
- Ensure you've set up Git credentials

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

After successfully deploying to GitHub:

1. **Update the README**: Add your specific information
2. **Set up issues**: Enable GitHub Issues for bug tracking
3. **Add a CONTRIBUTING.md**: If you want others to contribute
4. **Create branches**: Use feature branches for development
5. **Add CI/CD**: Set up GitHub Actions for automated testing
6. **Add more features**: Refer to the "Future Enhancements" section in README

## Getting Help

- Check the [README.md](README.md) for general documentation
- Look for similar issues in GitHub repositories
- Ask questions on Stack Overflow with tags: `reactjs`, `tailwindcss`

## Useful Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for updates
npm outdated

# Update dependencies
npm update

# Push changes to GitHub
git add .
git commit -m "Your commit message"
git push
```

---

**Congratulations!** You now have your Sales Opportunity Tracker on GitHub! 🎉
