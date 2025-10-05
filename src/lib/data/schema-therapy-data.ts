
export type Schema = {
    name: string;
    description: string;
    domain: 'Disconnection & Rejection' | 'Impaired Autonomy & Performance' | 'Impaired Limits' | 'Other-Directedness' | 'Overvigilance & Inhibition';
};

export const schemas: Schema[] = [
    // Domain 1: Disconnection & Rejection
    {
        name: "Abandonment / Instability",
        description: "The belief that significant others will not be able to continue providing reliable and stable support, connection, or protection.",
        domain: "Disconnection & Rejection",
    },
    {
        name: "Mistrust / Abuse",
        description: "The expectation that others will hurt, abuse, humiliate, cheat, lie, manipulate, or take advantage.",
        domain: "Disconnection & Rejection",
    },
    {
        name: "Emotional Deprivation",
        description: "The belief that one's primary emotional needs for nurturance, empathy, and protection will not be met by others.",
        domain: "Disconnection & Rejection",
    },
    {
        name: "Defectiveness / Shame",
        description: "The feeling that one is defective, bad, unwanted, inferior, or invalid in important respects; or that one would be unlovable to significant others if exposed.",
        domain: "Disconnection & Rejection",
    },
    {
        name: "Social Isolation / Alienation",
        description: "The feeling that one is isolated from the rest of the world, different from other people, and/or not part of any group or community.",
        domain: "Disconnection & Rejection",
    },
    // Domain 2: Impaired Autonomy & Performance
    {
        name: "Dependence / Incompetence",
        description: "Belief that one is unable to handle one's everyday responsibilities in a competent manner, without considerable help from others.",
        domain: "Impaired Autonomy & Performance",
    },
    {
        name: "Vulnerability to Harm or Illness",
        description: "Exaggerated fear that imminent catastrophe will strike at any time and that one will be unable to prevent it.",
        domain: "Impaired Autonomy & Performance",
    },
    {
        name: "Enmeshment / Undeveloped Self",
        description: "Excessive emotional involvement and closeness with one or more significant others at the expense of full individuation or normal social development.",
        domain: "Impaired Autonomy & Performance",
    },
    {
        name: "Failure",
        description: "The belief that one has failed, will inevitably fail, or is fundamentally inadequate relative to one's peers in areas of achievement.",
        domain: "Impaired Autonomy & Performance",
    },
    // Domain 3: Impaired Limits
    {
        name: "Entitlement / Grandiosity",
        description: "The belief that one is superior to other people; entitled to special rights and privileges; or not bound by the rules of reciprocity.",
        domain: "Impaired Limits",
    },
    {
        name: "Insufficient Self-Control / Self-Discipline",
        description: "Pervasive difficulty or refusal to exercise sufficient self-control and frustration tolerance to achieve one's personal goals.",
        domain: "Impaired Limits",
    },
    // Domain 4: Other-Directedness
    {
        name: "Subjugation",
        description: "Excessive surrendering of control to others because one feels coerced - usually to avoid anger, retaliation, or abandonment.",
        domain: "Other-Directedness",
    },
    {
        name: "Self-Sacrifice",
        description: "Excessive focus on voluntarily meeting the needs of others in daily situations, at the expense of one's own gratification.",
        domain: "Other-Directedness",
    },
    {
        name: "Approval-Seeking / Recognition-Seeking",
        description: "Excessive emphasis on gaining approval, recognition, or attention from other people, at the expense of developing a secure and true sense of self.",
        domain: "Other-Directedness",
    },
    // Domain 5: Overvigilance & Inhibition
    {
        name: "Negativity / Pessimism",
        description: "A pervasive, lifelong focus on the negative aspects of life (pain, death, loss, disappointment, etc.) while minimizing or neglecting the positive or optimistic aspects.",
        domain: "Overvigilance & Inhibition",
    },
    {
        name: "Emotional Inhibition",
        description: "The excessive inhibition of spontaneous action, feeling, or communication - usually to avoid disapproval by others, feelings of shame, or losing control of one's impulses.",
        domain: "Overvigilance & Inhibition",
    },
    {
        name: "Unrelenting Standards / Hypercriticalness",
        description: "The underlying belief that one must strive to meet very high internalized standards of behavior and performance, usually to avoid criticism.",
        domain: "Overvigilance & Inhibition",
    },
    {
        name: "Punitiveness",
        description: "The belief that people should be harshly punished for making mistakes.",
        domain: "Overvigilance & Inhibition",
    },
];
