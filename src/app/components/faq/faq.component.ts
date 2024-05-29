import { Component, OnInit } from '@angular/core';
import { FaqData } from '../../models/faq';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqList: FaqData[] | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.faqList = [{
      title: "Domande Frequenti",
      children: [{
        title: "Ho smarrito il codice ritiro, cosa devo fare?",
        content: "Se hai smarrito il tuo codice ritiro <b>NON è possibile</b> inviarne uno nuovo tramite email o comunicarlo telefonicamente per questioni di privacy.<br>Dovrai recarti in poliambulatorio con documento d'identità del richiedente per richiedere le nuove credenziali di accesso all'area riservata dedicata ai referti online."
      },
        {
          title: "Il codice ritiro è scaduto, come devo comportarmi?",
          content: "in base alle Linee Guida 19.11.2009 la disponibilità del referto on line dovrebbe essere limitata a massimo 45 giorni. <br><br> Se il codice ritiro è scaduto, invia una email a servizioclienti@casadellasalute.eu per richiedere la proroga della scadenza del codice con: <br><br> - Nome e cognome del paziende <br> - Prestazione eseguita <br> - Data della prestazione e sede <br> - Copia del documento d'identità del richiedente"
        }]
    }];
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
