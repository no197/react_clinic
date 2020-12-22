import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

//patients
const PatientList = React.lazy(() => import('../pages/Patients/PatientList'));
const NewPatient = React.lazy(() => import('../pages/Patients/NewPatient'));
const PatientDetail = React.lazy(() => import('../pages/Patients/PatientDetail'));
//employees
const EmployeesList = React.lazy(() => import('../pages/Employees/EmployeeLists'));
const NewEmployees = React.lazy(() => import('../pages/Employees/NewEmployees'));
const EmployeesDetail = React.lazy(() => import('../pages/Employees/EmployeesDetail'));

//appointment && Examination
const AppointmentList = React.lazy(() => import('../pages/Examination/AppointmentList'));
const ExaminationList = React.lazy(() => import('../pages/Examination/ExaminationList'));
const NewExamination = React.lazy(() => import('../pages/Examination/NewExamination'));
const ExaminationDetail = React.lazy(() => import('../pages/Examination/ExaminationDetail'));

//Invoices

const InvoiceDetail = React.lazy(() => import('../pages/Invoices/InvoiceDetail'));
const InvoiceList = React.lazy(() => import('../pages/Invoices/InvoiceList'));

//medicine
const MedicineLists = React.lazy(() => import('../pages/Medicines/MedicineLists'));
const NewMedicine = React.lazy(() => import('../pages/Medicines/NewMedicine'));
const MedicineDetail = React.lazy(() => import('../pages/Medicines/MedicineDetail'));
//Statistic
const MonthlyRevenue = React.lazy(() => import('../pages/Statistics/MonthlyRevenue'));
const MonthlyPatinet = React.lazy(() => import('../pages/Statistics/MonthlyPatinet'));
const MonthlyMedicines = React.lazy(() => import('../pages/Statistics/MonthlyMedicines'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isUserAuthenticated()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: '/account/login',
              state: { from: props.location },
            }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role
      if (roles && roles.indexOf(loggedInUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/' }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

// root routes
const rootRoute = {
  path: '/',
  exact: true,
  component: () => <Redirect to="/dashboard" />,
  route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
  path: '/dashboard',
  name: 'appMenu.dashboard',
  icon: FeatherIcon.Home,
  header: 'appMenu.dashboard',
  badge: {
    variant: 'success',
    text: '1',
  },
  component: Dashboard,
  route: PrivateRoute,
};

// apps

const patientRoutes = {
  path: '/app/patients',
  name: 'appMenu.patient',
  header: 'appMenu.appHeader',
  icon: FeatherIcon.UserPlus,
  roles: ['Admin', 'Employee'],
  children: [
    {
      path: '/app/patients',
      name: 'appMenu.patientList',
      component: PatientList,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/patients/new',
      name: 'appMenu.addPatient',
      component: NewPatient,
      route: PrivateRoute,
    },
    {
      path: '/app/patients/:id',
      component: PatientDetail,
      route: PrivateRoute,
    },
  ],
};

const examinationRoutes = {
  name: 'appMenu.examination',
  icon: FeatherIcon.Activity,
  roles: ['Admin', 'Employee', 'Doctor'],
  children: [
    {
      path: '/app/appointments',
      name: 'appMenu.appointmentList',
      component: AppointmentList,
      exact: true,
      route: PrivateRoute,
      roles: ['Admin', 'Employee', 'Doctor'],
    },
    {
      path: '/app/examinations',
      component: ExaminationList,
      name: 'appMenu.examinationList',
      exact: true,
      route: PrivateRoute,
      roles: ['Admin', 'Doctor'],
    },
    {
      path: '/app/examinations/:examinationId',
      component: ExaminationDetail,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/examinations/add/:appointId',
      component: NewExamination,
      exact: true,
      route: PrivateRoute,
    },
  ],
};

const employeesRoutes = {
  path: '/app/employees',
  name: 'appMenu.employee',
  icon: FeatherIcon.Monitor,
  roles: ['Admin'],
  children: [
    {
      path: '/app/employees',
      name: 'appMenu.employeeList',
      component: EmployeesList,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/employees/new',
      name: 'appMenu.addEmployee',
      component: NewEmployees,
      route: PrivateRoute,
    },
    {
      path: '/app/employees/:id',
      component: EmployeesDetail,
      route: PrivateRoute,
    },
  ],
};

const medicineRoutes = {
  path: '/app/medicines',
  name: 'appMenu.medicine',
  icon: FeatherIcon.Briefcase,
  roles: ['Admin', 'Pharmacist'],
  children: [
    {
      path: '/app/medicines',
      name: 'appMenu.medicineList',
      component: MedicineLists,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/medicines/new',
      name: 'appMenu.addMedicine',
      component: NewMedicine,
      route: PrivateRoute,
    },
    {
      path: '/app/medicines/:id',
      component: MedicineDetail,
      route: PrivateRoute,
    },
  ],
};

const invoiceRoutes = {
  path: '/app/invoices',
  name: 'appMenu.invoice',
  icon: FeatherIcon.FileText,
  component: InvoiceList,
  exact: true,
  route: PrivateRoute,
  roles: ['Admin', 'Employee'],
};

const invoiceDetailRoutes = {
  path: '/app/invoices/:invoiceId',

  component: InvoiceDetail,
  route: PrivateRoute,
  roles: ['Admin', 'Employee'],
};

const statisticRoutes = {
  path: '/app/statistic',
  name: 'appMenu.statistic',
  icon: FeatherIcon.Grid,
  roles: ['Admin'],
  children: [
    {
      path: '/app/statistic/revenue',
      name: 'appMenu.monthlyRenenue',
      component: MonthlyRevenue,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/statistic/patients',
      name: 'appMenu.monthlyPatient',
      component: MonthlyPatinet,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/statistic/medicines',
      name: 'appMenu.monthlyMedicine',
      component: MonthlyMedicines,
      exact: true,
      route: PrivateRoute,
    },
  ],
};

const appRoutes = [
  patientRoutes,
  employeesRoutes,
  examinationRoutes,
  medicineRoutes,
  invoiceRoutes,
  invoiceDetailRoutes,
  statisticRoutes,
];

// auth
const authRoutes = {
  path: '/account',
  name: 'Auth',
  children: [
    {
      path: '/account/login',
      name: 'Login',
      component: Login,
      route: Route,
    },
    {
      path: '/account/logout',
      name: 'Logout',
      component: Logout,
      route: Route,
    },
    {
      path: '/account/register',
      name: 'Register',
      component: Register,
      route: Route,
    },
    {
      path: '/account/confirm',
      name: 'Confirm',
      component: Confirm,
      route: Route,
    },
    {
      path: '/account/forget-password',
      name: 'Forget Password',
      component: ForgetPassword,
      route: Route,
    },
  ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const allRoutes = [rootRoute, dashboardRoutes, ...appRoutes, authRoutes];

const authProtectedRoutes = [dashboardRoutes, ...appRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
