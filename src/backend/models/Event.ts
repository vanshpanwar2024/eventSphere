export class EventModel {
  private title: string;
  private description: string;
  private dateTime: Date;
  private location: string;
  private category: string;
  private maxParticipants: number;
  private isPaid: boolean;
  private ticketPrice?: number;
  private isCollegeSpecial: boolean;
  private brochureUrl?: string;
  private thumbnailUrl?: string;

  constructor(data: {
    title: string;
    description: string;
    dateTime: Date | string;
    location: string;
    category: string;
    maxParticipants: number;
    isPaid?: boolean;
    ticketPrice?: number;
    isCollegeSpecial?: boolean;
    brochureUrl?: string;
    thumbnailUrl?: string;
  }) {
    this.title = data.title;
    this.description = data.description;
    this.dateTime = new Date(data.dateTime);
    this.location = data.location;
    this.category = data.category;
    this.maxParticipants = Number(data.maxParticipants);
    this.isPaid = Boolean(data.isPaid);
    this.isCollegeSpecial = Boolean(data.isCollegeSpecial);
    this.brochureUrl = data.brochureUrl;
    this.thumbnailUrl = data.thumbnailUrl;
    if (this.isPaid) {
      this.ticketPrice = data.ticketPrice ? Number(data.ticketPrice) : 0;
    } else {
      this.ticketPrice = undefined;
    }
  }

  // Getters
  public getTitle(): string { return this.title; }
  public getDescription(): string { return this.description; }
  public getDateTime(): Date { return this.dateTime; }
  public getLocation(): string { return this.location; }
  public getCategory(): string { return this.category; }
  public getMaxParticipants(): number { return this.maxParticipants; }
  public getIsPaid(): boolean { return this.isPaid; }
  public getTicketPrice(): number | undefined { return this.ticketPrice; }
  public getIsCollegeSpecial(): boolean { return this.isCollegeSpecial; }
  public getBrochureUrl(): string | undefined { return this.brochureUrl; }
  public getThumbnailUrl(): string | undefined { return this.thumbnailUrl; }

  // Validation
  public validate(): string[] {
    const errors: string[] = [];
    if (!this.title || this.title.trim().length === 0) errors.push("Title is required.");
    if (!this.description || this.description.trim().length === 0) errors.push("Description is required.");
    if (!this.dateTime || isNaN(this.dateTime.getTime())) errors.push("Valid Date and Time are required.");
    else if (this.dateTime < new Date()) errors.push("Event date cannot be in the past.");
    if (!this.location || this.location.trim().length === 0) errors.push("Location is required.");
    if (!this.category || this.category.trim().length === 0) errors.push("Category is required.");
    if (!this.maxParticipants || isNaN(this.maxParticipants) || this.maxParticipants <= 0) errors.push("Max participants must be a positive number.");

    if (this.isPaid) {
      if (this.ticketPrice === undefined || isNaN(this.ticketPrice) || this.ticketPrice < 0) {
        errors.push("A valid non-negative ticket price is required for paid events.");
      }
    }

    return errors;
  }

  // Convert to JSON
  public toJSON() {
    return {
      title: this.title,
      description: this.description,
      dateTime: this.dateTime.toISOString(),
      location: this.location,
      category: this.category,
      maxParticipants: this.maxParticipants,
      isPaid: this.isPaid,
      ticketPrice: this.ticketPrice,
      isCollegeSpecial: this.isCollegeSpecial,
      brochureUrl: this.brochureUrl,
      thumbnailUrl: this.thumbnailUrl,
    };
  }
}
