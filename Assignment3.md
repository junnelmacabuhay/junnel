MACABUHAY, JUNNEL P.
BSICT 3B-1

ITE 325 — Assignment 3: AI Code Quality Audit
1) Target Area
Files chosen:

src/app.controller.ts

public/script.js

What does this part of the app do?
The app.controller.ts handles the backend API routes for academic data, while script.js manages the frontend logic for rendering the interactive To-Do calendar and the Chart.js dashboard statistics.

2) Short research notes
What is refactoring? Refactoring is the process of improving the internal structure of existing code without changing its external behavior or results.

How is refactoring different from adding features? Refactoring makes the code cleaner and easier to maintain, whereas adding features introduces new functionality to the end user.

3 Code Smells common in AI-generated code:

Hardcoded Magic Strings: Reusing the same string (like a database key) instead of assigning it to a constant.

Over-Complexity: Logic that looks correct but includes unnecessary layers or "clever" one-liners that are hard to debug.

Missing Edge Case Handling: Functions that work with perfect data but crash if a value is null or undefined.

2 Techniques to refactor safely:

Small, Atomic Commits: Changing only one tiny thing at a time so bugs are easy to trace.

Side-by-Side Verification: Testing the app output before and after a change to ensure nothing broke.

3) Code Quality Audit (minimum 5 findings)
Finding 1: Mixed Concerns in script.js.
Why: The calendar logic and dashboard chart logic are inside the same massive DOMContentLoaded block, making it hard to find specific code.
Where: public/script.js — Main event listener block.

Finding 2: Lack of Type Safety/DTOs in Controller.
Why: Using any or raw objects for task inputs allows potentially malicious or broken data to enter the system.
Where: src/app.controller.ts — Task creation endpoint.

Finding 3: Duplicated localStorage logic.
Why: The script manually parses JSON every time it needs a task, increasing the chance of a typo in the storage key.
Where: public/script.js — Found in both the "Update Dashboard" and "Load Calendar" functions.

Finding 4: Unclear Variable Naming.
Why: Using names like d for date or t for task (common in AI boilerplate) makes it difficult for other developers to read.
Where: public/script.js — Inside the Chart.js data mapping section.

Finding 5: Hardcoded UI Styles in Logic.
Why: Chart colors and border widths are hardcoded in the JavaScript, making UI updates impossible without touching the logic.
Where: public/script.js — Chart configuration object.

4) Safe Refactoring Plan (minimum 6 steps)
Step 1 (small change): Create a dedicated constant for the localStorage key at the top of script.js.
Verification: Refresh the dashboard; ensure "Total Tasks" still displays the correct number from storage.
Commit message: "refactor: define constant for local storage keys"

Step 2: Define a TypeScript interface or DTO for the Task object in the backend.
Verification: Run npm run start:dev and ensure there are no compilation errors.
Commit message: "refactor: add DTO for task input validation"

Step 3: Extract the Chart.js setup into a standalone function named initializeDashboardChart().
Verification: Load the dashboard and confirm the line graph still renders correctly.
Commit message: "refactor: modularize chart initialization"

Step 4: Replace the alert() pop-ups with console.warn() or a UI message bar.
Verification: Add a task and ensure the page doesn't freeze with a pop-up, but the task still saves.
Commit message: "refactor: remove blocking alerts in favor of logs"

Step 5: Create a helper function fetchTasksFromStorage() to handle JSON parsing and error checking.
Verification: Navigate to the calendar and confirm all saved events appear on the grid.
Commit message: "refactor: centralize task retrieval logic"

Step 6: Move the CSS colors used in the chart to a separate CSS file using CSS Variables.
Verification: Change the variable in styles.css and confirm the chart color updates without changing the JS.
Commit message: "refactor: move UI styles from JS to CSS variables"

5) Reflection
AI is incredibly good at generating rapid prototypes and providing the correct syntax for complex libraries like Chart.js or FullCalendar. However, AI is bad at maintaining a consistent architectural style across multiple files, often creating "spaghetti code" if not guided. A human engineer must always be responsible for the security, scalability, and long-term readability of the code. To "own the problem" means that an engineer is responsible for the actual solution and its reliability, rather than just being a "manager" of AI-generated text.