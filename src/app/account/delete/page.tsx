"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import Header from "@/components/Header";
import { deleteAccount } from "@/api/auth";
import { useRouter } from "next/navigation";

const deleteSchema = z.object({
    email: z.string().email("Enter a valid email"),
});

type DeleteFormValues = z.infer<typeof deleteSchema>;

export default function DeleteAccountPage() {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DeleteFormValues>({
        resolver: zodResolver(deleteSchema),
    });

    const onSubmit = async (data: DeleteFormValues) => {
        setIsDeleting(true);
        try {
            const response = await deleteAccount(data);
            toast.success(response.message || "Account deletion request submitted.");
            // Redirect or show a success state
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to delete account. Please try again.";
            toast.error(message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#202124]">
            <Header
                activeCategory=""
                setActiveCategory={(cat) => {
                    if (cat === "Home") router.push("/");
                }}
                categories={[{ key: "home", label: "Home", emoji: "🏡" }]}
                onSearch={() => { }}
            />

            <main className="container mx-auto px-4 py-12 max-w-xl">
                <div className="bg-[#292a2d] rounded-2xl border border-[#3c4043] p-8 shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-medium text-white mb-4">Delete Account</h1>
                        <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 mb-6">
                            <p className="text-red-200 text-sm leading-relaxed">
                                <span className="font-bold underline">Warning:</span> This action is permanent. Deleting your account will remove all your personalised settings, favourite topics, and saved articles. This cannot be undone.
                            </p>
                        </div>
                        <p className="text-[#9aa0a6] text-sm">
                            Please enter your email address to confirm you want to delete your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Email Address</label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className="w-full bg-[#202124] text-white px-4 py-3 rounded-xl border border-[#3c4043] focus:border-[#8ab4f8] focus:ring-1 focus:ring-[#8ab4f8] focus:outline-none transition-all placeholder:text-[#5f6368]"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isDeleting}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/20"
                        >
                            {isDeleting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Permanently Delete My Account"
                            )}
                        </button>
                    </form>

                    <button
                        onClick={() => router.push("/")}
                        className="w-full mt-4 text-[#9aa0a6] hover:text-white text-sm transition-colors"
                    >
                        Cancel and go back
                    </button>
                </div>
            </main>
            <Toaster position="top-center" richColors />
        </div>
    );
}
