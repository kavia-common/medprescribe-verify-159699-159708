export type Role = "doctor" | "patient" | "pharmacy";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Prescription {
  id: string;
  code: string; // human-readable code or short hash for verification
  patientId?: string;
  patientName: string;
  doctorId?: string;
  doctorName?: string;
  drugName: string;
  dosage: string;
  instructions: string;
  issuedAt: string; // ISO timestamp
  expiresAt?: string; // ISO timestamp
  status?: "valid" | "invalid" | "expired" | "revoked" | "unknown";
  blockchainTx?: string; // signature or tx id
  onChainStatus?: "confirmed" | "finalized" | "pending" | "not_found";
}

export interface VerifyResult {
  code: string;
  valid: boolean;
  status: "valid" | "invalid" | "expired" | "revoked" | "unknown";
  blockchainTx?: string;
  onChainStatus?: "confirmed" | "finalized" | "pending" | "not_found";
  message?: string;
}
