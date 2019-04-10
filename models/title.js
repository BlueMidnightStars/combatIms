const model = require('./base.js');
class mood extends model {
    constructor(props = 'title') {
        super(props)
    }
}
module.exports = new mood();