// config.js
// The Central Command for DouweDoesDesign Workflow Tool

const CONFIG = {
    // --- FEATURE FLAGS (The "Kill Switches") ---
    ENABLE_DIRECT_API: true,      // Set to FALSE to hide "Try It Now" buttons
    ENABLE_USER_ACCOUNTS: true,   // Set to FALSE to hide Login/Save buttons
    ENABLE_AFFILIATE_LINKS: true, // Set to FALSE to use standard links only
    ENABLE_LOGGING: false,        // Set to TRUE to see debug info in Console
    
    // --- REGIONAL SETTINGS ---
    REGION: 'EU',                 // 'EU', 'US', 'ASIA' (Affects privacy logic)
    CURRENCY: '€',                // Change to '$' or '£'
    
    // --- LIMITS ---
    MAX_SAVE_SLOTS: 3,            // Free user limit
    CACHE_EXPIRY_HOURS: 24,       // Local storage wipe time
    
    // --- API ENDPOINTS (Safe to store public endpoints here) ---
    ENDPOINTS: {
        OPENAI: "https://api.openai.com/v1/chat/completions",
        // Do NOT put API Keys here!
    }
};

// Prevent accidental modification
Object.freeze(CONFIG);