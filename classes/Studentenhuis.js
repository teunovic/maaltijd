class Studentenhuis
{
    constructor(id, address, name, userid) {
        this._id = id;
        this._address = address;
        this._name = name;
        this._userid = userid;
    }

    get id() {
        return this._id;
    }

    get address() {
        return this._address;
    }

    get name() {
        return this._name;
    }

    get userid() {
        return this._userid;
    }
}

module.exports = Studentenhuis;