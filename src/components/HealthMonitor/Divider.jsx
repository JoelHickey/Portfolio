function Divider({ height = '200px' }) {
  return (
    <div
      style={{
        width: '1px',
        height,
        background: 'transparent',
        borderLeft: '1px solid #808080'
      }}
    />
  );
}

export default Divider;
