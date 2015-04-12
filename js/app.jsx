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
      new_name: Faker.Name.findName()
    };
  },
  getUsers: function() {
    var _this = this;

    User.all().then(function(users) {
      _this.setState({ users: users.reverse() });
    });
  },
  changeNewUserName: function(event) {
    this.setState({ new_name: event.target.value });
  },
  addUser: function() {
    var _this = this;

    User.create({
      name: this.state.new_name
    }).then(function(user) {
      _this.setState({
        new_name: Faker.Name.findName()
      });

      _this.getUsers();
    });
  },
  render: function() {
    return (
      <div className='container col-md-6 col-md-offset-3'>
        <header className='row alert alert-info'>
          <div className='text-center'>
            This is a static website hosted on closeheat that connects to Heroku
            for the API.
          </div>

          <div className='text-center'>
            <div>
              <a className='btn btn-xs btn-primary' target='_blank'
                href='https://github.com/closeheat/template-databound/blob/master/js/app.jsx'>

                Frontend code
              </a>
              <a className='deploy-frontend btn btn-xs' target='_blank'
                href='http://app.closeheat.com/apps/template?github=closeheat/template-databound'>

                Deploy own copy of frontend to closeheat
              </a>
            </div>

            <div>
              <a className='btn btn-xs btn-primary' target='_blank'
                href='https://github.com/closeheat/databound_backend_app/commit/a5470c62a90cfebc70bd2e6b61d173861eb8ac34'>

                Backend code
              </a>
              <a className='deploy-backend btn btn-xs' target='_blank'
                href='https://heroku.com/deploy?template=https://github.com/closeheat/databound_backend_app'>

                Deploy own copy of backend to Heroku
              </a>
            </div>
          </div>
        </header>

        <main className='text-center'>
          <h1>Coolest developers from all over the world</h1>
          <div className='form-inline'>
            <input
              className='form-control'
              value={this.state.new_name}
              onChange={this.changeNewUserName}
            />
            <button className='btn btn-primary' onClick={this.addUser}>
              Add
            </button>
          </div>

          <ul>
            {_.map(this.state.users, function(user) {
              return (
                <li className='text-left' key={user.id}>
                  <img src='img/avatar.png' />
                  {user.name}
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    );
  }
});

React.render(<App/>, document.body);
