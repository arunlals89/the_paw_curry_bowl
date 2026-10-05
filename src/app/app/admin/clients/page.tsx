"use client";

import { useMemo, useState } from "react";

import { AdminShell } from "@/components/app/AdminShell";
import { Button } from "@/components/app/Button";
import { TextField } from "@/components/app/TextField";
import { PhoneIcon, SearchIcon, WhatsAppIcon } from "@/components/app/icons";
import { useAppState } from "@/components/app/state";
import type { SubscriptionStatus } from "@/components/app/constants";
import { whatsappLink } from "@/lib/whatsapp";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-paw-green-light text-paw-green-dark",
  paused: "bg-paw-yellow-light text-[#9a7418]",
  cancelled: "bg-black/5 text-bark-soft",
};

const STATUS_OPTIONS: SubscriptionStatus[] = ["active", "paused", "cancelled"];

export default function AdminClientsScreen() {
  const { clients, addClient, updateClient, removeClient } = useAppState();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPlan, setEditPlan] = useState("");
  const [editStatus, setEditStatus] = useState<SubscriptionStatus>("active");
  const [editWallet, setEditWallet] = useState("");
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPlan, setNewPlan] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((client) => client.name.toLowerCase().includes(q));
  }, [clients, query]);

  const startEdit = (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (!client) return;
    setEditingId(id);
    setEditName(client.name);
    setEditPhone(client.phone);
    setEditPlan(client.plan);
    setEditStatus(client.status);
    setEditWallet(String(client.walletBalance));
  };

  const saveEdit = (id: string) => {
    updateClient(id, {
      name: editName.trim(),
      phone: editPhone.trim(),
      plan: editPlan.trim(),
      status: editStatus,
      walletBalance: Number(editWallet) || 0,
    });
    setEditingId(null);
  };

  const submitNewClient = () => {
    if (!newName.trim()) return;
    addClient({
      name: newName.trim(),
      phone: newPhone.trim(),
      plan: newPlan.trim() || "Pawrfect",
      status: "active",
      walletBalance: 0,
      sinceMonths: 0,
      pets: [],
    });
    setNewName("");
    setNewPhone("");
    setNewPlan("");
    setCreating(false);
  };

  return (
    <AdminShell title="Clients" subtitle={`${clients.length} total`}>
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
            const isOpen = expanded === client.id;
            const isEditing = editingId === client.id;
            return (
              <div key={client.id} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
                <button
                  onClick={() => setExpanded(isOpen ? null : client.id)}
                  className="flex items-center justify-between text-left"
                >
                  <div>
                    <p className="text-sm font-bold text-bark">{client.name}</p>
                    <p className="text-xs text-bark-soft">
                      {client.plan} · {client.pets.length} pet{client.pets.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${STATUS_STYLES[client.status]}`}
                  >
                    {client.status}
                  </span>
                </button>

                {isOpen && !isEditing ? (
                  <div className="flex flex-col gap-3 border-t border-black/5 pt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-bark-soft">
                        <PhoneIcon size={14} /> {client.phone}
                      </span>
                      <span className="text-bark-soft">Client for {client.sinceMonths}mo</span>
                    </div>
                    <a
                      href={whatsappLink(
                        client.phone,
                        `Hi ${client.name.split(" ")[0]}, this is The Paw Curry Bowl 🐾`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 rounded-xl bg-paw-green-light px-3 py-2.5 text-xs font-bold text-paw-green-dark"
                    >
                      <WhatsAppIcon size={15} />
                      Message on WhatsApp
                    </a>
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
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Button variant="secondary" onClick={() => startEdit(client.id)}>
                          Edit client
                        </Button>
                      </div>
                      <div className="flex-1">
                        <Button
                          variant="ghost"
                          className="text-paw-red"
                          onClick={() => removeClient(client.id)}
                        >
                          Delete client
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {isEditing ? (
                  <div className="flex flex-col gap-3 border-t border-black/5 pt-3">
                    <TextField label="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <TextField label="Phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                      <TextField label="Plan" value={editPlan} onChange={(e) => setEditPlan(e.target.value)} />
                      <TextField
                        label="Wallet (₹)"
                        type="number"
                        value={editWallet}
                        onChange={(e) => setEditWallet(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      {STATUS_OPTIONS.map((status) => (
                        <button
                          key={status}
                          onClick={() => setEditStatus(status)}
                          className={`flex-1 rounded-xl border py-2 text-xs font-semibold capitalize transition ${
                            editStatus === status
                              ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                              : "border-black/10 bg-white text-bark"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => saveEdit(client.id)}>Save</Button>
                      <Button variant="ghost" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {creating ? (
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-sm font-bold text-bark">Add client</p>
            <TextField label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <TextField label="Phone" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
            <TextField label="Plan" value={newPlan} onChange={(e) => setNewPlan(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={submitNewClient}>Add client</Button>
              <Button variant="ghost" onClick={() => setCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setCreating(true)}>
            + Add client
          </Button>
        )}
      </div>
    </AdminShell>
  );
}
