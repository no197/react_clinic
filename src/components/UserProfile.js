import React from 'react';

import { Link } from 'react-router-dom';

import 'react-perfect-scrollbar/dist/css/styles.css';

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import * as FeatherIcon from 'react-feather';

import profilePic from '../assets/images/users/avatar-7.jpg';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

const UserProfile = (props) => {
  const { t, user } = props;
  const a = 'homePage.hello';
  return (
    <React.Fragment>
      <div className="media user-profile mt-2 mb-2">
        <img src={profilePic} className="avatar-sm rounded-circle mr-2" alt="Shreyu" />
        <img src={profilePic} className="avatar-xs rounded-circle mr-2" alt="Shreyu" />

        <div className="media-body">
          <h6 className="pro-user-name mt-0 mb-0">
            {t(a)} {!!user && user.fullName}
          </h6>
          <span className="pro-user-desc">{!!user && user.position}</span>
        </div>

        <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
          <DropdownToggle data-toggle="dropdown" tag="button" className="btn btn-link p-0 dropdown-toggle mr-0">
            <FeatherIcon.ChevronDown />
          </DropdownToggle>
          <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
            <Link to="/" className="dropdown-item notify-item">
              <FeatherIcon.User className="icon-dual icon-xs mr-2" />
              <span>My Account</span>
            </Link>
            <Link to="/" className="dropdown-item notify-item">
              <FeatherIcon.Settings className="icon-dual icon-xs mr-2" />
              <span>Settings</span>
            </Link>
            <Link to="/" className="dropdown-item notify-item">
              <FeatherIcon.HelpCircle className="icon-dual icon-xs mr-2" />
              <span>Support</span>
            </Link>
            <Link to="/" className="dropdown-item notify-item">
              <FeatherIcon.Lock className="icon-dual icon-xs mr-2" />
              <span>Lock Screen</span>
            </Link>
            <DropdownItem divider />
            <Link to="/account/logout" className="dropdown-item notify-item">
              <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
              <span>Logout</span>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.Auth.user });

const I18Profile = withTranslation('common')(UserProfile);

export default connect(mapStateToProps, {})(I18Profile);
