import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//jobs
import JobReducer from "./jobs/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//workspaces
import workspaces from "./workspace/reducer"

//transaction
import transactions from "./transaction/reducer"

//notification
import notifications from "./notification/reducer"

//roadmaps
import roadmaps from "./roadmap/reducer"

//mails
import mails from "./mails/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer"

//Dasboard crypto
import DashboardCrypto from "./dashboard-crypto/reducer"

//Dasboard blog
import DashboardBlog from "./dashboard-blog/reducer"

//Dasboard job
import DashboardJob from "./dashboard-jobs/reducer"

//User
import User from "./user/reducer"

//Events
import Event from "./events/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  JobReducer,
  projects,
  tasks,
  contacts,
  workspaces,
  roadmaps,
  transactions,
  notifications,
  Dashboard,
  DashboardSaas,
  DashboardCrypto,
  DashboardBlog,
  DashboardJob,
  User,
  Event,
})

export default rootReducer
