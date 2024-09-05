import {Component, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {RoleService} from "../zynerator/security/shared/service/Role.service";
import {AppComponent} from "../app.component";
import {AuthService} from "../zynerator/security/shared/service/Auth.service";
import {Router} from "@angular/router";
import {AppLayoutComponent} from "./app.layout.component";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    modelanonymous: any[];
    modelAdmin: any[];

    constructor(public layoutService: LayoutService, public app: AppComponent, public appMain: AppLayoutComponent, private roleService: RoleService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.modelAdmin =
            [

                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Gestion Achat',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste achat',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/achat/achat/list']
                                },
                                {
                                    label: 'Liste reglement achat',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/achat/reglement-achat/list']
                                },
                                {
                                    label: 'Liste etat achat',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/achat/etat-achat/list']
                                },
                                {
                                    label: 'Liste reglement achat status',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/achat/reglement-achat-status/list']
                                },

                            ]
                        },
                        {
                            label: 'Gestion Fournisseur',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste categorie fournisseur',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/fournisseur/categorie-fournisseur/list']
                                },
                                {
                                    label: 'Liste fournisseur',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/fournisseur/fournisseur/list']
                                },
                            ]
                        },

                        {
                            label: 'Gestion Vente',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste vente',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/vente/vente/list']
                                },
                                {
                                    label: 'Liste reglement vente',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/vente/reglement-vente/list']
                                },
                                {
                                    label: 'Liste etat vente',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/vente/etat-vente/list']
                                },

                                {
                                    label: 'Liste reglement vente status',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/vente/reglement-vente-status/list']
                                },
                            ]
                        },
                        {
                            label: 'Gestion Client',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste super categorie client',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/client/super-categorie-client/list']
                                },
                                {
                                    label: 'Liste client',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/client/client/list']
                                },
                                {
                                    label: 'Liste categorie client',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/client/categorie-client/list']
                                },
                            ]
                        },

                        {
                            label: 'Gestion Produit',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste unite mesure',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/produit/unite-mesure/list']
                                },
                                {
                                    label: 'Liste marque',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/produit/marque/list']
                                },
                                {
                                    label: 'Liste categorie produit',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/produit/categorie-produit/list']
                                },
                                {
                                    label: 'Liste statut sous marque',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/produit/statut-sous-marque/list']
                                },
                                {
                                    label: 'Liste sous marque',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/produit/sous-marque/list']
                                },
                            ]
                        },
                        {
                            label: 'Gestion Depot',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste depot',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/depot/depot/list']
                                },
                                {
                                    label: 'Liste stock',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/depot/stock/list']
                                },
                                {
                                    label: 'Liste point vente',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/depot/point-vente/list']
                                },
                            ]
                        },

                        /*{
                            label: 'Gestion Inventaire',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste inventaire item',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/inventaire/inventaire-item/list']
                                },
                                {
                                    label: 'Liste inventaire',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/inventaire/inventaire/list']
                                },
                            ]
                        },*/
                        {
                            label: 'Gestion Transfert',
                            icon: 'pi pi-wallet',
                            items: [
                                /*{
                                    label: 'Liste transfert item',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/transfert/transfert-item/list']
                                },*/
                                {
                                    label: 'Liste transfert',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/transfert/transfert/list']
                                },
                            ]
                        },
                        {
                            label: 'Gestion Referentiel',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'Liste taux tva',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/commun/taux-tva/list']
                                },
                                {
                                    label: 'Liste mode reglement',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/commun/mode-reglement/list']
                                },
                            ]
                        },



                        {
                            label: 'Security Management',
                            icon: 'pi pi-wallet',
                            items: [
                                {
                                    label: 'List User',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/security/user/list']
                                },
                                {
                                    label: 'List Model',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/security/model-permission/list']
                                },
                                {
                                    label: 'List Action Permission',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/security/action-permission/list']
                                },
                            ]
                        }
                    ]
                }
            ];

        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roleUsers) {
                this.authService.authenticatedUser.roleUsers.forEach(role => {
                    const roleName: string = this.getRole(role.role.authority);
                    this.roleService._role.next(roleName.toUpperCase());
                    eval('this.model = this.model' + this.getRole(role.role.authority));
                })
            }
        }
    }

    getRole(text) {
        const [role, ...rest] = text.split('_');
        return this.upperCaseFirstLetter(rest.join(''));
    }

    upperCaseFirstLetter(word: string) {
        if (!word) {
            return word;
        }
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
