export default class Recipe{
    private name: string|null;
    private id: number;

    constructor (id) {
        this.id = Number(id);
        this.name = null;
    }

    async hydrate() { // Pretend DB Lookup
      this.name = `Recipe: #${this.id}`;
    }

    toJSON () {
        return { id: this.id, name: this.name };
    }
}