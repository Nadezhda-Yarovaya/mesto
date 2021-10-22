class Card {
    constructor(data, cardSelector) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;

    }
}

class CurrentCard extends Card {

}

export {Card};