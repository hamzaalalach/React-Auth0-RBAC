import React, { Fragment } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Redirect } from 'react-router-dom';
import Can from './Can';

const Profile = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return <div>Loading...</div>;
	}

	return (
		<Can
			user={user}
			perform="get:actors"
			yes={() => (
				<Fragment>
					<img src={user.picture} alt="Profile" />
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<code>{JSON.stringify(user, null, 2)}</code>
				</Fragment>
			)}
			no={() => <Redirect to="/" />}
		/>
	);
};

export default Profile;
