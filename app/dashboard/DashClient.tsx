"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserProfile = {
  user: any;
  wallet?: {
    _id?: string;
    balance?: number;
    ledgerBalance?: number;
    currency?: string;
    isLocked?: boolean;
  } | null;
};

function DashClient() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router: any = useRouter()

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        cache: "no-store",
        credentials: "include",
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          json?.error || json?.message || "Failed to fetch profile"
        );
      }
      const json: UserProfile = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fundWallet = async (amount = 1000) => {
    try {
      setLoading(true);
      const res = await fetch("/api/wallet/fund", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error("Failed to fund wallet");
      await fetchProfile();
    } catch (err: any) {
      setError(err?.message || "Could not fund wallet");
      setLoading(false);
    }
  };

  const formatCurrency = (val?: number) => {
    if (typeof val !== "number") return "—";
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(val);
    } catch (e) {
      return String(val);
    }
  };

  return (
    <main className="p-6">
      {/* Card */}
      <section className="max-w-lg mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl text-white shadow-xl"
          style={{
            background: `linear-gradient(90deg, var(--gradient-from), var(--gradient-to))`,
            border: `1px solid var(--border)`,
          }}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm opacity-90">Total Balance</p>
                <div className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                  {loading ? (
                    <span className="inline-block w-32 h-8 bg-white/20 rounded animate-pulse" />
                  ) : data?.wallet?.balance != null ? (
                    formatCurrency(data.wallet.balance)
                  ) : (
                    "—"
                  )}
                </div>
                <p className="mt-1 text-xs opacity-80">
                  Available balance in your wallet
                </p>
              </div>

              <div className="flex items-center md:flex-col md:items-end gap-3">
                {/* On mobile, show smaller pill button */}
                <Button onClick={()=>router.push("/dashboard/fund")} className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-3 py-1 text-sm">
                  Add Money
                </Button>

              
              </div>
            </div>

            {/* subtle decorative svg in corner (smaller on mobile) */}
            <svg
              className="absolute right-0 top-0 -mr-8 -mt-8 w-36 h-36 opacity-18 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.06)" />
            </svg>
          </div>
        </div>
      </section>

      {/* rest of dashboard cards */}
      {/* Services grid (elegant icons + titles) */}
      <section className="mt-8">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { title: "Buy Data", key: "data" },
              { title: "Buy Airtime", key: "airtime" },
              { title: "Airtime 2 Cash", key: "airtime2cash" },
              { title: "Electricity Bill", key: "electricity" },
              { title: "Cable Subscription", key: "cable" },
              { title: "Bulk SMS", key: "sms" },
              { title: "Result Checker", key: "result" },
            ].map((s) => (
              <Link key={s.key} href={`/dashboard/${s.key}`} className="group">
                <div
                  role="button"
                  tabIndex={0}
                  className="bg-card/80 group-hover:bg-white group-hover:shadow-lg group-hover:scale-[1.02] transition-transform transition-colors duration-200 rounded-xl p-6 flex flex-col items-start gap-4 cursor-pointer"
                  aria-label={s.title}
                >
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    {/* service-specific icons */}
                    {s.key === "data" && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3v3" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M5 8c2-2 6-3 7-3s5 1 7 3" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M3 16c3-3 9-4 9-4s6 1 9 4" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}

                    {s.key === "airtime" && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12 1.01.37 2 .74 2.94a2 2 0 0 1-.45 2.11L9 10a12 12 0 0 0 6 6l1.22-1.22a2 2 0 0 1 2.11-.45c.94.37 1.93.62 2.94.74A2 2 0 0 1 22 16.92z" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}

                    {s.key === "airtime2cash" && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8v8" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="9" stroke="var(--primary)" strokeWidth="1.2" />
                        <path d="M8 12h8" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}

                    {s.key === "electricity" && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}

                    {s.key === "cable" && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="12" rx="2" stroke="var(--primary)" strokeWidth="1.4" />
                        <rect x="7" y="9" width="6" height="4" rx="1" stroke="var(--primary)" strokeWidth="1.4" />
                      </svg>
                    )}

                  

                    {s.key === "sms" && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="14" rx="2" stroke="var(--primary)" strokeWidth="1.4" />
                        <path d="M3 8l9 6 9-6" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}

                    {s.key === "result" && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l3 7H9l3-7z" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 22h14v-4H5v4z" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  <div className="text-sm font-medium text-card-foreground">
                    {s.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashClient;
