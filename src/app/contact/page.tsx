"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { getTopics, Topic } from "@/api/topics";
import { useRouter } from "next/navigation";
import { sendSupportRequest } from "@/api/support";
import { toast } from "sonner";

export default function ContactPage() {
    const [categories, setCategories] = useState<Topic[]>([
        { key: "home", label: "Home", emoji: "🏡" },
    ]);
    const [activeCategory, setActiveCategory] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const fetchedTopics = await getTopics();
                setCategories([
                    { key: "home", label: "Home", emoji: "🏡" },
                    ...fetchedTopics,
                ]);
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        };
        fetchTopics();
    }, []);

    const handleSearch = (query: string) => {
        router.push(`/?search=${encodeURIComponent(query)}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        // Actual API call
        try {
            await sendSupportRequest(formData);
            toast.success("Message sent successfully!", {
                description: "We'll get back to you soon.",
            });
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error: any) {
            console.error("Support submission error:", error);
            const apiErrors = error.response?.data?.errors;

            console.log("Support submission apiErrors:", apiErrors);

            if (Array.isArray(apiErrors) && apiErrors.length > 0) {
                apiErrors.forEach((err: any) => {
                    toast.error(err.message || "An error occurred");
                });
            } else {
                toast.error("Failed to send message", {
                    description: "Please try again later or contact us directly via email.",
                });
            }
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#202124] text-[#e8eaed]">
            <Header
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
                onSearch={handleSearch}
            />
            <main className="container mx-auto px-6 py-12 max-w-5xl">
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto">
                        Have questions, feedback, or a story to share? We&apos;d love to hear from you.
                        Get in touch with the Ascension News team.
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-[#292a2d] p-8 rounded-2xl border border-[#3c4043] space-y-6">
                            <h2 className="text-xl font-semibold text-white">Get in Touch</h2>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#303134] flex items-center justify-center text-[#8ab4f8] shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-[#9aa0a6] mb-1">Email us at</p>
                                    <a href="mailto:info@ascensionah.com" className="text-white hover:text-[#8ab4f8] transition-colors font-medium">
                                        info@ascensionah.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#303134] flex items-center justify-center text-[#8ab4f8] shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-[#9aa0a6] mb-1">Office Location</p>
                                    <p className="text-white font-medium">Lagos, Nigeria</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#3c4043]">
                                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Follow Us</h3>
                                <div className="flex gap-4">
                                    {/* Social Icons Placeholder */}
                                    {[
                                        { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                                        { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" }
                                    ].map((social, idx) => (
                                        <a key={idx} href="#" className="w-10 h-10 rounded-full bg-[#303134] flex items-center justify-center text-[#9aa0a6] hover:bg-[#8ab4f8] hover:text-[#202124] transition-all">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d={social.path} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#292a2d] p-8 md:p-10 rounded-2xl border border-[#3c4043]">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-[#9aa0a6]">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-[#303134] border border-[#3c4043] rounded-xl px-4 py-3 text-white placeholder-[#5f6368] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-[#9aa0a6]">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-[#303134] border border-[#3c4043] rounded-xl px-4 py-3 text-white placeholder-[#5f6368] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-[#9aa0a6]">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="w-full bg-[#303134] border border-[#3c4043] rounded-xl px-4 py-3 text-white placeholder-[#5f6368] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] focus:border-transparent transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-[#9aa0a6]">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full bg-[#303134] border border-[#3c4043] rounded-xl px-4 py-3 text-white placeholder-[#5f6368] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto px-8 py-4 bg-[#8ab4f8] text-[#202124] font-bold rounded-xl hover:bg-[#aecbff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-[#202124]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
