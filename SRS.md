# Software Requirements Specification

## Project Title
AI-Powered Interview Preparation Platform

## Version
1.0

## Date
March 2026

## Prepared For
B.Tech Minor Project Documentation

## Prepared By
<Name of Student 1>, <University Roll No.>

<Name of Student 2>, <University Roll No.>

<Name of Student 3>, <University Roll No.>

## Guide
<Name of Guide>

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) defines the functional and nonfunctional requirements for the AI-Powered Interview Preparation Platform, version 1.0. The product is a web-based software system intended to help students and job seekers practice mock interviews using an AI-driven interviewer, voice interaction, and automated feedback.

This SRS covers the complete academic project scope, including the frontend web application, backend API, AI-driven interview generation, transcript-based feedback generation, Firebase-based authentication, and interview history management. The purpose of this document is to provide a common understanding of the system requirements for developers, testers, project evaluators, faculty guides, and future maintainers.

### 1.2 Document Conventions
The following conventions are used in this SRS:

- Section numbering follows the institutional SRS template.
- The terms shall, should, and may are used with standard requirement meaning:
  - shall indicates a mandatory requirement;
  - should indicates a recommended requirement;
  - may indicates an optional or future enhancement.
- Functional requirements are uniquely identified using tags such as FR-AUTH-01 and FR-INT-01.
- Nonfunctional requirements are uniquely identified using tags such as NFR-PERF-01 and NFR-SEC-01.
- Priority levels are classified as High, Medium, or Low.
- TBD is used where project-specific academic or deployment information must be finalized later.

### 1.3 Intended Audience and Reading Suggestions
This document is intended for the following readers:

- Developers: to understand the software behavior, interfaces, and implementation constraints.
- Testers: to derive test cases from verifiable requirements.
- Project Guide and Evaluators: to assess the project scope, architecture, and completeness.
- Project Team Members: to coordinate development, integration, and testing work.
- Future Maintainers: to understand dependencies, constraints, and subsystem interactions.

Suggested reading order:

- Read Section 1 for project context and scope.
- Read Section 2 for product overview, user classes, assumptions, and environment.
- Read Section 3 for interface-level understanding.
- Read Section 4 for detailed functional requirements.
- Read Section 5 for performance, security, and quality requirements.
- Read Section 6 for team planning and tentative scheduling.
- Read the appendices for terminology and unresolved items.

### 1.4 Product Scope
The AI-Powered Interview Preparation Platform is a full-stack web application that enables users to practice technical, behavioral, and mixed interviews in a simulated environment. The platform supports interview creation, voice-based interview execution, transcript capture, AI-generated question sets, AI-generated performance feedback, and interview history review.

The main goals of the product are:

- to provide realistic interview practice on demand;
- to reduce dependence on human mock interviewers;
- to provide personalized, structured, and immediate feedback;
- to support multiple job roles, experience levels, and technology stacks;
- to help students improve interview readiness through repeated practice.

The software aligns with the educational goal of improving employability and practical communication skills among engineering students.

---

## 2. Overall Description

### 2.1 Product Perspective
This product is a new, self-contained academic software system developed as a minor project. It combines a modern web frontend with a service-oriented backend and integrates external cloud services for authentication, AI processing, and persistent storage.

The system consists of the following major components:

- Next.js frontend for user interface and navigation;
- Firebase Authentication for user sign-in and sign-up;
- VAPI integration for live voice interview interaction;
- FastAPI backend for interview generation and feedback generation;
- Google Gemini AI service for question generation and transcript analysis;
- Firebase Firestore for storing interview and feedback records.

High-level system context:

```text
User
  |
  v
Web Browser
  |
  v
Next.js Frontend
  |---- Firebase Authentication
  |---- VAPI Voice Session
  |
  v
FastAPI Backend
  |---- Google Gemini AI
  |
  v
Firebase Firestore
```

The product is not a replacement for an earlier institutional system. It is an original project that integrates third-party services to simulate real-world interview workflows.

### 2.2 Product Functions
At a high level, the product performs the following functions:

- user registration and login;
- interview dashboard display;
- generation of AI-based interview questions;
- creation of custom interview sessions;
- live voice interview interaction;
- transcript capture during interview sessions;
- AI-based performance evaluation;
- storage of interview records and feedback reports;
- retrieval of past interview history;
- viewing detailed feedback by interview.

