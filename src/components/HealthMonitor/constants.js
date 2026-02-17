const ICON_BASE = '/health-icons';

export const INPUT_SLIDERS = [
  { name: 'sleepQuality', label: 'Sleep Quality' },
  { name: 'waterLevel', label: 'Water', unit: 'ml', multiplier: 300 },
  { name: 'caffeineLevel', label: 'Coffee', unit: 'shots', multiplier: 1 },
  { name: 'foodLevel', label: 'Food', unit: 'cal', multiplier: 300 },
  { name: 'walkLevel', label: 'Walk', unit: 'km', multiplier: 1 },
  { name: 'alcoholLevel', label: 'Last Drink', unit: 'days', multiplier: 1 },
  { name: 'vitaminD', label: 'Vitamin D', unit: 'IU', multiplier: 100 },
  { name: 'vitaminB12', label: 'Vitamin B', unit: 'mcg', multiplier: 1 },
  { name: 'vitaminC', label: 'Vitamin C', unit: 'mg', multiplier: 10 },
  { name: 'magnesium', label: 'Magnesium', unit: 'mg', multiplier: 10 },
  { name: 'lTheanine', label: 'L-Theanine', unit: 'mg', multiplier: 1 }
];

export const EMOTION_SLIDERS = [
  { name: 'happiness', label: 'Happiness' },
  { name: 'anxiety', label: 'Anxiety' },
  { name: 'stress', label: 'Stress' },
  { name: 'energy', label: 'Energy' },
  { name: 'sadness', label: 'Sadness' },
  { name: 'anger', label: 'Anger' },
  { name: 'irritability', label: 'Irritability' },
  { name: 'dread', label: 'Dread' }
];

export const VIEW_BUTTONS = [
  { id: 'inputs', icon: `${ICON_BASE}/Plug.ico`, alt: 'Plug' },
  { id: 'emotions', icon: `${ICON_BASE}/Smiley-face.ico`, alt: 'Emotions' },
  { id: 'environment', icon: `${ICON_BASE}/Tree.ico`, alt: 'Tree' },
  { id: 'timeline', icon: `${ICON_BASE}/Notepad.ico`, alt: 'Notepad' },
  { id: 'about', icon: null, alt: 'About', text: 'About' }
];
