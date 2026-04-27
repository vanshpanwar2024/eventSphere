
# EventSphere Project Report

## 1. Problem Statement

EventSphere is a web application designed to provide the following functionalities:

* Listing and browsing events through a user interface that fetches data from an API
* Displaying detailed pages for both static events and user hosted events
* Allowing users to create and host events through a submission form
* Providing an admin moderation system to approve or decline hosted events
* Supporting authentication using NextAuth with Google and credentials
* Enabling student verification using OTP with persistence
* Integrating a payment interface using Razorpay
* Generating QR based digital passes after successful payment

---

## 2. Solution Approach

### Event Discovery

The frontend fetches events using the endpoint:

GET /api/events

The backend combines:

* Hosted events stored in the database
* Static events stored locally

Hosted events are transformed into a display format before being returned to the frontend.

---

### Event Details

The system retrieves event details by:

* Checking static event data
* Querying hosted events using the repository layer

The event details page also includes a booking component for user interaction.

---

### Event Hosting

Users submit event details through a form which triggers:

POST /api/events/create

The backend processes the request through multiple layers:

Controller to Service to Model validation to Repository to Database (Supabase)

---

### Admin Moderation

Admin functionality includes:

GET /api/admin/events
PATCH /api/admin/events/:id/status

Admins can review and update the status of hosted events through the interface.

---

### Student Verification

Student verification is handled using OTP:

POST /api/send-otp

Verification data is stored and retrieved using:

/api/user/verify-student

This enables conditional access to certain features such as booking.

---

### Payments and Digital Pass

Payment processing is integrated using Razorpay:

POST /api/create-razorpay-order

After successful payment, a digital pass is generated containing a QR code for event access.

---

## 3. System Architecture

### Architecture Style

The application is built using Next.js App Router for both frontend and backend APIs. The backend follows a layered architecture:

Controller to Service to Repository to Database

---

### Layer Responsibilities

Controller handles HTTP requests and responses
Service contains business logic
Repository manages database interactions
Model defines data structure and validation

---

### Dependency Injection

Dependencies are managed using a container-based approach for structured instantiation and usage across layers.

---

### Example Flow

Event creation follows this sequence:

Frontend Form Submission to API Route to Controller to Service to Model Validation to Repository to Supabase Database

---

### Performance Considerations

The application uses dynamic data fetching strategies and ensures real-time updates for event listings and details.

---

## 4. Object Oriented Programming Concepts

Encapsulation is implemented through private fields in the EventModel class with public getter methods.

Abstraction is achieved using abstract classes such as BaseEntity and BaseRepository.

Inheritance is used where EventModel extends BaseEntity and EventRepository extends BaseRepository.

Polymorphism is demonstrated through implementation of abstract methods such as validate and toJSON in EventModel.

---

## 5. Design Patterns

Repository Pattern is used to abstract database operations from business logic.

Dependency Injection is implemented to manage dependencies across different layers.

The structure also reflects separation of concerns across controllers, services, and data layers.

---

## 6. SOLID Principles

Single Responsibility Principle is followed by separating concerns across controllers, services, and repositories.

Open Closed Principle is supported through reusable base classes and extensible architecture.

Liskov Substitution Principle is maintained through proper inheritance hierarchies.

Interface Segregation Principle is supported through use of specific interfaces for repositories.

Dependency Inversion Principle is followed by depending on abstractions rather than concrete implementations.

---

## 7. UML Diagrams

### Class Structure

BaseEntity is an abstract class extended by EventModel.
BaseRepository is extended by EventRepository.
EventService depends on the repository interface.
EventController depends on the service layer.

---

### Use Cases

Visitor can browse and view events.
Authenticated user can log in, host events, verify student status, and make payments.
Admin can approve or decline hosted events.

---

### Sequence Flow

Event creation follows:

User submits form to API to Controller to Service to Model Validation to Repository to Database

---

### Entity Relationship

The system uses two main tables:

events table containing event details
student_verifications table containing verification data

---

## 8. Database Design

The application uses Supabase as the database.

Tables used:

events
student_verifications

The database supports event storage and user verification functionality.

---

## 9. Test Cases

API validation ensures correct handling of event data inputs.

Event listing ensures availability of both static and hosted events.

Admin functionality supports status updates for hosted events.

Student verification ensures correct persistence and retrieval of verification data.

Order related functionality provides structured data responses for user interaction.

---

## 10. Conclusion

EventSphere is a structured web application built using a layered architecture approach. It effectively integrates frontend and backend components while applying object oriented programming principles and design patterns.

The system provides a complete workflow for event discovery, hosting, moderation, verification, payment, and access through digital passes, demonstrating a well organized and scalable application design.
