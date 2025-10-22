# Contributing to Sales Opportunity Tracker

First off, thank you for considering contributing to Sales Opportunity Tracker! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots or GIFs** if applicable
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any examples** of where this feature exists in other applications

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** in the new branch
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Ensure your code follows** the existing style
6. **Write a clear commit message**
7. **Submit a pull request**

## Development Process

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/sales-opportunity-tracker.git
   cd sales-opportunity-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Coding Standards

- Use **meaningful variable and function names**
- **Comment your code** where necessary
- Follow **React best practices**
- Use **functional components** with hooks
- Keep **components focused** on a single responsibility
- Use **Tailwind CSS** for styling (no inline styles unless necessary)
- Ensure **mobile responsiveness** for new features

### Commit Message Guidelines

Use clear, descriptive commit messages:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

Examples:
```
feat: add export to Excel functionality
fix: resolve date picker bug in opportunity form
docs: update README with API documentation
```

### Testing Your Changes

Before submitting a pull request:

1. Test all affected functionality
2. Test with different user roles (admin, sales, viewer)
3. Check browser console for errors
4. Test on multiple browsers if possible
5. Ensure responsive design works on mobile

### Submitting Changes

1. **Push your changes** to your fork
2. **Open a pull request** against the main repository
3. **Fill out the PR template** completely
4. **Link any related issues**
5. **Wait for review** and address any feedback

## Feature Development Guidelines

### Adding New Opportunity Fields

When adding new fields to the opportunity form:

1. Update the form data initialization in `SalesTracker.jsx`
2. Add the field to the appropriate section in `OpportunityForm.jsx`
3. Ensure proper validation if the field is required
4. Update the README documentation
5. Consider backward compatibility with existing data

### Adding New Sections

When adding new collapsible sections:

1. Add the section key to `expandedSections` state
2. Create a new `<Section>` component with appropriate fields
3. Ensure consistent styling with existing sections
4. Update the README to document new fields

### UI/UX Changes

- Maintain consistency with existing design
- Use existing color schemes and spacing
- Test with various screen sizes
- Ensure accessibility (keyboard navigation, screen readers)

## Project Structure

```
src/
├── App.js                 # Main application wrapper
├── SalesTracker.jsx       # Main tracker component with authentication
├── OpportunityForm.jsx    # Comprehensive opportunity form
├── index.js              # Entry point
└── index.css             # Global styles
```

## Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

## Questions?

Feel free to open an issue with your question, or reach out to the maintainers directly.

## Recognition

Contributors will be recognized in the project README. Thank you for your contributions! 🎉
