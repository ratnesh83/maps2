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
                                title: 'HOME',
                                icon: 'icon-wrap fa fa-home',
                                selected: false,
                                expanded: false,
                                order: 0,
                                auth: ['admin']
                            }
                        }
                    },
                    {
                        path: 'jobs',
                        data: {
                            menu: {
                                title: 'JOB SEARCH',
                                icon: 'icon-wrap fa fa-tasks',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['USER']
                            }
                        },
                    },
                    {
                        path: 'labors',
                        data: {
                            menu: {
                                title: 'LABOR SEARCH',
                                icon: 'icon-wrap fa fa-tasks',
                                selected: false,
                                expanded: false,
                                order: 100
                            }
                        },
                    },
                    {
                        path: 'posts',
                        data: {
                            menu: {
                                title: 'MY POSTS',
                                icon: 'icon-wrap fa fa-tasks',
                                selected: false,
                                expanded: false,
                                order: 100
                            }
                        },
                    },
                    {
                        path: 'feedbacks',
                        data: {
                            menu: {
                                title: 'MY RATINGS',
                                icon: 'icon-wrap fa fa-comments-o',
                                selected: false,
                                expanded: false,
                                order: 100,
                            }
                        }
                    },
                    {
                        path: 'requests',
                        data: {
                            menu: {
                                title: 'MY REQUESTS',
                                icon: 'icon-wrap fa fa-tasks',
                                selected: false,
                                expanded: false,
                                order: 100
                            }
                        },
                    },
                    {
                        path: 'mynetworks',
                        data: {
                            menu: {
                                title: 'LABOR LIST',
                                icon: 'icon-wrap fa fa-tasks',
                                selected: false,
                                expanded: false,
                                order: 100
                            }
                        },
                    },
                    {
                        path: 'subscriptions',
                        data: {
                            menu: {
                                title: 'MEMBERSHIP PLANS',
                                icon: 'icon-wrap fa fa-newspaper-o',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['admin']
                            }
                        },
                    },
                    {
                        path: 'appversion',
                        data: {
                            menu: {
                                title: 'SUPPORT',
                                icon: 'icon-wrap fa fa-code-fork',
                                selected: false,
                                expanded: false,
                                order: 100,
                            }
                        }
                    },
                    {
                        path: 'donations',
                        data: {
                            menu: {
                                title: 'DONATIONS',
                                icon: 'icon-wrap fa fa-tasks',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['USER']
                            }
                        },
                    },
                    {
                        path: 'settings',
                        data: {
                            menu: {
                                title: 'PROFILE',
                                icon: 'icon-wrap fa fa-gear fa-spin',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['admin']
                            }
                        },
                    },
                    {
                        path: 'payments',
                        data: {
                            menu: {
                                title: 'PAYMENTS INFO',
                                icon: 'icon-wrap fa fa-money',
                                selected: false,
                                expanded: false,
                                order: 100
                            }
                        },
                    },
                    {
                        path: 'helpcenter',
                        data: {
                            menu: {
                                title: 'CONTACT US',
                                icon: 'icon-wrap fa fa-question',
                                selected: false,
                                expanded: false,
                                order: 100,
                                auth: ['admin']
                            }
                        }
                    }
                ]
            }
        ];
    }
}




