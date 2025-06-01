# Assignment 2 - React To-Do List

## 🔧 Description

This is a React-based To-Do List built using **Vite**.  
It allows users to:

- ✅ Add new tasks (input is validated).
- ✅ Remove tasks.
- ✅ Mark tasks as completed (with strikethrough).
- ✅ Filter tasks (All, Completed, Incomplete).
- ✅ Sort tasks (Newest First / Oldest First).
- ✅ Persist tasks using **localStorage**.

---

## 🚀 How to Run Locally

1. Clone this repo or download it.
2. Navigate to the project folder:

   ```bash
   cd CSI_Intern_assignments/Assignment_2

3. Install dependencies:
   npm install
4. Start the app:
   npm run dev

5. Open your browser at:
   http://localhost:5173

## 🧪 How to Test

-- Add multiple tasks (including duplicates).

-- Remove tasks with the ❌ button.

-- Click a task to toggle completion (strikethrough).

-- Use the filter dropdown to view:

   All

   Completed

   Incomplete tasks.

-- Use the sort dropdown to reorder tasks.

-- Refresh the page — tasks should persist due to localStorage.


## 📁 Folder Structure


src/
├── assets/
│   └── react.svg
├── components/
│   └── TodoList.jsx
├── App.jsx
├── main.jsx
└── index.css


💡 Notes

-- Built with React 19 and Vite.

-- Duplicate tasks are allowed.

-- No external backend used.

## 🧪 Brief Testing Guidance

# 1. Add Tasks:

-- Enter task names in the input box and click the "Add" button or press Enter.

-- Verify that tasks appear below the input.

-- Try adding duplicate tasks to ensure duplicates are accepted.

# 2. Mark Tasks Completed:

-- Click on any task to toggle its completion status.

-- Completed tasks should show a strikethrough style.

# 3. Remove Tasks:

-- Click the ❌ (delete) button next to a task.

-- Confirm the task is removed immediately.

# 4. Filter Tasks:

-- Use the filter dropdown to switch views between:

-- All tasks

-- Completed tasks only

-- Incomplete tasks only

-- Verify the task list updates accordingly.

# 5. Sort Tasks:

-- Use the sort dropdown to reorder tasks by newest first or oldest first.

-- Confirm that the task order changes as expected.

# 6. Persistence:

-- Refresh the browser page.

-- Confirm that all tasks and their statuses remain intact (using localStorage).

# 7. Edge Cases:

-- Rapidly add and remove tasks to check app stability.

-- Try empty or whitespace-only task entries (should be rejected).


