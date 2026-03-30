import InsetHero from '../sections/InsetHero';
import USPHero from '../sections/USPHero';
import TextImage from '../sections/TextImage';
import StepFlowMini from '../sections/StepFlowMini';
import FaqAccordion from '../sections/FaqAccordion';
import DE_HI_DelfiMock from '../assets/images/DE_HI_DelfiMock.jpg';
import _1_1_SchufaBadgeSmall from '../assets/images/1.1_SchufaBadgeSmall.png';
import _1_1_0SchufaScore__2_ from '../assets/images/1.1_0SchufaScore (2).png';
import _1_1_DE_2AppPerspective from '../assets/images/1.1_DE_2AppPerspective.png';
import _1_1_DE_AnyfinAppAngebotNoti from '../assets/images/1.1_DE_AnyfinAppAngebotNoti.png';

export default function Schufa() {
  return (
    <main>
      <InsetHero
        heading={"Eine Anfrage ist SCHUFA-neutral"}
        body={"Überprüfe, wie viel du sparen kannst, ohne deine Kreditwürdigkeit zu beeinflussen."}
        primaryCtaLabel={"Jetzt anfragen"}
        secondaryCtaLabel={"App herunterladen"}
        mobileSecondaryCtaLabel={"In der App anfragen"}
        backgroundImage={DE_HI_DelfiMock}
        cardStackImage={_1_1_SchufaBadgeSmall}
       />

      <USPHero
        usps={[
            { icon: "users", title: "Vertraut von Tausenden", description: "Tausende Kund:innen nutzen Anyfin, um ihre Kreditkosten zu senken." },
            { icon: "shield", title: "Deine Daten sind sicher", description: "Wir schützen deine Daten anhand höchster Branschenstandard" },
            { icon: "heart", title: "Auf deiner Seite und nicht der der Banken", description: "Entwickelt, um deine Schulden zu senken, nicht sie zu erhöhen." },
          ]}
       />

      <div className="bg-surface [&>section]:!bg-transparent">
        <TextImage
        heading={"Kein Einfluss auf deinen Score. Jede Menge Sparpotenzial."}
        body={"Hol dir dein Angebot, ganz ohne Einfluss auf deine SCHUFA. Erst wenn du deinen Kredit zu Anyfin wechselst, wird dies bei der SCHUFA vermerkt."}
        ctaLabel={""}
        image={_1_1_0SchufaScore__2_}
        imageAlt={"SCHUFA-Score bleibt unverändert bei einer Anyfin-Anfrage"}
        variant={"image-left-bleed"}
        background={"white"}

        theme={"light"}
       />
      </div>

      <div className="bg-surface [&>section]:!bg-transparent">
        <TextImage
        heading={"All deine Kredite.\nEine Zahlung."}
        body={"Verschaff dir einen klaren Überblick, passe deinen Zahlungsplan an und verwalte deine Zahlungen. Mit unserer App behältst du ganz einfach alles im Griff."}
        ctaLabel={"Anyfin-App herunterladen"}
        image={_1_1_DE_2AppPerspective}
        imageAlt={"Anyfin-App mit Kreditübersicht und Zahlungsplan"}
        variant={"image-right-bleed"}
        background={"white"}

        theme={"light"}
       />
      </div>

      <StepFlowMini
        heading={"Wie Anyfin funktioniert"}
        steps={[
            { title: "Lade deine Kredite hoch", description: "und wir prüfen, ob wir deine Kosten senken können." },
            { title: "Hol dir ein Angebot", description: "Prüfe wie viel du sparen kannst." },
            { title: "Zahle weniger", description: "Übertrage deinen Kredit zu Anyfin." },
          ]}
        ctaLabel={"Jetzt anfragen"}
       />

      <div className="bg-surface [&>section]:!bg-transparent">
        <TextImage
        heading={"Besser, besser, besser."}
        body={"Ein Angebot garantiert einen besseren Zins."}
        ctaLabel={"App herunterladen"}
        image={_1_1_DE_AnyfinAppAngebotNoti}
        imageAlt={"Anyfin-App zeigt ein besseres Zinsangebot"}
        variant={"image-right"}
        background={"white"}

       />
      </div>

      <FaqAccordion
        heading={"Antworten auf häufig gestellte Fragen"}
        items={[
            { question: "Beeinflusst eine Anfrage bei Anyfin deinen Schufa-Score?", answer: "Nein, tut es nicht. Anyfin nutzt eine unverbindliche Kreditanfrage, die keinen Einfluss auf deinen Schufa- Score hat.  Diese Art von Anfrage ist speziell dafür gemacht,  Angebote sicher zu vergleichen, du kannst also ganz  entspannt deine Optionen prüfen, ohne dass sich das  auf deinen Score auswirkt. Im Gegensatz dazu verwenden viele traditionelle Banken eine konkrete Kredit-Anfrage, die sich auf deinen Score auswirken kann.  Ähnliche Anfragen können auch entstehen, wenn du Leistungen in Bereichen wie Online-Handel, Telekommunikation oder anderen  Finanzprodukten beantragst." },
            { question: "Kann ich mein Angebot prüfen, ohne dass sich das auf meinen Schufa-Score auswirkt?", answer: "Ja, absolut. Mit Anyfin kannst du dein persönliches Angebot prüfen,  ohne dass sich das auf deinen Schufa-Score auswirkt. Die Abfrage ist  sicher und geschützt und du kannst ganz in Ruhe eine Entscheidung treffen." },
            { question: "Was passiert, wenn ich ein Angebot annehme?", answer: "Sobald du dein Angebot annimmst, wird dieser Kredit, wie bei jeder Bank oder jedem  Finanzanbieter in Deutschland, an die Schufa gemeldet. Das kann sich zwar auf deinen Schufa-Score auswirken, ist aber ein ganz normaler  Bestandteil eines Kredits. Die gute Nachricht: Regelmäßige und pünktliche  Rückzahlungen können sich langfristig positiv auf deine Kreditwürdigkeit auswirken." },
          ]}
       />
    </main>
  );
}
