# 🎨 Detroit Innovation Canvas

Real-time collaborative innovation platform with **full TDD, backend infrastructure, and continuous improvement**.

## ✅ Production-Ready Features

### 🧪 Test-Driven Development
- **Unit Tests** - Jest + React Testing Library (70%+ coverage)
- **Integration Tests** - Full API flow testing
- **E2E Tests** - Playwright user journey tests
- **CI/CD** - Automated testing on every commit

### 🗄️ Backend Infrastructure
- **Vercel KV (Redis)** - Persistent storage
- **Rate Limiting** - 10 requests/minute per IP
- **Input Validation** - Zod schema validation
- **Health Checks** - `/api/health` endpoint
- **Error Handling** - Graceful failures

### 🔄 Continuous Improvement
- **Automated Testing** - Every PR
- **Security Scanning** - Trivy on every push
- **Coverage Reports** - Codecov integration
- **Performance Monitoring** - Health checks

## 🚀 Run Tests

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Type check
npm run type-check

# Lint
npm run lint
```

## 📊 CI/CD Pipeline

Every commit triggers:
1. ✅ Type checking
2. ✅ Linting
3. ✅ Unit tests (70%+ coverage required)
4. ✅ E2E tests
5. ✅ Security scan
6. ✅ Build verification
7. ✅ Deploy (if main branch)

### 🚀 GitHub Pages Deployment

The project automatically deploys to GitHub Pages on every push to the `main` branch:
- **Build**: Static export via Next.js (`npm run build`)
- **Deploy**: Automatic deployment to GitHub Pages
- **URL**: Available at your GitHub Pages URL once deployed

**Note**: API routes require server-side execution and won't function on GitHub Pages (static hosting). For full functionality including API routes, consider deploying to Vercel or another platform that supports server-side rendering.

## 🛡️ Security

- Rate limiting (10 req/min)
- Input validation
- Security headers
- Dependency scanning
- Automated audits

## 📈 Monitoring

- Health checks: `/api/health`
- Rate limit headers
- Error logging
- Performance tracking

---

**Test-Driven • User-Guided • Human-Integrated** ✅
