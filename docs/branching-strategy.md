# GitHub Branching Strategy

## Branch Overview

### Main Branches

| Branch | Purpose | Stability | Deployment |
|--------|---------|-----------|------------|
| `main` | Production-ready code | Stable | Production environment |
| `test` | Pre-production testing | Semi-stable | Staging/Testing environment |
| `dev` | Active development integration | Unstable | Development environment |

## Branch Purposes

### `main` Branch
- **Production branch** - only contains production-ready, tested code
- Always deployable to production
- Protected branch with strict merge requirements
- Only receives merges from `test` branch
- Tagged for releases

### `test` Branch
- **Staging branch** - code ready for QA testing
- Receives completed features from `dev`
- Used for integration testing and QA validation
- Must pass all tests before merging to `main`
- Deployed to staging/test environment

### `dev` Branch
- **Integration branch** - where feature development is integrated
- Receives feature branches and hotfixes
- Used for developer testing and initial integration
- May be unstable during active development
- Deployed to development environment

## Workflow Process

### 1. Feature Development
```
main → dev → feature/feature-name
```

1. Create feature branch from `dev`
2. Develop and test locally
3. Create Pull Request to merge back to `dev`
4. Code review and approval required
5. Merge to `dev` branch

### 2. Testing Phase
```
dev → test
```

1. When `dev` is stable, create PR from `dev` to `test`
2. Deploy to staging environment
3. Run QA tests and integration tests
4. Fix any issues in `dev` and re-merge to `test`

### 3. Production Release
```
test → main
```

1. When testing is complete, create PR from `test` to `main`
2. Final review and approval
3. Merge to `main`
4. Tag release
5. Deploy to production

## Naming Conventions

### Feature Branches
- `feature/add-user-authentication`
- `feature/improve-dashboard-ui`
- `feature/integrate-payment-gateway`

### Bugfix Branches
- `bugfix/fix-login-error`
- `bugfix/resolve-memory-leak`

### Hotfix Branches (for production issues)
- `hotfix/critical-security-patch`
- `hotfix/fix-payment-processing`

### Release Branches (optional for larger releases)
- `release/v1.2.0`
- `release/v2.0.0-beta`

## Branch Protection Rules

### `main` Branch
- ✅ Require pull request reviews (minimum 2 reviewers)
- ✅ Require status checks to pass
- ✅ Require linear history
- ✅ Restrict pushes to admins only
- ✅ Require signed commits

### `test` Branch
- ✅ Require pull request reviews (minimum 1 reviewer)
- ✅ Require status checks to pass
- ✅ Allow merge commits

### `dev` Branch
- ✅ Require pull request reviews (minimum 1 reviewer)
- ✅ Require status checks to pass
- ✅ Allow merge commits and squash merging

## Merge Strategies

| Source → Target | Strategy | Rationale |
|----------------|----------|-----------|
| Feature → `dev` | Squash and merge | Clean history, single commit per feature |
| `dev` → `test` | Merge commit | Preserve feature grouping |
| `test` → `main` | Merge commit | Clear release boundaries |
| Hotfix → `main` | Squash and merge | Clean critical fixes |

## Release Process

### 1. Prepare Release
- Ensure all features are merged to `dev`
- Update version numbers and changelog
- Merge `dev` to `test`

### 2. Testing Phase
- Deploy to staging environment
- Run full test suite
- Perform manual QA testing
- Fix any issues in `dev` and re-merge to `test`

### 3. Production Deployment
- Merge `test` to `main`
- Create release tag: `git tag -a v1.2.0 -m "Release version 1.2.0"`
- Deploy to production
- Create GitHub release with release notes

### 4. Post-Release
- Verify production deployment
- Monitor for any issues
- Update project documentation

## Hotfix Process

For critical production issues:

1. Create hotfix branch from `main`
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-issue-description
   ```

2. Fix the issue and test thoroughly

3. Create PR to merge hotfix to `main`

4. After merging to `main`, also merge the hotfix back to `dev` and `test`
   ```bash
   git checkout dev
   git merge main
   git checkout test
   git merge main
   ```

## Best Practices

### For Developers
- Always create feature branches from the latest `dev`
- Keep feature branches small and focused
- Write meaningful commit messages
- Test locally before creating PR
- Rebase feature branches before merging to keep history clean

### For Code Reviews
- Review code for functionality, style, and security
- Ensure tests are included and passing
- Verify documentation is updated
- Check for breaking changes

### For Releases
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Maintain detailed changelog
- Tag all releases in `main`
- Create GitHub releases with release notes

## Environment Mapping

| Branch | Environment | URL | Auto-Deploy |
|--------|-------------|-----|-------------|
| `main` | Production | https://app.yoursite.com | Manual |
| `test` | Staging | https://staging.yoursite.com | Auto |
| `dev` | Development | https://dev.yoursite.com | Auto |

## Git Commands Quick Reference

```bash
# Start new feature
git checkout dev
git pull origin dev
git checkout -b feature/new-feature

# Finish feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create PR via GitHub

# Update dev after merge
git checkout dev
git pull origin dev

# Promote to test
git checkout test
git pull origin test
# Create PR from dev to test via GitHub

# Release to main
git checkout main
git pull origin main
# Create PR from test to main via GitHub
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```