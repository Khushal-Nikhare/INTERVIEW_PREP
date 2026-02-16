# 📊 Project Structure Report - AI Interview Prep Platform

**Generated:** February 1, 2026  
**Project Name:** AI Interview Prep Platform  
**Version:** 0.1.0  
**Framework:** Next.js 15.4.10 with App Router  

---

## 📋 Executive Summary

This is a full-stack AI-powered interview preparation platform built with Next.js 15, TypeScript, and Firebase. The application provides real-time voice interviews using VAPI (Voice AI Platform), comprehensive feedback generation using Google Generative AI, and a complete user authentication and data management system.

**Key Metrics:**
- **Primary Language:** TypeScript
- **Framework:** Next.js 15 (App Router)
- **Package Manager:** npm
- **Node Version Required:** 18+
- **Main Dependencies:** 33 production packages
- **Dev Dependencies:** 9 development packages

---

## 🏗️ Architecture Overview

### Application Type
- **Type:** Full-stack web application (SSR + Client-side)
- **Rendering Strategy:** Server-Side Rendering (SSR), Client Components, Server Actions
- **Deployment Target:** Vercel (recommended), Netlify, Railway, AWS Amplify, DigitalOcean

### Tech Stack Summary

#### Frontend
- **Framework:** Next.js 15.4.10 with React 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 with tailwindcss-animate
- **UI Components:** Radix UI (label, slot), Shadcn UI components
- **Icons:** Lucide React (v0.539.0)
- **Themes:** next-themes for dark/light mode support
- **Form Management:** React Hook Form with Zod validation (v4.0.17)

#### Backend & Services
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **Admin SDK:** firebase-admin (v13.4.0)
- **Voice AI:** VAPI (@vapi-ai/web v2.3.8)
- **AI Generation:** 
  - Google Generative AI (@ai-sdk/google v2.0.6)
  - Vercel AI SDK (v5.0.15)
  - OpenAI GPT-4 (via VAPI)

#### Development Tools
- **Linting:** ESLint 9 with Next.js config
- **CSS Processing:** PostCSS with Tailwind
- **Type Checking:** TypeScript strict mode
- **Build Tool:** Next.js with Turbopack

---

## 📁 Detailed Directory Structure

