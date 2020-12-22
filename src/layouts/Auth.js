import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import PreLoaderWidget from '../components/Loader';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
// const Footer = React.lazy(() => import("./Footer"));

// loading
const loading = () => <PreLoaderWidget />;

class AuthLayout extends Component {
  render() {
    const children = this.props.children || null;
    return <Suspense fallback={loading()}>{children}</Suspense>;
  }
}

export default connect()(AuthLayout);
