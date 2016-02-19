import express                   from 'express';
import mongoose                  from 'mongoose';
import passport                  from 'passport';
import Strategy                  from 'passport-local';
import cookieParser              from 'cookie-parser';
import bodyParser                from 'body-parser';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from 'routes';
import { Provider }              from 'react-redux';
import reducers                  from 'reducers';
import promiseMiddleware         from 'lib/promiseMiddleware';
import fetchComponentData        from 'lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import path                      from 'path';
import {MongoClient} from 'mongodb';
import Account  from './shared/models/account';
import flash                     from 'connect-flash';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}
mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'static')));

passport.use(new Strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/autoriz', require('./shared/server/autorization'));
app.use('/data', require('./shared/server/data'));

app.get('/test', (req, res) => {
  Account.register(new Account({username: "test"}), "test", (data) => {
    res.json(data)
  })
})

app.all('/notes', function(req, res, next){
  req.isAuthenticated()
      ? next()
      : res.redirect('/');
})
app.all('/', function(req, res, next){
  req.isAuthenticated()
      ? res.redirect('/notes')
      : next();
})
app.use((req, res) => {

  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {
      const InitialView = (
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Redux Demo</title>

              <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
              </script>
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
              <link href="css/style.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
              <div id="react-view" class="container">${componentHTML}</div>
              <script type="application/javascript" src="/bundle.js"></script>
            </body>
          </html>
          `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(renderView)
        .then(html => res.end(html))
        .catch(err => res.end(err.message));
  });

});


export default app;
