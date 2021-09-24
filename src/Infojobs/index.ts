
import axios  from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

import Site from '../site';

export default class infojobs implements Site {
    tech = '.net';
    actualPage: number = 0;
    url = `https://www.infojobs.com.br/vagas-de-emprego-${this.tech}-em-sao-paulo,-sp.aspx?`;
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
        var length = parseInt(($($('.js_PageItem')[$('.js_PageItem').length -1]).text()));
        
         this.gerarArray($);

        if (pageNumber < length){
            await this.getPage(++pageNumber);
        }
    }

    gerarArray($: any) {
        let tech = this.tech;
       
        $('.element-vaga').each((i: number, item: any) => {
            let job = {
                titulo: $(item).find('.vaga .vagaTitle').text().trim(),
                url: $(item).find('.vaga .vagaTitle').attr('href'),
                tech
            }

            this.dados.push(job);
        });       
    }

    export() {
        fs.writeFile("data-info.json", JSON.stringify(this.dados), "utf-8", () => { });
    }

    async run(tech: string){
        this.tech = tech;
        await this.getPage(1);
        this.export();
    }

}
