const rules = {
	Assistant: {
		static: [ 'get:actors', 'get:movies' ]
	},
	Director: {
		static: [ 'get:actors', 'get:movies', 'delete:actors', 'patch:actors', 'patch:movies', 'post:actors' ]
	},
	Producer: {
		static: [
			'get:actors',
			'get:movies',
			'delete:actors',
			'patch:actors',
			'patch:movies',
			'post:actors',
			'post:movies',
			'delete:movies'
		]
	}
};

export default rules;
