
import Freelas99 from './99freelas/index';
import Infojobs from './infojobs/index';

var techs = [".net"]

let freelas = new Freelas99();
let info = new Infojobs();

let crowler = async (tech: string) => {
  //  await freelas.run(tech);
    await info.run(tech);
}

techs.forEach(async e => {
    await crowler(e).finally(() => 
        console.log('fim'));

});

