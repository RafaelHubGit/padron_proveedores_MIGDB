




function getMails ( registro ) {

    const regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gim;

    if ( regexMail.test( registro ) ) {
        let mails = registro.match( regexMail );
        return mails;
    }

    return [];

}

module.exports = { getMails };