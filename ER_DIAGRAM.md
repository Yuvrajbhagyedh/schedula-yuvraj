# Schedula — ER Diagram (Day 1)

Entity–Relationship diagram for the **Schedula** doctor-appointment booking system.
The diagram below is written in Mermaid, so it renders automatically on GitHub and in the Pull Request.

## Diagram

```mermaid
erDiagram
    USER ||--o| PATIENT : "has profile"
    USER ||--o| DOCTOR : "has profile"
    USER ||--o{ NOTIFICATION : receives
    DOCTOR ||--o{ SLOT : offers
    DOCTOR ||--o{ APPOINTMENT : handles
    PATIENT ||--o{ APPOINTMENT : books
    SLOT ||--o| APPOINTMENT : "reserved by"

    USER {
        uuid id PK
        string name
        string email UK
        string password_hash
        enum role "patient | doctor | admin"
        string phone
        timestamp created_at
        timestamp updated_at
    }

    PATIENT {
        uuid id PK
        uuid user_id FK "one-to-one -> USER"
        date date_of_birth
        string gender
        string address
        string blood_group
    }

    DOCTOR {
        uuid id PK
        uuid user_id FK "one-to-one -> USER"
        string specialization
        int experience_years
        string qualification
        decimal consultation_fee
        string bio
        boolean is_verified
    }

    SLOT {
        uuid id PK
        uuid doctor_id FK "many-to-one -> DOCTOR"
        date slot_date
        time start_time
        time end_time
        enum status "available | booked | blocked"
    }

    APPOINTMENT {
        uuid id PK
        uuid patient_id FK "many-to-one -> PATIENT"
        uuid doctor_id FK "many-to-one -> DOCTOR"
        uuid slot_id FK "one-to-one -> SLOT"
        enum status "booked | completed | cancelled | rescheduled"
        string reason
        timestamp created_at
        timestamp updated_at
    }

    NOTIFICATION {
        uuid id PK
        uuid user_id FK "many-to-one -> USER"
        enum type "appointment | reminder | system"
        string message
        boolean is_read
        timestamp created_at
    }
```

## Entities & Relationships

| Entity | Purpose |
| --- | --- |
| **User** | Base account for authentication (email/password) and role. Every patient and doctor is a User. |
| **Patient** | Patient-specific profile; extends a User via a one-to-one link. |
| **Doctor** | Doctor-specific profile (specialization, fee, etc.); extends a User via a one-to-one link. |
| **Slot** | A bookable time window created by a Doctor for their availability. |
| **Appointment** | A booking made by a Patient with a Doctor for a specific Slot. |
| **Notification** | Messages/reminders delivered to a User (booking confirmed, reminder, etc.). |

### Relationship summary

- **User ⟷ Patient** — one-to-one (a user account maps to at most one patient profile).
- **User ⟷ Doctor** — one-to-one (a user account maps to at most one doctor profile).
- **User → Notification** — one-to-many (a user receives many notifications).
- **Doctor → Slot** — one-to-many (a doctor publishes many availability slots).
- **Doctor → Appointment** — one-to-many (a doctor handles many appointments).
- **Patient → Appointment** — one-to-many (a patient books many appointments).
- **Slot ⟷ Appointment** — one-to-one (a slot is reserved by at most one appointment).

### Foreign keys

- `PATIENT.user_id → USER.id`
- `DOCTOR.user_id → USER.id`
- `SLOT.doctor_id → DOCTOR.id`
- `APPOINTMENT.patient_id → PATIENT.id`
- `APPOINTMENT.doctor_id → DOCTOR.id`
- `APPOINTMENT.slot_id → SLOT.id`
- `NOTIFICATION.user_id → USER.id`
