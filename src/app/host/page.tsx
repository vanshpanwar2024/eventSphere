"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { frontendEventService, CreateEventPayload } from "@/services/eventService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HostEventPage() {
  const [formData, setFormData] = useState<CreateEventPayload>({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    category: "",
    maxParticipants: 0,
    isPaid: false,
    ticketPrice: 0,
    isCollegeSpecial: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (name === "maxParticipants" || name === "ticketPrice" ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await frontendEventService.createEvent(formData);
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        dateTime: "",
        location: "",
        category: "",
        maxParticipants: 0,
        isPaid: false,
        ticketPrice: 0,
        isCollegeSpecial: false,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong while creating the event.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#070707] text-[#dcdcdc] font-sans pb-32">
      <Navbar />

      <section className="relative w-full pt-48 pb-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-8 h-[1px] bg-[#b49b5c]/50"></div>
          <span className="uppercase tracking-[0.2em] text-[#b49b5c] text-xs font-semibold">
            Host with us
          </span>
          <div className="w-8 h-[1px] bg-[#b49b5c]/50"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif tracking-wide text-white mb-6">
          Create an <span className="text-[#b49b5c] italic">Event</span>
        </h1>
        <p className="text-sm md:text-base text-[#8a8a8a] font-light max-w-xl mx-auto">
          Engineer an experience that your attendees will never forget. Fill in the details below to host your event on our platform.
        </p>
      </section>

      <section className="relative w-full max-w-3xl mx-auto px-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(180,155,92,0.02)]">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#b49b5c] flex items-center justify-center text-[#b49b5c] text-2xl mb-4">
                ✓
              </div>
              <h2 className="text-3xl font-serif text-white">Event Created Successfully</h2>
              <p className="text-[#8a8a8a]">Your event has been structured and placed on our platform.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-8 border border-white/20 text-[#dcdcdc] px-8 py-3 uppercase tracking-widest text-xs hover:border-[#b49b5c] hover:text-[#b49b5c] hover:bg-[#b49b5c]/5 transition-all duration-300"
              >
                Host Another Event
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="title" className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold">Event Title *</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#b49b5c] transition-colors"
                    placeholder="Enter the name of your event"
                  />
                </div>

                {/* Date & Time */}
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="dateTime" className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold">Date & Time *</label>
                  <DatePicker
                    id="dateTime"
                    selected={formData.dateTime ? new Date(formData.dateTime) : null}
                    onChange={(date: Date | null) => {
                      setFormData(prev => ({
                        ...prev,
                        dateTime: date ? date.toISOString() : ""
                      }));
                    }}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select date and time"
                    shouldCloseOnSelect={false}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#b49b5c] transition-colors"
                  />
                </div>

                {/* Event Classification */}
                <div className="space-y-4 md:col-span-2 border border-white/5 p-6 bg-[#0c0c0c]/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="uppercase tracking-widest text-xs text-[#b49b5c] font-bold block mb-1">Event Classification *</label>
                      <p className="text-[#8a8a8a] text-sm font-light">Is this a general event or a student-exclusive college special?</p>
                    </div>
                    <div className="flex items-center space-x-6">
                       <label className="flex items-center cursor-pointer group">
                         <input
                           type="radio"
                           name="isCollegeSpecial"
                           checked={!formData.isCollegeSpecial}
                           onChange={() => setFormData(prev => ({ ...prev, isCollegeSpecial: false }))}
                           className="sr-only"
                         />
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${!formData.isCollegeSpecial ? 'border-[#b49b5c] bg-[#b49b5c]/10' : 'border-white/20'}`}>
                           {!formData.isCollegeSpecial && <div className="w-1.5 h-1.5 rounded-full bg-[#b49b5c]"></div>}
                         </div>
                         <span className={`ml-2 text-xs uppercase tracking-widest ${!formData.isCollegeSpecial ? 'text-white' : 'text-[#666] group-hover:text-[#8a8a8a]'}`}>Standard</span>
                       </label>
                       
                       <label className="flex items-center cursor-pointer group">
                         <input
                           type="radio"
                           name="isCollegeSpecial"
                           checked={formData.isCollegeSpecial}
                           onChange={() => setFormData(prev => ({ ...prev, isCollegeSpecial: true }))}
                           className="sr-only"
                         />
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${formData.isCollegeSpecial ? 'border-[#b49b5c] bg-[#b49b5c]/10' : 'border-white/20'}`}>
                           {formData.isCollegeSpecial && <div className="w-1.5 h-1.5 rounded-full bg-[#b49b5c]"></div>}
                         </div>
                         <span className={`ml-2 text-xs uppercase tracking-widest ${formData.isCollegeSpecial ? 'text-white' : 'text-[#666] group-hover:text-[#8a8a8a]'}`}>College Special</span>
                       </label>
                    </div>
                  </div>
                </div>

                {/* Location / University */}
                <div className="space-y-2">
                  <label htmlFor="location" className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold">
                    {formData.isCollegeSpecial ? "University / College Name *" : "Location *"}
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#b49b5c] transition-colors"
                    placeholder={formData.isCollegeSpecial ? "Indian Institute of Technology, Bombay" : "Grand Auditorium, Mumbai"}
                  />
                </div>

                {/* Category / Type */}
                <div className="space-y-2">
                  <label htmlFor="category" className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold">
                    {formData.isCollegeSpecial ? "Fest Type *" : "Category *"}
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#b49b5c] transition-colors [&>option]:bg-[#0a0a0a]"
                  >
                    <option value="" disabled>Select a {formData.isCollegeSpecial ? "fest type" : "category"}</option>
                    {formData.isCollegeSpecial ? (
                      <>
                        <option value="Cultural Fest">Cultural Fest</option>
                        <option value="Technical Fest">Technical Fest</option>
                        <option value="Management Fest">Management Fest</option>
                        <option value="Design & Arts">Design & Arts</option>
                        <option value="Research Symposium">Research Symposium</option>
                        <option value="Sports & Athletics">Sports & Athletics</option>
                      </>
                    ) : (
                      <>
                        <option value="Tech">Tech</option>
                        <option value="Music">Music</option>
                        <option value="Food">Food</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Max Participants */}
                <div className="space-y-2">
                  <label htmlFor="maxParticipants" className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold">Max Participants *</label>
                  <input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    min="1"
                    required
                    value={formData.maxParticipants || ""}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#b49b5c] transition-colors"
                    placeholder="e.g. 500"
                  />
                </div>

                {/* Pricing Type Toggle */}
                <div className="space-y-4 md:col-span-2 border border-white/10 p-6 bg-[#0c0c0c]">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold block mb-1">Pricing Model *</label>
                      <p className="text-[#8a8a8a] text-sm">Will this event require attendees to purchase a ticket?</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPaid"
                        checked={formData.isPaid}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#b49b5c]"></div>
                      <span className="ml-3 text-sm font-medium text-white uppercase tracking-wider">{formData.isPaid ? 'Paid' : 'Free'}</span>
                    </label>
                  </div>

                  {formData.isPaid && (
                    <div className="pt-4 mt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                      <label htmlFor="ticketPrice" className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold">Ticket Price (₹) *</label>
                      <div className="relative mt-2">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b49b5c] font-serif text-lg">₹</span>
                        <input
                          id="ticketPrice"
                          name="ticketPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          required={formData.isPaid}
                          value={formData.ticketPrice || ""}
                          onChange={handleChange}
                          className="w-full bg-[#0a0a0a] border border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-[#b49b5c] transition-colors"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="uppercase tracking-widest text-xs text-[#8a8a8a] font-semibold">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#b49b5c] transition-colors resize-none"
                    placeholder="Provide detailed information about the experience..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full border border-[#b49b5c] text-[#b49b5c] py-4 uppercase tracking-widest text-sm hover:bg-[#b49b5c] hover:text-[#070707] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Host Event"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
