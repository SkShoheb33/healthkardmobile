import axios from "axios";

export const getKards = async() => {
    try {
        const result = await axios.get('https://healthkard-server.vercel.app/getUsers');
        return result.data;
    } catch (err) {
        console.error("Error fetching health kards:", err);
        throw err; // Re-throwing error to handle it in the calling component
    }
};
export const getKard = async(healthId) => {
    try {
        const result = await axios.get(`https://healthkard-server.vercel.app/getUser/${healthId}`);
        return result.data;
    } catch (err) {
        console.error("Error fetching health kards:", err);
        throw err; // Re-throwing error to handle it in the calling component
    }
};
export const getHospitals = async(hospitalId) => {
    try {
        const result = await axios.get(`https://healthkard-server.vercel.app/hospitals`);
        return result.data;
    } catch (err) {
        console.error("Error fetching health kards:", err);
        throw err; // Re-throwing error to handle it in the calling component
    }
};
export const getHospital = async(hospitalId) => {
    try {
        const result = await axios.get(`https://healthkard-server.vercel.app/getHospital/${hospitalId}`);
        return result.data;
    } catch (err) {
        console.error("Error fetching health kards:", err);
        throw err; // Re-throwing error to handle it in the calling component
    }
};