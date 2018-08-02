semantic-domains
================
List of semantic domains from [semdom.org](https://semdom.org/), version 4.

    npm install semantic-domains
    yarn add semantic-domains

This package exports an object, which has a `domains` property that is an array of semantic domain objects. Each semantic domain object has the following properties.

- `id: string`: The semantic domain ID. For example, the semantic domain ["Injure"](https://semdom.org/v4/2.5.3) has ID `'2.5.3'`.
- `name: string`: Human-readable name of the semanti domain.
- `parentId: string`: ID of the parent semantic domain. For top-level semantic domains, this string is empty.
- `description: string`: Human-readable description of the semantic domain.
- `examples: string[]`: Array of example words or phrases that fit the semantic domain.

The array of semantic domains is sorted logically by ID.

How to search semantic domains
------------------------------
The default export includes a few functions to search and index semantic domains.

`findAllChildren(id)`: Returns an array of all children, grandchildren, etc. of a semantic domain with the given ID.
`findById(id)`: Finds and returns a semantic domain by ID.
`findChildren(id)`: Returns an array of immediate children of a semantic domain with the given ID.
`findRoots()`: Returns an array of top-level semantic domains.
`buildIndex()`: Returns an hash that includes all semantic domains, keyed by their IDs.

Compatibility
-------------
`semantic-domains` should work on any reasonably recent version of Node.js. It uses ES2015 features like `Array.find`, `Array.filter`, and `Array.reduce`, so you might need a polyfill if you're targeting older browsers. If you don't need the helper functions, you can include the semantic domains data directly using `require('semantic-domains/domains.json')` or `require('semantic-domains/domains.min.json')`.

Building
--------
Build the list of semantic domains directly from the source using `yarn build`.

Test with `yarn test`.

Legal stuff
-----------
This NPM package, as well as the semantic domains themselves, are licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

The semantic domains were parsed from the list available on the [RWC Questinonnaire](http://rapidwords.net/resources/files/rwc-questionnaire). This document is available in the sources/ folder in DOCX format. A HTML-formatted version, which is used to parse the domains, is in the file words.html.

The semantic domain data was modified in order to be machine-readable and convenient to consume in Javascript. No major changes to the content are intended.
