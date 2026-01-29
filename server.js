const express = require('express');
const app = express();

// Get port from environment variable or default to 10000
const PORT = process.env.PORT || 10000;

// Helper function to calculate GCD
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Helper function to calculate LCM
function lcm(a, b) {
    return Math.abs((a * b) / gcd(a, b));
}

// Main endpoint
app.get('/u2004004_student_cuet_ac_bd', (req, res) => {
    const xStr = req.query.x;
    const yStr = req.query.y;

    // Check for missing or empty parameters
    if (!xStr || !yStr || xStr.trim() === '' || yStr.trim() === '') {
        return res.type('text/plain').send('NaN');
    }

    // Parse to numbers
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);

    // Validate: must be natural numbers (positive integers)
    // Check if parsing failed, not a number, not an integer, or not positive
    if (isNaN(x) || isNaN(y) || 
        x.toString() !== xStr.trim() || 
        y.toString() !== yStr.trim() || 
        x <= 0 || y <= 0 ||
        !Number.isInteger(x) || !Number.isInteger(y)) {
        return res.type('text/plain').send('NaN');
    }

    try {
        const result = lcm(x, y);
        
        // Check for overflow or invalid result
        if (!Number.isFinite(result) || result <= 0) {
            return res.type('text/plain').send('NaN');
        }
        
        return res.type('text/plain').send(result.toString());
    } catch (error) {
        return res.type('text/plain').send('NaN');
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
