const createIncidentItem = ({aiData, lat, lng}) => {
    return {
        incidentId: `inc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        priority: aiData.priority || "Medium",
        resourceNeeded: aiData.resourceNeeded,
        status: "Pending",
        lat: Number(lat),
        lng: Number(lng),
        reportCount: 1,
        createdAt: new Date().toISOString()
    };
};

module.exports = { createIncidentItem }
