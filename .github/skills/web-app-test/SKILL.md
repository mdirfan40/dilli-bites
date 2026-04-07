---
name: web-app-test
description: Test web applications by starting server, checking for errors, validating structure, and performing basic checks using Playwright for real browser testing. Use when: testing web apps, checking deployment readiness, validating changes, running quality assurance, frontend UI testing.
---

# Web App Test

## Workflow

1. **Check Project Structure**: Verify necessary files (index.html, server.js, package.json) exist.

2. **Install Dependencies**: Run `npm install` if package.json present and node_modules missing.

3. **Start Server**: Launch the development server (e.g., via `node server.js` or `npm start`).

4. **Validate HTML**: Check for syntax errors in HTML files.

5. **Check Console Errors**: Monitor browser console for JavaScript errors.

6. **Test Links**: Validate internal and external links are not broken.

7. **Run Tests**: Execute any unit or integration tests if available.

8. **Run Playwright Tests**: Execute end-to-end tests in real browsers using Playwright to validate frontend UI interactions.

9. **Performance Check**: Basic load time and responsiveness assessment.

10. **Accessibility Scan**: Quick check for common accessibility issues.

11. **Report Findings**: Summarize results and suggest fixes.

## Quality Criteria

- No console errors
- All links functional
- HTML valid
- Server starts without issues
- Tests pass (if any)
- Playwright tests pass

## Decision Points

- If server fails to start, check logs and suggest fixes.
- If tests fail, provide error details.
- If links broken, list them for repair.
- If Playwright tests fail, provide error details, screenshots, and trace files.