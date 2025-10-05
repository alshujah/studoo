
export type SocialSkillAssessmentItem = {
  text: string;
  domain: 'Listening' | 'Small Talk' | 'Empathy' | 'Nonverbal' | 'Assertiveness';
  scale: { label: string; value: number }[];
  scoring: 'direct' | 'inverted';
};

export const socialSkillsAssessment: SocialSkillAssessmentItem[] = [
  {
    "text": "When someone is speaking, I focus on their words without planning my response.",
    "domain": "Listening",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "I find it easy to start a light conversation with someone I don't know well (e.g., a cashier, a new colleague).",
    "domain": "Small Talk",
    "scale": [
      { "label": "Very Easy", "value": 3 },
      { "label": "Fairly Easy", "value": 2 },
      { "label": "Slightly Difficult", "value": 1 },
      { "label": "Very Difficult", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "I can accurately identify what someone else is feeling based on their tone of voice and body language.",
    "domain": "Empathy",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "I maintain comfortable eye contact during conversations.",
    "domain": "Nonverbal",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "I can say 'no' to a request without feeling overly guilty or making excuses.",
    "domain": "Assertiveness",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "During a conversation, I interrupt the other person before they have finished their thought.",
    "domain": "Listening",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "inverted"
  },
  {
    "text": "I can express my needs or opinions clearly and respectfully, even when they differ from others.",
    "domain": "Assertiveness",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "When a friend is upset, I try to relate to their feelings rather than immediately offering solutions.",
    "domain": "Empathy",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "I feel anxious or awkward when there are silences in a conversation.",
    "domain": "Small Talk",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "inverted"
  },
  {
    "text": "My posture (e.g., arms crossed, slumped shoulders) sometimes sends a message I don't intend.",
    "domain": "Nonverbal",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "inverted"
  },
  {
    "text": "After someone shares something with me, I ask clarifying questions to make sure I understand.",
    "domain": "Listening",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "direct"
  },
  {
    "text": "When I disagree with someone, I tend to keep it to myself to avoid conflict.",
    "domain": "Assertiveness",
    "scale": [
      { "label": "Nearly Always", "value": 3 },
      { "label": "Often", "value": 2 },
      { "label": "Sometimes", "value": 1 },
      { "label": "Rarely", "value": 0 }
    ],
    "scoring": "inverted"
  }
]
