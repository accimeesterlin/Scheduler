

module.exports = {
    formatPhoneNumber: (num) => {
        const s2 = ("" + num).replace(/\D/g, '');
        const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? "Phone invalid, it should 10 digits" : "(" + m[1] + ") " + m[2] + "-" + m[3];
    }
}