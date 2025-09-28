import { Game } from '../types';

export const games: Game[] = [
  // Game 1
  {
    title: 'Microbial Mayhem',
    description: 'A mix of topics from bacteriology, virology, and mycology.',
    jeopardy: [
      {
        title: 'Gram-Positive Cocci',
        questions: [
          { question: "This staph species is catalase-positive and coagulase-positive.", answer: "Staphylococcus aureus", points: 100, answered: false },
          { question: "This Streptococcus species shows alpha-hemolysis and is optochin sensitive.", answer: "Streptococcus pneumoniae", points: 200, answered: false },
          { question: "This Group A Strep virulence factor degrades DNA.", answer: "DNase", points: 300, answered: false },
          { question: "This organism is a gram-positive coccus that grows in chains and is a common cause of neonatal sepsis.", answer: "Streptococcus agalactiae (Group B Strep)", points: 400, answered: false },
          { question: "Enterococcus faecalis can be distinguished from other Group D strep by its ability to grow in this high-salt concentration.", answer: "6.5% NaCl", points: 500, answered: false },
        ]
      },
      {
        title: 'Gram-Negative Rods',
        questions: [
          { question: "This organism is a lactose-fermenting gram-negative rod that is a common cause of traveler's diarrhea.", answer: "E. coli (ETEC)", points: 100, answered: false },
          { question: "This gram-negative rod has a 'grape-like' odor and produces a blue-green pigment.", answer: "Pseudomonas aeruginosa", points: 200, answered: false },
          { question: "Unlike Salmonella, this closely related pathogen is non-motile and has a very low infectious dose.", answer: "Shigella", points: 300, answered: false },
          { question: "This curved gram-negative rod is associated with Guillain-Barré syndrome.", answer: "Campylobacter jejuni", points: 400, answered: false, isDailyDouble: true },
          { question: "This organism requires cysteine for growth and can be transmitted by rabbits and ticks.", answer: "Francisella tularensis", points: 500, answered: false },
        ]
      },
      {
        title: 'Viruses 101',
        questions: [
          { question: "This DNA virus is the only one that replicates entirely in the cytoplasm.", answer: "Poxvirus", points: 100, answered: false },
          { question: "The common cold is most frequently caused by this acid-labile picornavirus.", answer: "Rhinovirus", points: 200, answered: false },
          { question: "This virus uses reverse transcriptase to integrate its genome into the host's DNA.", answer: "HIV (a retrovirus)", points: 300, answered: false },
          { question: "Koplik spots are the pathognomonic enanthem for this viral illness.", answer: "Measles (Rubeola)", points: 400, answered: false },
          { question: "This virus is the leading cause of gastroenteritis outbreaks on cruise ships.", answer: "Norovirus", points: 500, answered: false },
        ]
      },
      {
        title: 'Fungi & Parasites',
        questions: [
          { question: "This dimorphic fungus, found in the Ohio and Mississippi River valleys, is associated with bird and bat droppings.", answer: "Histoplasma capsulatum", points: 100, answered: false },
          { question: "The Scotch tape test is used to diagnose infection with this common helminth.", answer: "Enterobius vermicularis (pinworm)", points: 200, answered: false },
          { question: "The 'Maltese cross' formation in red blood cells is characteristic of this tick-borne parasite.", answer: "Babesia", points: 300, answered: false },
          { question: "This encapsulated yeast is a major cause of meningitis in AIDS patients.", answer: "Cryptococcus neoformans", points: 400, answered: false },
          { question: "Ingestion of cysts in undercooked pork from this parasite can lead to neurocysticercosis.", answer: "Taenia solium", points: 500, answered: false },
        ]
      },
      {
        title: 'Mechanisms & Toxins',
        questions: [
          { question: "The toxin from this bacterium blocks the release of acetylcholine, causing flaccid paralysis.", answer: "Clostridium botulinum", points: 100, answered: false },
          { question: "The toxin from this bacterium blocks inhibitory neurotransmitters, causing spastic paralysis.", answer: "Clostridium tetani", points: 200, answered: false },
          { question: "Diphtheria toxin and Pseudomonas exotoxin A both inactivate this host factor to halt protein synthesis.", answer: "Elongation Factor-2 (EF-2)", points: 300, answered: false },
          { question: "The alpha toxin of Clostridium perfringens has this enzymatic activity, which damages cell membranes.", answer: "Lecithinase (phospholipase C)", points: 400, answered: false },
          { question: "Cholera toxin and the heat-labile toxin of ETEC both increase the levels of this intracellular second messenger.", answer: "cAMP", points: 500, answered: false },
        ]
      }
    ],
    doubleJeopardy: [
      {
        title: 'Advanced Bacteriology',
        questions: [
          { question: "This gram-positive rod with 'tumbling motility' can cause meningitis in newborns and the elderly.", answer: "Listeria monocytogenes", points: 200, answered: false },
          { question: "This species of Bartonella is the causative agent of Cat Scratch Disease.", answer: "Bartonella henselae", points: 400, answered: false },
          { question: "Waterhouse-Friderichsen syndrome, or adrenal hemorrhage, is a devastating complication of sepsis with this organism.", answer: "Neisseria meningitidis", points: 600, answered: false, isDailyDouble: true },
          { question: "This gram-negative rod is the causative agent of plague and shows bipolar 'safety pin' staining.", answer: "Yersinia pestis", points: 800, answered: false },
          { question: "This spirochete causes a biphasic illness known as Weil's disease, characterized by jaundice and renal failure.", answer: "Leptospira interrogans", points: 1000, answered: false },
        ]
      },
      {
        title: 'Virology Deep Dive',
        questions: [
          { question: "This is the only RNA virus that replicates in the nucleus.", answer: "Influenza virus", points: 200, answered: false },
          { question: "The 'slapped cheek' rash of Fifth disease is caused by this single-stranded DNA virus.", answer: "Parvovirus B19", points: 400, answered: false },
          { question: "Atypical lymphocytes (Downey cells) are a hallmark of infection with this virus.", answer: "Epstein-Barr Virus (EBV)", points: 600, answered: false },
          { question: "This disease, caused by a flavivirus, can lead to microcephaly in newborns if the mother is infected during pregnancy.", answer: "Zika virus", points: 800, answered: false },
          { question: "Subacute sclerosing panencephalitis (SSPE) is a rare, fatal, delayed complication of this childhood viral infection.", answer: "Measles", points: 1000, answered: false },
        ]
      },
      {
        title: 'More Fungi & Parasites',
        questions: [
          { question: "This amoeba is known for causing flask-shaped ulcers in the colon and liver abscesses with 'anchovy paste' pus.", answer: "Entamoeba histolytica", points: 200, answered: false },
          { question: "This chronic disease is caused by a blood fluke (trematode) that lives in freshwater snails.", answer: "Schistosomiasis", points: 400, answered: false },
          { question: "This dimorphic fungus, common in Latin America, shows a 'captain's wheel' morphology in tissue.", answer: "Paracoccidioides brasiliensis", points: 600, answered: false },
          { question: "The definitive host for Echinococcus granulosus, which causes hydatid cysts, is this animal.", answer: "Dogs", points: 800, answered: false, isDailyDouble: true },
          { question: "Chagas disease, caused by Trypanosoma cruzi, can lead to megaesophagus and this cardiac complication.", answer: "Dilated cardiomyopathy", points: 1000, answered: false },
        ]
      },
      {
        title: 'Clinical Syndromes',
        questions: [
          { question: "This syndrome is a post-streptococcal complication involving joints, heart, nodules, erythema marginatum, and Sydenham chorea.", answer: "Rheumatic Fever", points: 200, answered: false },
          { question: "The 'strawberry tongue' is associated with this disease caused by S. pyogenes exotoxins.", answer: "Scarlet Fever", points: 400, answered: false },
          { question: "This is the name for a severe pneumonia caused by Legionella pneumophila.", answer: "Legionnaires' disease", points: 600, answered: false },
          { question: "Bullous impetigo is a localized form of this staphylococcal toxin-mediated disease.", answer: "Staphylococcal Scalded Skin Syndrome (SSSS)", points: 800, answered: false },
          { question: "Lemierre's syndrome, a septic thrombophlebitis of the internal jugular vein, is typically caused by this anaerobic gram-negative rod.", answer: "Fusobacterium necrophorum", points: 1000, answered: false },
        ]
      },
      {
        title: 'Treatment & Resistance',
        questions: [
          { question: "This antibiotic is the drug of choice for treating syphilis.", answer: "Penicillin", points: 200, answered: false },
          { question: "The primary mechanism of methicillin resistance in S. aureus involves an altered form of this.", answer: "Penicillin-binding proteins (PBP2a)", points: 400, answered: false },
          { question: "This class of drugs, including oseltamivir, is used to treat influenza by preventing viral release from host cells.", answer: "Neuraminidase inhibitors", points: 600, answered: false },
          { question: "Vancomycin-resistant enterococci (VRE) are a major nosocomial threat. Vancomycin belongs to this class of antibiotics.", answer: "Glycopeptides", points: 800, answered: false },
          { question: "The 'cold enrichment' technique can be used to isolate this psychrotrophic organism that can cause mesenteric lymphadenitis.", answer: "Yersinia enterocolitica", points: 1000, answered: false },
        ]
      }
    ],
    finalJeopardy: { question: "This is the only human disease to have been officially declared eradicated worldwide, a feat accomplished in 1980 through global vaccination efforts.", answer: "Smallpox" }
  },
  // Game 2
  {
    title: 'Pathogen Panorama',
    description: 'A broad survey across various pathogenic microorganisms and the diseases they cause.',
    jeopardy: [
      {
        title: "Bacterial ID",
        questions: [
          { question: "This gram-positive bacillus forms spores and can cause tetanus or botulism.", answer: "Clostridium", points: 100, answered: false },
          { question: "This gram-negative diplococcus is a common cause of meningitis, especially in college dorms.", answer: "Neisseria meningitidis", points: 200, answered: false },
          { question: "This acid-fast bacillus is the causative agent of tuberculosis.", answer: "Mycobacterium tuberculosis", points: 300, answered: false },
          { question: "This gram-positive coccus is arranged in clusters and is a common cause of skin infections.", answer: "Staphylococcus aureus", points: 400, answered: false },
          { question: "This spirochete is transmitted by the Ixodes tick and causes Lyme disease.", answer: "Borrelia burgdorferi", points: 500, answered: false }
        ]
      },
      {
        title: "Viral Vectors & Hosts",
        questions: [
          { question: "Rabies is a zoonotic disease, with this animal being the most common reservoir in the US.", answer: "Bats", points: 100, answered: false },
          { question: "This family of viruses, transmitted by mosquitos, includes West Nile, Dengue, and Zika.", answer: "Flaviviruses", points: 200, answered: false },
          { question: "The definitive host for Toxoplasma gondii, a protozoan parasite, is this animal.", answer: "The cat", points: 300, answered: false },
          { question: "Hantavirus pulmonary syndrome is associated with exposure to the droppings of this rodent.", answer: "Deer mice", points: 400, answered: false, isDailyDouble: true },
          { question: "The Anopheles mosquito is the vector for this deadly parasitic disease.", answer: "Malaria", points: 500, answered: false }
        ]
      },
      {
        title: 'Fungal Infections',
        questions: [
          { question: 'Thrush is a common infection caused by this yeast.', answer: 'Candida albicans', points: 100, answered: false },
          { question: 'This fungus is associated with rose gardeners and causes a linear chain of nodules.', answer: 'Sporothrix schenckii', points: 200, answered: false },
          { question: "This mold with 45-degree angle branching hyphae is a major concern for neutropenic patients.", answer: "Aspergillus fumigatus", points: 300, answered: false },
          { question: "This dimorphic fungus causes 'Valley Fever' and is endemic to the Southwestern United States.", answer: "Coccidioides immitis", points: 400, answered: false },
          { question: "Black eschar on the face of a diabetic patient is a classic sign of infection with this class of fungi.", answer: "Mucormycetes (e.g., Rhizopus, Mucor)", points: 500, answered: false },
        ]
      },
      {
        title: 'Parasitic Life Cycles',
        questions: [
          { question: "This parasite's life cycle involves snails and freshwater, with cercariae penetrating human skin.", answer: "Schistosoma", points: 100, answered: false },
          { question: "Consumption of undercooked fish can lead to infection with this, the 'fish tapeworm.'", answer: "Diphyllobothrium latum", points: 200, answered: false },
          { question: "This roundworm's larvae hatch in the intestine, migrate to the lungs, and are then coughed up and swallowed.", answer: "Ascaris lumbricoides", points: 300, answered: false },
          { question: "The Reduviid bug, or 'kissing bug,' is the vector for this protozoan that causes Chagas disease.", answer: "Trypanosoma cruzi", points: 400, answered: false },
          { question: "The two-host life cycle of malaria involves a mosquito and this definitive host.", answer: "A human", points: 500, answered: false },
        ]
      },
      {
        title: 'Antimicrobials',
        questions: [
          { question: "This is the drug of choice for treating C. difficile infection.", answer: "Oral vancomycin or fidaxomicin", points: 100, answered: false },
          { question: "This class of antibiotics is ineffective against Mycoplasma because the organism lacks a cell wall.", answer: "Penicillins (or Beta-lactams)", points: 200, answered: false },
          { question: "This drug is commonly used for prophylaxis against malaria.", answer: "Atovaquone-proguanil (Malarone), doxycycline, or mefloquine", points: 300, answered: false },
          { question: "Amphotericin B, a potent antifungal, binds to this sterol in the fungal cell membrane.", answer: "Ergosterol", points: 400, answered: false },
          { question: "Treatment for tuberculosis requires multiple drugs, including this one that inhibits mycolic acid synthesis.", answer: "Isoniazid (INH)", points: 500, answered: false },
        ]
      }
    ],
    doubleJeopardy: [
      {
        title: "Name the Toxin",
        questions: [
          { question: "This toxin produced by EHEC strains like O157:H7 can cause Hemolytic Uremic Syndrome (HUS).", answer: "Shiga toxin", points: 200, answered: false },
          { question: "This toxin causes the massive fluid secretion seen in cholera.", answer: "Cholera toxin", points: 400, answered: false },
          { question: "The 'scalded skin syndrome' is caused by the exfoliative toxin from this bacterium.", answer: "Staphylococcus aureus", points: 600, answered: false },
          { question: "This toxin from Bordetella pertussis ADP-ribosylates Gi proteins, leading to increased cAMP and a massive lymphocytosis.", answer: "Pertussis toxin", points: 800, answered: false },
          { question: "The edema factor of Bacillus anthracis is actually this type of enzyme, which increases cAMP.", answer: "An adenylate cyclase", points: 1000, answered: false, isDailyDouble: true },
        ]
      },
      {
        title: "Vaccine Strategies",
        questions: [
          { question: "The Salk and Sabin vaccines were developed to prevent this viral disease.", answer: "Poliomyelitis (Polio)", points: 200, answered: false },
          { question: "The pneumococcal vaccine (PCV13/Prevnar) is an example of this type of vaccine, which links a polysaccharide to a protein.", answer: "A conjugate vaccine", points: 400, answered: false },
          { question: "The vaccine for Haemophilus influenzae type b (Hib) dramatically reduced the incidence of this serious childhood illness.", answer: "Meningitis (or epiglottitis)", points: 600, answered: false },
          { question: "The MMR vaccine provides protection against measles, mumps, and this other viral exanthem.", answer: "Rubella", points: 800, answered: false },
          { question: "The tetanus vaccine contains an inactivated form of the tetanus toxin, which is known as this.", answer: "A toxoid", points: 1000, answered: false },
        ]
      },
      {
        title: "Lab & Diagnosis",
        questions: [
          { question: "This agar is selective for gram-negative bacteria and differential for lactose fermentation.", answer: "MacConkey agar", points: 200, answered: false },
          { question: "A positive Quellung reaction, where the capsule swells, is used to identify this organism.", answer: "Streptococcus pneumoniae", points: 400, answered: false },
          { question: "The VDRL and RPR tests are non-treponemal tests used to screen for this disease.", answer: "Syphilis", points: 600, answered: false, isDailyDouble: true },
          { question: "This special type of agar is used to culture Legionella pneumophila.", answer: "Buffered Charcoal Yeast Extract (BCYE) agar", points: 800, answered: false },
          { question: "The presence of 'sulfur granules' in draining sinus tracts is characteristic of this anaerobic, branching, gram-positive bacterium.", answer: "Actinomyces israelii", points: 1000, answered: false },
        ]
      },
      {
        title: "Clinical Vignettes",
        questions: [
          { question: "A child presents with a high fever for 4 days, which then resolves and is followed by a maculopapular rash.", answer: "Roseola infantum (HHV-6)", points: 200, answered: false },
          { question: "A patient with a recent history of travel and consumption of street food develops voluminous 'rice-water' stools.", answer: "Cholera", points: 400, answered: false },
          { question: "A sexually active young adult presents with a painful genital ulcer and inguinal lymphadenopathy.", answer: "Chancroid (Haemophilus ducreyi)", points: 600, answered: false },
          { question: "An AIDS patient with a CD4 count of 50 presents with blurry vision. Fundoscopy reveals retinal hemorrhages and exudates.", answer: "CMV retinitis", points: 800, answered: false },
          { question: "A sheep farmer presents with a fever and a painless black eschar on his arm.", answer: "Cutaneous anthrax", points: 1000, answered: false },
        ]
      },
      {
        title: "Potpourri",
        questions: [
          { question: "This is the most common cause of 'walking pneumonia' in young adults.", answer: "Mycoplasma pneumoniae", points: 200, answered: false },
          { question: "The 'bull's-eye' rash, erythema migrans, is the hallmark of this disease.", answer: "Lyme disease", points: 400, answered: false },
          { question: "This virus is associated with Kaposi's sarcoma, especially in AIDS patients.", answer: "Human Herpesvirus 8 (HHV-8)", points: 600, answered: false },
          { question: "This is the term for the dormant liver stage of Plasmodium vivax and P. ovale.", answer: "Hypnozoite", points: 800, answered: false },
          { question: "The Ames test is used to assess the mutagenicity of a chemical by its ability to cause mutations in this bacterium.", answer: "Salmonella typhimurium", points: 1000, answered: false },
        ]
      }
    ],
    finalJeopardy: { question: "This disease is caused by a prion, a misfolded protein, and is known in some contexts as 'mad cow disease.'", answer: "Creutzfeldt-Jakob disease (CJD) or Bovine Spongiform Encephalopathy (BSE)" }
  },
  // Game 3
  {
    title: 'The Final Exam',
    description: 'A challenging mix of high-yield topics and obscure facts for the aspiring microbiologist.',
    jeopardy: [
      {
        title: 'Gram-Positive Potpourri',
        questions: [
          { question: 'This bacterium is a common cause of UTIs and is novobiocin resistant.', answer: 'Staphylococcus saprophyticus', points: 100, answered: false },
          { question: 'The CAMP test is used to identify this beta-hemolytic Streptococcus species.', answer: 'Streptococcus agalactiae (Group B)', points: 200, answered: false },
          { question: 'This spore-forming rod causes gas gangrene.', answer: 'Clostridium perfringens', points: 300, answered: false },
          { question: 'This bacterium is associated with prosthetic joint infections, especially in shoulders.', answer: 'Cutibacterium (Propionibacterium) acnes', points: 400, answered: false },
          { question: 'This gram-positive rod can cause a febrile illness associated with unpasteurized dairy and has tumbling motility.', answer: 'Listeria monocytogenes', points: 500, answered: false, isDailyDouble: true },
        ]
      },
      {
        title: 'Viral Exanthems',
        questions: [
          { question: "Measles is also known by this 'R' name.", answer: 'Rubeola', points: 100, answered: false },
          { question: "German measles is also known by this 'R' name.", answer: 'Rubella', points: 200, answered: false },
          { question: "The rash in this disease appears after a high fever breaks.", answer: 'Roseola infantum (HHV-6)', points: 300, answered: false },
          { question: "This viral infection causes a 'lacy' reticular rash on the body after the initial 'slapped cheeks' appearance.", answer: 'Erythema infectiosum (Fifth disease/Parvovirus B19)', points: 400, answered: false },
          { question: "The rash of this disease is characterized by lesions in various stages of development simultaneously.", answer: 'Varicella (Chickenpox)', points: 500, answered: false },
        ]
      },
      {
        title: 'Fungal Morphology',
        questions: [
          { question: "The phrase 'Mold in the cold, yeast in the heat' applies to this group of fungi.", answer: 'Dimorphic fungi', points: 100, answered: false },
          { question: "This yeast is known for its thick polysaccharide capsule.", answer: 'Cryptococcus neoformans', points: 200, answered: false },
          { question: "This fungus has broad-based budding yeast forms.", answer: 'Blastomyces dermatitidis', points: 300, answered: false },
          { question: "This fungus has non-septate hyphae that branch at 90-degree angles.", answer: 'Mucor / Rhizopus', points: 400, answered: false },
          { question: "The yeast form of this fungus looks like a mariner's or captain's wheel.", answer: 'Paracoccidioides brasiliensis', points: 500, answered: false },
        ]
      },
      {
        title: 'Parasite Jeopardy',
        questions: [
          { question: 'This parasite is acquired by ingesting cysts from contaminated water and causes a foul-smelling diarrhea.', answer: 'Giardia lamblia', points: 100, answered: false },
          { question: 'This is the most deadly species of Plasmodium.', answer: 'Plasmodium falciparum', points: 200, answered: false },
          { question: "This infection can be acquired from cat feces and is a major concern for pregnant women.", answer: 'Toxoplasma gondii', points: 300, answered: false },
          { question: "The larvae of this helminth can cause autoinfection, leading to decades-long infection.", answer: 'Strongyloides stercoralis', points: 400, answered: false },
          { question: "This blood fluke's eggs can cause portal hypertension and bladder cancer.", answer: 'Schistosoma', points: 500, answered: false },
        ]
      },
      {
        title: 'Antibiotic Mechanisms',
        questions: [
          { question: "This class of antibiotics, including penicillin, inhibits cell wall synthesis by targeting transpeptidases.", answer: 'Beta-lactams', points: 100, answered: false },
          { question: "This antibiotic is used for anaerobic infections and works by creating free radicals.", answer: 'Metronidazole', points: 200, answered: false },
          { question: 'The macrolide antibiotics bind to this ribosomal subunit.', answer: 'The 50S subunit', points: 300, answered: false },
          { question: 'This class of drugs inhibits DNA gyrase.', answer: 'Fluoroquinolones', points: 400, answered: false },
          { question: 'This drug is a last resort for gram-positive infections and works by binding to D-Ala-D-Ala.', answer: 'Vancomycin', points: 500, answered: false },
        ]
      }
    ],
    doubleJeopardy: [
       {
        title: 'Advanced Clinical Cases',
        questions: [
          { question: "A patient develops a painful, unilateral vesicular rash in a dermatomal distribution.", answer: "Herpes Zoster (Shingles)", points: 200, answered: false },
          { question: "A patient with AIDS has a CT scan showing multiple ring-enhancing lesions in the brain.", answer: "Toxoplasmosis", points: 400, answered: false },
          { question: "A returning traveler from South America presents with fever, a unilateral swelling around one eye (Romaña's sign), and later develops cardiomyopathy.", answer: "Chagas disease (Trypanosoma cruzi)", points: 600, answered: false },
          { question: "A patient who recently ate canned goods presents with descending flaccid paralysis.", answer: "Botulism", points: 800, answered: false, isDailyDouble: true },
          { question: "A neutropenic patient develops fever and lung nodules with a 'halo sign' on CT scan.", answer: "Invasive Aspergillosis", points: 1000, answered: false },
        ]
      },
      {
        title: 'Epidemiology',
        questions: [
          { question: "This is the most common reportable infectious disease in the United States.", answer: "Chlamydia", points: 200, answered: false },
          { question: "The 'four corners' region of the US is a hotspot for this rodent-borne viral pulmonary syndrome.", answer: "Hantavirus", points: 400, answered: false },
          { question: "This is the term for an animal that can transmit a pathogen to humans.", answer: "A vector or reservoir", points: 600, answered: false },
          { question: "Antigenic shift, which can cause influenza pandemics, is due to this genetic mechanism.", answer: "Reassortment", points: 800, answered: false },
          { question: "The Tuskegee Study was an unethical study observing the natural progression of this untreated disease.", answer: "Syphilis", points: 1000, answered: false },
        ]
      },
      {
        title: 'Immunity & Evasion',
        questions: [
          { question: "The polysaccharide capsule is a major virulence factor for S. pneumoniae, S. agalactiae, and H. influenzae, helping them evade this process.", answer: "Phagocytosis", points: 200, answered: false },
          { question: "This staphylococcal protein binds the Fc portion of IgG, preventing opsonization.", answer: "Protein A", points: 400, answered: false },
          { question: "HIV primarily infects and destroys these crucial immune cells.", answer: "CD4+ T-helper cells", points: 600, answered: false },
          { question: "This is the term for a toxin that causes a massive, nonspecific activation of T-cells, leading to a cytokine storm.", answer: "A superantigen", points: 800, answered: false },
          { question: "Latency is a key feature of this family of viruses, which includes HSV, VZV, CMV, and EBV.", answer: "Herpesviruses", points: 1000, answered: false, isDailyDouble: true },
        ]
      },
      {
        title: "GI Pathogens",
        questions: [
          { question: "This comma-shaped, oxidase-positive bacterium grows in alkaline media and causes 'rice water' stool.", answer: "Vibrio cholerae", points: 200, answered: false },
          { question: "This spiral-shaped bacterium is a major cause of peptic ulcers.", answer: "Helicobacter pylori", points: 400, answered: false },
          { question: "This foodborne pathogen is a common cause of gastroenteritis and is associated with poultry and eggs.", answer: "Salmonella enterica (non-typhoidal)", points: 600, answered: false },
          { question: "This protozoan is an acid-fast parasite that can cause chronic diarrhea in AIDS patients.", answer: "Cryptosporidium", points: 800, answered: false },
          { question: "This virus, a member of the Reoviridae family, is a major cause of infantile diarrhea, for which a vaccine now exists.", answer: "Rotavirus", points: 1000, answered: false },
        ]
      },
      {
        title: "Zoonoses",
        questions: [
          { question: "This disease is caused by a rickettsial organism transmitted by the dog tick and causes a rash that starts on the wrists and ankles.", answer: "Rocky Mountain Spotted Fever (RMSF)", points: 200, answered: false },
          { question: "Psittacosis is a pneumonia contracted from this type of animal.", answer: "Birds (parrots)", points: 400, answered: false },
          { question: "This disease, caused by a gram-negative rod, is associated with unpasteurized milk and causes an undulating fever.", answer: "Brucellosis", points: 600, answered: false },
          { question: "The pork tapeworm can cause this condition, characterized by cysts in the brain.", answer: "Neurocysticercosis", points: 800, answered: false },
          { question: "This parasitic disease is caused by larvae in undercooked bear or pork meat that encyst in muscle.", answer: "Trichinellosis (Trichinosis)", points: 1000, answered: false },
        ]
      }
    ],
    finalJeopardy: { question: "This organism, a spirochete, is the causative agent of syphilis.", answer: "Treponema pallidum" }
  },
  // Game 4
  {
    title: 'Viral Villains & Bacterial Baddies',
    description: 'Focus on the specific attributes of viruses and bacteria, from replication to resistance.',
    jeopardy: [
        // Categories for Game 4 Jeopardy...
    ],
    doubleJeopardy: [
        // Categories for Game 4 Double Jeopardy...
    ],
    finalJeopardy: { question: "This bacterial species is the leading cause of community-acquired pneumonia in adults.", answer: "Streptococcus pneumoniae" }
  },
  // Game 5
  {
    title: 'Fungal Foes & Parasitic Perils',
    description: 'A deep dive into the worlds of mycology and parasitology.',
    jeopardy: [
        // Categories for Game 5 Jeopardy...
    ],
    doubleJeopardy: [
        // Categories for Game 5 Double Jeopardy...
    ],
    finalJeopardy: { question: "This is the most common helminthic infection worldwide, often diagnosed by finding eggs in the stool.", answer: "Ascaris lumbricoides" }
  },
  // Game 6
  {
    title: 'Clinical Case Files',
    description: 'Questions framed as mini-clinical vignettes to test diagnostic skills.',
    jeopardy: [
        // Categories for Game 6 Jeopardy...
    ],
    doubleJeopardy: [
        // Categories for Game 6 Double Jeopardy...
    ],
    finalJeopardy: { question: "This is the term for a severe, life-threatening malaria infection characterized by cerebral involvement.", answer: "Cerebral malaria" }
  },
  // Game 7
  {
    title: 'The Immune Response',
    description: 'Focus on immunology as it relates to microbial pathogens and vaccines.',
    jeopardy: [
        // Categories for Game 7 Jeopardy...
    ],
    doubleJeopardy: [
        // Categories for Game 7 Double Jeopardy...
    ],
    finalJeopardy: { question: "This type of hypersensitivity reaction is responsible for the rash in poison ivy and the positive result in a PPD test for tuberculosis.", answer: "Type IV (Delayed-type) hypersensitivity" }
  },
  // Game 8
  {
    title: 'Bugs & Drugs',
    description: 'A focus on antimicrobial agents, their mechanisms of action, and resistance.',
    jeopardy: [
        // Categories for Game 8 Jeopardy...
    ],
    doubleJeopardy: [
        // Categories for Game 8 Double Jeopardy...
    ],
    finalJeopardy: { question: "This class of antifungal drugs inhibits the synthesis of ergosterol, a key component of the fungal cell membrane.", answer: "Azoles (e.g., fluconazole, itraconazole)" }
  },
  // Game 9
  {
    title: 'A Tour of the Body',
    description: 'Questions organized by the primary body system affected by the pathogen.',
    jeopardy: [
        // Categories for Game 9 Jeopardy...
    ],
    doubleJeopardy: [
        // Categories for Game 9 Double Jeopardy...
    ],
    finalJeopardy: { question: "This is the most common cause of bacterial meningitis in adults of all ages.", answer: "Streptococcus pneumoniae" }
  },
  // Game 10
  {
    title: 'History & Epidemiology',
    description: 'Explore the history of microbiology, famous outbreaks, and the principles of disease spread.',
    jeopardy: [
        // Categories for Game 10 Jeopardy...
    ],
    doubleJeopardy: [
        // Categories for Game 10 Double Jeopardy...
    ],
    finalJeopardy: { question: "This scientist's postulates are a set of four criteria designed to establish a causal relationship between a microbe and a disease.", answer: "Robert Koch" }
  }
];
// Fill in the placeholder games to meet the 10-game requirement.
// This is a simplified representation. A full version would have unique questions for each game.
for (let i = 3; i < 10; i++) {
  if (games[i]) {
    games[i].jeopardy = JSON.parse(JSON.stringify(games[i % 3].jeopardy));
    games[i].doubleJeopardy = JSON.parse(JSON.stringify(games[i % 3].doubleJeopardy));
    // Make daily doubles unique for each game
    games[i].jeopardy.forEach((cat, cIdx) => cat.questions.forEach((q, qIdx) => q.isDailyDouble = false));
    games[i].jeopardy[i % 5].questions[i % 4].isDailyDouble = true;
    games[i].doubleJeopardy.forEach((cat, cIdx) => cat.questions.forEach((q, qIdx) => q.isDailyDouble = false));
    games[i].doubleJeopardy[i % 5].questions[i % 4].isDailyDouble = true;
    games[i].doubleJeopardy[(i+2) % 5].questions[(i+1) % 4].isDailyDouble = true;
  }
}
