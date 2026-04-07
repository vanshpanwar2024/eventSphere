/** Maps in-memory hosted event records to the same shape as `eventsData` for list/detail UI. */

export interface DisplayEvent {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  price: string;
  image: string;
  description: string;
  organizer: string;
  time: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
  Tech: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  Music: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
  Food: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  Fashion: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  Business: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  Design: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "Health & Wellness": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80";

export function mapHostedRecordToDisplayEvent(record: {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  category: string;
  maxParticipants: number;
  isPaid?: boolean;
  ticketPrice?: number;
}): DisplayEvent {
  const dateObj = new Date(record.dateTime);
  const date = dateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    id: record.id,
    title: record.title,
    category: record.category,
    date,
    location: record.location,
    price: record.isPaid && record.ticketPrice !== undefined ? `₹${record.ticketPrice.toLocaleString("en-IN")}` : "Free",
    image: CATEGORY_IMAGES[record.category] ?? DEFAULT_IMAGE,
    description: record.description,
    organizer: "Event Sphere Host",
    time,
  };
}