```
interview_prep/
│
├── 📂 app/                           # Next.js App Router (main application)
│   ├── 📂 (auth)/                    # Authentication route group (layout isolation)
│   │   ├── layout.tsx                # Auth-specific layout wrapper
│   │   ├── 📂 sign-in/               # Sign-in page route
│   │   │   └── page.tsx              # Sign-in page component
│   │   └── 📂 sign-up/               # Sign-up page route
│   │       └── page.tsx              # Sign-up page component
│   │
│   ├── 📂 (root)/                    # Main application route group
│   │   ├── layout.tsx                # Main app layout with navigation
│   │   ├── page.tsx                  # Home/dashboard page
│   │   └── 📂 interview/             # Interview feature routes
│   │       ├── page.tsx              # Interview creation/start page
│   │       └── 📂 [id]/              # Dynamic interview ID routes
│   │           ├── page.tsx          # Interview session page (voice AI)
│   │           └── 📂 feedback/      # Feedback nested route
│   │               └── page.tsx      # Feedback display page
│   │
│   ├── 📂 api/                       # API Routes (Backend endpoints)
│   │   └── 📂 vapi/                  # VAPI integration endpoints
│   │       └── 📂 generate/          # Feedback generation endpoint
│   │           └── route.ts          # POST handler for AI feedback
│   │
│   ├── favicon.ico                   # Application favicon
│   ├── globals.css                   # Global styles & Tailwind directives
│   └── layout.tsx                    # Root layout (HTML wrapper)
│
├── 📂 components/                    # Reusable React components
│   ├── Agent.tsx                     # Voice AI interview component (VAPI integration)
│   ├── AuthForm.tsx                  # Authentication form (sign-in/sign-up)
│   ├── DisplayTechIcons.tsx          # Technology stack icon display
│   ├── FormField.tsx                 # Reusable form field component
│   ├── InterviewCard.tsx             # Interview summary card component
│   ├── Navbar.tsx                    # Application navigation bar
│   └── 📂 ui/                        # Shadcn UI base components
│       ├── button.tsx                # Button component (variants)
│       ├── form.tsx                  # Form wrapper components
│       ├── input.tsx                 # Input field component
│       ├── label.tsx                 # Label component
│       └── sonner.tsx                # Toast notification component
│
├── 📂 lib/                           # Utility functions and server actions
│   ├── 📂 actions/                   # Next.js Server Actions
│   │   ├── auth.action.ts            # Authentication actions (sign-in, sign-up)
│   │   └── interview.action.ts       # Interview CRUD operations
│   ├── utils.ts                      # Helper utility functions (cn, etc.)
│   └── vapi.sdk.ts                   # VAPI SDK configuration & helpers
│
├── 📂 firebase/                      # Firebase configuration
│   ├── admin.ts                      # Firebase Admin SDK (server-side)
│   └── client.ts                     # Firebase Client SDK (client-side)
│
├── 📂 constants/                     # Application constants
│   └── index.ts                      # Configuration constants
│       ├── interviewer (VAPI config) # AI interviewer settings
│       ├── feedbackSchema (Zod)     # Feedback validation schema
│       ├── mappings                  # Tech stack name mappings
│       ├── interviewCovers           # Cover image paths
│       └── dummyInterviews           # Sample interview data
│
├── 📂 types/                         # TypeScript type definitions
│   ├── index.d.ts                    # Core application interfaces
│   │   ├── Feedback                  # Feedback data structure
│   │   ├── Interview                 # Interview data structure
│   │   ├── User                      # User data structure
│   │   ├── Component Props           # React component prop types
│   │   └── Action Params             # Server action parameter types
│   └── vapi.d.ts                     # VAPI-specific type definitions
│
├── 📂 public/                        # Static assets (served as-is)
│   ├── 📂 covers/                    # Company logo covers (12 images)
│   │   ├── adobe.png
│   │   ├── amazon.png
│   │   ├── facebook.png
│   │   ├── hostinger.png
│   │   ├── pinterest.png
│   │   ├── quora.png
│   │   ├── reddit.png
│   │   ├── skype.png
│   │   ├── spotify.png
│   │   ├── telegram.png
│   │   ├── tiktok.png
│   │   └── yahoo.png
│   ├── ai-avatar.png                 # AI interviewer avatar
│   ├── user-avatar.png               # Default user avatar
│   ├── robot.png                     # Robot illustration
│   ├── pattern.png                   # Background pattern
│   ├── logo.svg                      # Application logo
│   └── [other SVG icons]             # Various UI icons
│
├── 📂 node_modules/                  # NPM dependencies (ignored in git)
│
├── 📄 package.json                   # Project dependencies & scripts
├── 📄 package-lock.json              # Locked dependency versions
├── 📄 tsconfig.json                  # TypeScript configuration
├── 📄 next.config.ts                 # Next.js configuration
├── 📄 postcss.config.mjs             # PostCSS configuration
├── 📄 eslint.config.mjs              # ESLint configuration
├── 📄 components.json                # Shadcn UI component config
├── 📄 README.md                      # Project documentation
├── 📄 .gitignore                     # Git ignore rules
└── 📄 .git/                          # Git repository data
```

---

## 🎯 Core Features & File Mapping

### 1. Authentication System
**Files Involved:**
- `app/(auth)/sign-in/page.tsx` - Sign-in UI
- `app/(auth)/sign-up/page.tsx` - Sign-up UI
- `components/AuthForm.tsx` - Shared auth form component
- `lib/actions/auth.action.ts` - Server actions for auth operations
- `firebase/client.ts` - Firebase Auth client configuration
- `firebase/admin.ts` - Firebase Admin SDK for server-side auth

**Features:**
- Email/password authentication
- Firebase Auth integration
- Protected routes
- Session management

### 2. Interview Creation & Management
**Files Involved:**
- `app/(root)/interview/page.tsx` - Interview setup/creation form
- `lib/actions/interview.action.ts` - CRUD operations for interviews
- `components/InterviewCard.tsx` - Interview list display
- `types/index.d.ts` - Interview interface definitions

**Features:**
- Create new interview sessions
- Configure role, level, type (Technical/Behavioral/Mixed)
- Select technology stack (50+ technologies)
- View interview history

