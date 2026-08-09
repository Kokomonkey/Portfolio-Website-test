/* =========================================================================
   SCP KNOWLEDGE GRAPH — curated, self-contained dataset
   -------------------------------------------------------------------------
   Nodes are SCP items, Groups of Interest (GOI), Mobile Task Forces (MTF),
   personnel, sites and the Foundation itself. Edges are cross-references
   (containment, testing, affiliation, kinship, rivalry, meta).
   Facts drawn from SCP Wiki canon; this file is a compact teaching sample,
   not the full corpus. Content subject to the SCP Wiki CC BY-SA license.
   ========================================================================= */

window.SCP_DATA = {
  // ----- nodes -----------------------------------------------------------
  // type:  scp | goi | mtf | person | site | org
  // class: Safe | Euclid | Keter | Thaumiel | Apollyon | "—"  (SCP only)
  // group: thematic cluster used for the "faction / theme" colouring
  nodes: [
    // --- Keter-class threats ---
    { id:"scp-682", label:"SCP-682", title:"Hard-to-Destroy Reptile", type:"scp", class:"Keter", group:"Keter Threats", blurb:"A large, vaguely reptilian creature of immense strength and intelligence with an intense hatred for all life. Every attempt at termination has failed." },
    { id:"scp-106", label:"SCP-106", title:"The Old Man", type:"scp", class:"Keter", group:"Keter Threats", blurb:"A corrosive humanoid able to phase through solid matter and drag victims into a pocket dimension." },
    { id:"scp-035", label:"SCP-035", title:"Possessive Mask", type:"scp", class:"Keter", group:"Cognitohazards", blurb:"A porcelain comedy/tragedy mask that possesses any wearer and corrodes the host body while excreting a lethal fluid." },
    { id:"scp-055", label:"SCP-055", title:"[unknown]", type:"scp", class:"Keter", group:"Cognitohazards", blurb:"A self-keeping antimeme: information about what it is cannot be retained. Only what it is NOT can be recorded." },
    { id:"scp-2521", label:"SCP-2521", title:"●●|●●●●●|●●|●", type:"scp", class:"Keter", group:"Cognitohazards", blurb:"An entity that takes any anomaly described in words. Its own file may contain no text — only images and pictograms." },
    { id:"scp-2935", label:"SCP-2935", title:"O, Death", type:"scp", class:"Keter", group:"Keter Threats", blurb:"On a fixed date, everything died. A cave complex leads to a machine and the source of a world-ending event." },
    { id:"scp-2317", label:"SCP-2317", title:"A Door to Another World", type:"scp", class:"Keter", group:"Keter Threats", blurb:"A gateway restraining an apocalyptic entity; its containment protocol is quietly one of the Foundation's most important." },
    { id:"scp-231", label:"SCP-231", title:"Special Personnel Requirements", type:"scp", class:"Keter", group:"Humanoids", blurb:"The surviving member of seven; Procedure 110-Montauk must be performed to avert a catastrophe. Details are restricted." },

    // --- Humanoids ---
    { id:"scp-049", label:"SCP-049", title:"Plague Doctor", type:"scp", class:"Euclid", group:"Humanoids", blurb:"A humanoid resembling a medieval plague doctor. Its touch is lethal; it believes it is curing a 'Pestilence'." },
    { id:"scp-053", label:"SCP-053", title:"Young Girl", type:"scp", class:"Euclid", group:"Humanoids", blurb:"A three-year-old girl who induces homicidal aggression in adults nearby. Curiously unaffected by many other anomalies." },
    { id:"scp-073", label:"SCP-073", title:"Cain", type:"scp", class:"Euclid", group:"Humanoids", blurb:"A humanoid with prosthetic-like limbs. Reflects any harm back on its source; the ground refuses to grow around him." },
    { id:"scp-076", label:"SCP-076", title:"Able", type:"scp", class:"Keter", group:"Humanoids", blurb:"'Able'. A resurrecting warrior who awakens to kill. Historically deployed against SCP-682." },
    { id:"scp-096", label:"SCP-096", title:"The Shy Guy", type:"scp", class:"Euclid", group:"Cognitohazards", blurb:"A humanoid that enters an unstoppable rage and hunts down anyone who views its face, even in an image." },
    { id:"scp-173", label:"SCP-173", title:"The Sculpture", type:"scp", class:"Euclid", group:"Cognitohazards", blurb:"The original. A concrete statue that moves and snaps necks when unobserved. Do not blink." },
    { id:"scp-1471", label:"SCP-1471", title:"MalO ver1.0.0", type:"scp", class:"Euclid", group:"Cognitohazards", blurb:"A mobile app that, once installed, sends images of a canine-skulled humanoid appearing in the user's photos." },
    { id:"scp-343", label:"SCP-343", title:"\"God\"", type:"scp", class:"Safe", group:"Humanoids", blurb:"A humanoid claiming to be omnipotent. Benevolent, cooperative, and able to leave containment at will — but chooses not to." },

    // --- Safe / benign ---
    { id:"scp-999", label:"SCP-999", title:"The Tickle Monster", type:"scp", class:"Safe", group:"Safe / Benign", blurb:"A gelatinous orange mass that induces euphoria and happiness on contact. Used to calm other anomalies." },
    { id:"scp-500", label:"SCP-500", title:"Panacea", type:"scp", class:"Safe", group:"Safe / Benign", blurb:"A small jar of red pills that cure any disease. Only a finite number remain." },
    { id:"scp-914", label:"SCP-914", title:"The Clockworks", type:"scp", class:"Safe", group:"Safe / Benign", blurb:"A clockwork machine that 'refines' input on settings from Rough to Very Fine, with unpredictable results." },
    { id:"scp-294", label:"SCP-294", title:"The Coffee Machine", type:"scp", class:"Euclid", group:"Safe / Benign", blurb:"A vending machine that dispenses any liquid one can name — including some that should not be liquids." },
    { id:"scp-963", label:"SCP-963", title:"Immortality", type:"scp", class:"Safe", group:"Personnel & O5", blurb:"An amulet that transfers the wearer's consciousness on death. Currently hosts the mind of Dr. Bright." },

    // --- Anomalous spaces / sites ---
    { id:"scp-3008", label:"SCP-3008", title:"A Perfectly Normal IKEA", type:"scp", class:"Euclid", group:"Anomalous Spaces", blurb:"An apparently infinite retail space populated by lost people and hostile staff that emerge after 'closing time'." },
    { id:"scp-2000", label:"SCP-2000", title:"Deep Well", type:"scp", class:"Thaumiel", group:"Anomalous Spaces", blurb:"A dormant underground facility able to clone and re-seed humanity, restarting civilisation after a K-class event." },
    { id:"scp-882", label:"SCP-882", title:"A Mass of Interlocking Machinery", type:"scp", class:"Euclid", group:"Broken God", blurb:"Self-assembling clockwork machinery that compels people to feed it metal. Venerated by the Church of the Broken God." },

    // --- Narrative / meta ---
    { id:"scp-3999", label:"SCP-3999", title:"I Am At The Center of Everything", type:"scp", class:"—", group:"Narrative / Meta", blurb:"A metafictional anomaly entangling a researcher, the narrative, and the author. Reality itself is the containment chamber." },
    { id:"scp-3812", label:"SCP-3812", title:"A Voice Behind Me", type:"scp", class:"—", group:"Narrative / Meta", blurb:"An escalating reality bender whose power grows beyond narrative layers; classification is effectively meaningless." },
    { id:"scp-4000", label:"SCP-4000", title:"Taboo", type:"scp", class:"Keter", group:"Narrative / Meta", blurb:"A vast forest that scrambles the names of anything within, making communication about its inhabitants impossible." },
    { id:"scp-5000", label:"SCP-5000", title:"Why?", type:"scp", class:"Thaumiel", group:"Narrative / Meta", blurb:"A powered suit found by a researcher fleeing the Foundation, which has decided humanity must end. Winner, 5000 contest." },
    { id:"scp-001", label:"SCP-001", title:"[REDACTED] — 001 Proposals", type:"scp", class:"—", group:"001 Proposals", blurb:"The most classified designation. Many mutually-exclusive 'proposals' exist; which is real is deliberately obscured." },

    // --- Groups of Interest ---
    { id:"goi-ci", label:"Chaos Insurgency", title:"Group of Interest", type:"goi", class:null, group:"GOIs", blurb:"A Foundation splinter cell that steals and weaponises anomalies. The Foundation's oldest internal enemy." },
    { id:"goi-goc", label:"Global Occult Coalition", title:"Group of Interest", type:"goi", class:null, group:"GOIs", blurb:"A UN-linked paramilitary that destroys anomalies rather than contains them. Uneasy rival of the Foundation." },
    { id:"goi-cotbg", label:"Church of the Broken God", title:"Group of Interest", type:"goi", class:null, group:"Broken God", blurb:"A techno-religion seeking to reassemble their mechanical deity, Mekhane, from anomalous machinery." },
    { id:"goi-serpent", label:"Serpent's Hand", title:"Group of Interest", type:"goi", class:null, group:"GOIs", blurb:"An organisation of anomalous individuals opposed to Foundation containment. Linked to the Wanderers' Library." },
    { id:"goi-mcd", label:"Marshall, Carter & Dark", title:"Group of Interest", type:"goi", class:null, group:"GOIs", blurb:"An exclusive gentlemen's club that auctions anomalous goods to the ultra-wealthy." },
    { id:"goi-awcy", label:"Are We Cool Yet?", title:"Group of Interest", type:"goi", class:null, group:"GOIs", blurb:"An anartist collective creating anomalous 'art' with little regard for consequences." },
    { id:"goi-anderson", label:"Anderson Robotics", title:"Group of Interest", type:"goi", class:null, group:"GOIs", blurb:"A tech firm producing anomalous androids and AI. Successor to elements of Prometheus Labs." },
    { id:"goi-prometheus", label:"Prometheus Labs", title:"Group of Interest", type:"goi", class:null, group:"GOIs", blurb:"A now-defunct anomalous technology corporation whose products still surface across the world." },

    // --- Task forces / Foundation ---
    { id:"mtf-e11", label:"MTF Epsilon-11", title:"\"Nine-Tailed Fox\"", type:"mtf", class:null, group:"Task Forces", blurb:"The Foundation's premier armed containment/recovery unit, based at Site-19." },
    { id:"mtf-a1", label:"MTF Alpha-1", title:"\"Red Right Hand\"", type:"mtf", class:null, group:"Task Forces", blurb:"The O5 Council's personal task force, deployed on the most sensitive operations." },
    { id:"foundation", label:"SCP Foundation", title:"Secure · Contain · Protect", type:"org", class:null, group:"Foundation", blurb:"The clandestine organisation that secures anomalies, contains them, and protects humanity from their effects." },
    { id:"site-19", label:"Site-19", title:"Primary Containment Site", type:"site", class:null, group:"Anomalous Spaces", blurb:"The Foundation's largest and most important containment facility, holding many high-profile anomalies." },
    { id:"o5", label:"O5 Council", title:"The Overseers", type:"person", class:null, group:"Personnel & O5", blurb:"Thirteen anonymous overseers with ultimate authority over the Foundation. Identities are strictly compartmentalised." },

    // --- Personnel ---
    { id:"dr-bright", label:"Dr. Bright", title:"Personnel", type:"person", class:null, group:"Personnel & O5", blurb:"A long-lived researcher bound to SCP-963. Subject of an extensive list of things he is no longer allowed to do." },
    { id:"dr-clef", label:"Dr. Clef", title:"Personnel", type:"person", class:null, group:"Personnel & O5", blurb:"A senior agent of murky origin, frequently assigned to the most dangerous anomalies, including SCP-682." },
    { id:"dr-kondraki", label:"Dr. Kondraki", title:"Personnel", type:"person", class:null, group:"Personnel & O5", blurb:"A volatile senior researcher associated with the containment and deployment of SCP-076." },
    { id:"dr-gears", label:"Dr. Gears", title:"Personnel", type:"person", class:null, group:"Personnel & O5", blurb:"A famously emotionless, hyper-efficient researcher; a key maintainer of SCP-914." }
  ],

  // ----- edges -----------------------------------------------------------
  // rel: contains | tests | kin | affiliation | rivalry | meta | related
  links: [
    // Foundation core
    { source:"foundation", target:"o5", rel:"affiliation" },
    { source:"foundation", target:"mtf-e11", rel:"affiliation" },
    { source:"foundation", target:"mtf-a1", rel:"affiliation" },
    { source:"foundation", target:"site-19", rel:"affiliation" },
    { source:"o5", target:"mtf-a1", rel:"affiliation" },
    { source:"mtf-e11", target:"site-19", rel:"affiliation" },

    // 682 web
    { source:"foundation", target:"scp-682", rel:"contains" },
    { source:"mtf-e11", target:"scp-682", rel:"contains" },
    { source:"scp-682", target:"scp-053", rel:"tests" },
    { source:"scp-682", target:"scp-999", rel:"tests" },
    { source:"scp-682", target:"scp-076", rel:"tests" },
    { source:"scp-682", target:"scp-914", rel:"tests" },
    { source:"scp-682", target:"scp-500", rel:"tests" },
    { source:"scp-682", target:"scp-106", rel:"tests" },
    { source:"dr-clef", target:"scp-682", rel:"related" },

    // Site-19 residents
    { source:"site-19", target:"scp-173", rel:"contains" },
    { source:"site-19", target:"scp-682", rel:"contains" },
    { source:"site-19", target:"scp-106", rel:"contains" },
    { source:"mtf-e11", target:"scp-173", rel:"contains" },
    { source:"mtf-e11", target:"scp-096", rel:"contains" },

    // Humanoid links
    { source:"scp-076", target:"scp-073", rel:"kin" },
    { source:"scp-076", target:"dr-kondraki", rel:"related" },
    { source:"scp-049", target:"scp-053", rel:"tests" },
    { source:"scp-231", target:"o5", rel:"related" },
    { source:"foundation", target:"scp-049", rel:"contains" },
    { source:"foundation", target:"scp-096", rel:"contains" },
    { source:"foundation", target:"scp-035", rel:"contains" },
    { source:"foundation", target:"scp-231", rel:"contains" },
    { source:"foundation", target:"scp-343", rel:"contains" },
    { source:"foundation", target:"scp-053", rel:"contains" },

    // Cognitohazard cluster
    { source:"scp-055", target:"scp-2521", rel:"related" },
    { source:"foundation", target:"scp-055", rel:"contains" },
    { source:"foundation", target:"scp-2521", rel:"contains" },
    { source:"foundation", target:"scp-173", rel:"contains" },
    { source:"foundation", target:"scp-1471", rel:"contains" },

    // Safe / benign
    { source:"foundation", target:"scp-999", rel:"contains" },
    { source:"foundation", target:"scp-500", rel:"contains" },
    { source:"foundation", target:"scp-914", rel:"contains" },
    { source:"foundation", target:"scp-294", rel:"contains" },
    { source:"dr-gears", target:"scp-914", rel:"related" },
    { source:"scp-999", target:"scp-035", rel:"tests" },

    // Bright / 963
    { source:"scp-963", target:"dr-bright", rel:"related" },
    { source:"foundation", target:"scp-963", rel:"contains" },
    { source:"dr-bright", target:"o5", rel:"affiliation" },

    // Broken God cluster
    { source:"goi-cotbg", target:"scp-882", rel:"related" },
    { source:"foundation", target:"scp-882", rel:"contains" },
    { source:"goi-cotbg", target:"goi-prometheus", rel:"rivalry" },
    { source:"goi-prometheus", target:"goi-anderson", rel:"related" },
    { source:"goi-prometheus", target:"scp-914", rel:"related" },

    // GOI rivalries / relations
    { source:"goi-ci", target:"foundation", rel:"rivalry" },
    { source:"goi-ci", target:"o5", rel:"rivalry" },
    { source:"goi-ci", target:"dr-clef", rel:"related" },
    { source:"goi-goc", target:"foundation", rel:"rivalry" },
    { source:"goi-goc", target:"goi-serpent", rel:"rivalry" },
    { source:"goi-serpent", target:"foundation", rel:"rivalry" },
    { source:"goi-serpent", target:"goi-ci", rel:"related" },
    { source:"goi-mcd", target:"foundation", rel:"rivalry" },
    { source:"goi-mcd", target:"goi-awcy", rel:"related" },
    { source:"goi-awcy", target:"scp-035", rel:"related" },
    { source:"goi-anderson", target:"foundation", rel:"rivalry" },

    // Anomalous spaces / meta
    { source:"foundation", target:"scp-3008", rel:"contains" },
    { source:"foundation", target:"scp-2000", rel:"contains" },
    { source:"scp-2000", target:"o5", rel:"related" },
    { source:"foundation", target:"scp-2317", rel:"contains" },
    { source:"scp-2317", target:"scp-2935", rel:"related" },
    { source:"foundation", target:"scp-2935", rel:"contains" },

    // Narrative / meta cluster
    { source:"scp-5000", target:"foundation", rel:"meta" },
    { source:"scp-5000", target:"o5", rel:"meta" },
    { source:"scp-5000", target:"mtf-a1", rel:"related" },
    { source:"scp-3999", target:"foundation", rel:"meta" },
    { source:"scp-3812", target:"foundation", rel:"meta" },
    { source:"scp-3812", target:"scp-3999", rel:"meta" },
    { source:"scp-4000", target:"foundation", rel:"contains" },
    { source:"scp-4000", target:"goi-serpent", rel:"related" },

    // 001
    { source:"scp-001", target:"o5", rel:"related" },
    { source:"scp-001", target:"foundation", rel:"related" },
    { source:"scp-001", target:"mtf-a1", rel:"contains" },

    // Lateral cross-references — distribute the graph beyond the Foundation hub
    { source:"scp-682", target:"scp-096", rel:"tests" },
    { source:"scp-999", target:"scp-053", rel:"tests" },
    { source:"scp-999", target:"scp-096", rel:"tests" },
    { source:"mtf-e11", target:"scp-106", rel:"contains" },
    { source:"mtf-e11", target:"scp-049", rel:"contains" },
    { source:"site-19", target:"scp-096", rel:"contains" },
    { source:"site-19", target:"scp-049", rel:"contains" },
    { source:"site-19", target:"scp-035", rel:"contains" },
    { source:"dr-clef", target:"scp-106", rel:"related" },
    { source:"dr-clef", target:"mtf-a1", rel:"affiliation" },
    { source:"dr-clef", target:"scp-231", rel:"related" },
    { source:"dr-bright", target:"scp-076", rel:"related" },
    { source:"dr-kondraki", target:"scp-682", rel:"related" },
    { source:"scp-076", target:"mtf-a1", rel:"related" },
    { source:"goi-goc", target:"goi-ci", rel:"rivalry" },
    { source:"goi-cotbg", target:"goi-anderson", rel:"rivalry" },
    { source:"goi-cotbg", target:"scp-914", rel:"related" },
    { source:"dr-gears", target:"scp-882", rel:"related" },
    { source:"scp-500", target:"scp-049", rel:"tests" },
    { source:"scp-096", target:"scp-173", rel:"related" },
    { source:"scp-3812", target:"scp-5000", rel:"meta" }
  ]
};
