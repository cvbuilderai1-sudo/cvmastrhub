const pdf = require('pdf-parse');
console.log('Keys:', Object.keys(pdf));
console.log('Type:', typeof pdf);
try {
    const res = pdf(Buffer.from([]));
    console.log('Called as function');
} catch (e) {
    console.log('Function call failed:', e.message);
}
try {
    const res = new pdf(Buffer.from([]));
    console.log('Called with new');
} catch (e) {
    console.log('New call failed:', e.message);
}