### 2.3 User Classes and Characteristics
The anticipated user classes are:

- Candidate/User:
  - primary user class;
  - students, fresh graduates, and job seekers preparing for interviews;
  - expected to have basic web and smartphone/computer literacy;
  - requires a simple interface and guided workflow.

- Project Administrator/Developer:
  - secondary user class;
  - configures environment variables, API keys, and deployment settings;
  - requires technical understanding of Next.js, FastAPI, Firebase, and AI APIs.

- Faculty Guide/Evaluator:
  - tertiary user class;
  - reviews the project output, demonstrations, and documentation;
  - mainly interested in system behavior, scope, and correctness rather than daily use.

The most important user class is the Candidate/User because the main system value is delivered through their interview practice workflow.

### 2.4 Operating Environment
The software is expected to operate in the following environment:

- Client device: desktop or laptop computer with microphone, speaker/headphones, keyboard, mouse, and internet connection.
- Supported operating systems for end users: Windows 10 or later, Linux, macOS, and modern mobile-compatible browsers where supported by the voice interface.
- Frontend runtime: Node.js 18 or later.
- Frontend framework: Next.js 15 with React 19 and TypeScript 5.
- Backend runtime: Python 3.10 or later.
- Backend framework: FastAPI 0.115.x running through Uvicorn.
- Database/storage: Firebase Firestore.
- Authentication service: Firebase Authentication.
- AI services: Google Gemini API and VAPI cloud services.
- Network environment: internet-enabled system with access to HTTPS endpoints.

### 2.5 Design and Implementation Constraints
The system is subject to the following constraints:

- The frontend shall be implemented using Next.js with TypeScript.
- The backend shall be implemented using Python FastAPI.
- Authentication and persistent interview storage shall use Firebase services.
- Interview question generation and feedback analysis depend on Google Gemini API availability and valid API keys.
- Voice-based interview functionality depends on VAPI service availability and browser microphone permission.
- Local development assumes backend default host 0.0.0.0 and port 8000, and frontend default ports 3000 or 3001.
- The backend requires environment variables including GOOGLE_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, and FIREBASE_CLIENT_ID.
- Cross-origin access is constrained by configured ALLOWED_ORIGINS in the backend.
- The project shall follow secure handling of secrets using environment configuration rather than hard-coded credentials.
- The system is constrained by internet connectivity and third-party API response latency.

### 2.6 User Documentation
The following documentation components are expected to accompany the software:

- project README for setup and execution;
- backend README for API and environment setup;
- migration guide for separated frontend-backend usage;
- synopsis and SRS documents for academic submission;
- inline UI guidance on sign-in, interview creation, and feedback pages.

Documentation delivery format is Markdown and source code documentation embedded in the repository.

### 2.7 Assumptions and Dependencies
Assumptions:

- Users have reliable internet connectivity during live interview sessions.
- Users will provide microphone access to the browser.
- Valid Firebase, Google Gemini, and VAPI credentials will be available during deployment and testing.
- The browser environment will support modern JavaScript, audio input, and network APIs.
- The AI model responses will be sufficiently relevant and coherent for educational interview practice.

Dependencies:

- Next.js, React, and TypeScript ecosystem packages.
- Firebase client and admin SDKs.
- Google Generative AI API.
- VAPI web SDK.
- FastAPI, Pydantic, and Uvicorn.
- External cloud infrastructure for authentication, AI calls, and database persistence.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
The software shall provide graphical user interfaces for the following components:

- sign-up page;
- sign-in page;
- dashboard/home page;
- interview creation page;
- interview details page;
- live interview session view;
- feedback view page.

UI characteristics:

- The dashboard shall present available interviews and previously taken interviews.
- The interview creation screen shall allow users to specify role, level, interview type, tech stack, and optionally custom questions.
- The live interview view shall display the AI interviewer, the candidate identity, latest transcript text, and call controls.
- The feedback page shall show overall score, category-wise breakdown, strengths, areas for improvement, and final assessment.
- The interface shall be responsive for standard desktop and laptop resolutions.
- Error feedback shall be displayed when interview generation or feedback generation fails.

A separate detailed UI specification may be prepared for screenshots and layout-level behavior.

### 3.2 Hardware Interfaces
The software interacts with the following hardware indirectly through the client device and browser:

