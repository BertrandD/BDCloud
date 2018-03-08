const conf = {};

if (process.env.NODE_ENV === 'production') {
    conf.staticUrl = "http://files.mordus.fr/";
} else {
    conf.staticUrl = "http://localhost:5000/";
}

export default conf;