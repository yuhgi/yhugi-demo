describe('A suit is just a function', () => {
    var a;
    it('and so is spec', () => {
        a = true;
        expect(a).toEqual(true);
    });
});

describe('The "toBe" matcher compares with ===', () => {
    it('and has a positive case', () => {
        expect(true).toBe(true);
    });
    it('and can have a negative case', () => {
        expect(false).not.toBe(true);
    });
});

describe('Included matchers:', () => {
    it('The "toBe" matcher compares with ===', () => {
        var a = 12;
        var b = a;
        var c = {};
        var d = c;
        expect(a).toBe(b);
        expect(a).not.toBe(null);
        expect(c).toBe(d);
        expect(c).not.toBe({});
        expect(NaN).not.toBe(NaN);
        expect(undefined).toBe(undefined);
        expect(null).toBe(null);
    });
    describe('The "toEqual" matcher', () => {
        it('works for simple literals and variables', () => {
            var a = 12;
            expect(a).toEqual(12);
        });
        it('should work for objects', () => {
            var foo = {
                a: 12, b: 34
            };
            var bar = {
                a: 12, b: 34
            };
            expect(foo).toEqual(bar);
        });
        it('compares with ==', () => {
            expect(undefined).not.toEqual(null);
        });
    });
    it('The "toMatch" matcher is for regular expressions', () => {
        var message = 'foo bar baz';
        expect(message).toMatch(/bar/);
        expect(message).toMatch('bar');
        expect(message).not.toBe(/quux/);
    });
    it('The "toBeDefined" matcher compares against `undefined`', () => {
        var a = {
            foo: 'foo'
        };
        expect(a.foo).toBeDefined();
        expect(a.bar).not.toBeDefined();
        expect(null).toBeDefined();
        expect(undefined).not.toBeDefined();
        expect(NaN).toBeDefined();
    });

    it('The "toBeUndefined" matcher compares against `undefined`', () => {
        var a = {
            foo: 'foo'
        };
        expect(a.foo).not.toBeUndefined();
        expect(a.bar).toBeUndefined();
        expect(undefined).toBeUndefined();
    });

    it('The "toBeNull" matcher compares against null', () => {
        var a = null;
        var foo = 'foo';
        expect(null).toBeNull();
        expect(a).toBeNull();
        expect(foo).not.toBeNull();
    });

    it('The "toBeNaN" matcher compares against NaN', () => {
        var a = NaN;
        var foo = 'foo';
        expect(NaN).toBeNaN();
        expect(a).toBeNaN();
        expect(foo).not.toBeNaN();
    });

    it('The "toBeTruthy" matcher is for boolean casting testing', () => {
        var a, foo = 'foo';
        expect(foo).toBeTruthy();
        expect(a).not.toBeTruthy();
        expect(null).not.toBeTruthy();
        expect(false).not.toBeTruthy();
        expect('').not.toBeTruthy();
        expect(undefined).not.toBeTruthy();
        expect(0).not.toBeTruthy();
        expect('').not.toBeTruthy();
        expect('0').toBeTruthy();
        expect([]).toBeTruthy();
    });

    it('The "toBeFalsy" matcher is for boolean casting testing', () => {
        var a, foo = 'foo';
        expect(foo).not.toBeFalsy();
        expect(a).toBeFalsy();
        expect(null).toBeFalsy();
        expect(false).toBeFalsy();
        expect('').toBeFalsy();
        expect(undefined).toBeFalsy();
        expect(0).toBeFalsy();
        expect('').toBeFalsy();
        expect('0').not.toBeFalsy();
        expect([]).not.toBeFalsy();
    });

    describe('The "toContain" matcher', () => {
        it('works for finding an item in Array', () => {
            var a = ['foo', 'bar', 'baz'];
            expect(a).toContain('bar');
            expect(a).not.toContain('quux');
        });
        it('also works for finding a substring', () => {
            var a = 'foo bar baz';
            expect(a).toContain('bar');
            expect(a).not.toContain('quux');
        });
    });

    it('The "toBeLessThan" matcher is for mathematical comparisons', () => {
        var pi = 3.1415926;
        var e = 2.78;
        expect(e).toBeLessThan(pi);
        expect(pi).not.toBeLessThan(e);
    });

    it('The "toBeGreaterThan" matcher is for mathematical comparisons', () => {
        var pi = 3.1415926;
        var e = 2.78;
        expect(e).not.toBeGreaterThan(pi);
        expect(pi).toBeGreaterThan(e);
    });

    it('The "toBeCloseTo" matcher is for precision match comparison', () => {
        var pi = 3.1415926;
        var e = 2.78;
        expect(pi).not.toBeCloseTo(e, 2);
        expect(pi).toBeCloseTo(e, 0);
    });

    it('The "toThrow" matcher is for testing if a function throws an exception', () => {
        var foo = function () {
            return 1 + 2;
        };
        var bar = function () {
            return a + 1;
        };
        var baz = function () {
            throw new Error('what');
        };
        var quux = function () {
            throw 'what';
        };
        expect(foo).not.toThrow();
        expect(bar).toThrow();
        expect(baz).toThrow(Error('what'));
        expect(quux).toThrow('what');
    });

    it('The "toThrowError" matcher is for testing a specific thrown exception', () => {
        var foo = function () {
            throw new TypeError('foo bar baz');
        };
        expect(foo).toThrowError('foo bar baz');
        expect(foo).toThrowError(/bar/);
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, 'foo bar baz');
        expect(foo).toThrowError(TypeError, /foo/);
    });
});

