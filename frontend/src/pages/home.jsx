import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            ResQNet
                        </h1>
                        <p className="text-xs text-slate-500">
                            Flood Emergency Coordination
                        </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Emergency Response System
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-6 py-16">

                {/* Hero */}
                <section className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-5">
                        <span>🚨</span>
                        Faster Emergency Coordination
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                        Connecting flood emergencies
                        <span className="text-red-600"> to the right response.</span>
                    </h2>

                    <p className="mt-5 text-slate-600 text-lg leading-relaxed">
                        ResQNet helps organize citizen emergency reports,
                        identify priority situations, and support faster
                        resource dispatch for responders.
                    </p>
                </section>

                {/* Actions */}
                <section className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-6">

                    {/* Citizen */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl">
                            🆘
                        </div>

                        <h3 className="text-xl font-semibold mt-5">
                            Need Emergency Help?
                        </h3>

                        <p className="text-slate-500 mt-2 leading-relaxed">
                            Report a flood emergency with your current
                            location and situation details.
                        </p>

                        <Link
                            to="/report"
                            className="mt-6 block text-center bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                        >
                            Report Emergency
                        </Link>
                    </div>

                    {/* Responder */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                            🚑
                        </div>

                        <h3 className="text-xl font-semibold mt-5">
                            Emergency Responder
                        </h3>

                        <p className="text-slate-500 mt-2 leading-relaxed">
                            Monitor active incidents, review priorities,
                            and coordinate emergency resources.
                        </p>

                        <Link
                            to="/dashboard"
                            className="mt-6 block text-center bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
                        >
                            Open Responder Dashboard
                        </Link>
                    </div>

                </section>

                {/* Workflow */}
                <section className="mt-14 text-center">
                    <p className="text-sm text-slate-500 mb-4">
                        How ResQNet works
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
                        <span className="px-4 py-2 bg-white border border-slate-200 rounded-full">
                            📍 Report
                        </span>

                        <span className="text-slate-400">→</span>

                        <span className="px-4 py-2 bg-white border border-slate-200 rounded-full">
                            🤖 AI Analysis
                        </span>

                        <span className="text-slate-400">→</span>

                        <span className="px-4 py-2 bg-white border border-slate-200 rounded-full">
                            🚨 Prioritize
                        </span>

                        <span className="text-slate-400">→</span>

                        <span className="px-4 py-2 bg-white border border-slate-200 rounded-full">
                            🚑 Dispatch
                        </span>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-5 text-center text-sm text-slate-500">
                    ResQNet — Flood Emergency Coordination
                </div>
            </footer>

        </div>
    );
}

export default Home;