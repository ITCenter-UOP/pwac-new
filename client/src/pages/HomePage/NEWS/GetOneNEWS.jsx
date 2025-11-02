import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";

const GetOneNEWS = () => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { title } = useParams();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await API.get(`/nonauth/get-one-news/${title}?nocache=${Date.now()}`, {
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && res.data.result) {
                    setNews(res.data.result);
                } else {
                    setError("News not found");
                }
            } catch (err) {
                console.error("Failed to fetch news:", err);
                setError("Could not load news");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [title]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                Loading news...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-600">
                {error}
            </div>
        );
    }

    if (!news) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                No news found.
            </div>
        );
    }

    return (
        <section className="py-20 px-6 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto mb-4 -mt-10">
                <a href="/news">
                    <div className="">
                        <DefaultButton
                            type="button"
                            label="Back to NEWS"
                        />
                    </div>
                </a>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* --- Image Section --- */}
                <div className="w-full">
                    {/* First image (large) */}
                    {news.imageUrl?.length > 0 && (
                        <img
                            src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${news.imageUrl[0]}`}
                            alt={news.title}
                            className="w-full h-[420px] object-cover"
                        />
                    )}

                    {/* Remaining images (smaller grid) */}
                    {news.imageUrl?.length > 1 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
                            {news.imageUrl.slice(1).map((img, index) => (
                                <img
                                    key={index}
                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${img}`}
                                    alt={`${news.title} ${index + 2}`}
                                    className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* --- News Content --- */}
                <div className="p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#560606] mb-4">
                        {news.title}
                    </h1>
                    <p className="text-gray-500 mb-6">
                        {new Date(news.createdAt).toLocaleDateString()} • Updated{" "}
                        {new Date(news.updatedAt).toLocaleDateString()}
                    </p>

                    <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                        {news.description?.map((para, index) => (
                            <p key={index}>{para}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetOneNEWS;