### 3. Voice AI Interview System
**Files Involved:**
- `app/(root)/interview/[id]/page.tsx` - Live interview session
- `components/Agent.tsx` - VAPI voice AI integration
- `lib/vapi.sdk.ts` - VAPI SDK wrapper
- `constants/index.ts` - Interviewer configuration
- `types/vapi.d.ts` - VAPI type definitions

**Features:**
- Real-time voice conversation
- AI-powered interviewer (GPT-4)
- Speech-to-text (Deepgram Nova-2)
- Text-to-speech (ElevenLabs)
- Natural conversation flow
- Follow-up questions

### 4. Feedback & Analysis System
**Files Involved:**
- `app/(root)/interview/[id]/feedback/page.tsx` - Feedback display
- `app/api/vapi/generate/route.ts` - Feedback generation API
- `lib/actions/interview.action.ts` - Feedback storage operations
- `constants/index.ts` - Feedback schema (Zod validation)

**Features:**
- Automated feedback generation (Google Generative AI)
- Multi-dimensional scoring:
  - Communication Skills
  - Technical Knowledge
  - Problem Solving
  - Cultural Fit
  - Confidence & Clarity
- Overall score (0-100)
- Strengths & weaknesses analysis
- Final assessment & recommendations

### 5. UI Components & Styling
**Files Involved:**
- `components/ui/*` - Shadcn UI base components
- `components/Navbar.tsx` - Navigation component
- `components/DisplayTechIcons.tsx` - Tech stack visualization
- `app/globals.css` - Global styles & Tailwind config
- `lib/utils.ts` - Utility functions (cn for class merging)

**Features:**
- Responsive design (mobile-first)
- Dark/light mode support
- Accessible components (Radix UI)
- Toast notifications (Sonner)
- Form validation (React Hook Form + Zod)

---

## 🔧 Configuration Files

### package.json
**Scripts:**
- `dev` - Run development server with Turbopack
- `build` - Production build
- `start` - Start production server
- `lint` - Run ESLint

