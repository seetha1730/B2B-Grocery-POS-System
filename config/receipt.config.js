const receipt = require('receipt');
receipt.config.currency = '$'; // The currency symbol to use in output.
receipt.config.width = 50;     // The amount of characters used to give the output a "width".
receipt.config.ruler = '=';    // The character used for ruler output.

const output = receipt.create([
    { type: 'text', value: [
        'MY AWESOME STORE',
        '123 STORE ST',
        'store@store.com',
        'www.store.com'
    ], align: 'center' },
    { type: 'empty' },
    { type: 'properties', lines: [
        { name: 'Order Number', total: '' },
        { name: 'Date', value: 'XX/XX/XXXX XX:XX' }
    ] },
    { type: 'table', lines: [
        { item: 'Product 1', qty: 1, cost: 1000 },
        { item: 'Product 2 with a really long name', qty: 1, cost: 17500, discount: { type: 'absolute', value: 1000 } },
        { item: 'Another product wth quite a name', qty: 2, cost: 900 },
        { item: 'Product 4', qty: 1, cost: 80, discount: { type: 'percentage', value: 0.15 } },
        { item: 'This length is ridiculously lengthy', qty: 14, cost: 8516 },
        { item: 'Product 6', qty: 3, cost: 500 },
        { item: 'Product 7', qty: 3, cost: 500, discount: { type: 'absolute', value: 500, message: '3 for the price of 2' } }
    ] },
    { type: 'empty' },
    { type: 'text', value: 'Some extra information to add to the footer of this docket.', align: 'center' },
    { type: 'empty' },
    { type: 'properties', lines: [
        { name: 'GST (10.00%)', value: 'Dollar XX.XX' },
        { name: 'Total amount (excl. Tax)', value: 'AUD XX.XX' },
        { name: 'Total amount (incl. Tax)', value: 'AUD XX.XX' }
    ] },
    { type: 'empty' },
    { type: 'properties', lines: [
        { name: 'Amount Received', value: 'AUD XX.XX' },
        { name: 'Amount Returned', value: 'AUD XX.XX' }
    ] },
    { type: 'empty' },
    { type: 'text', value: 'Final bits of text at the very base of a docket. This text wraps around as well!', align: 'center', padding: 5 }
]); 



module.exports.output = output;