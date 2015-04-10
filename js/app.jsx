var React = require('react');
var _ = require('lodash');
var Faker = require('Faker');

var Databound = require('databound');
Databound.API_URL = 'https://databound-backend-app.herokuapp.com';

var User = new Databound('/users');

var App = React.createClass({
  getInitialState: function() {
    this.getUsers();

    return {
      users: [],
      new_user_name: Faker.Name.firstName(),
      new_user_city: Faker.Address.city()
    };
  },
  getUsers: function() {
    var _this = this;

    User.all().then(function(users) {
      _this.setState({ users: users });
    });
  },
  changeNewUserName: function(event) {
    this.setState({ new_user_name: event.target.value });
  },
  changeNewUserCity: function(event) {
    this.setState({ new_user_city: event.target.value });
  },
  createUser: function() {
    var _this = this;

    User.create({
      name: this.state.new_user_name,
      city: this.state.new_user_city
    }).then(function(user) {
      _this.setState({
        new_user_name: Faker.Name.firstName(),
        new_user_city: Faker.Address.city()
      });

      _this.getUsers();
    });
  },
  render: function() {
    return (
      <div>
        <ul>
          {_.map(this.state.users, function(user) {
            return <li key={user.id}>User: {user.name} from {user.city}</li>
          })}
        </ul>

        <div>
          <input
            value={this.state.new_user_name}
            onChange={this.changeNewUserName}
          />
          <input
            value={this.state.new_user_city}
            onChange={this.changeNewUserCity}
          />

          <button onClick={this.createUser}>Create</button>
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.body);
