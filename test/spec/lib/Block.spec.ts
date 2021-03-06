﻿import sinonChai = require('../../sinon-chai');
var expect = sinonChai.expect;
import Blink = require('../../../lib/Blink');


var config = Blink.config;
var newline = config.newline;

// ReSharper disable WrongExpressionStatement
describe('Block', () => {

	it('compiles a block', () => {
		var block = new Blink.Block('a', { b: 'c' });
		expect(block.compile(config)).to.eq([
			'.a {',
			'  b: c;',
			'}'
		].join(newline) + newline);
	});

	it('compiles a block with elements', () => {
		var block = new Blink.Block('a', {
			b: 'c',
			elements: [
				new Blink.Element('d', {
					e: 'f'
				}),
				new Blink.Element('g', {
					h: 'i'
				})
			]
		});
		expect(block.compile(config)).to.eq([
			'.a {',
			'  b: c;',
			'}',
			'',
			'.a__d {',
			'  e: f;',
			'}',
			'',
			'.a__g {',
			'  h: i;',
			'}'
		].join(newline) + newline);
	});

	it('compiles a block with modifiers', () => {
		var block = new Blink.Block('a', {
			b: 'c',
			modifiers: [
				new Blink.Modifier('d', {
					e: 'f'
				}),
				new Blink.Modifier('g', {
					h: 'i'
				})
			]
		});
		expect(block.compile(config)).to.eq([
			'.a {',
			'  b: c;',
			'}',
			'',
			'.a--d {',
			'  e: f;',
			'}',
			'',
			'.a--g {',
			'  h: i;',
			'}'
		].join(newline) + newline);
	});

	it('compiles a block with elements and modifiers', () => {
		var block = new Blink.Block('a', {
			b: 'c',
			elements: [
				new Blink.Element('d', {
					e: 'f'
				}),
				new Blink.Element('g', {
					h: 'i'
				})
			],
			modifiers: [
				new Blink.Modifier('j', {
					k: 'l'
				}),
				new Blink.Modifier('m', {
					n: 'o'
				})
			]
		});
		expect(block.compile(config)).to.eq([
			'.a {',
			'  b: c;',
			'}',
			'',
			'.a__d {',
			'  e: f;',
			'}',
			'',
			'.a__g {',
			'  h: i;',
			'}',
			'',
			'.a--j {',
			'  k: l;',
			'}',
			'',
			'.a--m {',
			'  n: o;',
			'}'
		].join(newline) + newline);
	});

	it('compiles a block with an element that has a modifier', () => {
		var block = new Blink.Block('a', {
			b: 'c',
			elements: [
				new Blink.Element('d', {
					e: 'f',
					modifiers: [
						new Blink.Modifier('g', {
							h: 'i'
						})
					]
				})
			]
		});
		expect(block.compile(config)).to.eq([
			'.a {',
			'  b: c;',
			'}',
			'',
			'.a__d {',
			'  e: f;',
			'}',
			'',
			'.a__d--g {',
			'  h: i;',
			'}'
		].join(newline) + newline);
	});

	it('compiles a block with a modifier that has an element', () => {
		var block = new Blink.Block('a', {
			b: 'c',
			modifiers: [
				new Blink.Modifier('d', {
					e: 'f',
					elements: [
						new Blink.Element('g', {
							h: 'i'
						})
					]
				})
			]
		});
		expect(block.compile(config)).to.eq([
			'.a {',
			'  b: c;',
			'}',
			'',
			'.a--d {',
			'  e: f;',
			'}',
			'',
			'.a--d__g {',
			'  h: i;',
			'}'
		].join(newline) + newline);
	});

});
