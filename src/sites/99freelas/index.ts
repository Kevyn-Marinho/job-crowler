
import axios  from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import ISite from '../../models/ISite';

export default class Freelas99 implements ISite {
    tech = '.net';
    actualPage: number = 0;
    url = `https://www.99freelas.com.br/projects?q=${this.tech}&order=mais-recentes&categoria=web-mobile-e-software`;
    dados: Array<any> = new Array<any>();

    async getPage(pageNumber: number) {
        console.log(this.url + `&page=${pageNumber}`)
        await axios.get(this.url + `&page=${pageNumber}`)
        .then(async page => await this.readStrucutures(page, pageNumber))
        .catch((e) => {
            console.error(this.url + `&page=${pageNumber}`)
            console.error(e.message)
        } ) 

    }

    async readStrucutures(page: any, pageNumber: number) {
        let $ = cheerio.load(page.data);
        var length = $('.projects-result-header .page-item').length;
        
        console.log(pageNumber);
        this.gerarArray($);

        if (pageNumber < length){
            await this.getPage(++pageNumber);
        }
    }

    gerarArray($: any) {
        let tech = this.tech;
       
        $('.title a').each((i: number, item: any) => {
            let job = {
                titulo: $(item).text(),
                url: $(item).attr('href'),
                tech
            }
            this.dados.push(job);
        });      
    }

    export() {
        fs.writeFile("data.json", JSON.stringify(this.dados), "utf-8", () => { });
    }

    async run(tech: string){
        this.tech = tech;
        await this.getPage(1);
        this.export();
    }

}
