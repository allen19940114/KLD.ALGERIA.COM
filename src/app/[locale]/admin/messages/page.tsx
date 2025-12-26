"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Reply,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui";

interface Message {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface MessageResponse {
  data: Message[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AdminMessagesPage() {
  const t = useTranslations("admin");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", "20");

      const res = await fetch(`/api/messages?${params.toString()}`);
      const data: MessageResponse = await res.json();
      setMessages(data.data);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [pagination.page]);

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        if (selectedMessage === id) {
          setSelectedMessage(null);
        }
        fetchMessages();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = messages.find((m) => m.id === selectedMessage);

  // Auto-mark as read when selected
  useEffect(() => {
    if (selected && !selected.isRead) {
      handleMarkAsRead(selected.id, true);
    }
  }, [selectedMessage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("messages")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage contact form submissions
          </p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Messages */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="divide-y dark:divide-gray-800 max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No messages found
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      selectedMessage === message.id
                        ? "bg-gray-50 dark:bg-gray-800/50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.isRead ? (
                        <MailOpen className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`font-medium truncate ${
                              message.isRead
                                ? "text-gray-700 dark:text-gray-300"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {message.name}
                          </p>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {formatDate(message.createdAt).split(",")[0]}
                          </span>
                        </div>
                        <p
                          className={`text-sm truncate ${
                            message.isRead
                              ? "text-gray-500 dark:text-gray-500"
                              : "text-gray-700 dark:text-gray-300 font-medium"
                          }`}
                        >
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
          {selected ? (
            <>
              {/* Message Header */}
              <div className="p-6 border-b dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selected.subject}
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>From: {selected.name}</span>
                      <span>{selected.email}</span>
                    </div>
                    {selected.company && (
                      <p className="text-sm text-gray-500 mt-1">
                        Company: {selected.company}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {selected.isRead ? (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3" />
                        Unread
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selected.message}
                </p>

                <div className="mt-6 pt-6 border-t dark:border-gray-800">
                  <p className="text-sm text-gray-500 mb-4">
                    Received: {formatDate(selected.createdAt)}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      Reply
                    </a>
                    {selected.isRead ? (
                      <button
                        onClick={() => handleMarkAsRead(selected.id, false)}
                        className="inline-flex items-center gap-2 px-4 py-2 border dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        Mark as Unread
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsRead(selected.id, true)}
                        className="inline-flex items-center gap-2 px-4 py-2 border dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
