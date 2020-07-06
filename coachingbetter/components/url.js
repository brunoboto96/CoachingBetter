class Url {
    getbackendURL() {
        return "http://127.0.0.1:3000"
    }

    getbackendURL_mobile() {
        return "http://192.168.144.171:3000"
    }
}
const url = new Url();
export default url;