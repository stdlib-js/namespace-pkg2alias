/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var aliases = require( '@stdlib/namespace-aliases' );
var alias2pkg = require( '@stdlib/namespace-alias2pkg' );
var alias2standalone = require( '@stdlib/namespace-alias2standalone' );
var DATA = require( './../data/data.json' );
var pkg2alias = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pkg2alias, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided a string', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			pkg2alias( value );
		};
	}
});

tape( 'the function returns an alias', function test( t ) {
	var expected;
	var actual;
	var list;
	var pkg;
	var i;

	list = aliases();
	for ( i = 0; i < list.length; i++ ) {
		pkg = alias2pkg( list[i] );
		expected = DATA[ pkg ];
		actual = pkg2alias( pkg );
		t.strictEqual( typeof actual, 'string', 'returns a string' );
		t.strictEqual( actual, expected, 'returns expected value for '+pkg );
	}
	t.end();
});

tape( 'the function supports providing a standalone package name', function test( t ) {
	var expected;
	var actual;
	var list;
	var pkg;
	var i;

	list = aliases();
	for ( i = 0; i < list.length; i++ ) {
		pkg = alias2standalone( list[i] );
		expected = DATA[ alias2pkg( list[i] ) ];
		actual = pkg2alias( pkg );
		t.strictEqual( typeof actual, 'string', 'returns a string' );
		t.strictEqual( actual, expected, 'returns expected value for '+pkg );
	}
	t.end();
});

tape( 'the function returns `null` if provided an unrecognized package name', function test( t ) {
	var values;
	var i;

	values = [
		'adfkaljdfdsafs',
		'adklfadjflajdslfjalsdf',
		'adflkajdlkfjasdlkfjsadlkfjlasdjflsdjfla'
	];
	for ( i = 0; i < values.length; i++ ) {
		t.strictEqual( pkg2alias( values[ i ] ), null, 'returns expected value' );
	}
	t.end();
});
