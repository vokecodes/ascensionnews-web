"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { getTopics, Topic } from "@/api/topics";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
    const [categories, setCategories] = useState<Topic[]>([
        { key: "home", label: "Home", emoji: "🏡" },
    ]);
    const [activeCategory, setActiveCategory] = useState("");
    const router = useRouter();

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

    return (
        <div className="min-h-screen bg-[#202124] text-[#e8eaed]">
            <Header
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
                onSearch={handleSearch}
            />
            <main className="container mx-auto px-6 py-12 max-w-4xl">
                <div className="space-y-8 prose prose-invert max-w-none">
                    <section>
                        <h1 className="text-4xl font-bold text-white mb-2">PRIVACY POLICY</h1>
                        <p className="text-[#9aa0a6]">Last updated January 24, 2026</p>
                    </section>

                    <section className="space-y-4">
                        <p>
                            This Privacy Notice for Ascension News LLC (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;), describes how and why we might access, collect, store, use, and/or share (&apos;process&apos;) your personal information when you use our services (&apos;Services&apos;), including when you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Visit our website at <a href="https://ascensionnewsapp.com" className="text-[#8ab4f8] hover:underline">https://ascensionnewsapp.com</a> or any website of ours that links to this Privacy Notice</li>
                            <li>Download and use our mobile application (ascension news), or any other application of ours that links to this Privacy Notice</li>
                            <li>Use Ascension News. Ascension News is the premier digital news destination for the modern African professional, investor, and global citizen. We provide a 360-degree view of the continent, aggregating real-time updates from over 50 of Africa’s most trusted regional sources and specialized tech journals. From the bustling tech hubs of Lagos and Nairobi to the shifting political landscapes of Cairo and Dakar, Ascension News delivers the stories that matter most, direct to your pocket.</li>
                            <li>Engage with us in other related ways, including any marketing or events</li>
                        </ul>
                        <p>
                            Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:info@ascensionah.com" className="text-[#8ab4f8] hover:underline">info@ascensionah.com</a>.
                        </p>
                    </section>

                    <section className="bg-[#292a2d] p-6 rounded-xl border border-[#3c4043] space-y-4">
                        <h2 className="text-2xl font-semibold text-white">SUMMARY OF KEY POINTS</h2>
                        <p>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</p>

                        <div className="space-y-4">
                            <div>
                                <p className="font-medium text-white">What personal information do we process?</p>
                                <p className="text-sm text-[#9aa0a6]">When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">Do we process any sensitive personal information?</p>
                                <p className="text-sm text-[#9aa0a6]">Some of the information may be considered &apos;special&apos; or &apos;sensitive&apos; in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">Do we collect any information from third parties?</p>
                                <p className="text-sm text-[#9aa0a6]">We may collect information from public databases, marketing partners, social media platforms, and other outside sources.</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">How do we process your information?</p>
                                <p className="text-sm text-[#9aa0a6]">We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">In what situations and with which types of parties do we share personal information?</p>
                                <p className="text-sm text-[#9aa0a6]">We may share information in specific situations and with specific categories of third parties.</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">How do we keep your information safe?</p>
                                <p className="text-sm text-[#9aa0a6]">We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">What are your rights?</p>
                                <p className="text-sm text-[#9aa0a6]">Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">How do you exercise your rights?</p>
                                <p className="text-sm text-[#9aa0a6]">The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">TABLE OF CONTENTS</h2>
                        <ol className="list-decimal pl-6 space-y-1 text-[#8ab4f8]">
                            <li><a href="#info-collect" className="hover:underline">WHAT INFORMATION DO WE COLLECT?</a></li>
                            <li><a href="#info-process" className="hover:underline">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                            <li><a href="#legal-basis" className="hover:underline">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                            <li><a href="#info-share" className="hover:underline">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                            <li><a href="#third-party" className="hover:underline">WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></li>
                            <li><a href="#cookies" className="hover:underline">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
                            <li><a href="#ai-products" className="hover:underline">DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></li>
                            <li><a href="#social-logins" className="hover:underline">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
                            <li><a href="#intl-transfers" className="hover:underline">IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</a></li>
                            <li><a href="#info-retention" className="hover:underline">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                            <li><a href="#info-security" className="hover:underline">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                            <li><a href="#minors" className="hover:underline">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                            <li><a href="#privacy-rights" className="hover:underline">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                            <li><a href="#dnt-controls" className="hover:underline">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                            <li><a href="#us-residents" className="hover:underline">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                            <li><a href="#other-regions" className="hover:underline">DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                            <li><a href="#third-party-publisher" className="hover:underline">INTERACTION WITH THIRD-PARTY PUBLISHER CHANNELS</a></li>
                            <li><a href="#newsletter" className="hover:underline">NEWSLETTER SUBSCRIPTIONS AND AUDIENCE OWNERSHIP</a></li>
                            <li><a href="#ai-accuracy" className="hover:underline">ACCURACY AND ATTRIBUTION OF AI FEATURES</a></li>
                            <li><a href="#updates" className="hover:underline">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                            <li><a href="#contact" className="hover:underline">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                            <li><a href="#review-data" className="hover:underline">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
                        </ol>
                    </section>

                    <section id="info-collect" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">1. WHAT INFORMATION DO WE COLLECT?</h2>
                        <h3 className="text-xl font-medium text-white italic">Personal information you disclose to us</h3>
                        <p><span className="font-bold">In Short:</span> We collect personal information that you provide to us.</p>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                        </p>
                        <p>
                            <span className="font-bold">Personal Information Provided by You.</span> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>phone numbers</li>
                            <li>names</li>
                            <li>email addresses</li>
                            <li>usernames</li>
                            <li>passwords</li>
                        </ul>
                        <p><span className="font-bold">Sensitive Information.</span> We do not process sensitive information.</p>
                        <p>
                            <span className="font-bold">Payment Data.</span> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Stripe. You may find their privacy notice link(s) here: <a href="https://stripe.com/privacy" className="text-[#8ab4f8] hover:underline">https://stripe.com/privacy</a>.
                        </p>
                        <p>
                            <span className="font-bold">Social Media Login Data.</span> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account.
                        </p>
                        <p><span className="font-bold italic">Application Data.</span> If you use our application(s), we also may collect the following information:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><span className="font-bold">Mobile Device Data.</span> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information.</li>
                            <li><span className="font-bold">Push Notifications.</span> We may request to send you push notifications regarding your account or certain features of the application(s).</li>
                        </ul>

                        <h3 className="text-xl font-medium text-white italic">Information automatically collected</h3>
                        <p><span className="font-bold">In Short:</span> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>
                        <p>
                            The information we collect includes Log and Usage Data, Device Data, and Location Data. We may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address).
                        </p>
                        <h3 className="text-xl font-medium text-white italic">Google API</h3>
                        <p>Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.</p>

                        <h3 className="text-xl font-medium text-white italic">Information collected from other sources</h3>
                        <p><span className="font-bold">In Short:</span> We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.</p>
                    </section>

                    <section id="info-process" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                        <p><span className="font-bold">In Short:</span> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
                            <li>To deliver and facilitate delivery of services to the user.</li>
                            <li>To respond to user inquiries/offer support to users.</li>
                            <li>To send administrative information to you.</li>
                            <li>To fulfil and manage your orders.</li>
                            <li>To enable user-to-user communications.</li>
                            <li>To save or protect an individual&apos;s vital interest.</li>
                        </ul>
                    </section>

                    <section id="legal-basis" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
                        <p><span className="font-bold">In Short:</span> We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law.</p>
                        <p>If you are located in the EU or UK, we rely on Consent, Performance of a Contract, Legal Obligations, and Vital Interests.</p>
                        <p>If you are located in Canada, we may process your information if you have given us specific permission (i.e. express consent) or in situations where your permission can be inferred (i.e. implied consent).</p>
                    </section>

                    <section id="info-share" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                        <p><span className="font-bold">In Short:</span> We may share information in specific situations described in this section and/or with the following categories of third parties.</p>
                        <p>We may share your data with Ad Networks, Data Analytics Services, Data Storage Service Providers, Website Hosting Service Providers, Performance Monitoring Tools, Social Networks, User Account Registration & Authentication Services, Cloud Computing Services, Payment Processors, Communication & Collaboration Tools, Government Entities, and Sales & Marketing Tools.</p>
                        <p><span className="font-bold">When we use Google Maps Platform APIs.</span> We may share your information with certain Google Maps Platform APIs to retrieve location-specific requests. We obtain and store on your device (&apos;cache&apos;) your location for one (1) month.</p>
                    </section>

                    <section id="third-party" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>
                        <p><span className="font-bold">In Short:</span> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services.</p>
                    </section>

                    <section id="cookies" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                        <p><span className="font-bold">In Short:</span> We may use cookies and other tracking technologies to collect and store your information.</p>
                        <p>We use Google Analytics to track and analyse the use of the Services. You can opt out of being tracked by Google Analytics at <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#8ab4f8] hover:underline">https://tools.google.com/dlpage/gaoptout</a>.</p>
                    </section>

                    <section id="ai-products" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">7. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h2>
                        <p><span className="font-bold">In Short:</span> We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.</p>
                        <p>We provide AI Products through third-party service providers, including Google Cloud AI. These include AI insights, AI search, and AI translation.</p>
                        <p><span className="font-bold italic">How to Opt Out:</span> Users can manage their AI preferences at any time by navigating to Settings &gt; Ascension Lab.</p>
                    </section>

                    <section id="social-logins" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">8. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
                        <p><span className="font-bold">In Short:</span> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</p>
                    </section>

                    <section id="intl-transfers" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">9. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
                        <p><span className="font-bold">In Short:</span> We may transfer, store, and process your information in countries other than your own.</p>
                    </section>

                    <section id="info-retention" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">10. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                        <p><span className="font-bold">In Short:</span> We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
                    </section>

                    <section id="info-security" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">11. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                        <p><span className="font-bold">In Short:</span> We aim to protect your personal information through a system of organisational and technical security measures.</p>
                    </section>

                    <section id="minors" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">12. DO WE COLLECT INFORMATION FROM MINORS?</h2>
                        <p><span className="font-bold">In Short:</span> We do not knowingly collect data from or market to children under 18 years of age.</p>
                    </section>

                    <section id="privacy-rights" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">13. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                        <p><span className="font-bold">In Short:</span> Depending on your state of residence in the US or in some regions, such as the EEA, UK, Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information.</p>
                        <p>You may at any time review or change the information in your account or terminate your account.</p>
                    </section>

                    <section id="dnt-controls" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">14. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                        <p>At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. We recognize and honor Global Privacy Control (GPC) signals.</p>
                    </section>

                    <section id="us-residents" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">15. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                        <p><span className="font-bold">In Short:</span> Residents of specific states may have rights to access, correct, or delete personal information.</p>
                        <p>In the past twelve (12) months, we have collected inferences drawn from personal information to create a profile or summary about preferences and characteristics.</p>
                    </section>

                    <section id="contact" className="space-y-4 pt-8 border-t border-[#3c4043]">
                        <h2 className="text-2xl font-semibold text-white">21. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                        <p>If you have questions or comments about this notice, you may email us at <a href="mailto:info@ascensionah.com" className="text-[#8ab4f8] hover:underline">info@ascensionah.com</a>.</p>
                    </section>

                    <section id="review-data" className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">22. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
                        <p>Based on the applicable laws of your country or state, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please contact us by email.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
