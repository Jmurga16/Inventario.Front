export class Menu {
    idMenu: number;
    name: string;
    route: string;
    icon: string;
    idParent: number;
    status: boolean;
    show: boolean;
    subMenu: Menu[];
    level: number

    constructor(idMenu: number, name: string, route: string, icon: string, idParent: number, status: boolean) {
        this.idMenu = idMenu;
        this.name = name;
        this.route = route;
        this.icon = icon;
        this.idParent = idParent;
        this.status = status;
        this.show = false
        this.subMenu = []
        this.level = 1
    }
}