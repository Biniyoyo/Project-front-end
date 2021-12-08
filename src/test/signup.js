function signup (r) {
    let mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let password_format = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}/;
    if (r.name.length < 1) {
        return false;
    } else {
        if (!mail_format.test(r.email)) {
            return false;
        } else {
            if (!password_format.test(r.password)) {
                return  false;
                
            } else {
                return true;
                
            }
        }
    }
};

module.exports = signup;