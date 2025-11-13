# Pushing to GitHub

If you see an error like:
> fatal: could not read Username for 'https://github.com': No such device or address

It means credentials are not configured in this environment. Follow CONTRIBUTING.md for non-interactive push options (HTTPS token, SSH, or GitHub CLI).

Quick commands (HTTPS token):

git remote set-url origin https://TOKEN@github.com/theakshatmishra/akshat-portfolio.git
git push -u origin HEAD:main
