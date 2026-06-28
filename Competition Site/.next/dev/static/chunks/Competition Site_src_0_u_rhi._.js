(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Competition Site/src/data/competitions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "competitions",
    ()=>competitions,
    "deadlineRanges",
    ()=>deadlineRanges,
    "disciplines",
    ()=>disciplines,
    "prizeRanges",
    ()=>prizeRanges
]);
const competitions = [
    {
        id: '1',
        title: 'Urban Housing Innovation Challenge',
        discipline: 'Architecture',
        teamSize: '2-5 members',
        prize: '$15,000',
        prizeAmount: 15000,
        deadline: 'June 15, 2026',
        deadlineDate: new Date('2026-06-15'),
        cost: '$150',
        costAmount: 150,
        imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
        description: 'Design innovative housing solutions for rapidly growing urban areas. This competition challenges architects to create sustainable, affordable, and culturally responsive housing that addresses the needs of modern city dwellers while respecting historical context.',
        location: 'Global',
        organizer: 'Buildner'
    },
    {
        id: '2',
        title: 'Sustainable Park Design Competition',
        discipline: 'Landscape Architecture',
        teamSize: '1-4 members',
        prize: '$8,000',
        prizeAmount: 8000,
        deadline: 'May 30, 2026',
        deadlineDate: new Date('2026-05-30'),
        cost: '$75',
        costAmount: 75,
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
        description: 'Create a sustainable public park design that promotes biodiversity, handles stormwater naturally, and provides community spaces. Focus on native plantings, ecological corridors, and year-round usability.',
        location: 'North America',
        organizer: 'Landscape Architecture Foundation'
    },
    {
        id: '3',
        title: 'Metro Station Redesign',
        discipline: 'Urbanism',
        teamSize: '3-6 members',
        prize: '$25,000',
        prizeAmount: 25000,
        deadline: 'July 20, 2026',
        deadlineDate: new Date('2026-07-20'),
        cost: '$200',
        costAmount: 200,
        imageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop',
        description: 'Redesign a major metropolitan transit station to improve passenger flow, enhance sustainability, and create vibrant public spaces. Consider integration with surrounding neighborhoods and multi-modal transportation connections.',
        location: 'Europe',
        organizer: 'International Transit Design Awards'
    },
    {
        id: '4',
        title: 'Smart Home Device Concept',
        discipline: 'Industrial Design',
        teamSize: '1-3 members',
        prize: '$5,000',
        prizeAmount: 5000,
        deadline: 'May 10, 2026',
        deadlineDate: new Date('2026-05-10'),
        cost: '$50',
        costAmount: 50,
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
        description: 'Design a next-generation smart home device that combines functionality with aesthetic excellence. Consider sustainability, user experience, and integration with existing smart home ecosystems.',
        location: 'Global',
        organizer: 'Industrial Design Society'
    },
    {
        id: '5',
        title: 'Cultural Center in Historic District',
        discipline: 'Architecture',
        teamSize: '2-4 members',
        prize: '$12,000',
        prizeAmount: 12000,
        deadline: 'August 1, 2026',
        deadlineDate: new Date('2026-08-01'),
        cost: '$125',
        costAmount: 125,
        imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop',
        description: 'Design a contemporary cultural center that respects and enhances a historic urban district. The project should include exhibition spaces, a small theater, and community gathering areas while preserving historical character.',
        location: 'Asia',
        organizer: 'World Architecture Festival'
    },
    {
        id: '6',
        title: 'Waterfront Revitalization Master Plan',
        discipline: 'Urbanism',
        teamSize: '4-8 members',
        prize: '$30,000',
        prizeAmount: 30000,
        deadline: 'September 15, 2026',
        deadlineDate: new Date('2026-09-15'),
        cost: '$250',
        costAmount: 250,
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        description: 'Create a comprehensive master plan for revitalizing an abandoned industrial waterfront. Address environmental remediation, public access, economic development, and climate resilience.',
        location: 'Global',
        organizer: 'Urban Waterfront Institute'
    },
    {
        id: '7',
        title: 'Modular Furniture System',
        discipline: 'Industrial Design',
        teamSize: '1-2 members',
        prize: '$3,500',
        prizeAmount: 3500,
        deadline: 'April 30, 2026',
        deadlineDate: new Date('2026-04-30'),
        cost: '$40',
        costAmount: 40,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
        description: 'Design a modular furniture system that can adapt to various living and working spaces. Focus on sustainability, ease of assembly, and aesthetic coherence across different configurations.',
        location: 'Europe',
        organizer: 'Design Museum London'
    },
    {
        id: '8',
        title: 'Community Garden Network',
        discipline: 'Landscape Architecture',
        teamSize: '2-5 members',
        prize: '$6,500',
        prizeAmount: 6500,
        deadline: 'June 1, 2026',
        deadlineDate: new Date('2026-06-01'),
        cost: '$60',
        costAmount: 60,
        imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
        description: 'Design a network of community gardens that promotes urban agriculture, social connection, and environmental education. Create spaces that serve diverse community needs while enhancing local biodiversity.',
        location: 'North America',
        organizer: 'American Society of Landscape Architects'
    }
];
const disciplines = [
    'Architecture',
    'Landscape Architecture',
    'Urbanism',
    'Industrial Design'
];
const prizeRanges = [
    {
        label: 'Under $1k',
        min: 0,
        max: 1000
    },
    {
        label: '$1k - $5k',
        min: 1000,
        max: 5000
    },
    {
        label: '$5k+',
        min: 5000,
        max: Infinity
    }
];
const deadlineRanges = [
    {
        label: 'This month',
        months: 0
    },
    {
        label: 'Next 3 months',
        months: 3
    },
    {
        label: 'Next 6 months',
        months: 6
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Competition Site/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Competition Site/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Competition Site/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Competition Site/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$src$2f$data$2f$competitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Competition Site/src/data/competitions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
// Sidebar Component
function Sidebar({ selectedDisciplines, setSelectedDisciplines, selectedPrizes, setSelectedPrizes, selectedDeadlines, setSelectedDeadlines, onOpenModal, language, setLanguage }) {
    const toggleDiscipline = (discipline)=>{
        if (selectedDisciplines.includes(discipline)) {
            setSelectedDisciplines(selectedDisciplines.filter((d)=>d !== discipline));
        } else {
            setSelectedDisciplines([
                ...selectedDisciplines,
                discipline
            ]);
        }
    };
    const togglePrize = (prize)=>{
        if (selectedPrizes.includes(prize)) {
            setSelectedPrizes(selectedPrizes.filter((p)=>p !== prize));
        } else {
            setSelectedPrizes([
                ...selectedPrizes,
                prize
            ]);
        }
    };
    const toggleDeadline = (deadline)=>{
        if (selectedDeadlines.includes(deadline)) {
            setSelectedDeadlines(selectedDeadlines.filter((d)=>d !== deadline));
        } else {
            setSelectedDeadlines([
                ...selectedDeadlines,
                deadline
            ]);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed left-0 top-0 h-screen w-[280px] bg-arch-white/90 backdrop-blur border-r border-arch-black/10 shadow-lg flex flex-col z-40",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-arch-black/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold tracking-tight text-arch-black",
                        children: [
                            "COMPETITION",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 58,
                                columnNumber: 22
                            }, this),
                            "AGGREGATOR"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-arch-black/50 mt-2 tracking-widest uppercase",
                        children: "Architecture & Design"
                    }, void 0, false, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "p-6 border-b border-arch-black/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "text-sm font-medium text-arch-black hover:text-arch-black/70 transition-colors",
                                children: "About us"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "text-sm font-medium text-arch-black hover:text-arch-black/70 transition-colors",
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-6 space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-4",
                                children: "Disciplines"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$src$2f$data$2f$competitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disciplines"].map((discipline)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-4 h-4 border border-arch-black/30 relative flex items-center justify-center transition-colors group-hover:border-arch-black",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "sr-only",
                                                        checked: selectedDisciplines.includes(discipline),
                                                        onChange: ()=>toggleDiscipline(discipline)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 19
                                                    }, this),
                                                    selectedDisciplines.includes(discipline) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 bg-arch-black"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-arch-black/80 group-hover:text-arch-black transition-colors",
                                                children: discipline
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, discipline, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-4",
                                children: "Prize Range"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$src$2f$data$2f$competitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prizeRanges"].map((range)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-4 h-4 border border-arch-black/30 relative flex items-center justify-center transition-colors group-hover:border-arch-black",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "sr-only",
                                                        checked: selectedPrizes.includes(range.label),
                                                        onChange: ()=>togglePrize(range.label)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 19
                                                    }, this),
                                                    selectedPrizes.includes(range.label) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 bg-arch-black"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-arch-black/80 group-hover:text-arch-black transition-colors",
                                                children: range.label
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, range.label, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-4",
                                children: "Deadline"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$src$2f$data$2f$competitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deadlineRanges"].map((range)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-4 h-4 border border-arch-black/30 relative flex items-center justify-center transition-colors group-hover:border-arch-black",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "sr-only",
                                                        checked: selectedDeadlines.includes(range.label),
                                                        onChange: ()=>toggleDeadline(range.label)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 19
                                                    }, this),
                                                    selectedDeadlines.includes(range.label) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 bg-arch-black"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-arch-black/80 group-hover:text-arch-black transition-colors",
                                                children: range.label
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, range.label, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-t border-arch-black/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onOpenModal,
                    className: "w-full py-4 bg-arch-black text-arch-white text-sm font-medium tracking-wide hover:bg-arch-black/80 transition-colors",
                    children: "Help me find my Competition"
                }, void 0, false, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 pt-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setLanguage('EN'),
                            className: `flex-1 py-2 text-xs font-medium tracking-widest transition-colors ${language === 'EN' ? 'bg-arch-black text-arch-white' : 'bg-arch-gray text-arch-black/50 hover:text-arch-black'}`,
                            children: "EN"
                        }, void 0, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setLanguage('NL'),
                            className: `flex-1 py-2 text-xs font-medium tracking-widest transition-colors ${language === 'NL' ? 'bg-arch-black text-arch-white' : 'bg-arch-gray text-arch-black/50 hover:text-arch-black'}`,
                            children: "NL"
                        }, void 0, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Competition Site/src/app/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = Sidebar;
