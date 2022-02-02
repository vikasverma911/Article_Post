import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import { connect } from 'react-redux';

function App(props) {

  useEffect(() => {
    props.onTryAutoSignup();
  }, [])

  return (
    <div className="App">
      <Router>
        <CustomLayout {...props}>
          <BaseRouter />
        </CustomLayout>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
