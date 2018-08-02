const domains = require('./domains.min.json');
module.exports = {
    domains: domains,

    findAllChildren: id => domains.filter(d => d.id.startsWith(id + '.')),
    findById: id => domains.find(d => d.id === id),
    findChildren: id => domains.filter(d => d.parentId === id),
    findRoots: () => domains.filter(d => /^\d+$/.test(d.id)),

    buildIndex: () => domains.reduce((acc, d) => { acc[d.id] = d; return acc; }, {}),
};
