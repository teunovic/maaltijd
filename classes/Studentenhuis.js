class Studentenhuis
{
    constructor(id, name, address, userid, contact, email) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._userid = userid;
        this._contact = contact;
        this._email = email;
    }

    get json() {
        return {
            "ID": this._id,
            "naam": this._name,
            "adres": this._address,
            "contact": this._contact,
            "email": this._email,
        };
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get userid() {
        return this._userid;
    }

    get contact() {
        return this._contact;
    }

    get email() {
        return this._email;
    }
}

module.exports = Studentenhuis;