"use client";

import { useMemo, useState } from "react";

import { AdminShell } from "@/components/app/AdminShell";
import { PhoneIcon, SearchIcon } from "@/components/app/icons";
import { ADMIN_CLIENTS } from "@/components/app/demo-data";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-paw-green-light text-paw-green-dark",
  paused: "bg-paw-yellow-light text-[#9a7418]",
  cancelled: "bg-black/5 text-bark-soft",
};

export default function AdminClientsScreen() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ADMIN_CLIENTS;
    return ADMIN_CLIENTS.filter((client) => client.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <AdminShell title="Clients" subtitle={`${ADMIN_CLIENTS.length} total`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5">
          <SearchIcon size={16} className="text-bark-soft/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients"
            className="w-full bg-transparent text-sm text-bark placeholder:text-bark-soft/50 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          {filtered.map((client) => {
            const isOpen = expanded === client.name;
            return (
              <button
                key={client.name}
                onClick={() => setExpanded(isOpen ? null : client.name)}
                className="flex flex-col gap-2 rounded-2xl bg-white p-4 text-left shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-bark">{client.name}</p>
                    <p className="text-xs text-bark-soft">
                      {client.plan} · {client.pets.length} pet{client.pets.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${STATUS_STYLES[client.status]}`}
                  >
                    {client.status}
                  </span>
                </div>

                {isOpen ? (
                  <div className="flex flex-col gap-3 border-t border-black/5 pt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-bark-soft">
                        <PhoneIcon size={14} /> {client.phone}
                      </span>
                      <span className="text-bark-soft">Client for {client.sinceMonths}mo</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-paw-orange-light/40 px-3 py-2">
                      <span className="text-xs text-bark-soft">Wallet balance</span>
                      <span className="text-sm font-bold text-paw-orange-dark">₹{client.walletBalance}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {client.pets.map((pet) => (
                        <div key={pet.name} className="rounded-xl bg-cream-dark/40 px-3 py-2">
                          <p className="text-sm font-semibold text-bark">
                            {pet.name} <span className="font-normal text-bark-soft">· {pet.breed}</span>
                          </p>
                          {pet.allergies.length > 0 ? (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {pet.allergies.map((a) => (
                                <span
                                  key={a}
                                  className="rounded-full bg-paw-red-light px-2 py-0.5 text-[10px] font-bold uppercase text-paw-red"
                                >
                                  No {a}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-1 text-[11px] text-bark-soft/60">No allergies on file</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
