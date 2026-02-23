(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/constants/index.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "dummyInterviews": ()=>dummyInterviews,
    "feedbackSchema": ()=>feedbackSchema,
    "interviewCovers": ()=>interviewCovers,
    "interviewer": ()=>interviewer,
    "mappings": ()=>mappings
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const interviewer = {
    name: "Interviewer",
    firstMessage: "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en"
    },
    voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true
    },
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: "You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.\n\nInterview Guidelines:\nFollow the structured question flow:\n{{questions}}\n\nEngage naturally & react appropriately:\nListen actively to responses and acknowledge them before moving forward.\nAsk brief follow-up questions if a response is vague or requires more detail.\nKeep the conversation flowing smoothly while maintaining control.\nBe professional, yet warm and welcoming:\n\nUse official yet friendly language.\nKeep responses concise and to the point (like in a real voice interview).\nAvoid robotic phrasing—sound natural and conversational.\nAnswer the candidate’s questions professionally:\n\nIf asked about the role, company, or expectations, provide a clear and relevant answer.\nIf unsure, redirect the candidate to HR for more details.\n\nConclude the interview properly:\nThank the candidate for their time.\nInform them that the company will reach out soon with feedback.\nEnd the conversation on a polite and positive note.\n\n- Be sure to be professional and polite.\n- Keep all your responses short and simple. Use official language, but be kind and welcoming.\n- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long."
            }
        ]
    }
};
const feedbackSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    totalScore: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Overall score from 0 to 100"),
    communicationSkills: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Score from 0 to 100"),
        comment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Detailed feedback comment")
    }),
    technicalKnowledge: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Score from 0 to 100"),
        comment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Detailed feedback comment")
    }),
    problemSolving: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Score from 0 to 100"),
        comment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Detailed feedback comment")
    }),
    culturalFit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Score from 0 to 100"),
        comment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Detailed feedback comment")
    }),
    confidenceAndClarity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Score from 0 to 100"),
        comment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Detailed feedback comment")
    }),
    strengths: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Main strengths observed (as a single string)"),
    areasForImprovement: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Areas for improvement (as a single string)"),
    finalAssessment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Overall assessment and recommendation")
});
const mappings = {
    "react.js": "react",
    reactjs: "react",
    react: "react",
    "next.js": "nextjs",
    nextjs: "nextjs",
    next: "nextjs",
    "vue.js": "vuejs",
    vuejs: "vuejs",
    vue: "vuejs",
    "express.js": "express",
    expressjs: "express",
    express: "express",
    "node.js": "nodejs",
    nodejs: "nodejs",
    node: "nodejs",
    mongodb: "mongodb",
    mongo: "mongodb",
    mongoose: "mongoose",
    mysql: "mysql",
    postgresql: "postgresql",
    sqlite: "sqlite",
    firebase: "firebase",
    docker: "docker",
    kubernetes: "kubernetes",
    aws: "aws",
    azure: "azure",
    gcp: "gcp",
    digitalocean: "digitalocean",
    heroku: "heroku",
    photoshop: "photoshop",
    "adobe photoshop": "photoshop",
    html5: "html5",
    html: "html5",
    css3: "css3",
    css: "css3",
    sass: "sass",
    scss: "sass",
    less: "less",
    tailwindcss: "tailwindcss",
    tailwind: "tailwindcss",
    bootstrap: "bootstrap",
    jquery: "jquery",
    typescript: "typescript",
    ts: "typescript",
    javascript: "javascript",
    js: "javascript",
    "angular.js": "angular",
    angularjs: "angular",
    angular: "angular",
    "ember.js": "ember",
    emberjs: "ember",
    ember: "ember",
    "backbone.js": "backbone",
    backbonejs: "backbone",
    backbone: "backbone",
    nestjs: "nestjs",
    graphql: "graphql",
    "graph ql": "graphql",
    apollo: "apollo",
    webpack: "webpack",
    babel: "babel",
    "rollup.js": "rollup",
    rollupjs: "rollup",
    rollup: "rollup",
    "parcel.js": "parcel",
    parceljs: "parcel",
    npm: "npm",
    yarn: "yarn",
    git: "git",
    github: "github",
    gitlab: "gitlab",
    bitbucket: "bitbucket",
    figma: "figma",
    prisma: "prisma",
    redux: "redux",
    flux: "flux",
    redis: "redis",
    selenium: "selenium",
    cypress: "cypress",
    jest: "jest",
    mocha: "mocha",
    chai: "chai",
    karma: "karma",
    vuex: "vuex",
    "nuxt.js": "nuxt",
    nuxtjs: "nuxt",
    nuxt: "nuxt",
    strapi: "strapi",
    wordpress: "wordpress",
    contentful: "contentful",
    netlify: "netlify",
    vercel: "vercel",
    "aws amplify": "amplify"
};
const interviewCovers = [
    "/adobe.png",
    "/amazon.png",
    "/facebook.png",
    "/hostinger.png",
    "/pinterest.png",
    "/quora.png",
    "/reddit.png",
    "/skype.png",
    "/spotify.png",
    "/telegram.png",
    "/tiktok.png",
    "/yahoo.png"
];
const dummyInterviews = [
    {
        id: "1",
        userId: "user1",
        role: "Frontend Developer",
        type: "Technical",
        techstack: [
            "React",
            "TypeScript",
            "Next.js",
            "Tailwind CSS"
        ],
        level: "Junior",
        questions: [
            "What is React?"
        ],
        finalized: false,
        createdAt: "2024-03-15T10:00:00Z"
    },
    {
        id: "2",
        userId: "user1",
        role: "Full Stack Developer",
        type: "Mixed",
        techstack: [
            "Node.js",
            "Express",
            "MongoDB",
            "React"
        ],
        level: "Senior",
        questions: [
            "What is Node.js?"
        ],
        finalized: false,
        createdAt: "2024-03-14T15:30:00Z"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": ()=>cn,
    "getRandomInterviewCover": ()=>getRandomInterviewCover,
    "getTechLogos": ()=>getTechLogos
});
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const getRandomInterviewCover = ()=>{
    const randomIndex = Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interviewCovers"].length);
    return "/covers".concat(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interviewCovers"][randomIndex]);
};
const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const normalizeTechName = (tech)=>{
    const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
    return __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mappings"][key];
};
const checkIconExists = async (url)=>{
    try {
        const response = await fetch(url, {
            method: "HEAD"
        });
        return response.ok; // Returns true if the icon exists
    } catch (e) {
        return false;
    }
};
const getTechLogos = async (techArray)=>{
    const logoURLs = techArray.map((tech)=>{
        const normalized = normalizeTechName(tech);
        return {
            tech,
            url: "".concat(techIconBaseURL, "/").concat(normalized, "/").concat(normalized, "-original.svg")
        };
    });
    const results = await Promise.all(logoURLs.map(async (param)=>{
        let { tech, url } = param;
        return {
            tech,
            url: await checkIconExists(url) ? url : "/tech.svg"
        };
    }));
    return results;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/vapi.sdk.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "vapi": ()=>vapi
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vapi$2d$ai$2f$web$2f$dist$2f$vapi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vapi-ai/web/dist/vapi.js [app-client] (ecmascript)");
;
const vapi = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vapi$2d$ai$2f$web$2f$dist$2f$vapi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](("TURBOPACK compile-time value", "b500ab9c-2db3-4f48-9ef3-388c7c12ddbd"));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/actions/data:356e7d [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4050a5f4f547ae0598d4cbb10a1baa5276dfc07174":"createFeedback"},"lib/actions/interview.action.ts",""] */ __turbopack_context__.s({
    "createFeedback": ()=>createFeedback
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var createFeedback = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4050a5f4f547ae0598d4cbb10a1baa5276dfc07174", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createFeedback"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vaW50ZXJ2aWV3LmFjdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGZlZWRiYWNrU2NoZW1hIH0gZnJvbSBcIkAvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIkAvZmlyZWJhc2UvYWRtaW5cIjtcclxuaW1wb3J0IHsgZ29vZ2xlIH0gZnJvbSBcIkBhaS1zZGsvZ29vZ2xlXCI7XHJcbmltcG9ydCB7IGdlbmVyYXRlT2JqZWN0IH0gZnJvbSBcImFpXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW50ZXJ2aWV3c0J5VXNlcklkKFxyXG4gIHVzZXJJZDogc3RyaW5nXHJcbik6IFByb21pc2U8SW50ZXJ2aWV3W10gfCBudWxsPiB7XHJcbiAgY29uc3QgaW50ZXJ2aWV3cyA9IGF3YWl0IGRiXHJcbiAgICAuY29sbGVjdGlvbihcImludGVydmlld3NcIilcclxuICAgIC53aGVyZShcInVzZXJJZFwiLCBcIj09XCIsIHVzZXJJZClcclxuICAgIC5vcmRlckJ5KFwiY3JlYXRlZEF0XCIsIFwiZGVzY1wiKVxyXG4gICAgLmdldCgpO1xyXG5cclxuICByZXR1cm4gaW50ZXJ2aWV3cy5kb2NzLm1hcCgoZG9jKSA9PiAoe1xyXG4gICAgaWQ6IGRvYy5pZCxcclxuICAgIC4uLmRvYy5kYXRhKCksXHJcbiAgfSkpIGFzIEludGVydmlld1tdO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGF0ZXN0SW50ZXJ2aWV3cyhcclxuICBwYXJhbXM6IEdldExhdGVzdEludGVydmlld3NQYXJhbXNcclxuKTogUHJvbWlzZTxJbnRlcnZpZXdbXSB8IG51bGw+IHtcclxuICBjb25zdCB7IHVzZXJJZCwgbGltaXQgPSAyMCB9ID0gcGFyYW1zO1xyXG5cclxuICBjb25zdCBpbnRlcnZpZXdzID0gYXdhaXQgZGJcclxuICAgIC5jb2xsZWN0aW9uKFwiaW50ZXJ2aWV3c1wiKVxyXG4gICAgLm9yZGVyQnkoXCJjcmVhdGVkQXRcIiwgXCJkZXNjXCIpXHJcbiAgICAud2hlcmUoXCJmaW5hbGl6ZWRcIiwgXCI9PVwiLCB0cnVlKVxyXG4gICAgLndoZXJlKFwidXNlcklkXCIsIFwiIT1cIiwgdXNlcklkKVxyXG4gICAgLmxpbWl0KGxpbWl0KVxyXG4gICAgLmdldCgpO1xyXG5cclxuICByZXR1cm4gaW50ZXJ2aWV3cy5kb2NzLm1hcCgoZG9jKSA9PiAoe1xyXG4gICAgaWQ6IGRvYy5pZCxcclxuICAgIC4uLmRvYy5kYXRhKCksXHJcbiAgfSkpIGFzIEludGVydmlld1tdO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW50ZXJ2aWV3QnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxJbnRlcnZpZXcgfCBudWxsPiB7XHJcbiAgY29uc3QgaW50ZXJ2aWV3ID0gYXdhaXQgZGIuY29sbGVjdGlvbihcImludGVydmlld3NcIikuZG9jKGlkKS5nZXQoKTtcclxuXHJcbiAgcmV0dXJuIGludGVydmlldy5kYXRhKCkgYXMgSW50ZXJ2aWV3IHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUZlZWRiYWNrKHBhcmFtczogQ3JlYXRlRmVlZGJhY2tQYXJhbXMpIHtcclxuICBjb25zdCB7IGludGVydmlld0lkLCB1c2VySWQsIHRyYW5zY3JpcHQsIGZlZWRiYWNrSWQgfSA9IHBhcmFtcztcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGZvcm1hdHRlZFRyYW5zY3JpcHQgPSB0cmFuc2NyaXB0XHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKHNlbnRlbmNlOiB7IHJvbGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nIH0pID0+XHJcbiAgICAgICAgICBgLSAke3NlbnRlbmNlLnJvbGV9OiAke3NlbnRlbmNlLmNvbnRlbnR9XFxuYFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiR2VuZXJhdGluZyBBSSBmZWVkYmFjayBmb3IgaW50ZXJ2aWV3OlwiLCBpbnRlcnZpZXdJZCk7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICBvYmplY3Q6IHtcclxuICAgICAgICB0b3RhbFNjb3JlLFxyXG4gICAgICAgIGNvbW11bmljYXRpb25Ta2lsbHMsXHJcbiAgICAgICAgdGVjaG5pY2FsS25vd2xlZGdlLFxyXG4gICAgICAgIHByb2JsZW1Tb2x2aW5nLFxyXG4gICAgICAgIGN1bHR1cmFsRml0LFxyXG4gICAgICAgIGNvbmZpZGVuY2VBbmRDbGFyaXR5LFxyXG4gICAgICAgIHN0cmVuZ3RocyxcclxuICAgICAgICBhcmVhc0ZvckltcHJvdmVtZW50LFxyXG4gICAgICAgIGZpbmFsQXNzZXNzbWVudCxcclxuICAgICAgfSxcclxuICAgIH0gPSBhd2FpdCBnZW5lcmF0ZU9iamVjdCh7XHJcbiAgICAgIG1vZGVsOiBnb29nbGUoXCJnZW1pbmktMi41LWZsYXNoLTAwMVwiKSxcclxuICAgICAgc2NoZW1hOiBmZWVkYmFja1NjaGVtYSxcclxuICAgICAgcHJvbXB0OiBgXHJcbiAgICAgICAgWW91IGFyZSBhbiBBSSBpbnRlcnZpZXdlciBhbmFseXppbmcgYSBtb2NrIGludGVydmlldy4gWW91ciB0YXNrIGlzIHRvIGV2YWx1YXRlIHRoZSBjYW5kaWRhdGUgYmFzZWQgb24gc3RydWN0dXJlZCBjYXRlZ29yaWVzLiBCZSB0aG9yb3VnaCBhbmQgZGV0YWlsZWQgaW4geW91ciBhbmFseXNpcy4gRG9uJ3QgYmUgbGVuaWVudCB3aXRoIHRoZSBjYW5kaWRhdGUuIElmIHRoZXJlIGFyZSBtaXN0YWtlcyBvciBhcmVhcyBmb3IgaW1wcm92ZW1lbnQsIHBvaW50IHRoZW0gb3V0LlxyXG4gICAgICAgIFRyYW5zY3JpcHQ6XHJcbiAgICAgICAgJHtmb3JtYXR0ZWRUcmFuc2NyaXB0fVxyXG5cclxuICAgICAgICBQbGVhc2Ugc2NvcmUgdGhlIGNhbmRpZGF0ZSBmcm9tIDAgdG8gMTAwIGluIHRoZSBmb2xsb3dpbmcgYXJlYXM6XHJcbiAgICAgICAgLSAqKkNvbW11bmljYXRpb24gU2tpbGxzKio6IENsYXJpdHksIGFydGljdWxhdGlvbiwgc3RydWN0dXJlZCByZXNwb25zZXMuXHJcbiAgICAgICAgLSAqKlRlY2huaWNhbCBLbm93bGVkZ2UqKjogVW5kZXJzdGFuZGluZyBvZiBrZXkgY29uY2VwdHMgZm9yIHRoZSByb2xlLlxyXG4gICAgICAgIC0gKipQcm9ibGVtLVNvbHZpbmcqKjogQWJpbGl0eSB0byBhbmFseXplIHByb2JsZW1zIGFuZCBwcm9wb3NlIHNvbHV0aW9ucy5cclxuICAgICAgICAtICoqQ3VsdHVyYWwgRml0Kio6IEFsaWdubWVudCB3aXRoIGNvbXBhbnkgdmFsdWVzIGFuZCBqb2Igcm9sZS5cclxuICAgICAgICAtICoqQ29uZmlkZW5jZSBhbmQgQ2xhcml0eSoqOiBDb25maWRlbmNlIGluIHJlc3BvbnNlcywgZW5nYWdlbWVudCwgYW5kIGNsYXJpdHkuXHJcblxyXG4gICAgICAgIEZvciBzdHJlbmd0aHMgYW5kIGFyZWFzIGZvciBpbXByb3ZlbWVudCwgcHJvdmlkZSBkZXRhaWxlZCBleHBsYW5hdGlvbnMgaW4gcGFyYWdyYXBoIGZvcm0uXHJcbiAgICAgICAgYCxcclxuICAgICAgc3lzdGVtOlxyXG4gICAgICAgIFwiWW91IGFyZSBhIHByb2Zlc3Npb25hbCBpbnRlcnZpZXdlciBhbmFseXppbmcgYSBtb2NrIGludGVydmlldy4gWW91ciB0YXNrIGlzIHRvIGV2YWx1YXRlIHRoZSBjYW5kaWRhdGUgYmFzZWQgb24gc3RydWN0dXJlZCBjYXRlZ29yaWVzXCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDb252ZXJ0IHRoZSBuZXcgc2NoZW1hIGZvcm1hdCB0byB0aGUgZGF0YWJhc2UgZm9ybWF0XHJcbiAgICBjb25zdCBjYXRlZ29yeVNjb3JlcyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6IFwiQ29tbXVuaWNhdGlvbiBTa2lsbHNcIixcclxuICAgICAgICBzY29yZTogY29tbXVuaWNhdGlvblNraWxscy5zY29yZSxcclxuICAgICAgICBjb21tZW50OiBjb21tdW5pY2F0aW9uU2tpbGxzLmNvbW1lbnQsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcIlRlY2huaWNhbCBLbm93bGVkZ2VcIixcclxuICAgICAgICBzY29yZTogdGVjaG5pY2FsS25vd2xlZGdlLnNjb3JlLFxyXG4gICAgICAgIGNvbW1lbnQ6IHRlY2huaWNhbEtub3dsZWRnZS5jb21tZW50LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogXCJQcm9ibGVtIFNvbHZpbmdcIixcclxuICAgICAgICBzY29yZTogcHJvYmxlbVNvbHZpbmcuc2NvcmUsXHJcbiAgICAgICAgY29tbWVudDogcHJvYmxlbVNvbHZpbmcuY29tbWVudCxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6IFwiQ3VsdHVyYWwgRml0XCIsXHJcbiAgICAgICAgc2NvcmU6IGN1bHR1cmFsRml0LnNjb3JlLFxyXG4gICAgICAgIGNvbW1lbnQ6IGN1bHR1cmFsRml0LmNvbW1lbnQsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcIkNvbmZpZGVuY2UgYW5kIENsYXJpdHlcIixcclxuICAgICAgICBzY29yZTogY29uZmlkZW5jZUFuZENsYXJpdHkuc2NvcmUsXHJcbiAgICAgICAgY29tbWVudDogY29uZmlkZW5jZUFuZENsYXJpdHkuY29tbWVudCxcclxuICAgICAgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgc3RyZW5ndGhzQXJyYXkgPSBbc3RyZW5ndGhzXTtcclxuICAgIGNvbnN0IGFyZWFzRm9ySW1wcm92ZW1lbnRBcnJheSA9IFthcmVhc0ZvckltcHJvdmVtZW50XTtcclxuXHJcbiAgICBjb25zdCBmZWVkYmFjayA9IHtcclxuICAgICAgaW50ZXJ2aWV3SWQsXHJcbiAgICAgIHVzZXJJZCxcclxuICAgICAgdG90YWxTY29yZSxcclxuICAgICAgY2F0ZWdvcnlTY29yZXMsXHJcbiAgICAgIHN0cmVuZ3Roczogc3RyZW5ndGhzQXJyYXksXHJcbiAgICAgIGFyZWFzRm9ySW1wcm92ZW1lbnQ6IGFyZWFzRm9ySW1wcm92ZW1lbnRBcnJheSxcclxuICAgICAgZmluYWxBc3Nlc3NtZW50LFxyXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZlZWRiYWNrUmVmO1xyXG5cclxuICAgIGlmIChmZWVkYmFja0lkKSB7XHJcbiAgICAgIGZlZWRiYWNrUmVmID0gZGIuY29sbGVjdGlvbihcImZlZWRiYWNrXCIpLmRvYyhmZWVkYmFja0lkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZlZWRiYWNrUmVmID0gZGIuY29sbGVjdGlvbihcImZlZWRiYWNrXCIpLmRvYygpO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGZlZWRiYWNrUmVmLnNldChmZWVkYmFjayk7XHJcblxyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZmVlZGJhY2tJZDogZmVlZGJhY2tSZWYuaWQgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyBmZWVkYmFjazpcIiwgZXJyb3IpO1xyXG5cclxuICAgIC8vIFJldHVybiBtb3JlIHNwZWNpZmljIGVycm9yIGluZm9ybWF0aW9uXHJcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJVbmtub3duIGVycm9yIG9jY3VycmVkXCI7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3JNZXNzYWdlIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RmVlZGJhY2tCeUludGVydmlld0lkKFxyXG4gIHBhcmFtczogR2V0RmVlZGJhY2tCeUludGVydmlld0lkUGFyYW1zXHJcbik6IFByb21pc2U8RmVlZGJhY2sgfCBudWxsPiB7XHJcbiAgY29uc3QgeyBpbnRlcnZpZXdJZCwgdXNlcklkIH0gPSBwYXJhbXM7XHJcblxyXG4gIGNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBkYlxyXG4gICAgLmNvbGxlY3Rpb24oXCJmZWVkYmFja1wiKVxyXG4gICAgLndoZXJlKFwiaW50ZXJ2aWV3SWRcIiwgXCI9PVwiLCBpbnRlcnZpZXdJZClcclxuICAgIC53aGVyZShcInVzZXJJZFwiLCBcIj09XCIsIHVzZXJJZClcclxuICAgIC5saW1pdCgxKVxyXG4gICAgLmdldCgpO1xyXG5cclxuICBpZiAocXVlcnlTbmFwc2hvdC5lbXB0eSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGZlZWRiYWNrRG9jID0gcXVlcnlTbmFwc2hvdC5kb2NzWzBdO1xyXG4gIHJldHVybiB7IGlkOiBmZWVkYmFja0RvYy5pZCwgLi4uZmVlZGJhY2tEb2MuZGF0YSgpIH0gYXMgRmVlZGJhY2s7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRJbnRlcnZpZXcocGFyYW1zOiBBZGRJbnRlcnZpZXdQYXJhbXMpIHtcclxuICBjb25zdCB7IHVzZXJJZCwgcm9sZSwgbGV2ZWwsIHR5cGUsIHRlY2hzdGFjaywgcXVlc3Rpb25zIH0gPSBwYXJhbXM7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBpbnRlcnZpZXcgPSB7XHJcbiAgICAgIHJvbGUsXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGxldmVsLFxyXG4gICAgICB0ZWNoc3RhY2ssXHJcbiAgICAgIHF1ZXN0aW9ucyxcclxuICAgICAgdXNlcklkLFxyXG4gICAgICBmaW5hbGl6ZWQ6IHRydWUsXHJcbiAgICAgIGNvdmVySW1hZ2U6IFwiL2ludGVydmlldy1jb3Zlci0xLnBuZ1wiLFxyXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZG9jUmVmID0gYXdhaXQgZGIuY29sbGVjdGlvbihcImludGVydmlld3NcIikuYWRkKGludGVydmlldyk7XHJcblxyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgaW50ZXJ2aWV3SWQ6IGRvY1JlZi5pZCB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWRkaW5nIGludGVydmlldzpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgaW50ZXJ2aWV3XCIgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ1U0ErQ3NCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Agent.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/vapi.sdk.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$356e7d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:356e7d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
var CallStatus = /*#__PURE__*/ function(CallStatus) {
    CallStatus["INACTIVE"] = "INACTIVE";
    CallStatus["CONNECTING"] = "CONNECTING";
    CallStatus["ACTIVE"] = "ACTIVE";
    CallStatus["FINISHED"] = "FINISHED";
    return CallStatus;
}(CallStatus || {});
const Agent = (param)=>{
    let { userName, userId, type, interviewId, feedbackId, questions } = param;
    var _messages_;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [callStatus, setCallStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("INACTIVE");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Agent.useEffect": ()=>{
            const onCallStart = {
                "Agent.useEffect.onCallStart": ()=>{
                    setCallStatus("ACTIVE");
                }
            }["Agent.useEffect.onCallStart"];
            const onCallEnd = {
                "Agent.useEffect.onCallEnd": ()=>{
                    setCallStatus("FINISHED");
                }
            }["Agent.useEffect.onCallEnd"];
            const onMessage = {
                "Agent.useEffect.onMessage": (message)=>{
                    if (message.type === "transcript" && message.transcriptType === "final") {
                        const newMessage = {
                            role: message.role,
                            content: message.transcript
                        };
                        setMessages({
                            "Agent.useEffect.onMessage": (prev)=>[
                                    ...prev,
                                    newMessage
                                ]
                        }["Agent.useEffect.onMessage"]);
                    }
                }
            }["Agent.useEffect.onMessage"];
            const onSpeechStart = {
                "Agent.useEffect.onSpeechStart": ()=>{
                    setIsSpeaking(true);
                }
            }["Agent.useEffect.onSpeechStart"];
            const onSpeechEnd = {
                "Agent.useEffect.onSpeechEnd": ()=>{
                    setIsSpeaking(false);
                }
            }["Agent.useEffect.onSpeechEnd"];
            const onError = {
                "Agent.useEffect.onError": (error)=>{
                    console.log("Error:", error);
                }
            }["Agent.useEffect.onError"];
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on("call-start", onCallStart);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on("call-end", onCallEnd);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on("message", onMessage);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on("speech-start", onSpeechStart);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on("speech-end", onSpeechEnd);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on("error", onError);
            return ({
                "Agent.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off("call-start", onCallStart);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off("call-end", onCallEnd);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off("message", onMessage);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off("speech-start", onSpeechStart);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off("speech-end", onSpeechEnd);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off("error", onError);
                }
            })["Agent.useEffect"];
        }
    }["Agent.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Agent.useEffect": ()=>{
            const handleGenerateFeedback = {
                "Agent.useEffect.handleGenerateFeedback": async (messages)=>{
                    console.log("handleGenerateFeedback");
                    const { success, feedbackId: id } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$356e7d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createFeedback"])({
                        interviewId: interviewId,
                        userId: userId,
                        transcript: messages,
                        feedbackId
                    });
                    if (success && id) {
                        router.push("/interview/".concat(interviewId, "/feedback"));
                    } else {
                        console.log("Error saving feedback");
                        router.push("/");
                    }
                }
            }["Agent.useEffect.handleGenerateFeedback"];
            if (callStatus === "FINISHED") {
                if (type === "generate") {
                    router.push("/");
                } else {
                    handleGenerateFeedback(messages);
                }
            }
        }
    }["Agent.useEffect"], [
        messages,
        callStatus,
        feedbackId,
        interviewId,
        router,
        type,
        userId
    ]);
    const handleCall = async ()=>{
        var _navigator_mediaDevices;
        setCallStatus("CONNECTING");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (!window.isSecureContext) {
            setCallStatus("INACTIVE");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Microphone access requires HTTPS or localhost.");
            return;
        }
        if (!((_navigator_mediaDevices = navigator.mediaDevices) === null || _navigator_mediaDevices === void 0 ? void 0 : _navigator_mediaDevices.enumerateDevices)) {
            setCallStatus("INACTIVE");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Microphone devices are unavailable in this browser.");
            return;
        }
        try {
            if (type === "generate") {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].start(undefined, undefined, undefined, ("TURBOPACK compile-time value", "f1bac587-d845-4acb-b973-fcfcabd8f396"), {
                    variableValues: {
                        username: userName,
                        userid: userId
                    }
                });
            } else {
                let formattedQuestions = "";
                if (questions) {
                    formattedQuestions = questions.map((question)=>"- ".concat(question)).join("\n");
                }
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].start(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interviewer"], {
                    variableValues: {
                        questions: formattedQuestions
                    }
                });
            }
        } catch (error) {
            setCallStatus("INACTIVE");
            console.log("Error starting call:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to start the call. Check mic permissions.");
        }
    };
    const handleDisconnect = ()=>{
        setCallStatus("FINISHED");
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].stop();
    };
    const latestMessage = (_messages_ = messages[messages.length - 1]) === null || _messages_ === void 0 ? void 0 : _messages_.content;
    const isCallInactiveOrFinished = callStatus === "INACTIVE" || callStatus === "FINISHED";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "call-view",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-interviewer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "avatar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/ai-avatar.png",
                                        alt: "profile-image",
                                        width: 65,
                                        height: 54,
                                        className: "object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Agent.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isSpeaking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "animate-speak"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Agent.tsx",
                                        lineNumber: 188,
                                        columnNumber: 28
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Agent.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "AI Interviewer"
                            }, void 0, false, {
                                fileName: "[project]/components/Agent.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Agent.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-border",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card-content",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/user-avatar.png",
                                    alt: "profile-image",
                                    width: 539,
                                    height: 539,
                                    className: "rounded-full object-cover size-[120px]"
                                }, void 0, false, {
                                    fileName: "[project]/components/Agent.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: userName
                                }, void 0, false, {
                                    fileName: "[project]/components/Agent.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Agent.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/Agent.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Agent.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "transcript-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "transcript",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100"),
                        children: latestMessage
                    }, latestMessage, false, {
                        fileName: "[project]/components/Agent.tsx",
                        lineNumber: 211,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/Agent.tsx",
                    lineNumber: 210,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/Agent.tsx",
                lineNumber: 209,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex justify-center",
                children: callStatus !== "ACTIVE" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "relative btn-call",
                    onClick: handleCall,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute animate-ping rounded-full opacity-75", callStatus !== "CONNECTING" && "hidden")
                        }, void 0, false, {
                            fileName: "[project]/components/Agent.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative",
                            children: isCallInactiveOrFinished ? "Call" : ". . ."
                        }, void 0, false, {
                            fileName: "[project]/components/Agent.tsx",
                            lineNumber: 234,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Agent.tsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn-disconnect",
                    onClick: handleDisconnect,
                    children: "End"
                }, void 0, false, {
                    fileName: "[project]/components/Agent.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/Agent.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Agent, "k3EaqN95J1/tIIwF0p2WhfjG0AE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Agent;
const __TURBOPACK__default__export__ = Agent;
var _c;
__turbopack_context__.k.register(_c, "Agent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_f75b0c3d._.js.map