- microphone for capturing voice responses;
- speaker or headphones for AI voice output;
- display monitor for graphical interaction;
- keyboard and mouse/touchpad for form input and navigation.

Hardware interface requirements:

- The client device shall provide an operational microphone for voice interviews.
- The browser shall be capable of accessing microphone input with user consent.
- The system shall continue to support non-voice navigation even when voice hardware is unavailable, except for the live interview feature which requires audio input/output.

### 3.3 Software Interfaces
The software interacts with the following software components:

1. Frontend to Backend API
- Protocol: HTTP/HTTPS
- Data format: JSON
- Key endpoints:
  - POST /api/interview/generate
  - POST /api/interview/feedback
  - GET /health

2. Frontend to Firebase Authentication
- Purpose: sign-up, sign-in, and user identity retrieval.

3. Frontend and Backend to Firebase Firestore
- Purpose: storage and retrieval of interviews and feedback records.

4. Backend to Google Gemini API
- Purpose: dynamic generation of interview questions and transcript-based evaluation.

5. Frontend to VAPI SDK
- Purpose: real-time voice-based interview session handling.

The software interface shall use structured request and response models. Core request attributes include role, level, techstack, type, amount, user_id, interview_id, transcript, and feedback_id.

### 3.4 Communications Interfaces
The product requires the following communication interfaces:

- browser-to-frontend web communication over HTTP/HTTPS;
- frontend-to-backend REST communication over HTTP/HTTPS using JSON payloads;
- backend-to-Google Gemini API communication over secure internet protocols;
- frontend-to-VAPI communication over secure web communication for live voice sessions;
- frontend/backend-to-Firebase cloud communication over secure network channels.

Communication requirements:

- The system shall use HTTPS in production.
- JSON shall be the standard payload format for API communication.
- Authentication and service credentials shall not be transmitted in plain text outside secure channels.
- The system shall handle communication failures gracefully by showing an error or fallback response.

---

## 4. System Features

### 4.1 User Authentication and Account Access

#### 4.1.1 Description and Priority
This feature allows users to create an account, sign in, and access protected interview features. Priority: High.

#### 4.1.2 Stimulus/Response Sequences
- User opens the sign-up page and enters registration details.
- System validates input and creates a user account through Firebase Authentication.
- User signs in with valid credentials.
- System authenticates the user and redirects to the dashboard.
- If credentials are invalid, the system displays an authentication error.

#### 4.1.3 Functional Requirements
FR-AUTH-01: The system shall provide a sign-up interface for new users.

FR-AUTH-02: The system shall provide a sign-in interface for registered users.

FR-AUTH-03: The system shall authenticate users using Firebase Authentication.

FR-AUTH-04: The system shall restrict interview management features to authenticated users.

FR-AUTH-05: The system shall retrieve the current logged-in user identity for personalized data access.

FR-AUTH-06: The system shall display an error message when sign-in or sign-up fails.

### 4.2 Interview Dashboard and History Management

#### 4.2.1 Description and Priority
This feature allows users to view their past interviews and browse available interview sessions. Priority: High.

#### 4.2.2 Stimulus/Response Sequences
- User signs in and lands on the dashboard.
- System fetches interviews created by the user.
- System fetches other finalized interviews available for browsing.
- User selects an interview card to view interview details or feedback.

#### 4.2.3 Functional Requirements
FR-DASH-01: The system shall display a dashboard after successful authentication.

FR-DASH-02: The system shall list interviews belonging to the logged-in user.

FR-DASH-03: The system shall list finalized interviews available for practice or viewing.

FR-DASH-04: The system shall show interview metadata including role, type, tech stack, and creation date.

FR-DASH-05: The system shall allow navigation from an interview card to the corresponding interview details page.

### 4.3 Interview Creation and Question Generation

#### 4.3.1 Description and Priority
This feature enables users to create interview sessions and obtain AI-generated question sets based on job role and skill parameters. Priority: High.

#### 4.3.2 Stimulus/Response Sequences
- User opens the interview creation page.
- User enters role, experience level, interview type, tech stack, and question count.
- System sends the request to the backend generation API.
- Backend requests question generation from Google Gemini.
- Backend stores the interview document in Firestore.
- System confirms interview creation or displays an error.

