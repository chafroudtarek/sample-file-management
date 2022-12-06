import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Home',
    icon: 'fa fa-home',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/allfiles',
    title: 'All files',
    icon: 'fa fa-file',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/starredfile',
    title: 'Starred',
    icon: 'fa fa-star',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/archivedfile',
    title: 'Archived',
    icon: 'fa fa-archive',
    class: '',
    extralink: false,
    submenu: []
  },
  
];
