import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Registration from "../../models/registration";

var signUp = (function() {
  var content = function(ctrl) {
    return [
      m(".pb-60", [
        m("figure", { class: "center-block display-table mboth-60" }, [
          m("a", { href:"/", config: m.route }, [
            m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
          ]),
          m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
        ]),
        m("h2", { class: "mt-0 mb-60 text-center text-white" }, "Create your account: you can get it for free!"),
        m(".card-wrapper sign center-block p-all-side-75", [
          m("p", { class: "text-dark--grey mb-45" }, "Already a member. ", [
            m("a", { href: "/signin", config: m.route, class: "btn-link" }, "Login!")
          ]),
          m("form", { class: "" }, [
            m.component(textField, {
              type: 'email',
              //placeholder: 'Enter your Email',
              id: 'email',
              dataLabel: 'Email',
              oninput: m.withAttr("value", Registration.model.email),
              error: ctrl.errors()['email'],
              fieldType: "",
              icon: "fa fa-user",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m.component(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password',
              dataLabel: 'Password',
              oninput: m.withAttr("value", Registration.model.password),
              error: ctrl.errors()['password'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m.component(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password_confirmation',
              dataLabel: 'Confirm Password',
              oninput: m.withAttr("value", Registration.model.password_confirmation),
              error: ctrl.errors()['password_confirmation'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m(".magic-checkbox--big mt-55", [
              m("input", {
                class: "magic-checkbox",
                type: "checkbox",
                name: "layout",
                // onclick: m.withAttr("checked", Session.model.remember_me),
                // checked: Session.model.remember_me(),
                id: "terms-conditions"
              }),
              m("label", { for: "terms-conditions", class: "weight-light" }, [
                "I accept the Terms of Service. ",
                m("a", {
                  class: "btn-link",
                  onclick: function() {
                    swal({
                      width: '650px',
                      confirmButtonText: 'I got it!',
                      //title: 'Testo',
                      text: "<div class='text-left'>" +
                              "<label>Termini e condizioni d’uso</label><br><br>" +
                              "Il presente documento disciplina i termini e le condizioni di utilizzo del presente portale. Se l’utente non intende aderire alle condizioni d’uso qui previste non può procedere alla registrazione e, quindi, accedere ai contenuti e alle funzionalità del portale stesso.<br><br>" +
                              "Zinkroo è una piattaforma web per la gestione delle sincronizzazioni video e immagini<br><br>" +
                              "La presente piattaforma è stata sviluppata da Axedyn Srl che ne è proprietaria.<br><br>" +
                              "La registrazione dell’utente presuppone che egli abbia preventivamente visionato le condizioni per la protezione e il trattamento dei dati personali, nonché l’informativa di cui all’art. 13 D.Lgs. n. 196/2003 e che abbia prestato il consenso al trattamento dei propri dati.<br><br>" +
                              "Le condizioni per la protezione e il trattamento dei dati personali si trovano in calce al presente documento.<br><br>" +
                              "L’utente è responsabile della correttezza e veridicità dei dati forniti all’atto della registrazione, nonché di ogni eventuale violazione di diritti e/o prerogative di terzi relativa, conseguente e/o connessa ai dati forniti all’atto della registrazione. L’utente registrato è esclusivo responsabile dell’utilizzo delle credenziali di accesso alla piattaforma – strettamente personali e non cedibili a terzi – nonché della relativa conservazione.<br><br>" +
                              "Axedyn Srl non può garantire il costante aggiornamento dei contenuti del sito, né che questi ultimi siano completi e privi di errori. Axedyn Srl non risponde pertanto di eventuali oneri, spese, perdite e/o danni che dovessero derivare all’utente dall’utilizzo e/o dall’impossibilità di utilizzare questo sito web, ovvero dalla circostanza che l’utente abbia fatto affidamento, in tutto o in parte, sui contenuti informativi/divulgativi del portale.<br><br>" +
                              "Il presente portale può contenere collegamenti e/o riferimenti a siti internet di terze parti, sui quali Axedyn Srl non ha alcun controllo. La sussistenza di eventuali collegamenti e/o riferimenti a siti internet di terze parti non equivale ad approvazione dei relativi contenuti da parte di Axedyn Srl, che non risponde pertanto della relativa attendibilità e correttezza, declinando ogni responsabilità rispetto a quanto offerto all’interno dei predetti siti.<br><br>" +
                              "Axedyn Srl si impegna ad adottare tutte le misure idonee e ragionevoli per proteggere il sito da worms, trojans e/o altre minacce (c.d. materiali nocivi). Pur adottando la massima diligenza, Axedyn Srl non può comunque garantire che il sito sia del tutto privo di materiali nocivi e declina, pertanto, ogni responsabilità in ordine a qualsivoglia perdita, spesa, onere e/o danno occorso all’utente a causa di materiali nocivi provenienti da questo portale, ovvero da eventuali collegamenti e/o riferimenti a siti di terze parti presenti sul sito. I contenuti pubblicati e/o resi disponibili sono tutelati dalla normativa sul diritto d’autore e della proprietà intellettuale. I contenuti pubblicati sul presente portale non possono pertanto essere copiati, salvo che per uso personale e non commerciale, senza apportare alcuna modifica ai contenuti stessi e mantenendo tutti gli avvisi e le indicazioni sulla titolarità del diritto d’autore e/o dei diritti di proprietà intellettuale, ivi comprese le clausole di esclusione da responsabilità in favore di Axedyn Srl qui disciplinate.<br><br>" +
                              "Axedyn Srl si impegna a garantire con continuità la funzionalità del sito, ma declina ogni responsabilità rispetto ad eventuali inconvenienti tecnici e/o a necessità di manutenzione tali da causare interruzioni alla funzionalità del sito. In ogni caso, Axedyn Srl si riserva il diritto di oscurare, modificare e/o interrompere (temporaneamente o definitivamente) una o più funzionalità del presente portale, in qualsiasi momento e senza preavviso agli utenti.<br><br>" +
                              "I termini e le condizioni di utilizzo del sito sono efficaci e vincolanti per l’utente dal momento dell’attivazione dell’account per l’accesso ai contenuti del portale. Per qualsiasi chiarimento e/o informazione circa i termini e le condizioni di utilizzo del sito, l’utente può rivolgersi per iscritto, in qualsiasi momento, al seguente indirizzo: privacy@axenso.com<br><br>" +
                              "Le presenti condizioni di utilizzo sono disciplinate dalla legge italiana. Qualsiasi controversia concernente i contenuti, l’interpretazione e/o l’esecuzione delle stesse è devoluta alla giurisdizione del Foro di Milano.<br><br>" +
                              "<label>Cooky Policy</label><br><br>" +
                              "Per cookie si intende un elemento testuale che viene inserito nel disco fisso di un computer solo in seguito ad autorizzazione. I cookies hanno la funzione di snellire l’analisi del traffico su web o di segnalare quando un sito specifico viene visitato e consentono alle applicazioni web di inviare informazioni a singoli utenti.<br><br>" +
                              "Nessun dato degli utenti viene in proposito acquisito dal sito.<br><br>" +
                              "Non viene fatto uso di cookies per la trasmissione di informazioni di carattere personale, ovvero sistemi per il tracciamento degli utenti.<br><br>" +
                              "I cookies utilizzati dal sito www.ecmclub.org sono i seguenti: cookiesDirective<br><br>" +
                              "Cookie utilizzato per rilevare se un utente ha accettato l’impiego di diverse categorie di cookies sul sito web. Si tratta di un cookie permanente, che viene eliminato se l’utente modifica le proprie impostazioni sui cookies.<br><br>" +
                              "Cookies utilizzati da Google Analytics per monitorare l’utilizzo del sito da parte degli utenti. Tutti i dati memorizzati sono in forma anonima e non correlabili al singolo utente. Non viene memorizzato nessun dato sensibile dell’utente, solamente la modalità di utilizzo del sito per migliorare il servizio offerto.<br>" +
                              "wordpress, wordpress_logged_in<br>" +
                              "Cookies tecnici per la gestione del login dell’utente.<br>" +
                              "wp-<br>" +
                              "Cookies tecnici per la gestione del backoffice del sito.<br>" +
                              "cookie-<br>" +
                              "Cookies tecnici per l’accesso ad alcune sezioni del sito.<br><br>" +
                              "Disabilitazione totale o parziale dei cookies<br>" +
                              "L’utente può decidere se accettare o meno i cookies utilizzando le impostazioni del proprio browser.<br>" +
                              "La disabilitazione totale o parziale dei cookies tecnici può compromettere l’utilizzo delle funzionalità del sito riservate agli utenti registrati. Al contrario, la fruibilità dei contenuti pubblici è possibile anche disabilitando completamente i cookies. Disabilitare i cookies “terze parti” non pregiudica in alcun modo la navigabilità. L’impostazione può essere definita in modo specifico per i diversi siti e applicazioni web. I migliori browser, infatti, consentono di definire impostazioni diverse per i cookies “proprietari” e per quelli di “terze parti”. Di seguito indichiamo come procedere alla disabilitazione dei cookies attraverso alcuni browser.<br><br>" +
                              "<label>Firefox:</label><br>" +
                              "<ul class='list-unstyled text-left'>" +
                                "<li>1.1. Apri Firefox</li>" +
                                "<li>1.2. Premi il pulsante “Alt” sulla tastiera</li>" +
                                "<li>1.3. Nella barra degli strumenti situata nella parte superiore del browser, seleziona “Strumenti” e successivamente “Opzioni”</li>" +
                                "<li>1.4. Seleziona quindi la scheda “Privacy”</li>" +
                                "<li>1.5. Vai su “Impostazioni Cronologia:” e successivamente su “Utilizza impostazioni personalizzate”. Deseleziona “Accetta i cookie dai siti” e salva le preferenze.</li>" +
                              "</ul>" +
                              "<label>Internet Explorer:</label><br>" +
                              "<ul class='list-unstyled text-left'>" +
                                "<li>2.1. Apri Internet Explorer</li>" +
                                "<li>2.2. Clicca sul pulsante “Strumenti” e quindi su “Opzioni Internet”</li>" +
                                "<li>2.3. Seleziona la scheda “Privacy” e sposta il dispositivo di scorrimento sul livello di privacy che desideri impostare (verso l’alto per bloccare tutti i cookies o verso il basso per consentirli tutti)</li>" +
                                "<li>2.4. Quindi clicca su OK</li>" +
                              "</ul>" +
                              "<label>Google Chrome:</label><br>" +
                              "<ul class='list-unstyled text-left'>" +
                                "<li>3.1. Apri Google Chrome</li>" +
                                "<li>3.2. Clicca sull’icona “Strumenti”</li>" +
                                "<li>3.3. Seleziona “Impostazioni” e successivamente “Impostazioni avanzate”</li>" +
                                "<li>3.4. Seleziona “Impostazioni dei contenuti” sotto la voce “Privacy”</li>" +
                                "<li>3.5. Nella scheda “Cookies” è possibile deselezionare i cookies e salvare le preferenze</li>" +
                              "</ul>" +
                              "<label>Safari:</label><br>" +
                              "<ul class='list-unstyled text-left'>" +
                                "<li>4.1. Apri Safari</li>" +
                                "<li>4.2. Scegli “Preferenze” nella barra degli strumenti, quindi seleziona il pannello “Sicurezza” nella finestra di dialogo che segue</li>" +
                                "<li>4.3. Nella sezione “Accetta cookie” è possibile specificare se e quando Safari deve salvare i cookies dai siti web. Per ulteriori informazioni clicca sul pulsante di Aiuto (contrassegnato da un punto interrogativo)</li>" +
                                "<li>4.4. Per maggiori informazioni sui cookies che vengono memorizzati sul vostro computer, clicca su “Mostra cookie”</li>" +
                              "</ul>" +
                              "<label>Privacy Policy</label><br><br>" +
                              "Nellʼambito dellʼespletamento del servizio reso, la società Axedyn S.r.l., con sede legale in Milano, via W. Tobagi, n. 8/a, acquisisce notizie riservate dagli utenti. Pertanto, conformemente a quanto previsto e contemplato dalla legge n. 196/2003, recante disposizioni per la tutela delle persone e di altri soggetti rispetto al trattamento dei dati personali, la stessa, quale titolare del trattamento, è tenuta ad illustrare le modalità di utilizzo delle informazioni in suo possesso. A tale riguardo, ai sensi dell’articolo 13 del D. Lgs 196/2013, si precisa che:<br><br>" +
                              "il trattamento dei dati in parola avviene con procedure idonee a garantire il rispetto del diritto alla riservatezza dell’utente e si articola nella loro raccolta, registrazione, organizzazione, conservazione, elaborazione, modificazione, selezione, estrazione, raffronto, utilizzo, interconnessione, blocco, comunicazione, diffusione, cancellazione, distruzione, anche mediante combinazione di due o più delle operazioni predette;<br>" +
                              "il trattamento stesso ha finalità unicamente connesse o strumentali al servizio fornito, e precisamente quelle di: raccogliere dati e notizie relative a ciascun utente essenziali per poter realizzare un effettivo programma personalizzato; ciò implica la necessità, per il sistema, di individuare e riconoscere il singolo utente e di memorizzare il suo percorso formativo e il punteggio raggiunto;<br>" +
                              "raccogliere dati ed informazioni in via generale e particolare sugli orientamenti e le preferenze dell’utente;<br>" +
                              "inviare messaggi a contenuto meramente informativo o contenenti offerte commerciali;<br>" +
                              "inviare materiale pubblicitario e informativo;<br>" +
                              "effettuare comunicazioni commerciali, anche interattive;<br>" +
                              "compiere attività dirette di collocamento di prodotti o servizi;<br>" +
                              "elaborare studi e ricerche statistiche su vendite, clienti e altre informazioni, ed eventualmente comunicare le stesse a terzi.<br>" +
                              "In relazione alle sopradescritte finalità, il trattamento dei dati personali avrà luogo prevalentemente con modalità automatizzate ed informatizzate, con logiche strettamente correlate alle finalità stesse e, comunque, sempre nel rispetto delle regole di riservatezza e di sicurezza previste dalla normativa vigente. I dati saranno conservati, per i termini di legge, presso la sede operativa della Axedyn S.r.l., in via W. Tobagi, n. 8/a, Milano e trattati da parte di dipendenti e/o professionisti da questa incaricati, i quali svolgono le suddette attività sotto la diretta supervisione del Titolare del trattamento. A tal fine, i dati stessi potranno essere trasmessi a soggetti esterni che svolgono funzioni strettamente connesse e strumentali all’operatività del servizio. Il conferimento del consenso al trattamento da parte dell’utente è facoltativo. Un eventuale rifiuto ad inserire le informazioni richieste nella pagina dedicata alla registrazione rende, però, impossibile lʼutilizzo del servizio.<br>" +
                              "Alla società Axedyn S.r.l., titolare del trattamento, lʼutente potrà rivolgersi per far valere i suoi diritti così come previsti dallʼart. 7 della legge n. 196/03, il cui testo si riporta integralmente qui di seguito:<br><br>" +
                              "Art. 7 Diritto di accesso ai dati personali ed altri diritti.<br><br>" +
                              "L’interessato ha diritto di ottenere la conferma dell’esistenza o meno di dati personali che lo riguardano, anche se non ancora registrati, e la loro comunicazione in forma intelligibile.<br><br>" +
                              "<label>L’interessato ha diritto di ottenere l’indicazione:</label>" +
                              "<ul class='list-unstyled'>" +
                                "<li>a) dell’origine dei dati personali;</li>" +
                                "<li>b) delle finalità e modalità del trattamento;</li>" +
                                "<li>c) della logica applicata in caso di trattamento effettuato con l’ausilio di strumenti elettronici;</li>" +
                                "<li>d) degli estremi identificativi del titolare, dei responsabili e del rappresentante designato ai sensi dell’articolo 5, comma 2;</li>" +
                                "<li>e) dei soggetti o delle categorie di soggetti ai quali i dati personali possono essere comunicati o che possono venirne a conoscenza in qualità di rappresentante designato nel territorio dello Stato, di responsabili o incaricati.</li>" +
                              "</ul>" +
                              "<label>L’interessato ha diritto di ottenere:</label>" +
                              "<ul class='list-unstyled'>" +
                                "<li>a) l’aggiornamento, la rettificazione ovvero, quando vi ha interesse, l’integrazione dei dati;</li>" +
                                "<li>b) la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge, compresi quelli di cui non è necessaria la conservazione in relazione agli scopi per i quali i dati sono stati raccolti o successivamente trattati;</li>" +
                                "<li>c) l’attestazione che le operazioni di cui alle lettere a) e b) sono state portate a conoscenza, anche per quanto riguarda il loro contenuto, di coloro ai quali i dati sono stati comunicati o diffusi, eccettuato il caso in cui tale adempimento si rivela impossibile o comporta un impiego di mezzi manifestamente sproporzionato rispetto al diritto tutelato.</li>" +
                              "</ul>" +
                              "<label>L’interessato ha diritto di opporsi, in tutto o in parte:</label>" +
                              "<ul class='list-unstyled'>" +
                                "<li>a) per motivi legittimi al trattamento dei dati personali che lo riguardano, ancorché pertinenti allo scopo della raccolta;</li>" +
                                "<li>b) al trattamento di dati personali che lo riguardano a fini di invio di materiale pubblicitario o di vendita diretta o per il compimento di ricerche di mercato o di comunicazione commerciale.</li>" +
                              "</ul>" +
                            "</div>"
                    }).catch(swal.noop);
                  }
                }, "Read more")
              ])
            ]),
            m("div", { class: "text-center" }, [
              m.component(feedbackButton, {
                action: ctrl.createUser,
                label: 'Register',
                feedbackLabel: 'Signing up...',
                style: 'btn btn-primary btn-lg btn-block mt-60'
              })
            ])
          ])
        ])
      ])
    ]
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.createUser = function(args) {
        return Registration.create(args).then(function() {
          m.route("/activate");
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default signUp;
