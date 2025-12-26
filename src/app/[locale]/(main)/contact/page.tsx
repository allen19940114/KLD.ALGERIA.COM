"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t("info.address"),
      content: "123 Business District, Algiers, Algeria",
    },
    {
      icon: Phone,
      title: t("info.phone"),
      content: "+213 123 456 789",
      href: "tel:+213123456789",
    },
    {
      icon: Mail,
      title: t("info.email"),
      content: "info@kld-algeria.com",
      href: "mailto:info@kld-algeria.com",
    },
    {
      icon: Clock,
      title: t("info.hours"),
      content: "Sunday - Thursday: 8:00 AM - 5:00 PM",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t("form.success")}
                  </p>
                  <Button onClick={() => setIsSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("form.name")} *
                      </label>
                      <Input
                        name="name"
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("form.email")} *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("form.phone")}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="+213 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("form.company")}
                      </label>
                      <Input
                        name="company"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("form.subject")}
                    </label>
                    <Input
                      name="subject"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("form.message")} *
                    </label>
                    <Textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Your message..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("form.submit")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("info.title")}
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-xl overflow-hidden border dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white p-4 border-b dark:border-gray-700">
                  {t("map.title")}
                </h3>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">Map Integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Offices
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "Algiers",
                type: "Head Office",
                address: "123 Business District, Algiers",
                phone: "+213 123 456 789",
              },
              {
                city: "Hassi Messaoud",
                type: "Regional Office",
                address: "Oil Field Zone, Hassi Messaoud",
                phone: "+213 987 654 321",
              },
              {
                city: "Oran",
                type: "Branch Office",
                address: "456 Industrial Zone, Oran",
                phone: "+213 555 123 456",
              },
            ].map((office, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {office.city}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {office.type}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {office.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {office.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
