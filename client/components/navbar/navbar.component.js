'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = {
    states: [
      // {
      //   title: 'Home',
      //   state: 'main'
      // },
      {
        title: 'Custom Sticks',
        state: 'customize'
      }
    ],
    links: [
      {
        title: 'Sticks',
        href: 'http://zealhockey.com/sticks/'
      },
      {
        title: 'Visors',
        href: 'http://zealhockey.com/visors/'
      },
      {
        title: 'Apparel',
        href: 'http://zealhockey.com/apparel/'
      },
      {
        title: 'Training Aids',
        href: 'http://zealhockey.com/training-aids/'
      },
      {
        title: 'Accessories',
        href: 'http://zealhockey.com/accessories/'
      },
      {
        title: 'Clearance',
        href: 'http://zealhockey.com/clearance/'
      }
    ]
  };

  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