describe('A spec using the fail function', () => {
    var foo = function (x, callback) {
        if (x) {
            callback();
        }
    };
    it('should not call the callback', () => {
        var a = false;
        foo(a, () => {
            fail('Callback has been called');
        });
    });
});

describe('A spec', () => {
    it('is just a function, so it can contain any code', () => {
        var foo = 0;
        foo++;
        expect(foo).toBe(1);
    });

    it('can have more than one expectation', () => {
        var foo = 0;
        foo += 1;
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});

describe('A spec using beforeEach and afterEach', () => {
    var foo = 0;
    beforeEach(() => {
        foo += 1;
    });
    afterEach(() => {
        foo = 0;
    });
    it('is just a function, so it can contain any code', () => {
        expect(foo).toEqual(1);
    });
    it('can have more than one expectation', () => {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});

describe('A spec using beforeAll and afterAll', () => {
    var foo;
    beforeAll(() => {
        foo = 1;
    });
    afterAll(() => {
        foo = 0;
    });
    it('sets the initial value of foo before specs run', () => {
        expect(foo).toEqual(1);
        foo += 1;
    });
    it('does not reset foo between specs', () => {
        expect(foo).toEqual(2);
    });
});

// WARN: When use arrow function, this is `ambiguous`
describe('A spec', () => {
    beforeEach(function () {
        this.foo = 0;
    });
    it('can use the `this` to share state', function () {
        expect(this.foo).toEqual(0);
        this.bar = 'tst pollution?';
    });
    it('prevent test pollution by having an empty `this` created for the next spec', function () {
        expect(this.foo).toEqual(0);
        expect(this.bar).toBeUndefined();
    });
});

describe('A spec', () => {
    var foo;
    beforeEach(() => {
        foo = 0;
        foo += 1;
    });
    afterEach(() => {
        foo = 0;
    });
    it('is just a function, so it can contain any code', () => {
        expect(foo).toEqual(1);
    });

    it('can have more than one expectation', () => {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });

    describe('nested inside a second describe', () => {
        var bar;
        beforeEach(() => {
            bar = 1;
        });
        it('can reference both scopes as needed', () => {
            expect(foo).toEqual(bar);
        });
    });

});

xdescribe('A disabled suite', () => {
    var foo;
    beforeEach(() => {
        foo = 0;
        foo += 1;
    });

    it('is just a function, so it can contain any code', () => {
        expect(foo).toEqual(1);
    });
});

describe('Pending specs', () => {
    xit('can be declared "xit"', () => {
        expect(true).toBe(false);
    });
    it('can be declared with "it" but without a function');

    it('can be declared by calling "pending" in the spec body', () => {
        expect(true).toBe(true);
        pending('this is why it is pending');
    });
});

describe('A spy', () => {

});


describe('Asynchronous specs', () => {
    var value;
    beforeEach((done) => {
        setTimeout(function () {
            value = 0;
            done();
        }, 1);
    });
    it('should support async execution of test preparation and expectations', (done) => {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });

    describe('long asynchronous specs', () => {
        beforeEach((done) => {
            done();
        }, 1000);
        it('takes a long time',  (done) => {
            setTimeout( () => {
                done();
            }, 1000);
        }, 2000);

        afterEach( (done) => {
            done();
        }, 1000);
    });
    
    describe('A spec using done.fail',() => {
        var foo = function(x,callback1,callback2){
            if(x){
                setTimeout(() => {
                    callback1();
                }, 0);
            }else{
                setTimeout(() => {
                    callback2();
                }, 0);
            }
        };

        it('should not call the second callback',(done) => {
            foo(true,done,() => {
                done.fail('Second callback had been called');
            });
        });
    });
});