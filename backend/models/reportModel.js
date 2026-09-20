const createReportItem = ({ name, phone, rawText, lat, lng }, mappedIncidentId = null) => {
    return {
        reportId: `rep_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: name || "Anonymous",
        phone: phone || "N/A",
        rawText,
        lat: Number(lat),
        lng: Number(lng),
        timestamp: new Date().toISOString(),
        mappedIncidentId: mappedIncidentId
    };
};

module.exports = { createReportItem };
