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
// Natural numbers are positive integers: 1, 2, 3, ...
// Accept ONLY pure digit strings representing numbers > 0
function isValidNaturalNumber(str) {
    // Must be a string
    if (typeof str !== 'string') return false;
    
    // Must not be empty
    if (str.length === 0) return false;
    
    // Must contain ONLY digits (no spaces, signs, or other characters)
    if (!/^\d+$/.test(str)) return false;
    
    // Must not have leading zeros (unless it's just "0")
    if (str.length > 1 && str[0] === '0') return false;
    
    // Must not be "0" (natural numbers start from 1)
    if (str === '0') return false;
    
    return true;
}

// Main endpoint
app.get('/u2004004_student_cuet_ac_bd', (req, res) => {
    const xStr = req.query.x;
    const yStr = req.query.y;

    // Check for missing parameters (undefined means not provided at all)
    if (xStr === undefined || yStr === undefined) {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        return res.send('NaN');
    }

    // Validate both inputs are valid natural numbers (strict validation)
    if (!isValidNaturalNumber(xStr) || !isValidNaturalNumber(yStr)) {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        return res.send('NaN');
    }

    try {
        // Convert to BigInt (no need to clean, already validated)
        const x = BigInt(xStr);
        const y = BigInt(yStr);
        
        // Calculate LCM
        const result = lcm(x, y);
        
        // Convert to string (plain digits only)
        const resultStr = result.toString();
        
        // Send plain text response
        res.set('Content-Type', 'text/plain; charset=utf-8');
        return res.send(resultStr);
    } catch (error) {
        // Catch any errors
        res.set('Content-Type', 'text/plain; charset=utf-8');
        return res.send('NaN');
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
