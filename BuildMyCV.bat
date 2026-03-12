@echo off
cd C:\Users\richu\buildmycv
start cmd /k "npm run dev"
timeout /t 3
start chrome http://localhost:5173