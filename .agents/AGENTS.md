# Automated Git Push Rule
Whenever you make any changes to the codebase in this project, you MUST automatically commit and push the changes to GitHub before ending your turn. You do not need to ask the user for permission to push.

To do this, use a powershell command like: `git add . ; git commit -m "brief description of changes" ; git push`

# Ponytail Extension Rule (Ladder of Laziness)
Always adhere to YAGNI and the Ladder of Laziness before writing or editing code:
1. YAGNI: Skip unnecessary features/abstractions.
2. Codebase Reuse: Check existing project code before writing new code.
3. Standard Library / Native Platform: Use browser/language built-ins over 3rd-party dependencies.
4. Installed Packages: Reuse installed npm packages before installing new ones.
5. Minimal Code: Write the smallest, cleanest implementation that safely meets requirements.
