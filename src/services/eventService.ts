export interface CreateEventPayload {
  title: string;
  description: string;
  dateTime: string;
  location: string;
  category: string;
  maxParticipants: number;
  isPaid: boolean;
  ticketPrice?: number;
  isCollegeSpecial: boolean;
  brochureUrl?: string;
  thumbnailUrl?: string;
}

export const frontendEventService = {
  createEvent: async (data: CreateEventPayload) => {
    const response = await fetch("/api/events/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create event.");
    }

    return response.json();
  },
};
