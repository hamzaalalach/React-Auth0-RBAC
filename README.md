# Basic Auth0 RBAC setup in React

This is a boilerplate react code for Auth0 authentication, protected components and rbac access.

## Setup walkthrough
### Create an Auth0 application

The app will be running at localhost:3000, so make sure to set that as login, logout and callback URL.

### Create an Auth0 API

Make sure to enable RBAC in the settings as well as Add Permissions in the Access Token.

### Create a new rule with the following content

```javascript
    function (user, context, callback) {
        user.app_metadata = user.app_metadata || {};
        
        user.app_metadata.role = (context.authorization || {}).roles;

        auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
            .then(() => {
                context.idToken['http://localhost/roles'] = user.app_metadata.role[0];
                callback(null, user, context);
            })
            .catch((err) => {
                callback(err);
            });
    }
```

Feel free to change localhost in `'http://localhost/roles'` to whatever your host is.

What this basically does is set the assigned user role to the users object at login time.

### App config

- All of the configuration variables are in `auth_config.json`:
```json
{
  "domain": "Your auth0 domain",
  "clientId": "Your app's clientId",
  "roleUrl": "http://localhost/roles"
}
```

- You also need to let the frontend know what roles you have set up on your Auth0 account, and which permissions is assigned to them, this is done in `rbac-rules.js` file.

## Available components
### PrivateRoute

```javascript
	<PrivateRoute path="/profile" component={Profile} />
```

This component forces the user to be authenticated to access the specified component.

### Can

```javascript
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
```

Can enables rbac on the frontend, with perfom the required permission and user the user perfoming the action.

## Running the project

    yarn start or npm start

## Sources
- [https://auth0.com/docs/quickstart/spa/react](https://auth0.com/docs/quickstart/spa/react)
- [https://auth0.com/blog/role-based-access-control-rbac-and-react-apps](https://auth0.com/blog/role-based-access-control-rbac-and-react-apps)

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE) file for details.