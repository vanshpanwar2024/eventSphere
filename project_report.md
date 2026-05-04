# **EVENTSPHERE PROJECT REPORT**



**EventSphere: A Smart Event Management and Booking Platform**

Submitted by:

* Prateek Shakya (2401020048)
* Drishti Jha (2401010162)
* Aryan (2401010101)
* Nishtha Gupta (2401010303)
* Vansh Panwar (2401010494)

Under the guidance of:
SDSE Team

Submitted in partial fulfillment of the requirements for the degree of
[B.Tech/CSE]

Rishihood University/Newton school of technology 
- 2nd Year

---

## **Declaration**

We hereby declare that the project titled **“EventSphere: A Smart Event Management and Booking Platform”** is our original work and has been carried out under proper supervision. This work has not been submitted elsewhere for any degree or academic requirement.

---

## **Acknowledgement**

We would like to express our sincere gratitude to our project guide for their continuous support and guidance throughout the development of this project. We also thank our institution for providing the necessary resources and environment to successfully complete this work.

---

## **Abstract**

EventSphere is a web-based platform designed to simplify event discovery, hosting, and participation. The system enables users to browse events, host their own events, and securely book tickets through an integrated payment gateway.

The platform incorporates features such as OTP-based student verification, admin moderation, and QR-based digital passes to ensure secure and efficient event management. Built using a layered architecture with modern web technologies, the system ensures scalability, modularity, and maintainability.

---

## **Table of Contents**

1. Introduction
2. Objectives
3. Problem Statement
4. Methodology
5. System Architecture
6. System Implementation
7. OOP Concepts
8. Design Patterns
9. SOLID Principles
10. Database Design
11. Testing
12. Results and Analysis
13. Conclusion
14. Future Scope

---

## **1. Introduction**

In today’s digital environment, event management systems are often fragmented and inefficient. Many platforms lack proper verification mechanisms, secure booking systems, and structured workflows for event hosting.

EventSphere addresses these challenges by providing a unified platform where users can discover events, host events, verify identity, and book tickets securely.

---

## **2. Objectives**

* To develop a centralized platform for event discovery
* To enable users to host and manage events
* To implement secure authentication and student verification
* To integrate a payment gateway for ticket booking
* To generate QR-based digital passes
* To provide admin moderation for event approval

---

## **3. Problem Statement**

Existing event platforms lack reliability, security, and proper validation mechanisms. Fake listings, unverified users, and inefficient booking systems reduce user trust.

The objective is to design a scalable system that ensures:

* Secure event hosting
* Verified user participation
* Efficient booking and payment processing
* Administrative control over event approval

---

## **4. Methodology**

The project follows a layered architecture approach consisting of:

* Controller Layer
* Service Layer
* Repository Layer
* Database Layer

Development was carried out in phases:

1. Requirement Analysis
2. System Design
3. Implementation
4. Testing
5. Deployment

---

## **5. System Architecture**

The system is built using a modular architecture where each layer has a specific responsibility:

* Controller handles request and response
* Service contains business logic
* Repository manages database operations
* Database stores application data

This separation ensures scalability and maintainability.

---

## **6. System Implementation**

### **6.1 Event Discovery**

Users can browse events through an API-based system that combines static and hosted events.

### **6.2 Event Details**

Detailed pages are generated dynamically using both static data and database queries.

### **6.3 Event Hosting**

Users can create events through a submission form, processed via backend APIs.

### **6.4 Admin Moderation**

Admins can approve or reject events using dedicated endpoints.

### **6.5 Student Verification**

OTP-based verification ensures only valid users can access certain features.

### **6.6 Payment and Digital Pass**

Payment integration is implemented, and QR-based digital passes are generated after successful transactions.

---

## **7. Object-Oriented Programming Concepts**

* **Encapsulation:** Data is protected using private fields
* **Abstraction:** Base classes define common structure
* **Inheritance:** Models extend base classes
* **Polymorphism:** Methods are overridden for flexibility

---

## **8. Design Patterns**

* Repository Pattern for database abstraction
* Dependency Injection for better modularity
* Separation of Concerns across layers

---

## **9. SOLID Principles**

* Single Responsibility Principle
* Open Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion Principle

---

## **10. Database Design**

The system uses a structured database with the following tables:

* Events Table
* Student Verification Table

The database ensures efficient storage and retrieval of event and user data.

---

## **11. Testing**

* API testing for validation
* Event listing verification
* Admin functionality testing
* Verification system testing
* Payment workflow testing

---

## **12. Results and Analysis**

The system successfully provides:

* Real-time event listing
* Secure event booking
* OTP-based verification
* QR-based ticket generation

### Key Performance Indicators:

* Reduction in fake event listings
* Improved booking efficiency
* Faster event access using QR passes

---

## **13. Conclusion**

EventSphere provides a complete and scalable solution for event management by integrating discovery, hosting, verification, and booking into a single platform. The system demonstrates strong implementation of software engineering principles and real-world applicability.

---

## **14. Future Scope**

* AI-based event recommendation system
* Mobile application development
* Advanced analytics dashboard
* Multi-language support

