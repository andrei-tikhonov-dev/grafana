import { AiChatStrings } from '../api/types';

export const DEFAULT_START_PROMPTS = [
  'Check the pulse of your sprint and spot problems early',
  'Understand how your team is doing & where improvement is possible',
  'Predict outcomes and understand "what-ifs"',
  'Learn from historical data and uncover recurring patterns',
];

export const DEFAULT_THINKING_STAGES = [
    'Analyzing your sprint data…',
    'Reviewing task dependencies…',
    'Evaluating team velocity…',
    'Identifying potential blockers…',
    'Generating recommendations…',
    'Finalizing insights…',
];

export const DEFAULT_STRINGS: AiChatStrings = {
    drawerTitle: 'AI helper',
    startTitle: 'Your sprint, explained instantly',
    startSubtitle: 'Choose a question to get data-driven insights',
    inputPlaceholder: 'Type a question or ask for an insight…',
    send: 'Send',
    cancel: 'Cancel',
    retry: 'Retry',
    other: 'Other',
    submit: 'Submit',
    thumbsUp: 'Was this helpful?',
    thumbsDown: 'Was this helpful?',
    feedbackTitleUp: 'What did you like?',
    feedbackTitleDown: 'What went wrong?',
    feedbackHintOther: 'Tell us more (max 1000 characters)',
    error404: 'Active sprint not found.',
    error503: 'AI service is temporarily unavailable.',
    errorDefault: 'Something went wrong. Please try again.',
    disclaimer: 'Our chatbot can make mistakes. Trust answers with caution.',
    autoSummaryMessage: 'Analyze status',
};

export const DEFAULT_FEEDBACK_REASONS = {
    up: [
        'Accurate and relevant',
        'Clear explanation',
        'Actionable recommendations',
        'Helped identify risks',
        'Good level of detail',
    ],
    down: [
        'Inaccurate or misleading',
        'Not relevant to my question',
        'Too generic or vague',
        'Missing important details',
        'Hard to understand',
    ],
};
