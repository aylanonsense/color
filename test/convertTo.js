import expect from 'expect';
import convertTo from '../js/convertTo';

function expectApproximateColor(actual, expected, checkValidity) {
	expect(actual[0]).toBeCloseTo(expected[0], 2);
	expect(actual[1]).toBeCloseTo(expected[1], 2);
	expect(actual[2]).toBeCloseTo(expected[2], 2);
	if (checkValidity) {
		expect(actual[3]).toBeTruthy();
	}
}

function createTest(colorName, rgb, hsl, toHSL) {
	it(`with ${colorName}`, () => {
		if (toHSL) {
			expectApproximateColor(convertTo.hsl.from.rgb(...rgb), hsl, true);
		}
		else {
			expectApproximateColor(convertTo.rgb.from.hsl(...hsl), rgb, true);
		}
	});
}

function createTests(toHSL) {
	return () => {
		createTest('white',			[ 255, 255, 255 ],	[ 0, 0, 1 ],			toHSL);
		createTest('light grey',	[ 200, 200, 200 ],	[ 0, 0, 0.784 ],		toHSL);
		createTest('dark grey',		[ 100, 100, 100 ],	[ 0, 0, 0.392 ],		toHSL);
		createTest('black',			[ 0, 0, 0 ],		[ 0, 0, 0 ],			toHSL);
		createTest('red',			[ 255, 0, 0 ],		[ 0, 1, 0.5 ],			toHSL);
		createTest('green',			[ 0, 255, 0 ],		[ 1 / 3, 1, 0.5 ],		toHSL);
		createTest('blue',			[ 0, 0, 255 ],		[ 2 / 3, 1, 0.5 ],		toHSL);
		createTest('sky blue',		[ 67, 158, 233 ],	[ 0.575, 0.79, 0.588 ],	toHSL);
	};
}

describe('rgb / hsl', () => {
	describe('can convert rgb -> hsl', createTests(true));
	describe('can convert hsl -> rgb', createTests(false));
});