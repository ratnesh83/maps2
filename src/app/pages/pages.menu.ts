import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


@Injectable()
export class PagesMenuService {
    PAGES_MENU = [];
    
    constructor(private store: Store<any>) {

    }

    pageMenu() {
        return this.PAGES_MENU = [
            {
                path: 'pages',
                children: [
                    {
                        path: 'home',
                        data: {
                            menu: {
                                title: 'Home',
                                icon: 'icon-wrap fa fa-home',
                                selected: false,
                                expanded: false,
                                order: 0,
                                auth: ['USER']
                            }
                        }
                    },
                    {
                        path: 'users',
                        data: {
                            menu: {
                                title: 'Users',
                                icon: 'icon-wrap fa fa-user-o',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['admin']
                            }
                        },
                        children: [
                            {
                                path: 'employers',
                                data: {
                                    menu: {
                                        title: 'Employers',
                                    }
                                }
                            },
                            {
                                path: 'workers',
                                data: {
                                    menu: {
                                        title: 'Workers',
                                    }
                                }
                            },
                        ]
                    },
                    {
                        path: 'subscriptions',
                        data: {
                            menu: {
                                title: 'Subscriptions',
                                icon: 'icon-wrap fa fa-newspaper-o',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['admin']
                            }
                        },
                    },
                    {
                        path: 'jobs',
                        data: {
                            menu: {
                                title: 'Jobs',
                                icon: 'icon-wrap fa fa-tasks',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['USER']
                            }
                        },
                    },
                    {
                        path: 'payments',
                        data: {
                            menu: {
                                title: 'Payments',
                                icon: 'icon-wrap fa fa-money',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['admin']
                            }
                        },
                    },
                    {
                        path: 'feedbacks',
                        data: {
                            menu: {
                                title: 'Feedbacks',
                                icon: 'icon-wrap fa fa-comments-o',
                                selected: false,
                                expanded: false,
                                order: 100,
                            }
                        }
                    },
                    {
                        path: 'helpcenter',
                        data: {
                            menu: {
                                title: 'Help Center',
                                icon: 'icon-wrap fa fa-question',
                                selected: false,
                                expanded: false,
                                order: 100,
                            }
                        }
                    },
                    {
                        path: 'appversion',
                        data: {
                            menu: {
                                title: 'App Version',
                                icon: 'icon-wrap fa fa-code-fork',
                                selected: false,
                                expanded: false,
                                order: 100,
                            }
                        }
                    },
                    {
                        path: 'settings',
                        data: {
                            menu: {
                                title: 'Profile',
                                icon: 'icon-wrap fa fa-gear fa-spin',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['admin']
                            }
                        },
                    },
                ]
            }
        ];
    }
}