#### 4.3.3 Functional Requirements
FR-INT-01: The system shall allow a user to specify role, level, interview type, and tech stack while creating an interview.

FR-INT-02: The system shall allow the user to request between 1 and 20 generated questions.

FR-INT-03: The system shall generate interview questions through the backend API.

FR-INT-04: The backend shall persist generated interview sessions in Firestore.

FR-INT-05: The system shall assign a unique interview identifier to each stored interview.

FR-INT-06: The system shall associate each created interview with the current user ID.

FR-INT-07: The system shall return a failure response when question generation cannot be completed.

### 4.4 Custom Interview Configuration

#### 4.4.1 Description and Priority
This feature allows users to create their own interview using manually defined questions and settings. Priority: Medium.

#### 4.4.2 Stimulus/Response Sequences
- User opens the custom interview creation screen.
- User enters role, level, interview type, tech stack, and custom questions.
- System validates the form input.
- System stores the custom interview in Firestore with finalized status set appropriately.
- User receives success or error feedback.

#### 4.4.3 Functional Requirements
FR-CUST-01: The system shall provide a screen for creating a custom interview.

FR-CUST-02: The system shall allow the user to enter a custom set of questions.

FR-CUST-03: The system shall store custom interview data in Firestore.

FR-CUST-04: The system shall associate custom interviews with the current user.

FR-CUST-05: The system shall return an appropriate error message if saving the custom interview fails.

### 4.5 Live Voice Interview Execution

#### 4.5.1 Description and Priority
This feature enables real-time interview interaction between the user and the AI interviewer through voice. Priority: High.

#### 4.5.2 Stimulus/Response Sequences
- User opens a specific interview page.
- User presses the Call button.
- System initializes the voice session through VAPI.
- AI interviewer begins asking questions.
- User responds through microphone input.
- System captures final transcript messages during the interview.
- User ends the call or the session terminates.
- System marks the session as finished and proceeds to feedback generation.

#### 4.5.3 Functional Requirements
FR-VOICE-01: The system shall provide a call control to start a live interview session.

FR-VOICE-02: The system shall establish a voice session through VAPI for supported interview modes.

FR-VOICE-03: The system shall display the latest transcript message generated during the interview session.

FR-VOICE-04: The system shall capture final transcript messages with role attribution.

FR-VOICE-05: The system shall allow the user to end the live interview session.

FR-VOICE-06: The system shall transition the session state among inactive, connecting, active, and finished states.

FR-VOICE-07: The system shall handle runtime voice-session errors and prevent silent failure.

### 4.6 AI Feedback Generation and Review

#### 4.6.1 Description and Priority
This feature generates structured feedback from interview transcripts and displays the result to the user. Priority: High.

#### 4.6.2 Stimulus/Response Sequences
- The interview session ends.
- System sends interview ID, user ID, and transcript to the feedback API.
- Backend forwards transcript content to Google Gemini for analysis.
- Backend creates category scores, overall score, strengths, areas for improvement, and final assessment.
- Backend stores feedback in Firestore.
- Frontend redirects the user to the feedback page.
- User reviews the generated evaluation.

#### 4.6.3 Functional Requirements
FR-FEED-01: The system shall submit interview transcript data to the backend after an interview session ends.

FR-FEED-02: The backend shall generate an overall interview score in the range of 0 to 100.

FR-FEED-03: The backend shall generate category-wise scores for communication skills, technical knowledge, problem solving, cultural fit, and confidence and clarity.

FR-FEED-04: The backend shall generate textual strengths, areas for improvement, and final assessment.

FR-FEED-05: The backend shall store generated feedback in Firestore.

FR-FEED-06: The system shall retrieve and display feedback by interview ID and user ID.

FR-FEED-07: The feedback page shall display overall score, timestamp, score breakdown, strengths, and improvement areas.

FR-FEED-08: The system shall display an error path or fallback navigation when feedback generation fails.

---

## 5. Nonfunctional Requirements

### 5.1 Performance Requirements
NFR-PERF-01: The system should load the main dashboard page within 3 seconds under normal broadband conditions, excluding third-party authentication delay.

NFR-PERF-02: The backend health endpoint shall respond within 1 second under normal local deployment conditions.

NFR-PERF-03: The system should return generated interview questions within 15 seconds under normal API availability.

