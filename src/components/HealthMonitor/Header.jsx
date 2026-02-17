function Header({ title = 'Earth', iconSrc = '/health-icons/Earth.ico', iconAlt = 'Earth', embed = false }) {
  const styles = {
    header: {
      background: '#000080',
      color: '#ffffff',
      padding: '2px 6px',
      fontSize: '8pt',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #808080',
      height: '24px',
      boxSizing: 'border-box',
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    windowButton: {
      width: '16px',
      height: '14px',
      background: '#d4d0c8',
      borderTop: '1px solid #ffffff',
      borderLeft: '1px solid #ffffff',
      borderBottom: '1px solid #808080',
      borderRight: '1px solid #808080',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontFamily: "'MS Sans Serif', sans-serif",
      color: '#000000',
      padding: '0',
      lineHeight: '1',
      fontWeight: 'normal',
      marginLeft: '2px'
    }
  };

  const handleWindowButtonMouseDown = (e) => {
    e.target.style.borderTop = '1px solid #808080';
    e.target.style.borderLeft = '1px solid #808080';
    e.target.style.borderBottom = '1px solid #ffffff';
    e.target.style.borderRight = '1px solid #ffffff';
    e.target.style.background = '#c0c0c0';
  };

  const handleWindowButtonMouseUp = (e) => {
    e.target.style.borderTop = '1px solid #ffffff';
    e.target.style.borderLeft = '1px solid #ffffff';
    e.target.style.borderBottom = '1px solid #808080';
    e.target.style.borderRight = '1px solid #808080';
    e.target.style.background = '#d4d0c8';
  };

  return (
    <div style={{ ...styles.header, cursor: 'move' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <img src={iconSrc} alt={iconAlt} style={{ width: '14px', height: '14px' }} />
        <span>{title}</span>
      </div>
      {!embed && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            style={styles.windowButton}
            onMouseDown={handleWindowButtonMouseDown}
            onMouseUp={handleWindowButtonMouseUp}
            title="Minimize"
          >
            −
          </button>
          <button
            style={styles.windowButton}
            onMouseDown={handleWindowButtonMouseDown}
            onMouseUp={handleWindowButtonMouseUp}
            title="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
