# Setup Checklist

Use this checklist to ensure your separated frontend-backend project is properly configured.

## ✅ Backend Setup Checklist

### 1. Environment Setup
- [ ] Python 3.10+ installed
- [ ] `pip` package manager available
- [ ] Navigate to `backend/` directory

### 2. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```
- [ ] All packages installed successfully
- [ ] No errors during installation

### 3. Environment Variables
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in `GOOGLE_API_KEY`
- [ ] Fill in `FIREBASE_PROJECT_ID`
- [ ] Fill in `FIREBASE_PRIVATE_KEY_ID`
- [ ] Fill in `FIREBASE_PRIVATE_KEY` (with quotes and \n)
- [ ] Fill in `FIREBASE_CLIENT_EMAIL`
- [ ] Fill in `FIREBASE_CLIENT_ID`
- [ ] Set `ALLOWED_ORIGINS` to include frontend URLs

### 4. Test Backend
```bash
python run.py
```
- [ ] Server starts without errors
- [ ] Server running on http://localhost:8000
- [ ] Visit http://localhost:8000/health returns `{"status": "healthy"}`
- [ ] Visit http://localhost:8000/docs shows API documentation

### 5. Run Tests
```bash
python test_api.py
```
- [ ] Health check passes
- [ ] Question generation test passes
- [ ] Feedback generation test passes

---

## ✅ Frontend Setup Checklist

### 1. Environment Variables
- [ ] Open `.env.local` file
- [ ] Add `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] Keep all existing Firebase variables
- [ ] Keep all existing VAPI variables

### 2. Update Code Files

**Option A: Backup and Replace**
```bash
# Backup old files
mv lib/actions/interview.action.ts lib/actions/interview.action.old.ts
mv app/api/vapi/generate/route.ts app/api/vapi/generate/route.old.ts

# Use new files
mv lib/actions/interview.action.new.ts lib/actions/interview.action.ts
mv app/api/vapi/generate/route.new.ts app/api/vapi/generate/route.ts
```
- [ ] Old files backed up
- [ ] New files renamed and in place

**Option B: Manual Updates**
- [ ] Copy content from `interview.action.new.ts` to `interview.action.ts`
- [ ] Copy content from `route.new.ts` to `route.ts`

### 3. Test Frontend
```bash
npm run dev
```
- [ ] Frontend starts without errors
- [ ] Frontend running on http://localhost:3000 or 3001
- [ ] No console errors in browser

---

## ✅ Integration Testing

### 1. Test Complete Flow
- [ ] Backend server is running (port 8000)
- [ ] Frontend server is running (port 3000/3001)
- [ ] Can login to the application
- [ ] Can navigate to dashboard

### 2. Test AI Question Generation
- [ ] Click "Start an Interview"
- [ ] Fill in interview details
- [ ] Click generate
- [ ] Questions are generated successfully
- [ ] Interview is created

### 3. Test Custom Interview
- [ ] Click "Create Custom Interview"
- [ ] Fill in interview details
- [ ] Add custom questions
- [ ] Submit form
- [ ] Interview is created successfully

### 4. Test Voice Interview
- [ ] Open an interview
- [ ] Start voice call
- [ ] Complete the interview
- [ ] Call ends successfully

### 5. Test Feedback Generation
- [ ] Complete an interview
- [ ] Feedback is being generated (loading state)
- [ ] Feedback page loads with scores
- [ ] All 5 category scores are visible
- [ ] Strengths and improvements are shown
- [ ] Total score is displayed

---

## ✅ Troubleshooting Checklist

### Backend Issues

**Server won't start:**
- [ ] Check Python version: `python --version`
- [ ] Reinstall dependencies: `pip install -r requirements.txt`
- [ ] Check `.env` file exists
- [ ] Check all environment variables are set

**Firebase connection error:**
- [ ] Verify Firebase credentials in `.env`
- [ ] Check private key has proper escape sequences (`\n`)
- [ ] Ensure Firebase project has Firestore enabled
- [ ] Check service account has necessary permissions

**Google AI API error:**
- [ ] Verify `GOOGLE_API_KEY` is correct
- [ ] Check API key has Gemini API enabled
- [ ] Verify API quota is not exhausted
- [ ] Test API key at https://aistudio.google.com

**CORS error:**
- [ ] Check `ALLOWED_ORIGINS` in backend `.env`
- [ ] Ensure frontend URL is included
- [ ] Restart backend server after changes

### Frontend Issues

**API connection error:**
- [ ] Verify backend is running on port 8000
- [ ] Check `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Check browser console for errors
- [ ] Test backend directly: `curl http://localhost:8000/health`