NFR-PERF-04: The system should return generated feedback within 20 seconds after transcript submission under normal API availability.

NFR-PERF-05: The live interview UI shall visibly reflect state changes such as connecting, active, and finished without requiring manual page refresh.

### 5.2 Safety Requirements
NFR-SAFE-01: The system shall not present itself as a substitute for official hiring decisions or certified counseling.

NFR-SAFE-02: The system shall prevent accidental submission of incomplete interview feedback payloads through request validation.

NFR-SAFE-03: The system shall handle service failures without corrupting stored interview or feedback records.

NFR-SAFE-04: The system shall request explicit microphone permission before accessing audio input.

### 5.3 Security Requirements
NFR-SEC-01: The system shall authenticate users before exposing user-specific interview and feedback data.

NFR-SEC-02: The system shall store secrets and API credentials in environment variables and shall not hard-code them in source code.

NFR-SEC-03: The system shall use secure communication channels in production for all external service communication.

NFR-SEC-04: The system shall restrict cross-origin requests based on configured allowed origins.

NFR-SEC-05: The system shall logically associate interview and feedback records with the appropriate user ID.

NFR-SEC-06: The system shall not expose Firebase administrative credentials to frontend code.

### 5.4 Software Quality Attributes
NFR-QUAL-01: The system shall be maintainable through separation of frontend and backend responsibilities.

NFR-QUAL-02: The system shall be extensible to support additional interview categories, question strategies, and feedback rubrics.

NFR-QUAL-03: The system shall be testable at the API level through explicit request and response contracts.

NFR-QUAL-04: The system shall be usable by users with basic computer literacy and no specialized training.

NFR-QUAL-05: The system should be portable across common desktop operating systems through browser-based access.

NFR-QUAL-06: The system shall validate incoming API data through structured models to improve reliability and robustness.

---

## 6. Project Plan

### 6.1 Team Members
- Student 1: <Name, Roll Number>
- Student 2: <Name, Roll Number>
- Student 3: <Name, Roll Number>
- Guide: <Name of Guide>

### 6.2 Division of Work
A tentative division of work is proposed below. Replace with the exact team allocation before final submission.

- Student 1:
  - requirements analysis;
  - frontend page flow design;
  - authentication integration;
  - dashboard implementation.

- Student 2:
  - backend API design;
  - AI question generation and feedback logic;
  - Pydantic schema definition;
  - API integration testing.

- Student 3:
  - Firebase integration;
  - VAPI voice session integration;
  - Firestore data management;
  - deployment and documentation.

Shared responsibilities:
- UI refinement;
- debugging;
- final testing;
- report writing;
- presentation preparation.

### 6.3 Time Schedule
A tentative development schedule is shown below.

| Phase | Activity | Tentative Duration |
|---|---|---|
| Phase 1 | Problem identification and literature review | Week 1 |
| Phase 2 | Requirement analysis and SRS preparation | Week 2 |
| Phase 3 | System design and architecture finalization | Week 3 |
| Phase 4 | Frontend implementation | Weeks 4-5 |
| Phase 5 | Backend and AI integration | Weeks 6-7 |
| Phase 6 | Firebase and voice integration | Week 8 |
| Phase 7 | Testing, debugging, and refinement | Weeks 9-10 |
| Phase 8 | Documentation and final submission | Week 11 |

---

## Appendix A: Glossary

- AI: Artificial Intelligence.
- API: Application Programming Interface.
- ASR: Automatic Speech Recognition.
- Dashboard: Main post-login screen displaying available and past interviews.
- FastAPI: Python framework used to build the backend REST API.
- Firebase Authentication: Cloud service used for user sign-up and sign-in.
- Firestore: NoSQL cloud database used for persistent data storage.
- Gemini: Google’s generative AI model used for question and feedback generation.
- Next.js: React-based framework used for the frontend application.
- SRS: Software Requirements Specification.
- Transcript: Captured sequence of interview messages between user and AI interviewer.
- VAPI: Voice AI platform used to manage live voice interview sessions.

## Appendix B: To Be Determined List

TBD-01: Final names and university roll numbers of project team members.

TBD-02: Final faculty guide name.

TBD-03: Production deployment URL and hosting platform.

TBD-04: Final screenshots or separate UI specification, if required by the department.

TBD-05: Final test metrics and performance validation values collected after full deployment.
