export class EventModel {
  private title: string;
  private description: string;
  private dateTime: Date;
  private location: string;
  private category: string;
  private maxParticipants: number;

  constructor(data: {
    title: string;
    description: string;
    dateTime: Date | string;
    location: string;
    category: string;
    maxParticipants: number;
  }) {
    this.title = data.title;
    this.description = data.description;
    this.dateTime = new Date(data.dateTime);
    this.location = data.location;
    this.category = data.category;
    this.maxParticipants = Number(data.maxParticipants);
  }

  // Getters
  public getTitle(): string { return this.title; }
  public getDescription(): string { return this.description; }
  public getDateTime(): Date { return this.dateTime; }
  public getLocation(): string { return this.location; }
  public getCategory(): string { return this.category; }
  public getMaxParticipants(): number { return this.maxParticipants; }

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
    };
  }
}
