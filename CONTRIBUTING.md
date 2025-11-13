# Contributing and GitHub Push Instructions

This repository was initialized locally. To push to GitHub non-interactively, use one of the methods below.

## 1) HTTPS with Personal Access Token (recommended)

Prerequisites:
- A GitHub Personal Access Token (classic) with `repo` scope.

Steps:
1. Set the remote URL to include the token:
   Replace TOKEN with your actual token (do not include angle brackets).

   git remote set-url origin https://TOKEN@github.com/theakshatmishra/akshat-portfolio.git

   Note: This writes the token to your git config history for this clone. Prefer using a credential helper where possible.

2. Push current branch to `main` and set upstream:
   
   git push -u origin HEAD:main

If the remote already has commits and you want to reconcile without losing history:

- Fetch and rebase:
  
  git fetch origin
  git rebase origin/main

- Resolve any conflicts and then push:

  git push -u origin HEAD:main

If you need to force-push (only when appropriate and approved):

  git push -u origin HEAD:main --force-with-lease

## 2) SSH (preferred for long-term)

1. Ensure your SSH key is added to GitHub.
2. Set the remote and push:

   git remote set-url origin git@github.com:theakshatmishra/akshat-portfolio.git
   git push -u origin HEAD:main

## 3) GitHub CLI (gh)

1. Authenticate:

   gh auth login --hostname github.com --git-protocol https --web

2. Push:

   git push -u origin HEAD:main

## Current repository state

- Local branch: see output of `git branch --show-current`
- Remote origin: https://github.com/theakshatmishra/akshat-portfolio.git
- Latest commit message: "chore: initial import of portfolio"

## Line endings and diffs

This repo includes a `.gitattributes` file to normalize line endings to avoid noisy diffs across OSes. See that file for details.
