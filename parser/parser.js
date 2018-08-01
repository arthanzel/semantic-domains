const fs = require('fs');

const cheerio = require('cheerio');
const R = require('ramda');

const arrayComparator = require('./arrayComparator');

const output = [];

const fullHtml = fs.readFileSync(process.argv[2]);
const $ = cheerio.load(fullHtml);

const headings = $('h2')
    .filter((i, el) => $(el).text().trim() !== '')
    .toArray();

console.log('Parsed list of domains');

for (const heading of headings) {
    const $h = $(heading);
    const domain = {};
    domain.id = headingId($h);
    domain.name = headingText($h);

    // Remove the last number in the ID, then remove trailing dot.
    domain.parentId = domain.id.replace(/\d+$/, '').replace(/\.$/, '');

    console.log('Processing', domain.id, domain.name);

    const children = nextUntil($h, 'h2');

    domain.description = getDescription(children);
    domain.examples = getExamples(children);

    output.push(domain);
}

// Sort by ID
console.log("Sorting by ID");
output.sort((a, b) => arrayComparator(a.id, b.id));

fs.writeFileSync('./domains.json', JSON.stringify(output, null, 4));
fs.writeFileSync('./domains.min.json', JSON.stringify(output));

function headingId(h) {
    return $(h).text().trim().split(' ')[0];
}

function headingText(h) {
    return $(h).text().trim().substr(headingId(h).length + 1);
}

function getDescription(children) {
    return sanitize(children
        .filter('.descr')
        .first()
        .text()
    );
}

function getExamples(children) {
    /**
     * What the fuck is that ugly regular expression in this method?
     * Answer: It matches commas that are not in parentheses.
     * 
     * /\,\s?(?![^\(]*\))/
     * \,       Matches a comma.
     * \s?      Matches zero or more whitespace characters.
     *          Multiple spaces can't appear because the input is sanitize()'d before processing.
     * (?!      Negative lookahead. If the thing inside the lookahead matches, the result is
     *          discarded.
     * [^\(]*   Matches anything that's not an opening paren zero or more times.
     * \)       Matches a closing paren.
     * )        End negative lookahead
     * 
     * So, if a comma is followed by `)` before `(`, it must be within parens and will be rejected.
     * This regex can't handle nested parens, because strings with nested parens aren't regular.
     * However, the language that we are parsing only has single levels or parens, so it's OK.
     */

    const words = children
        .filter('.words')
        .map((idx, el) => $(el).text())
        .get();

    return R.pipe(
        R.map(sanitize),
        R.map(s => s.split(/\,\s?(?![^\(]*\))/)),
        R.flatten,
        R.map(s => s.trim()),
        R.filter(R.identity),
        R.uniq,
    )(words);    
}

function nextUntil(element, selector) {
    let elements = $();
    for (let n = $(element).next(); !n.is(`${ selector }, *:last-child`); n = n.next()) {
        elements = elements.add(n);
    }
    return elements;
}

function sanitize(str) {
    return str
        // Retain only ASCII symbols
        .replace(/[^\x00-\x7F]/g, '')

        // Reduce consecutive whitespace to a single space
        .replace(/\s+/g, ' ')

        // Remove whitespace from ends
        .trim();
}
