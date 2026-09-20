import { useState, useEffect } from "react";
import { createReport } from "../services/emergencyService";

function Report() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [locationLoading, setLocationLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        rawText: "",
        lat: null,
        lng: null
    });

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        if (!navigator.geolocation) {
            setMessage("Geolocation is not supported by your browser.");
            return;
        }

        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setForm((prev) => ({
                    ...prev,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }));

                setLocationLoading(false);
            },
            () => {
                setMessage("Please allow location access.");
                setLocationLoading(false);
            }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.rawText.trim()) {
            setMessage("Please describe the emergency.");
            return;
        }

        if (form.lat === null || form.lng === null) {
            setMessage("Please allow your location.");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            await createReport(form);

            setMessage("Your flood report has been submitted successfully.");

            setForm({
                name: "",
                phone: "",
                rawText: "",
                lat: form.lat,
                lng: form.lng
            });

        } catch (error) {
            setMessage("Failed to submit report. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-3xl font-bold text-gray-900">
                    ResQNet
                </h1>

                <p className="mt-1 text-gray-500">
                    Flood Emergency Report
                </p>

                {message && (
                    <p className="mt-4 text-center text-sm text-gray-700">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <textarea
                        name="rawText"
                        value={form.rawText}
                        onChange={handleChange}
                        placeholder="Describe the flood situation..."
                        rows="5"
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <div className="text-sm text-gray-600">
                        {locationLoading
                            ? "Detecting your location..."
                            : form.lat !== null
                                ? "📍 Location detected"
                                : "📍 Location not detected"}
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold"
                    >
                        {loading ? "Submitting..." : "Submit Report"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Report;