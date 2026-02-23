# 🎯 AI Interview Prep Platform

An intelligent interview preparation platform that provides AI-powered mock interviews with real-time voice interaction and comprehensive feedback. Practice technical, behavioral, and mixed interviews to boost your confidence and improve your performance.

## ✨ Features

### 🎙️ **Real-Time Voice Interviews**

- AI-powered interviewer with natural conversation flow
- Voice-to-voice interaction using advanced speech recognition
- Professional interview simulation with realistic scenarios

### 📊 **Comprehensive Feedback System**

- Detailed scoring across multiple dimensions:
  - Communication Skills
  - Technical Knowledge
  - Problem Solving
  - Cultural Fit
  - Confidence and Clarity
- Overall score out of 100 with actionable insights
- Strengths identification and improvement recommendations

### 🎯 **Multiple Interview Types**

- **Technical Interviews**: Focus on coding skills and technical knowledge
- **Behavioral Interviews**: Assess soft skills and cultural fit
- **Mixed Interviews**: Combination of technical and behavioral questions

### 🛠️ **Technology Stack Support**

Support for 50+ technologies including:

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Node.js, Express, NestJS, GraphQL
- **Databases**: PostgreSQL, Firebase
- **Styling**: Tailwind CSS, Shadcn ui

### 👤 **User Management**

- Secure authentication with Firebase
- Personal interview history tracking
- Progress monitoring and performance analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Firebase account for authentication
- VAPI account for voice AI functionality

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd interview-prep
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# VAPI Configuration
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
VAPI_PRIVATE_KEY=your_vapi_private_key

# Google AI (for feedback generation)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── Agent.tsx         # Voice AI interview component
│   ├── InterviewCard.tsx # Interview display component
│   └── ...
├── lib/                  # Utility functions and actions
│   ├── actions/          # Server actions
│   ├── utils.ts          # Helper utilities
│   └── vapi.sdk.ts       # VAPI SDK integration
├── constants/            # Application constants
├── types/               # TypeScript type definitions
├── firebase/            # Firebase configuration
└── public/              # Static assets
```

## 🔧 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Voice AI**: VAPI (Voice AI Platform)
- **AI Models**: Google Generative AI, OpenAI GPT-4
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 🎮 How to Use

1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Start Interview**: Click "Start an Interview" to begin a new session
3. **Configure Interview**: Select role, interview type, and technology stack
4. **Take Interview**: Engage in real-time voice conversation with AI interviewer
5. **Review Feedback**: Get detailed performance analysis and improvement suggestions
6. **Track Progress**: Monitor your interview history and performance trends

## 🔐 Authentication & Security

- Firebase Authentication for secure user management
- Protected routes with middleware
- Secure API endpoints with proper validation
- Environment variables for sensitive configuration

## 📱 Responsive Design

- Mobile-first responsive design
- Optimized for desktop, tablet, and mobile devices
- Accessible UI components following WCAG guidelines

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed description
3. Contact the development team

## 🙏 Acknowledgments

- [VAPI](https://vapi.ai) for voice AI capabilities
- [Firebase](https://firebase.google.com) for backend services
- [Vercel](https://vercel.com) for hosting and deployment
- [Radix UI](https://radix-ui.com) for accessible components
