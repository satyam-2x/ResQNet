import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
    getIncidents,
    updateStatus as updateIncidentsStatus,
} from "../services/emergencyService";

function ResponderDashboard() {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await getIncidents();
                setIncidents(response.data.data || []);
            } catch (error) {
                console.error("Failed to fetch incidents:", error);
            }
        };

        fetchIncidents();
    }, []);

    const updateStatus = async (id) => {
        try {
            const response = await updateIncidentsStatus({
                incidentId: id,
                status: "Dispatched",
            });

            const updatedIncident = response.data.data;

            setIncidents((prev) =>
                prev.map((incident) =>
                    incident.incidentId === id
                        ? { ...incident, ...updatedIncident }
                        : incident
                )
            );
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const activeCount = incidents.filter(
        (incident) => incident.status !== "Resolved"
    ).length;

    const criticalCount = incidents.filter(
        (incident) => incident.priority === "Critical"
    ).length;

    const resourcesNeededCount = incidents.filter(
        (incident) => incident.resourceNeeded !== "None"
    ).length;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Responder Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Monitor and respond to active flood incidents.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                <div className="bg-white rounded-xl p-4 shadow">
                    <p className="text-gray-500 text-sm">
                        Active Incidents
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                        {activeCount}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <p className="text-gray-500 text-sm">
                        Critical
                    </p>

                    <h2 className="text-2xl font-bold text-red-600 mt-1">
                        {criticalCount}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <p className="text-gray-500 text-sm">
                        Resources Needed
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                        {resourcesNeededCount}
                    </h2>
                </div>

            </div>

            {/* Main */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Map */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold">
                            Incident Map
                        </h2>
                    </div>

                    <MapContainer
                        center={[25.5941, 85.1376]}
                        zoom={13}
                        className="h-[500px] w-full"
                    >
                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {incidents.map((incident) => (
                            <Marker
                                key={incident.incidentId}
                                position={[
                                    incident.lat,
                                    incident.lng
                                ]}
                            >
                                <Popup>
                                    <div className="space-y-1">
                                        <p>
                                            <strong>Incident:</strong>{" "}
                                            {incident.incidentId}
                                        </p>

                                        <p>
                                            <strong>Priority:</strong>{" "}
                                            {incident.priority}
                                        </p>

                                        <p>
                                            <strong>Resource:</strong>{" "}
                                            {incident.resourceNeeded}
                                        </p>

                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {incident.status}
                                        </p>

                                        <p>
                                            <strong>Reports:</strong>{" "}
                                            {incident.reportCount}
                                        </p>

                                        <p>
                                            <strong>Location:</strong>{" "}
                                            {incident.lat.toFixed(5)},{" "}
                                            {incident.lng.toFixed(5)}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* Incident List */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Active Incidents
                    </h2>

                    <div className="space-y-4">
                        {incidents.map((incident) => (
                            <div
                                key={incident.incidentId}
                                className="bg-white rounded-xl shadow p-5"
                            >
                                {/* Top */}
                                <div className="flex justify-between items-start gap-4">

                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {incident.incidentId}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Resource:{" "}
                                            <span className="text-gray-700 font-medium">
                                                {incident.resourceNeeded}
                                            </span>
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Status:{" "}
                                            <span
                                                className={
                                                    incident.status === "Dispatched"
                                                        ? "text-blue-600 font-medium"
                                                        : "text-yellow-600 font-medium"
                                                }
                                            >
                                                {incident.status}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Priority */}
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            incident.priority === "Critical"
                                                ? "bg-red-100 text-red-700"
                                                : incident.priority === "High"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {incident.priority}
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <p className="text-gray-500">
                                            Report Count
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {incident.reportCount}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <p className="text-gray-500">
                                            Location
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {incident.lat.toFixed(4)},{" "}
                                            {incident.lng.toFixed(4)}
                                        </p>
                                    </div>

                                </div>

                                {/* Dispatch */}
                                <button
                                    onClick={() =>
                                        updateStatus(incident.incidentId)
                                    }
                                    disabled={
                                        incident.status === "Dispatched"
                                    }
                                    className={`mt-4 w-full py-2.5 rounded-lg font-semibold transition ${
                                        incident.status === "Dispatched"
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-red-600 text-white hover:bg-red-700"
                                    }`}
                                >
                                    {incident.status === "Dispatched"
                                        ? "Resource Dispatched"
                                        : "Dispatch Resource"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResponderDashboard;