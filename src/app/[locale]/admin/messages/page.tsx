"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Reply,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui";

export default function AdminMessagesPage() {
  const t = useTranslations("admin");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const messages = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      company: "ABC Energy Corp",
      subject: "Inquiry about SCADA solutions",
      message: "Hello, I am interested in learning more about your SCADA solutions for our oil field operations. Could you please provide more information about your offerings and pricing?",
      date: "2025-12-25 10:30",
      isRead: false,
    },
    {
      id: "2",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@sonatrach.dz",
      company: "Sonatrach",
      subject: "Partnership Discussion",
      message: "We would like to schedule a meeting to discuss potential partnership opportunities in digital transformation projects.",
      date: "2025-12-24 15:45",
      isRead: false,
    },
    {
      id: "3",
      name: "Marie Dupont",
      email: "marie.dupont@totalenergies.com",
      company: "TotalEnergies",
      subject: "Technical Support Request",
      message: "We are experiencing some issues with the analytics dashboard. Could you please arrange for technical support?",
      date: "2025-12-23 09:15",
      isRead: true,
    },
    {
      id: "4",
      name: "Li Wei",
      email: "li.wei@cnpc.com",
      company: "CNPC",
      subject: "Project Update Request",
      message: "Please provide an update on the current project status and timeline for the next phase.",
      date: "2025-12-22 14:20",
      isRead: true,
    },
    {
      id: "5",
      name: "Fatima Benali",
      email: "fatima.benali@gmail.com",
      company: "",
      subject: "Career Inquiry",
      message: "I am interested in career opportunities at KLD Algeria. I have 5 years of experience in software development.",
      date: "2025-12-21 11:00",
      isRead: true,
    },
  ];

  const selected = messages.find((m) => m.id === selectedMessage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("messages")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage contact form submissions
        </p>
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
                className="pl-10"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="divide-y dark:divide-gray-800 max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
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
                      <p className={`font-medium truncate ${
                        message.isRead
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-gray-900 dark:text-white"
                      }`}>
                        {message.name}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {message.date.split(" ")[0]}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      message.isRead
                        ? "text-gray-500 dark:text-gray-500"
                        : "text-gray-700 dark:text-gray-300 font-medium"
                    }`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {message.message}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
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
                    Received: {selected.date}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      Reply
                    </a>
                    <button className="inline-flex items-center gap-2 px-4 py-2 border dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <CheckCircle className="h-4 w-4" />
                      Mark as Read
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
