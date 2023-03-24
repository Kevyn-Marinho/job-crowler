export default interface Site {
    getPage(pageNumber: number): void;

    readStrucutures(page: any, pageNumber: number): void;

    gerarArray($: any): void;

    export(): void;

    run(tech: string): void;
    
}