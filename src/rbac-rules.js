const rules = {
	Assistant: [ 'get:actors', 'get:movies' ],
	Director: [ 'get:actors', 'get:movies', 'delete:actors', 'patch:actors', 'patch:movies', 'post:actors' ],
	Producer: [
		'get:actors',
		'get:movies',
		'delete:actors',
		'patch:actors',
		'patch:movies',
		'post:actors',
		'post:movies',
		'delete:movies'
	]
};

export default rules;
