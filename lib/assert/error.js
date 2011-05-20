var stylize = require('vows/console').stylize;
var inspect = require('vows/console').inspect;

require('assert').AssertionError.prototype.toString = function () {
    var that = this,
        source = this.stack.match(/([a-zA-Z0-9._-]+\.js)(:\d+):\d+/);

    function parse(str) {
        return str.replace(/{actual}/g,   inspect(that.actual)).
                   replace(/{operator}/g, stylize(that.operator, 'bold')).
                   replace(/{expected}/g, (that.expected instanceof Function)
                                          ? that.expected.name
                                          : inspect(that.expected));
    }

    if (this.message) {
        return stylize(parse(this.message), stylize.colors.broken) +
               stylize(' // ' + source[1] + source[2], stylize.colors.source);
    } else {
        return stylize([
            this.expected,
            this.operator,
            this.actual
        ].join(' '), stylize.colors.broken);
    }
};

