import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    {/* <Spinner color="primary" /> */}
    <ReactLoading type="spin" width={48} height={48} color="#5369f8" />
  </div>
);
export default Loading;
