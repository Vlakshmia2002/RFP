-- ============================================================
-- PostgreSQL schema for AI-Powered RFP System
-- Matches folder structure using /models instead of Prisma
-- ============================================================



-- ----------------------------
-- RFP TABLE
-- ----------------------------
CREATE TABLE rfps (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    total_budget NUMERIC,
    delivery_days INTEGER,
    terms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- VENDOR TABLE
-- ----------------------------
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- PROPOSAL TABLE
-- ----------------------------
CREATE TABLE proposals (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL,
    rfp_id INTEGER NOT NULL,

    raw_email TEXT NOT NULL,
    parsed_json JSONB,
    total_price NUMERIC,
    terms TEXT,
    response_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    CONSTRAINT fk_rfp FOREIGN KEY (rfp_id) REFERENCES rfps(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_vendor_email ON vendors(email);
CREATE INDEX idx_proposal_rfp ON proposals(rfp_id);
CREATE INDEX idx_proposal_vendor ON proposals(vendor_id);
