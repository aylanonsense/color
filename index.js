let convert = {};

function addConversionFunction(inputFormat, outputFormat, func) {
	if (!convert[inputFormat]) {
		convert[inputFormat] = { to: {} };
	}
	convert[inputFormat].to[outputFormat] = func;
}

function mid(a, b, c) {
	if ((a <= b && a >= c) || (a <= c && a >= b)) {
		return a;
	}
	else if ((b <= a && b >= c) || (b <= c && b >= a)) {
		return b;
	}
	else {
		return c;
	}
}

addConversionFunction('rgb', 'hsl', (r, g, b) => {
	// (r, g, b) are integers from 0 to 255 each
	// (h, s, l) are real numbers from 0.0 to 1.0 each

	r /= 255;
	g /= 255;
	b /= 255;

	let min = Math.min(r, g, b);
	let max = Math.max(r, g, b);
	let range = max - min;

	let h = 0;
	let s = 0;
	let l = (max + min) / 2;

	if (min !== max) {
		s = range / (l < 0.5 ? max + min : 2 - max - min);

		let dr = ((( max - r) / 6) + (range / 2)) / range;
		let dg = ((( max - g) / 6) + (range / 2)) / range;
		let db = ((( max - b) / 6) + (range / 2)) / range;

		if (r == max) {
			h = db - dg;
		}
		else if (g === max) {
			h = (1 / 3) + dr - db;
		}
		else if (b === max) {
			h = ( 2 / 3 ) + dg - dr;
		}

		if ( h < 0 ) {
			h += 1
		}
		if ( h > 1 ) {
			h -= 1
		}
	}

	let h2 = mid(0, h, 1);
	let s2 = mid(0, s, 1);
	let l2 = mid(0, l, 1);
	return [ h2, s2, l2, h === h2 && s === s2 && l === l2 ];
});


function hueToRGB(x, y, h) {
	if (h < 0) {
		h += 1;;
	}
	if(h > 1) {
		h -= 1;;
	}
	if (6 * h < 1) {
		return x + (y - x) * 6 * h;
	}
	else if (2 * h < 1) {
		return y;
	}
	else if (3 * h < 2) {
		return x + (y - x) * (2 / 3 - h) * 6;
	}
	else {
		return x;
	}
}

addConversionFunction('hsl', 'rgb', (h, s, l) => {
	// (h, s, l) are real numbers from 0.0 to 1.0 each
	// (r, g, b) are integers from 0 to 255 each

	let r;
	let g;
	let b;

	if (s <= 0) {
		r = Math.round(l * 255);
		g = Math.round(l * 255);
		b = Math.round(l * 255);
	}
	else {
		let x = (l < 0.5 ? l * (1 + s) : (l + s) - (s * l));
		let y = 2 * l - x;
		r = Math.round(255 * hueToRGB(y, x, h + (1 / 3)));
		g = Math.round(255 * hueToRGB(y, x, h));
		b = Math.round(255 * hueToRGB(y, x, h - (1 / 3)));
	}

	let r2 = mid(0, r, 255);
	let g2 = mid(0, g, 255);
	let b2 = mid(0, b, 255);
	return [ r2, g2, b2, r === r2 && g === g2 && b === b2 ];
});