**Build errors:**
- [ ] Run `npm install` to ensure all packages
- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Restart dev server

**TypeScript errors:**
- [ ] Check file replacements were done correctly
- [ ] Ensure `interview.action.ts` has correct imports
- [ ] Verify types in `types/index.d.ts`

---

## ✅ Deployment Checklist

### Backend Deployment
- [ ] Choose hosting platform (Railway/Render/Fly.io)
- [ ] Set all environment variables in platform
- [ ] Deploy backend
- [ ] Get backend URL
- [ ] Test backend URL health check
- [ ] Test API documentation at `/docs`

### Frontend Deployment
- [ ] Update `.env.local` with production backend URL
- [ ] Update `ALLOWED_ORIGINS` in backend to include frontend domain
- [ ] Deploy frontend to Vercel
- [ ] Test production deployment

### Post-Deployment
- [ ] Test question generation in production
- [ ] Test feedback generation in production
- [ ] Test voice interviews in production
- [ ] Monitor backend logs
- [ ] Monitor API usage and costs

---

## ✅ Optional Enhancements

### Backend
- [ ] Add request rate limiting
- [ ] Implement response caching
- [ ] Add request logging
- [ ] Set up error monitoring (Sentry)
- [ ] Add API authentication
- [ ] Implement request queue for AI calls
- [ ] Add database connection pooling

### Frontend
- [ ] Add loading states
- [ ] Improve error handling
- [ ] Add retry logic for failed requests
- [ ] Implement offline support
- [ ] Add analytics
- [ ] Optimize bundle size

### DevOps
- [ ] Set up CI/CD pipeline
- [ ] Add automated tests
- [ ] Configure monitoring alerts
- [ ] Set up backup strategy
- [ ] Document deployment process
- [ ] Create staging environment

---

## 📝 Notes

### Common Issues and Solutions

**Issue**: Backend starts but frontend can't connect
**Solution**: Check CORS settings and verify `NEXT_PUBLIC_API_URL`

**Issue**: Feedback generation takes too long
**Solution**: Normal for AI processing (30-60 seconds), increase timeout

**Issue**: Questions not saving to Firestore
**Solution**: Verify Firebase credentials and Firestore rules

**Issue**: Memory errors in backend
**Solution**: Increase server memory allocation or optimize requests

### Performance Tips

- Keep backend and frontend on same network for local dev
- Use Docker for consistent development environment
- Monitor API response times
- Cache frequently accessed data
- Implement pagination for large datasets

### Security Reminders

- Never commit `.env` files
- Use environment variables for all secrets
- Keep dependencies updated
- Enable HTTPS in production
- Implement API rate limiting
- Validate all user inputs
- Sanitize data before storage

---

## 🎉 Completion

When all items are checked:
- [ ] Backend is running and tested
- [ ] Frontend is updated and tested
- [ ] Integration tests pass
- [ ] Deployment is successful
- [ ] Documentation is reviewed

**Congratulations! Your project is now properly separated and ready to use!** 🚀

---

## 📞 Getting Help

If you're stuck:
1. Check this checklist again
2. Read `MIGRATION_GUIDE.md`
3. Review `PROJECT_SUMMARY.md`
4. Check backend logs
5. Review API documentation at `/docs`
6. Test with `python test_api.py`

For specific issues:
- **Backend**: Check `backend/README.md`
- **Frontend**: Check original `README.md`
- **Architecture**: Check `ARCHITECTURE.md`
- **Deployment**: Check `backend/DEPLOYMENT.md`
