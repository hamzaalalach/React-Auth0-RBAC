import rules from '../rbac-rules';
import config from '../auth_config.json';

const check = (rules, user, action, data) => {
	const role = user[config.roleUrl];
	const permissions = rules[role];
	if (!permissions) {
		return false;
	}

	const staticPermissions = permissions.static;

	if (staticPermissions && staticPermissions.includes(action)) {
		return true;
	}
	return false;
};

const Can = (props) => (check(rules, props.user, props.perform, props.data) ? props.yes() : props.no());

Can.defaultProps = {
	yes: () => null,
	no: () => null
};

export default Can;
