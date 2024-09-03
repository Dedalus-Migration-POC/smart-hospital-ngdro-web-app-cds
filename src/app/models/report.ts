export enum MimeTypeEnum {
  PDF = 'application/pdf',
  DICOM = 'application/dicom',
}

export enum Repository {
  EXTERNAL_DICOM = 'external-dicom',
  ZEEROMED = 'zeeromed',
}

export enum ReportStatus {
  COMPLETE = 'completo',
  PARTIAL = 'parziale',
}

// Find documents

export type ReportRequest = {
  patientId: string;
  securityCode: string;
};

export type Report = {
  documentId: string;
  repositoryId: string;
  referenceId?: string;
  name: string;
  mimeType: DocumentMimeType;
  releaseDate: string;
  relatedDocuments?: Report[];
  additionalInfo: {
    size: string;
    'result-status': ReportStatus;
  };
};

export type DocumentMimeType = 'application/pdf' | 'application/dicom';

// Retrieve documents

export type PdfRequest = {
  documentId: string;
  repositoryId: string;
};

export type PdfReport = {
  header: Header;
  body: Body;
};

export type Header = {
  documentId: string;
};

export type Body = {
  mimeType: DocumentMimeType;
  fileName: string;
  content: string;
  encodedBase64: boolean;
};

export type LinkExternalDicom = {
  body: BodyLinkDicom;
};

export type BodyLinkDicom = {
  mimeType: DocumentMimeType;
  encodedBase64: boolean;
  downloadUrl: string;
};

export interface Dicom {
  name: string;
  url: string;
}

// Error

export type ErrorResponse = {
  correlationId: string;
  errorCode: string;
  errorMessage: string;
  description: string;
  datetime: string;
};
