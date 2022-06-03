module.exports = {
    getSeatSelector: function (row, seat){
        return `.buying-scheme__wrapper > :nth-child(${row}) > :nth-child(${seat})`;
    }
}