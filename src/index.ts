import { SiteEnum } from "./models";
import { SiteFactory } from "./Services/SiteFactory";

var techs = [".net"];

let site = SiteFactory.create(SiteEnum.Infojobs);

let crowler = async (tech: string) => {
  //  await freelas.run(tech);
  await site.run(tech);

};

techs.forEach(async (e) => {
  await crowler(e).finally(() => console.log("fim"));
});
