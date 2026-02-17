import { useState, useEffect } from 'react';

function StatusBar({ caffeineLevel = 0, sliderValues = {} }) {
  const today = new Date();
  const wakeTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 5, 0, 0);

  const [elapsedTime, setElapsedTime] = useState('');

  const caffeineMg = Math.round(caffeineLevel * 95);

  const getHoursSinceWaking = () => {
    const now = new Date();
    const diff = now - wakeTime;
    if (diff < 0) return 0;
    return diff / (1000 * 60 * 60);
  };

  const getCaffeineWarning = () => {
    const hoursSinceWaking = getHoursSinceWaking();
    const maxDailyCaffeine = 400;
    const hoursInDay = 24;
    const proportionalLimit = Math.round((hoursSinceWaking / hoursInDay) * maxDailyCaffeine);

    if (caffeineMg > proportionalLimit) {
      const overLimit = caffeineMg - proportionalLimit;
      return `Caffeine: ${overLimit}mg over limit`;
    }
    return null;
  };

  const getRecommendations = () => {
    const recommendations = [];
    const hoursSinceWaking = getHoursSinceWaking();

    if (sliderValues.foodLevel < 3) recommendations.push('Eat something');
    if (sliderValues.waterLevel < 4) recommendations.push('Drink water');
    if (sliderValues.walkLevel < 3) recommendations.push('Take a walk');
    if (sliderValues.squatsLevel < 2) recommendations.push('Do some squats');
    if (caffeineMg > 200 && hoursSinceWaking > 6) recommendations.push('Caffeine crash likely');
    if (caffeineMg > 300) recommendations.push('Limit more caffeine');
    if (sliderValues.sleepQuality < 5) recommendations.push('Poor sleep detected');
    if (sliderValues.energy > 7 && caffeineMg > 200) recommendations.push('Energy spike - may crash');
    if (hoursSinceWaking > 12) recommendations.push('Long day - consider rest');

    return recommendations;
  };

  const caffeineWarning = getCaffeineWarning();
  const recommendations = getRecommendations();

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = new Date();
      const diff = now - wakeTime;

      if (diff < 0) {
        setElapsedTime('0h 0m');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setElapsedTime(`${hours}h ${minutes}m`);
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    statusBar: {
      background: '#c0c0c0',
      borderTop: '1px solid #808080',
      borderLeft: '1px solid #808080',
      borderBottom: '1px solid #ffffff',
      borderRight: '1px solid #ffffff',
      padding: '8px 8px',
      fontSize: '8pt',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: "'MS Sans Serif', sans-serif",
      color: '#000000',
      height: '28px',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box'
    },
    leftSection: { display: 'flex', alignItems: 'center', gap: '8px' },
    rightSection: { display: 'flex', alignItems: 'center', gap: '8px' },
    neuralLinkIndicator: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background:
        'radial-gradient(circle at 20% 20%, #ffffff 0%, #f0f0f0 15%, #e0e0e0 30%, #c0c0c0 60%, #a0a0a0 100%)',
      border: '1px solid #808080',
      boxShadow: 'inset 0.5px 0.5px #ffffff, inset -0.5px -0.5px #606060'
    }
  };

  return (
    <div style={styles.statusBar}>
      <div style={styles.leftSection}>
        <span>Awake: {elapsedTime}</span>
        {caffeineWarning && (
          <span style={{ color: '#000000', fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '10px' }}>⚠</span>
            {caffeineWarning}
          </span>
        )}
        {recommendations.length > 0 && (
          <span style={{ color: '#000000', fontWeight: 'normal', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '2px' }}>💡</span>
            {recommendations[0]}
          </span>
        )}
      </div>

      <div style={styles.rightSection}>
        <span>Neural link</span>
        <div style={styles.neuralLinkIndicator} />
      </div>
    </div>
  );
}

export default StatusBar;
