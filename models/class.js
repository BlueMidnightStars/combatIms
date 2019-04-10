const model = require('./base.js');
class mood extends model {
    constructor(props = 'class') {
        super(props)
    }
}
module.exports = new mood();