### tsconfig.json
**Key Settings:**
- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` → `./*`
- JSX: preserve (Next.js transforms)

### next.config.ts
- Next.js 15 configuration
- TypeScript config file

### eslint.config.mjs
- ESLint 9 configuration
- Next.js recommended rules

### postcss.config.mjs
- Tailwind CSS integration
- PostCSS plugins

### components.json
- Shadcn UI configuration
- Component generation settings

---

## 🔐 Environment Variables Required

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# VAPI Configuration
NEXT_PUBLIC_VAPI_PUBLIC_KEY=
VAPI_PRIVATE_KEY=

# Google AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=
```

---

## 📊 Data Models & Schemas

### Interview Model
```typescript
interface Interview {
  id: string;
  userId: string;
  role: string;              // e.g., "Frontend Developer"
  level: string;             // Junior/Mid/Senior
  type: string;              // Technical/Behavioral/Mixed
  techstack: string[];       // Selected technologies
  questions: string[];       // Generated questions
  finalized: boolean;        // Completion status
  createdAt: string;         // ISO timestamp
}
```

### Feedback Model
```typescript
interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;        // 0-100
  categoryScores: Array<{
    name: string;
    score: number;           // 0-100
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}
```

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

---

## 🚀 Application Flow

### 1. User Registration/Login
```
sign-up/page.tsx → AuthForm.tsx → auth.action.ts → Firebase Auth
                                                  ↓
                                           User document created
                                                  ↓
                                           Redirect to dashboard
```

### 2. Interview Creation
```
(root)/page.tsx → Click "Start Interview" → interview/page.tsx
                                                  ↓
                                         Fill form (role, type, stack)
                                                  ↓
                                         interview.action.ts (createInterview)
                                                  ↓
                                         Firestore document created
                                                  ↓
                                         Redirect to /interview/[id]
```

### 3. Live Interview Session
```
interview/[id]/page.tsx → Agent.tsx → VAPI SDK initialized
                                          ↓
                               Voice conversation starts
                                          ↓
                               Real-time transcription
                                          ↓
                               Interview completion
                                          ↓
                               Redirect to feedback page
```

### 4. Feedback Generation
```
feedback/page.tsx → Check if feedback exists
                         ↓ (No)
                    POST /api/vapi/generate
                         ↓
                    Google Generative AI analyzes transcript
                         ↓
                    Structured feedback (Zod validated)
                         ↓
                    Stored in Firestore
                         ↓
                    Display feedback to user
```

---

## 🎨 UI/UX Architecture

### Design System
- **Base:** Shadcn UI components
- **Styling:** Tailwind CSS utility classes
- **Color Scheme:** Customizable with CSS variables
- **Typography:** System fonts
- **Icons:** Lucide React (consistent icon set)
- **Animations:** tailwindcss-animate

### Layout Structure
```
Root Layout (layout.tsx)
  ├── (auth) Layout [Authentication Pages]
  │   ├── sign-in
  │   └── sign-up
  │
  └── (root) Layout [Main Application]
      ├── Navbar (sticky)
      ├── page.tsx (Dashboard)
      └── interview/
          ├── Create Interview
          ├── [id] - Live Session
          └── [id]/feedback - Results
```

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🔄 State Management

### Client State
- **React Hook Form** - Form state management
- **VAPI Client** - Voice AI session state
- **Local Component State** - UI interactions

### Server State
- **Firebase Firestore** - Persistent data storage
- **Server Actions** - Data mutations
- **Next.js Cache** - Automatic caching

### Authentication State
- **Firebase Auth** - User session
- **Next.js Middleware** - Route protection
- **Server Components** - Auth checks

---

## 🔌 External Integrations

### 1. Firebase
- **Service:** Backend as a Service (BaaS)
- **Usage:** Authentication, Firestore database
- **Files:** `firebase/client.ts`, `firebase/admin.ts`

### 2. VAPI (Voice AI Platform)
- **Service:** Voice AI interviews
- **Components:** Speech-to-text, Text-to-speech, Conversation AI
- **Models:** 
  - Transcriber: Deepgram Nova-2
  - Voice: ElevenLabs (Sarah)
  - LLM: OpenAI GPT-4

### 3. Google Generative AI
- **Service:** AI-powered feedback generation
- **Usage:** Transcript analysis, structured output
- **Endpoint:** `/api/vapi/generate`

### 4. OpenAI (via VAPI)
- **Service:** Conversational AI
- **Model:** GPT-4
- **Usage:** Interviewer responses and follow-ups

---

## 📦 Dependencies Analysis

### Critical Dependencies (Production)
1. **next** (15.4.10) - Core framework
2. **react** (19.1.0) - UI library
3. **firebase** (12.1.0) - Backend services
4. **@vapi-ai/web** (2.3.8) - Voice AI
5. **@ai-sdk/google** (2.0.6) - AI generation
6. **zod** (4.0.17) - Schema validation
7. **react-hook-form** (7.62.0) - Form management

### UI Dependencies
- @radix-ui/react-* - Accessible primitives
- lucide-react - Icon library
- tailwind-merge - Class merging
- class-variance-authority - Variant management
- sonner - Toast notifications

### Development Dependencies
- typescript - Type checking
- eslint - Code linting
- tailwindcss - Styling framework

---

## 🔒 Security Considerations

### Authentication
✅ Firebase Auth (industry-standard)
✅ Server-side session validation
✅ Protected API routes
✅ Environment variables for secrets

### Data Protection
✅ Firestore security rules (should be configured)
✅ User-scoped data queries
✅ No sensitive data in client bundles

### API Security
✅ API keys stored in environment variables
✅ Server-only API routes (not exposed to client)
✅ Input validation with Zod schemas

---

## 🧪 Testing & Quality

### Current Setup
- ESLint configuration (code quality)
- TypeScript strict mode (type safety)
- No test framework detected

### Recommended Additions
- Jest + React Testing Library (unit tests)
- Playwright or Cypress (E2E tests)
- Husky (pre-commit hooks)

---

## 🚀 Deployment Guide

### Prerequisites
1. Firebase project setup
2. VAPI account & API keys
3. Google AI API key
4. Hosting platform account (Vercel recommended)

### Build Process
```bash
npm run build          # Creates .next/ production build
npm run start          # Starts production server
```

### Environment Setup
- Configure all environment variables in hosting platform
- Ensure Firebase credentials are valid
- Test VAPI integration before deployment

### Recommended Platform: Vercel
- Native Next.js support
- Automatic deployments
- Edge functions support
- Zero-config setup

---

## 📈 Performance Optimization

### Current Optimizations
✅ Next.js 15 App Router (automatic optimizations)
✅ Server Components (reduced client JS)
✅ Image optimization (Next.js automatic)
✅ Code splitting (automatic)
✅ Turbopack for fast development

### Potential Improvements
- Implement React Suspense boundaries
- Add loading skeletons
- Optimize Firestore queries with indexes
- Implement incremental static regeneration (ISR)
- Add CDN for static assets

---

## 🐛 Known Limitations

1. **No test coverage** - No unit or integration tests
2. **Limited error handling** - Could improve error boundaries
3. **No analytics** - User behavior tracking not implemented
4. **No admin panel** - Interview management through code/Firestore
5. **Single language** - No internationalization (i18n)

---

## 🛣️ Future Enhancement Opportunities

### Feature Additions
- [ ] Interview scheduling system
- [ ] Multi-language support (i18n)
- [ ] Video interview option
- [ ] Interview sharing & collaboration
- [ ] Performance analytics dashboard
- [ ] Resume parsing & analysis
- [ ] Mock interview with peers
- [ ] Interview recording & playback

### Technical Improvements
- [ ] Add comprehensive test suite
- [ ] Implement caching strategy
- [ ] Add monitoring & logging (Sentry)
- [ ] Optimize bundle size
- [ ] Add progressive web app (PWA) support
- [ ] Implement GraphQL API layer
- [ ] Add real-time collaboration features

---

## 📚 Documentation Quality

### Existing Documentation
✅ Comprehensive README.md
✅ TypeScript interfaces documented
✅ Code comments in key areas
✅ Environment variable documentation

### Improvement Areas
- [ ] API documentation (endpoint specs)
- [ ] Component storybook
- [ ] Architecture decision records (ADRs)
- [ ] Contribution guidelines
- [ ] Changelog

---

## 🎓 Developer Onboarding Checklist

1. **Setup Prerequisites**
   - [ ] Install Node.js 18+
   - [ ] Install npm/yarn/pnpm
   - [ ] Clone repository
   - [ ] Install dependencies

2. **Configuration**
   - [ ] Create Firebase project
   - [ ] Setup VAPI account
   - [ ] Get Google AI API key
   - [ ] Configure `.env.local`

3. **Development**
   - [ ] Run `npm run dev`
   - [ ] Test authentication flow
   - [ ] Create test interview
   - [ ] Test voice AI integration
   - [ ] Review feedback generation

4. **Code Understanding**
   - [ ] Review project structure
   - [ ] Understand Server Actions
   - [ ] Study VAPI integration
   - [ ] Review type definitions

---

## 📞 Support & Maintenance

### Key Contact Points
- **Repository:** Git repository in `F:\BTech-CS-DS\3rd Year\6th sem\Course\MP\INTERVIEW_PREP`
- **Documentation:** README.md
- **Issues:** GitHub Issues (if hosted on GitHub)

### Maintenance Tasks
- Regular dependency updates
- Security vulnerability patches
- Firebase SDK updates
- Monitor VAPI API changes
- Review and optimize Firestore queries

---

## 📝 Summary & Recommendations

### Strengths
✅ Modern tech stack (Next.js 15, React 19, TypeScript)
✅ Well-organized file structure
✅ Type-safe codebase
✅ Innovative voice AI integration
✅ Comprehensive feedback system
✅ Good separation of concerns

### Areas for Improvement
⚠️ Add test coverage (critical)
⚠️ Implement error boundaries
⚠️ Add monitoring/logging
⚠️ Improve documentation
⚠️ Add analytics tracking

### Overall Assessment
This is a **well-architected, production-ready** application with innovative features. The codebase follows Next.js best practices and demonstrates strong TypeScript usage. With the addition of testing and monitoring, this would be enterprise-grade quality.

**Recommended Next Steps:**
1. Add Jest + React Testing Library
2. Implement error tracking (Sentry)
3. Add analytics (Google Analytics or Mixpanel)
4. Create admin dashboard
5. Implement CI/CD pipeline

---

**Report End**  
*Generated automatically based on project analysis*
