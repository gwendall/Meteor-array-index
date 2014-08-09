Package.describe({
	summary: "Unique indexes for arrays"
});

Package.on_use(function (api, where) {
	if (api.export) {
		api.use([
			'underscore', 
			'ui', 
			'deps',
			'collection-hooks'
		], ['client', 'server']);
		api.export('arrayIndex', ['client', 'server']);
	}
	api.add_files('export.js', ['client', 'server']);
});

Package.on_test(function(api){
});