import rules from '../../rbac-rules';
import config from '../../auth_config.json';

const check = (rules, user, actions) => {
	if (!user) return false;

	const role = user[config.roleUrl];
	const permissions = rules[role];

	if (!permissions) {
		return false;
	}

	if (permissions) {
		const actionsList = actions.split(', ');
		for (const action in actionsList) {
			if (permissions.includes(actionsList[action])) {
				return true;
			}
		}
	}
	return false;
};

const Can = props => (check(rules, props.user, props.perform, props.data) ? props.yes() : props.no());

Can.defaultProps = {
	yes: () => null,
	no: () => null
};

export default Can;
