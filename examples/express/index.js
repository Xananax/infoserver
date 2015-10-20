require('babel/register')({
	ignore:/node_modules\/(?!fs-meta)/
});
require('./app')