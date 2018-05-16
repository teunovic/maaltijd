class Maaltijd
{
    constructor(id, name, desc, ingredients, allergies, price, userid)
    {
        this._id = id;
        this._name = name;
        this._desc = desc;
        this._ingredients = ingredients;
        this._allergies = allergies;
        this._price = price;
        this._userid = userid;
    }

    get id() {
        return this._id;
    }

    get userid() {
        return this._userid;
    }

    get json() {
        return {
            "ID" : this._id,
            "naam": this._name,
            "beschrijving": this._desc,
            "ingredienten": this._ingredients,
            "allergie" : this._allergies,
            "prijs" : this._price,
        };
    }
}

module.exports = Maaltijd;