// Competition Card Component
function CompetitionCard({ competition, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        onClick: onClick,
        className: "bg-arch-white/95 border border-arch-black/10 rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:border-arch-black/30 transition-all duration-300 group overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-48 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: competition.imageUrl,
                        alt: competition.title,
                        fill: true,
                        className: "object-cover transition-transform duration-500 group-hover:scale-105"
                    }, void 0, false, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-3 py-1 bg-arch-white/90 rounded-full text-xs font-semibold tracking-wider text-arch-black shadow",
                            children: competition.discipline
                        }, void 0, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-bold text-arch-black mb-1 leading-tight group-hover:text-arch-black/70 transition-colors",
                        children: competition.title
                    }, void 0, false, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 text-xs text-arch-black/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-1 bg-arch-gray rounded",
                                children: [
                                    "Team: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-arch-black",
                                        children: competition.teamSize
                                    }, void 0, false, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 238,
                                        columnNumber: 66
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-1 bg-arch-gray rounded",
                                children: [
                                    "Prize: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-arch-black",
                                        children: competition.prize
                                    }, void 0, false, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 67
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-1 bg-arch-gray rounded",
                                children: [
                                    "Deadline: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-arch-black",
                                        children: competition.deadline
                                    }, void 0, false, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 70
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-1 bg-arch-gray rounded",
                                children: [
                                    "Entry Fee: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-arch-black",
                                        children: competition.cost
                                    }, void 0, false, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 71
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Competition Site/src/app/page.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_c1 = CompetitionCard;
// Detail Panel Component
function DetailPanel({ competition, onClose }) {
    if (!competition) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-arch-black/40 backdrop-blur-sm z-40 transition-opacity",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed right-0 top-0 h-screen w-[500px] bg-arch-white/95 shadow-2xl border-l border-arch-black/10 z-50 overflow-y-auto transform transition-transform duration-300 ease-out rounded-l-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-arch-black/20 text-arch-black hover:bg-arch-black hover:text-arch-white transition-colors z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "square",
                            strokeLinejoin: "miter",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "18",
                                    y1: "6",
                                    x2: "6",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/Competition Site/src/app/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "6",
                                    y1: "6",
                                    x2: "18",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/Competition Site/src/app/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-64 rounded-t-2xl overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: competition.imageUrl,
                            alt: competition.title,
                            fill: true,
                            className: "object-cover"
                        }, void 0, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block px-3 py-1 bg-arch-black text-arch-white text-xs font-semibold tracking-wider mb-2 rounded-full shadow",
                                children: competition.discipline
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-arch-black mb-2",
                                children: competition.title
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-arch-black/50 block mb-1 tracking-wider uppercase",
                                                children: "Prize"
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 314,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-arch-black",
                                                children: competition.prize
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-arch-black/50 block mb-1 tracking-wider uppercase",
                                                children: "Entry Fee"
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-arch-black",
                                                children: competition.cost
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-arch-black/50 block mb-1 tracking-wider uppercase",
                                                children: "Team Size"
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-arch-black",
                                                children: competition.teamSize
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-arch-black/50 block mb-1 tracking-wider uppercase",
                                                children: "Deadline"
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 326,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-arch-black",
                                                children: competition.deadline
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-arch-black/50 block mb-1 tracking-wider uppercase",
                                                children: "Location"
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-arch-black",
                                                children: competition.location
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 331,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-arch-black/50 block mb-1 tracking-wider uppercase",
                                                children: "Organizer"
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-arch-black",
                                                children: competition.organizer
                                            }, void 0, false, {
                                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-2",
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-arch-black/80 leading-relaxed",
                                        children: competition.description
                                    }, void 0, false, {
                                        fileName: "[project]/Competition Site/src/app/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `mailto:competitions@example.com?subject=Join Competition: ${competition.title}`,
                                className: "block w-full py-4 bg-arch-black text-arch-white text-center text-base font-semibold tracking-wide rounded-lg shadow hover:bg-arch-black/80 transition-colors",
                                children: "Join now"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c2 = DetailPanel;
// Questionnaire Modal Component
function QuestionnaireModal({ isOpen, onClose }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const questions = [
        {
            id: 'discipline',
            question: 'What is your primary discipline?',
            options: [
                'Architecture',
                'Landscape Architecture',
                'Urbanism',
                'Industrial Design'
            ]
        },
        {
            id: 'teamSize',
            question: 'What is your team size?',
            options: [
                'Solo',
                '2-3 members',
                '4-5 members',
                '6+ members'
            ]
        },
        {
            id: 'budget',
            question: 'What is your budget for entry fees?',
            options: [
                'Under $50',
                '$50-$150',
                '$150-$300',
                'No limit'
            ]
        }
    ];
    const currentQuestion = questions[step - 1];
    const handleAnswer = (answer)=>{
        setAnswers({
            ...answers,
            [currentQuestion.id]: answer
        });
        if (step < 3) {
            setStep(step + 1);
        }
    };
    const handleSubmit = ()=>{
        alert('Recommendations: Urban Housing Innovation Challenge, Metro Station Redesign, Cultural Center in Historic District');
        onClose();
        setStep(1);
        setAnswers({});
    };
    const handleClose = ()=>{
        onClose();
        setStep(1);
        setAnswers({});
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-arch-black/50 z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-arch-white w-full max-w-md p-8 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleClose,
                    className: "absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-arch-black/50 hover:text-arch-black transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "square",
                        strokeLinejoin: "miter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "18",
                                y1: "6",
                                x2: "6",
                                y2: "18"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 434,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "6",
                                y1: "6",
                                x2: "18",
                                y2: "18"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 435,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 423,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 419,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 mb-8",
                    children: [
                        1,
                        2,
                        3
                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-1 flex-1 transition-colors ${s <= step ? 'bg-arch-black' : 'bg-arch-black/20'}`
                        }, s, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 442,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 440,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold text-arch-black mb-6",
                    children: currentQuestion?.question
                }, void 0, false, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 452,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: currentQuestion?.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleAnswer(option),
                            className: "w-full p-4 text-left border border-arch-black/20 text-sm text-arch-black hover:border-arch-black hover:bg-arch-gray transition-colors",
                            children: option
                        }, option, false, {
                            fileName: "[project]/Competition Site/src/app/page.tsx",
                            lineNumber: 459,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 457,
                    columnNumber: 9
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSubmit,
                    className: "w-full mt-6 py-4 bg-arch-black text-arch-white text-sm font-medium tracking-wide hover:bg-arch-black/80 transition-colors",
                    children: "Show Recommendations"
                }, void 0, false, {
                    fileName: "[project]/Competition Site/src/app/page.tsx",
                    lineNumber: 471,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Competition Site/src/app/page.tsx",
            lineNumber: 417,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Competition Site/src/app/page.tsx",
        lineNumber: 416,
        columnNumber: 5
    }, this);
}
_s(QuestionnaireModal, "DM9+8NpA9ZpKJgmLtmebsquAmoM=");
_c3 = QuestionnaireModal;
function Home() {
    _s1();
    const [selectedDisciplines, setSelectedDisciplines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedPrizes, setSelectedPrizes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDeadlines, setSelectedDeadlines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCompetition, setSelectedCompetition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('EN');
    // Filter competitions
    const filteredCompetitions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[filteredCompetitions]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$src$2f$data$2f$competitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["competitions"].filter({
                "Home.useMemo[filteredCompetitions]": (competition)=>{
                    // Discipline filter
                    if (selectedDisciplines.length > 0 && !selectedDisciplines.includes(competition.discipline)) {
                        return false;
                    }
                    // Prize filter
                    if (selectedPrizes.length > 0) {
                        const matchesPrize = selectedPrizes.some({
                            "Home.useMemo[filteredCompetitions].matchesPrize": (prizeLabel)=>{
                                const range = __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$src$2f$data$2f$competitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prizeRanges"].find({
                                    "Home.useMemo[filteredCompetitions].matchesPrize.range": (r)=>r.label === prizeLabel
                                }["Home.useMemo[filteredCompetitions].matchesPrize.range"]);
                                if (!range) return false;
                                return competition.prizeAmount >= range.min && competition.prizeAmount < range.max;
                            }
                        }["Home.useMemo[filteredCompetitions].matchesPrize"]);
                        if (!matchesPrize) return false;
                    }
                    // Deadline filter
                    if (selectedDeadlines.length > 0) {
                        const now = new Date();
                        const matchesDeadline = selectedDeadlines.some({
                            "Home.useMemo[filteredCompetitions].matchesDeadline": (deadlineLabel)=>{
                                const range = __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$src$2f$data$2f$competitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deadlineRanges"].find({
                                    "Home.useMemo[filteredCompetitions].matchesDeadline.range": (r)=>r.label === deadlineLabel
                                }["Home.useMemo[filteredCompetitions].matchesDeadline.range"]);
                                if (!range) return false;
                                const futureDate = new Date();
                                futureDate.setMonth(futureDate.getMonth() + range.months);
                                return competition.deadlineDate <= futureDate;
                            }
                        }["Home.useMemo[filteredCompetitions].matchesDeadline"]);
                        if (!matchesDeadline) return false;
                    }
                    return true;
                }
            }["Home.useMemo[filteredCompetitions]"]);
        }
    }["Home.useMemo[filteredCompetitions]"], [
        selectedDisciplines,
        selectedPrizes,
        selectedDeadlines
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-arch-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {
                selectedDisciplines: selectedDisciplines,
                setSelectedDisciplines: setSelectedDisciplines,
                selectedPrizes: selectedPrizes,
                setSelectedPrizes: setSelectedPrizes,
                selectedDeadlines: selectedDeadlines,
                setSelectedDeadlines: setSelectedDeadlines,
                onOpenModal: ()=>setIsModalOpen(true),
                language: language,
                setLanguage: setLanguage
            }, void 0, false, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 530,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "ml-[280px] p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-arch-black",
                                children: "Open Competitions"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-arch-black/50 mt-2",
                                children: [
                                    filteredCompetitions.length,
                                    " competition",
                                    filteredCompetitions.length !== 1 ? 's' : '',
                                    " found"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 549,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, this),
                    filteredCompetitions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
                        children: filteredCompetitions.map((competition)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CompetitionCard, {
                                competition: competition,
                                onClick: ()=>setSelectedCompetition(competition)
                            }, competition.id, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 558,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 556,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-arch-black/50",
                                children: "No competitions match your filters."
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 567,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setSelectedDisciplines([]);
                                    setSelectedPrizes([]);
                                    setSelectedDeadlines([]);
                                },
                                className: "mt-4 text-sm font-medium text-arch-black underline hover:text-arch-black/70 transition-colors",
                                children: "Clear all filters"
                            }, void 0, false, {
                                fileName: "[project]/Competition Site/src/app/page.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Competition Site/src/app/page.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailPanel, {
                competition: selectedCompetition,
                onClose: ()=>setSelectedCompetition(null)
            }, void 0, false, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 583,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Competition__Site$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionnaireModal, {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/Competition Site/src/app/page.tsx",
                lineNumber: 589,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Competition Site/src/app/page.tsx",
        lineNumber: 528,
        columnNumber: 5
    }, this);
}
_s1(Home, "apWELV6h0Ktuoy4h34moHj+Afrs=");
_c4 = Home;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Sidebar");
__turbopack_context__.k.register(_c1, "CompetitionCard");
__turbopack_context__.k.register(_c2, "DetailPanel");
__turbopack_context__.k.register(_c3, "QuestionnaireModal");
__turbopack_context__.k.register(_c4, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Competition%20Site_src_0_u_rhi._.js.map