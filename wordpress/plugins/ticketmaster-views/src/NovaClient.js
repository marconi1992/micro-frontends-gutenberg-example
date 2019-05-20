const axios = require('axios');
const { v4 } = require('uuid');

class NovaClient {
    constructor() {
        this.jobs = {};
    }

    addJob(name, data) {
        const uuid = v4();
        this.jobs[uuid] = {
            name,
            data
        }

        return uuid;
    }

    async batch() {
        const jobs = this.jobs
        this.jobs = {}
        const { data } = await axios.post('http://localhost:3001/batch', jobs);

        return data
    }
}

export default NovaClient;