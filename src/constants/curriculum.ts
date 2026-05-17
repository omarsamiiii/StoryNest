import type { CurriculumLesson, CurriculumTrack } from "@/types/curriculum";

export const CURRICULUM_LESSONS: CurriculumLesson[] = [
  {
    id: "breathing-with-the-tide",
    domain: "emotional-regulation",
    difficulty: "starter",
    title: "Breathing With the Tide",
    parentGoal: "Introduce slow breathing as a bedtime settling tool.",
    childFacingGoal: "Notice how slow breaths can help a busy body feel quiet.",
    recommendedAgeRanges: ["3-4", "5-6"],
    interests: ["ocean", "animals", "nature"],
    tone: "calm",
    length: "short",
    themeSeeds: ["quiet tide pool", "sleepy sea turtle", "moonlit beach"],
    moralSeed: "Slow breaths can help big feelings drift away.",
    vocabularyTargets: ["tide", "gentle", "settle"],
    discussionPrompts: [
      "Where did the character feel the breath in their body?",
      "What helped the ocean become quiet?",
      "When could we try three slow breaths together?"
    ],
    bedtimeSafetyNotes: ["Avoid storms or danger at sea.", "End with a predictable lights-out cue."],
    followUpActivity: "Practice three hand-on-belly breaths before turning off the light."
  },
  {
    id: "lantern-of-kind-words",
    domain: "friendship",
    difficulty: "starter",
    title: "Lantern of Kind Words",
    parentGoal: "Model simple repair language after small conflicts.",
    childFacingGoal: "Use kind words to help a friend feel included.",
    recommendedAgeRanges: ["3-4", "5-6"],
    interests: ["magic", "friendship", "nature"],
    tone: "magical",
    length: "short",
    themeSeeds: ["glowing garden lantern", "friendly firefly path", "moon garden"],
    moralSeed: "Kind words make room for everyone.",
    vocabularyTargets: ["include", "share", "repair"],
    discussionPrompts: [
      "What words helped the friend feel better?",
      "How did the lantern change when everyone joined in?",
      "What is one kind phrase we can use tomorrow?"
    ],
    bedtimeSafetyNotes: ["Keep conflict mild and quickly repaired.", "Use soft light imagery."],
    followUpActivity: "Choose one kind phrase for tomorrow morning."
  },
  {
    id: "robot-retry-button",
    domain: "confidence",
    difficulty: "starter",
    title: "Robot Retry Button",
    parentGoal: "Normalize mistakes as part of learning.",
    childFacingGoal: "Try again after a wobbly first attempt.",
    recommendedAgeRanges: ["5-6", "7-8"],
    interests: ["robots", "sports", "space"],
    tone: "funny",
    length: "medium",
    themeSeeds: ["friendly robot workshop", "backyard invention fair", "sleepy space lab"],
    moralSeed: "Trying again is how new skills grow.",
    vocabularyTargets: ["practice", "retry", "patient"],
    discussionPrompts: [
      "What did the robot learn from the first try?",
      "Who helped the robot stay patient?",
      "What is something you are practicing?"
    ],
    bedtimeSafetyNotes: ["Keep jokes gentle and non-chaotic.", "Close with the robot powering down peacefully."],
    followUpActivity: "Name one small skill to practice for two minutes tomorrow."
  },
  {
    id: "dinosaur-sharing-map",
    domain: "responsibility",
    difficulty: "growing",
    title: "Dinosaur Sharing Map",
    parentGoal: "Connect responsibility with taking turns and caring for shared things.",
    childFacingGoal: "Share discoveries so everyone can enjoy the adventure.",
    recommendedAgeRanges: ["5-6", "7-8"],
    interests: ["dinosaurs", "nature", "friendship"],
    tone: "magical",
    length: "medium",
    themeSeeds: ["dinosaur valley map", "fossil meadow", "gentle brontosaurus trail"],
    moralSeed: "Shared discoveries become brighter.",
    vocabularyTargets: ["discover", "responsible", "turn"],
    discussionPrompts: [
      "How did the map help everyone?",
      "What did the character do to care for the map?",
      "What shared thing do we take care of at home?"
    ],
    bedtimeSafetyNotes: ["No chase scenes.", "Use cooperative discovery instead of danger."],
    followUpActivity: "Pick one shared household item to care for tomorrow."
  },
  {
    id: "observatory-question-jar",
    domain: "curiosity",
    difficulty: "growing",
    title: "Observatory Question Jar",
    parentGoal: "Encourage curiosity while keeping bedtime calm.",
    childFacingGoal: "Ask thoughtful questions and save some for tomorrow.",
    recommendedAgeRanges: ["7-8", "9-10"],
    interests: ["space", "robots"],
    tone: "educational",
    length: "long",
    themeSeeds: ["sleepy observatory", "starlight question jar", "moon telescope"],
    moralSeed: "Questions can guide tomorrow's learning.",
    vocabularyTargets: ["observe", "orbit", "wonder"],
    discussionPrompts: [
      "Which question did the character save for tomorrow?",
      "How did observing help them learn?",
      "What question should we put in our question jar?"
    ],
    bedtimeSafetyNotes: ["Avoid cosmic threats.", "End by setting questions aside for rest."],
    followUpActivity: "Write or say one question to revisit after breakfast."
  },
  {
    id: "pajama-parade-change",
    domain: "transitions",
    difficulty: "starter",
    title: "Pajama Parade Change",
    parentGoal: "Make routine transitions feel predictable and playful.",
    childFacingGoal: "Move from playtime to bedtime one small step at a time.",
    recommendedAgeRanges: ["3-4", "5-6"],
    interests: ["sports", "magic", "friendship"],
    tone: "funny",
    length: "short",
    themeSeeds: ["pajama parade", "toothbrush marching band", "blanket bridge"],
    moralSeed: "Small steps make big changes easier.",
    vocabularyTargets: ["routine", "first", "next"],
    discussionPrompts: [
      "What was the first bedtime step?",
      "What made the next step easier?",
      "What should our first step be tonight?"
    ],
    bedtimeSafetyNotes: ["Keep energy playful but descending.", "Close with stillness."],
    followUpActivity: "Let the child choose the first tiny bedtime step."
  },
  {
    id: "forest-thank-you-notes",
    domain: "family-values",
    difficulty: "starter",
    title: "Forest Thank-You Notes",
    parentGoal: "Practice gratitude in a concrete, age-appropriate way.",
    childFacingGoal: "Notice helpers and say thank you.",
    recommendedAgeRanges: ["3-4", "5-6", "7-8"],
    interests: ["animals", "nature", "friendship"],
    tone: "calm",
    length: "short",
    themeSeeds: ["forest mailbox", "owl thank-you notes", "mossy path"],
    moralSeed: "Gratitude helps love feel visible.",
    vocabularyTargets: ["grateful", "notice", "helper"],
    discussionPrompts: [
      "Who helped in the story?",
      "How did saying thank you change the forest?",
      "Who can we thank tomorrow?"
    ],
    bedtimeSafetyNotes: ["Use quiet woodland imagery.", "Avoid nighttime fear tropes."],
    followUpActivity: "Whisper one thank-you before sleep."
  },
  {
    id: "cloud-castle-brave-small",
    domain: "confidence",
    difficulty: "growing",
    title: "Cloud Castle Brave-Small",
    parentGoal: "Define bravery as small, supported steps.",
    childFacingGoal: "Take one brave-small step with help nearby.",
    recommendedAgeRanges: ["5-6", "7-8"],
    interests: ["princesses", "magic", "friendship"],
    tone: "magical",
    length: "medium",
    themeSeeds: ["cloud castle", "floating library", "star balcony"],
    moralSeed: "Bravery can be quiet and small.",
    vocabularyTargets: ["brave", "support", "steady"],
    discussionPrompts: [
      "What made the brave step feel smaller?",
      "Who supported the character?",
      "What brave-small step might help tomorrow?"
    ],
    bedtimeSafetyNotes: ["Avoid perilous heights.", "Use soft cloud and moon imagery."],
    followUpActivity: "Name one supportive grown-up or friend."
  },
  {
    id: "garden-of-owning-mistakes",
    domain: "responsibility",
    difficulty: "stretch",
    title: "Garden of Owning Mistakes",
    parentGoal: "Teach accountability without shame.",
    childFacingGoal: "Tell the truth, repair what happened, and try again.",
    recommendedAgeRanges: ["7-8", "9-10"],
    interests: ["nature", "magic", "friendship"],
    tone: "calm",
    length: "medium",
    themeSeeds: ["enchanted vegetable garden", "truth-telling seed packet", "moonlit greenhouse"],
    moralSeed: "Owning a mistake helps trust grow back.",
    vocabularyTargets: ["accountable", "repair", "trust"],
    discussionPrompts: [
      "What mistake happened in the garden?",
      "How did the character repair it?",
      "Why did truth help trust grow?"
    ],
    bedtimeSafetyNotes: ["Keep consequences gentle and restorative.", "Avoid shame language."],
    followUpActivity: "Practice a repair sentence: I did it, I am sorry, I can help fix it."
  },
  {
    id: "story-spark-studio",
    domain: "creativity",
    difficulty: "growing",
    title: "Story Spark Studio",
    parentGoal: "Invite creative problem solving without overstimulating bedtime.",
    childFacingGoal: "Use imagination to solve a small, kind problem.",
    recommendedAgeRanges: ["5-6", "7-8", "9-10"],
    interests: ["magic", "robots", "princesses"],
    tone: "magical",
    length: "medium",
    themeSeeds: ["quiet maker studio", "paintbrush comet", "dreamy invention shelf"],
    moralSeed: "Imagination helps us find kind solutions.",
    vocabularyTargets: ["imagine", "design", "solution"],
    discussionPrompts: [
      "What idea did the character try first?",
      "How did the idea help someone?",
      "What would you design for a friend?"
    ],
    bedtimeSafetyNotes: ["Avoid loud invention mishaps.", "End by putting tools away."],
    followUpActivity: "Describe one imaginary invention in a whisper voice."
  },
  {
    id: "team-huddle-listening",
    domain: "friendship",
    difficulty: "stretch",
    title: "Team Huddle Listening",
    parentGoal: "Practice listening as part of teamwork.",
    childFacingGoal: "Listen before choosing the next play.",
    recommendedAgeRanges: ["7-8", "9-10"],
    interests: ["sports", "friendship"],
    tone: "educational",
    length: "medium",
    themeSeeds: ["moonlight soccer huddle", "backyard relay team", "gentle basketball practice"],
    moralSeed: "Teams work better when everyone is heard.",
    vocabularyTargets: ["listen", "teamwork", "strategy"],
    discussionPrompts: [
      "Who had an idea that mattered?",
      "What changed after the team listened?",
      "How can we show someone we are listening?"
    ],
    bedtimeSafetyNotes: ["Avoid competitive pressure.", "Frame winning as cooperation."],
    followUpActivity: "Practice repeating back one thing someone says tomorrow."
  },
  {
    id: "new-room-nightlight",
    domain: "transitions",
    difficulty: "stretch",
    title: "New Room Nightlight",
    parentGoal: "Support moves, new beds, or changing routines with reassurance.",
    childFacingGoal: "Find familiar comforts during a new bedtime.",
    recommendedAgeRanges: ["3-4", "5-6", "7-8"],
    interests: ["magic", "nature", "animals"],
    tone: "calm",
    length: "short",
    themeSeeds: ["new room nightlight", "blanket nest", "friendly window moon"],
    moralSeed: "New places feel safer with familiar comforts.",
    vocabularyTargets: ["familiar", "comfort", "settle"],
    discussionPrompts: [
      "What familiar thing helped the character?",
      "What stayed the same even in a new room?",
      "Which comfort should be near the bed tonight?"
    ],
    bedtimeSafetyNotes: ["Keep uncertainty mild.", "End with security and caregiver presence."],
    followUpActivity: "Choose one familiar object for the bedside."
  }
];

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: "calm-bedtime-foundations",
    title: "Calm Bedtime Foundations",
    description: "A gentle track for younger children who benefit from predictable wind-down stories.",
    domain: "emotional-regulation",
    lessonIds: ["breathing-with-the-tide", "pajama-parade-change", "new-room-nightlight"],
    parentOutcome: "Builds repeatable cues for calm transitions, breathing, and secure sleep routines."
  },
  {
    id: "kind-friendships",
    title: "Kind Friendships",
    description: "Stories that practice inclusion, listening, taking turns, and repair.",
    domain: "friendship",
    lessonIds: ["lantern-of-kind-words", "dinosaur-sharing-map", "team-huddle-listening"],
    parentOutcome: "Helps parents reinforce social language without turning bedtime into a lecture."
  },
  {
    id: "confident-learners",
    title: "Confident Learners",
    description: "A growth mindset path for mistakes, persistence, and brave-small steps.",
    domain: "confidence",
    lessonIds: ["robot-retry-button", "cloud-castle-brave-small", "observatory-question-jar"],
    parentOutcome: "Frames effort as learnable and supported while keeping stories reassuring."
  },
  {
    id: "responsible-and-ready",
    title: "Responsible and Ready",
    description: "A track for accountability, gratitude, and caring for shared family routines.",
    domain: "responsibility",
    lessonIds: ["forest-thank-you-notes", "garden-of-owning-mistakes", "story-spark-studio"],
    parentOutcome: "Turns family values into story prompts with concrete follow-up actions."
  }
];

