export type ReportRequest = {
  patientId: string,
  securityCode: string
}

export type PdfRequest = {
  patientId: string,
  securityCode: string,
  documentId: string;
  repositoryId?: string;
}

export type DocumentMimeType =
  | 'application/pdf'
  | 'application/dicom'

export type ReportDocument = {
  documentId: string;
  repositoryId?: string;
  name: string;
  mimeType: DocumentMimeType;
  releaseDate: string;
  additionalInfo?: Record<string, string>;
  relatedDocuments?: ReportDocument[];
};

export type PdfDocumentRequest = {
  patientId: string,
  repositoryId?: string,
  securityCode: string
}

// TODO: verifica il tipo PdfDocument con BE
export type PdfDocument = {
  header: DocumentHeader;
  body: DocumentBody;
  attachments: Array<DocumentAttachment>;
}

export type DocumentHeader = {
  author?: DocumentAuthor;
  confidentiality?: string;
  creationDate: string;
  documentId: string;
  languageCode: string;
  // patient: Person;
  realmCode: string;
  title: string;
  typeDoc: string;
  typeId: string;
};

export type DocumentBody = {
  content: string;
  encodedBase64: boolean;
  mimeType: string;
};

export type DocumentAttachment = {
  content: string;
  fileName: string;
  encodedBase64: boolean;
  mimeType: string;
};

export type DocumentAuthor = {
  name: string;
  surname: string;
  fiscalCode: string;
  contacts: Array<string>;
};
