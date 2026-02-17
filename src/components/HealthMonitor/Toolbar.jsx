import { VIEW_BUTTONS } from './constants';

function Toolbar({
  activeView,
  setActiveView,
  outputValue = 5,
  isFlipView = false,
  onToggleFlip
}) {
  const styles = {
    viewSwitcher: {
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
      padding: '0 8px',
      background: '#d4d0c8',
      borderBottom: '1px solid #808080',
      borderTop: '1px solid #ffffff',
      height: '24px',
      boxSizing: 'border-box'
    },
    button: {
      width: '36px',
      height: '24px',
      lineHeight: '24px',
      background: '#d4d0c8',
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderBottom: '2px solid #808080',
      borderRight: '2px solid #808080',
      fontSize: '8pt',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'MS Sans Serif', sans-serif",
      fontWeight: 'normal',
      padding: '0',
      boxSizing: 'border-box'
    },
    activeButton: {
      borderTop: '2px solid #808080',
      borderLeft: '2px solid #808080',
      borderBottom: '2px solid #ffffff',
      borderRight: '2px solid #ffffff',
      boxShadow: 'none'
    },
    outputBar: {
      width: '126px',
      height: '8px',
      background: '#ffffff',
      borderTop: '2px solid #808080',
      borderLeft: '2px solid #808080',
      borderBottom: '2px solid #ffffff',
      borderRight: '2px solid #ffffff',
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      fontSize: '8pt',
      fontFamily: "'MS Sans Serif', sans-serif",
      marginLeft: '8px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    },
    outputFill: {
      height: '100%',
      width: `${(outputValue / 10) * 100}%`,
      background: (() => {
        if (outputValue === 0) return 'transparent';
        if (outputValue <= 3) return '#ff0000';
        if (outputValue <= 6) return '#ffff00';
        return '#00ff00';
      })(),
      position: 'absolute',
      left: '0',
      top: '0',
      transition: 'width 0.2s ease'
    },
    label: { fontSize: '8pt', fontFamily: "'MS Sans Serif', sans-serif", color: '#000000' }
  };

  const handleButtonMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON') {
      e.target.style.borderTop = '2px solid #808080';
      e.target.style.borderLeft = '2px solid #808080';
      e.target.style.borderBottom = '2px solid #ffffff';
      e.target.style.borderRight = '2px solid #ffffff';
    }
  };

  const handleButtonMouseUp = (e) => {
    if (e.target.tagName === 'BUTTON') {
      e.target.style.borderTop = '2px solid #ffffff';
      e.target.style.borderLeft = '2px solid #ffffff';
      e.target.style.borderBottom = '2px solid #808080';
      e.target.style.borderRight = '2px solid #808080';
    }
  };

  return (
    <div style={styles.viewSwitcher}>
      {VIEW_BUTTONS.map(({ id, icon, alt, text }) => (
        <button
          key={id}
          type="button"
          style={{
            ...styles.button,
            ...(text && { width: 'auto', padding: '0 8px' }),
            ...(activeView === id && styles.activeButton)
          }}
          onClick={() => setActiveView(id)}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
        >
          {text ? (
            <span style={{ fontSize: '8pt', fontFamily: "'MS Sans Serif', sans-serif" }}>{text}</span>
          ) : (
            <img src={icon} alt={alt} style={{ width: '16px', height: '16px' }} />
          )}
        </button>
      ))}
      {onToggleFlip && (
        <button
          type="button"
          style={{
            ...styles.button,
            width: 'auto',
            padding: '0 8px',
            ...(isFlipView && styles.activeButton)
          }}
          onClick={onToggleFlip}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
          aria-pressed={isFlipView}
        >
          <span style={{ fontSize: '8pt', fontFamily: "'MS Sans Serif', sans-serif" }}>
            {isFlipView ? 'Front' : 'Back'}
          </span>
        </button>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: 'auto' }}>
        <span style={styles.label}>Output:</span>
        <div style={styles.outputBar}>
          <div style={styles.outputFill} />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
