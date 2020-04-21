const { v4: uuidv4} = require('uuid');

const sessions = {};

const addSession = ( sessionInfo) => {
    const id = uuidv4();
    sessions[id] = {...sessionInfo, id};
    return sessions[id];
};

const deleteSession = (id) => {
    const session = sessions[id];
    delete sessions[id];
    return session;
};

module.exports = {
    sessions,
    addSession, 
    deleteSession
};