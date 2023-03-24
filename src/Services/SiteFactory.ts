import ISite from "../models/ISite";
import { SiteEnum } from "../models/sites.enum";
import Freelas99 from "../sites/99freelas";
import { Default } from "../sites/default";
import Infojobs from "../sites/Infojobs";

export class SiteFactory {
    
    static create(site: SiteEnum) : ISite {
        switch(site){
            case SiteEnum.Infojobs: 
                return new Infojobs();
            case SiteEnum.NineNinefreelas: 
                return new Freelas99();
            default:
                return new Default();
        }
    } 
}