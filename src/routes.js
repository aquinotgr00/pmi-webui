import Users from 'views/Users'
import Donators from 'views/Donators'
import Volunteers from 'views/Volunteers'
import Campaigns from 'views/Campaigns'

var routes = [
  {
    path: '/users',
    name: 'Users',
    component:Users
  },
  {
    path: '/donators',
    name: 'Donators',
    component:Donators
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component:Volunteers
  },
  {
    path: '/campaigns/:campaign',
    name: 'Dashboard',
    component:Campaigns
  },
];
export default routes;
