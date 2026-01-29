const express = require('express');
const app = express();

// Get port from environment variable or default to 10000
const PORT = process.env.PORT || 10000;

// Helper function to calculate GCD using BigInt
function gcd(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Helper function to calculate LCM using BigInt
function lcm(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    if (a === 0n || b === 0n) return 0n;
    return (a * b) / gcd(a, b);
}

// Helper to validate if string is a valid natural number
function isValidNaturalNumber(str) {
    // Check if empty or contains only whitespace
    if (!str || str.trim() === '') return false;
    
    const trimmed = str.trim();
    
    // Check for non-digit characters (except leading +)
    if (!/^\+?\d+$/.test(trimmed)) return false;
    
    // Remove optional leading +
    const cleaned = trimmed.startsWith('+') ? trimmed.slice(1) : trimmed;
    
    // Check for leading zeros (except "0" itself)
    if (cleaned.length > 1 && cleaned.startsWith('0')) return false;
    
    // Check if it's zero (not a natural number)
    if (cleaned === '0') return false;
    
    return true;
}

// Main endpoint
app.get('/u2004004_student_cuet_ac_bd', (req, res) => {
    const xStr = req.query.x;
    const yStr = req.query.y;

    // Check for missing parameters
    if (xStr === undefined || yStr === undefined) {
        return res.type('text/plain').send('NaN');
    }

    // Validate both inputs are valid natural numbers
    if (!isValidNaturalNumber(xStr) || !isValidNaturalNumber(yStr)) {
        return res.type('text/plain').send('NaN');
    }

    try {
        // Clean the strings (remove leading + if present)
        const xCleaned = xStr.trim().replace(/^\+/, '');
        const yCleaned = yStr.trim().replace(/^\+/, '');
        
        // Convert to BigInt
        const x = BigInt(xCleaned);
        const y = BigInt(yCleaned);
        
        // Double-check they are positive (natural numbers)
        if (x <= 0n || y <= 0n) {
            return res.type('text/plain').send('NaN');
        }
        
        // Calculate LCM
        const result = lcm(x, y);
        
        // Check for invalid result
        if (result <= 0n) {
            return res.type('text/plain').send('NaN');
        }
        
        return res.type('text/plain').send(result.toString());
    } catch (error) {
        // Catch any BigInt conversion errors or overflow
        return res.type('text/plain').send('NaN');
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
