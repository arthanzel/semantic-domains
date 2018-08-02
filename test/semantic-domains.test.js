const sd = require('..');

test('Lists semantic domains', () => {
    expect(Array.isArray(sd.domains)).toBe(true);
    expect(sd.domains).toHaveLength(1792);
});

test('buildIndex()', () => {
    const domains = sd.buildIndex();
    expect(domains['1']).toBe(sd.domains.find(d => d.name === 'Universe, creation'));
    expect(domains['2.3.2.1']).toBe(sd.domains.find(d => d.name === 'Listen'));
    expect(Object.keys(domains)).toHaveLength(1792);
});

test('findAllChildren()', () => {
    expect(sd.findAllChildren('1')).toHaveLength(105);
    expect(sd.findAllChildren('2')).toHaveLength(136);
    expect(sd.findAllChildren('1.6.1')).toHaveLength(21);
    expect(sd.findAllChildren('1.1.1.1.1.1.1')).toEqual([]);
    expect(sd.findAllChildren()).toEqual([]);
});

test('findById()', () => {
    expect(sd.findById('1')).toBe(sd.domains.find(d => d.name === 'Universe, creation'));
    expect(sd.findById('2.3.2.1')).toBe(sd.domains.find(d => d.name === 'Listen'));
    expect(sd.findById('1.1.1.1.1.1.1')).toBe(undefined);
    expect(sd.findById()).toBe(undefined);
});

test('findChildren()', () => {
    expect(sd.findChildren('1')).toHaveLength(7);
    expect(sd.findChildren('1.6.1')).toHaveLength(9);
    expect(sd.findChildren('1.1.1.1.1.1.1')).toEqual([]);
    expect(sd.findChildren()).toEqual([]);
});

test('findRoots()', () => {
    expect(sd.findRoots()).toHaveLength(9);
});

test('Can require json directly', () => {
    const full = require('../domains.json');
    expect(Array.isArray(full)).toBe(true);
    expect(full).toHaveLength(1792);

    const min = require('../domains.min.json');
    expect(Array.isArray(min)).toBe(true);
    expect(min).toHaveLength(1792);
});