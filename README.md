# Basic Auth0 RBAC setup in React

This is a boilerplate react code for Auth0 authentication, protected components and rbac access.
<br><br>

## Setup walkthrough
### Creating an Auth0 application

The app will be running at localhost:3000, so make sure to set that as login, logout and callback URLs.

### Creating an Auth0 API

Make sure to enable "RBAC" in the settings as well as "Add Permissions" in the Access Token.

### Creating a new rule

Now what we need is to add the assigned roles to the user object since Auth0 doesn't do that by default.
But we can do so at login time by using [rules](https://auth0.com/docs/rules).
Go ahead and create a new one with the following content:

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
### PrivateRoute:

```javascript
<PrivateRoute path="/profile" component={Profile} />
```

This component forces the user to be authenticated to access the specified component.

### Can:

```javascript
<Can
    user={user}
    perform="get:actors, get:movies"
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

Can enables rbac on the frontend, with perfom the required permissions and user the user perfoming the action.

You can add multiple permissions in perform:
```
perform="Role1, Role2, Role3"
```

They will be treated as Role1 or Role2 or Role3, meaning if the user has only one of them it will cause the given component to render.
<br><br>

## Running the project

    yarn start or npm start
<br>

## Sources
- [https://auth0.com/docs/quickstart/spa/react](https://auth0.com/docs/quickstart/spa/react)
- [https://auth0.com/blog/role-based-access-control-rbac-and-react-apps](https://auth0.com/blog/role-based-access-control-rbac-and-react-apps)
<br><br>

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE) file for details.